import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const stage = process.env.STAGE || 'dev'
    const acmCertificateArn = process.env.ACM_CERTIFICATE_ARN
    const alternativeDomain = process.env.ALTERNATIVE_DOMAIN_NAME
    const hostedZoneIdValue = process.env.HOSTED_ZONE_ID

    if (!acmCertificateArn || !alternativeDomain || !hostedZoneIdValue) {
      throw new Error('As variáveis de ambiente ACM_CERTIFICATE_ARN, ALTERNATIVE_DOMAIN_NAME e HOSTED_ZONE_ID devem ser definidas.')
    }
    
    const s3Bucket = new s3.Bucket(this, 'LuzFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true
    })

    const certificate = Certificate.fromCertificateArn(
      this,
      'LuzFrontCertificate-' + stage,
      acmCertificateArn
    )

    const distribution = new cloudfront.Distribution(this, 'CDN', {
      comment: 'Luz Front Distribution ' + stage,
      defaultRootObject: 'index.html',
      domainNames: [alternativeDomain],
      certificate: certificate,
      defaultBehavior: {
        origin: new origins.S3Origin(s3Bucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        }
      ]
    });

    if (stage === 'prod' || stage === 'homolog' || stage === 'dev') {
      const zone = route53.HostedZone.fromHostedZoneAttributes(
        this,
        'LuzFrontHostedZone-' + stage,
        {
          hostedZoneId: hostedZoneIdValue,
          zoneName: alternativeDomain
        }
      )

      new route53.ARecord(this, 'LuzFrontAliasRecord-' + stage, {
        zone: zone,
        recordName: alternativeDomain,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(distribution)
        )
      })
    }

    new cdk.CfnOutput(this, 'LuzFrontBucketName-' + stage, {
      value: s3Bucket.bucketName
    })

    new cdk.CfnOutput(this, 'LuzFrontDistributionId-' + stage, {
      value: distribution.distributionId
    })

    new cdk.CfnOutput(this, 'LuzFrontDistributionDomainName-' + stage, {
      value: distribution.distributionDomainName
    })
  }
}