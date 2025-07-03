import { X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTopbar } from '@/app/components/drawer';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DrawerProvider } from '@/app/contexts/Drawer-context';

function Explanation() {
    return (
        <AnimatePresence>
            <main className="px-10 py-4 text-justify">
                <p className="py-2">Para iniciar, realize o calculo do EDL. Preencha as caixas à direita com os respectivos valores e clique em Calcular, o resultado da conta deverá aparecer na caixa “Resultado”.</p>
                <p className="py-2">Em seguida selecione o que deseja calcular utilizando os botões (Nº de Dutos ou Iluminância média) e repita o processo.</p>
                <p className="py-2">Caso tenha alguma dúvida a respeito de uma variável, clique no ícone de informações ⓘ para saber mais.</p>
                <p className="py-2">As caixas de resposta que estão em amarelo não podem ser editadas, pois já possuem um valor fixo.</p>
                <p className="py-2">Caso possua mais dúvidas, consulte o cálculo em “Princípios” ou clique em “Saiba mais”.</p>
            </main>
        </AnimatePresence>
    )
}

export function HowToUseDrawer() {
    return (
        <Drawer>
            <DrawerContent>
                <DrawerTopbar>Como Usar</DrawerTopbar>
                <Explanation />
            </DrawerContent>
        </Drawer>
    )
}