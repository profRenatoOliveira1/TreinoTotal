import React from 'react';
import ListarAluno from '../../components/Listagem/ListagemAlunos';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de listagem de aluno
 * @returns web page
 */
function AlunoListagem() {
    return (
        <div>
            <Navegacao />
            <ListarAluno />
        </div>
    );
}

export default AlunoListagem;
