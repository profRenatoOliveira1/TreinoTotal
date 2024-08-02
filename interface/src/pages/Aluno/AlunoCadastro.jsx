import React from 'react';
import CadastroAluno from '../../components/Cadastro/CadastroAluno';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de cadastro de aluno
 * @returns web page
 */
function AlunoCadastro() {
    // Define um componente funcional chamado AlunoCadastro.
    return (
        <>
            <Navegacao />
            <CadastroAluno />
        </>
        // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
    );
}

export default AlunoCadastro;
