import React from 'react';
import CadastroAparelho from '../../components/Cadastro/CadastroAparelho';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de cadastro de aparelho
 * @returns web page
 */
function AparelhoCadastro() {
    // Define um componente funcional chamado AparelhoCadastro.
    return (
        <div>
            <Navegacao />
            <CadastroAparelho />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e CadastroAparelho.
    );
}

export default AparelhoCadastro;
