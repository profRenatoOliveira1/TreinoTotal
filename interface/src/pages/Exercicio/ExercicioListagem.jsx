import React from 'react';
import ListagemExercicio from '../../components/Listagem/ListagemExercicios';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de listagem de exercício
 * @returns web page
 */
function ExercicioListagem() {
    return (
        <div>
            <Navegacao />
            <ListagemExercicio />
        </div>
    );
}

export default ExercicioListagem;
