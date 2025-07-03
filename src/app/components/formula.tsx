import 'katex/dist/katex.min.css';
import { renderToString } from 'katex';
import {BlockMath} from 'react-katex';
import {InlineMath} from 'react-katex';


function EDLFormula(){
    return(
        // <BlockMath math={`
        //     EDL = \\sin^2(x) \\cdot \\arctan\\left(\\frac{b}{2h}\\right) + 
        //     \\sum^n_{i=1} \\left( 
        //     \\sin^2(x) \\cdot \\arctan\\left[\\left(i + \\frac{1}{2}\\right) \\cdot \\frac{b}{h}\\right] - 
        //     \\sin^2(x) \\cdot \\arctan\\left[\\left(i - \\frac{1}{2}\\right) \\cdot \\frac{b}{h}\\right] 
        //     \\right) \\cdot \\rho^i
        //     `}
        // />
    <BlockMath math={`
        \\begin{aligned}
        EDL &= \\sin^2(x) \\cdot \\arctan\\left(\\frac{b}{2h}\\right) \\\\
        &\\quad + \\sin^2(x) \\cdot \\sum^n_{i=1} \\Bigg[ \\arctan\\left(\\left(i + \\frac{1}{2}\\right)\\frac{b}{h}\\right) \\\\
        &\\quad\\quad - \\arctan\\left(\\left(i - \\frac{1}{2}\\right)\\frac{b}{h}\\right) \\Bigg] \\rho^i
        \\end{aligned}
    `} />

    );
}

function EDLFormula2(){
  return (
    <BlockMath math="EDL = \frac{E_p}{E_{ext}} = \frac{\sum^n_{i=0}{E_i}}{\pi \cdot L_0}" />
  );
}

function PhiFormula(){
    return(
        <BlockMath math={'\\phi_{duto} = EDL \\cdot b^2'} />
    );
}

function NFormula(){
    return(
        <BlockMath math={'n = \\frac{E \\cdot A}{\\phi_{duto} \\cdot CD \\cdot Fd}'} />
    );
}

function RCRFormula(){
    return(
        <BlockMath math={'RCR = \\frac{5h \\cdot \\left( a + b \\right)}{a \\cdot b}'}/>
    );
}


export{EDLFormula2, EDLFormula, PhiFormula, NFormula, RCRFormula}