import React from 'react';
import CadastroAparelho from '../../components/Cadastro/CadastroAparelho';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de cadastro de aparelho
 * @returns web page
 */
function AparelhoCadastro() {
    return (
        <div>
            <Navegacao />
            <CadastroAparelho />
        </div>
    );
}

export default AparelhoCadastro;
