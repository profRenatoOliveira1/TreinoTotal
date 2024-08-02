import React from 'react';
import ListarAluno from '../../components/Listagem/ListagemAlunos';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de listagem de aluno
 * @returns web page
 */
function AlunoListagem() {
    // Define um componente funcional chamado AlunoListagem.
    return (
        <div>
            <Navegacao />
            <ListarAluno />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e ListarAluno.
    );
}

export default AlunoListagem;
