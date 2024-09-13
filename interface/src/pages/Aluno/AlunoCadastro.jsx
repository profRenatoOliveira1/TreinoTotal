import React from 'react';
import CadastroAluno from '../../components/Cadastro/CadastroAluno';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de cadastro de aluno
 * @returns web page
 */
function AlunoCadastro() {
    return (
        <>
            <Navegacao />
            <CadastroAluno />
        </>
    );
}

export default AlunoCadastro;
