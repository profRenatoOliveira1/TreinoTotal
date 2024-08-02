import React from 'react';
import ListagemExercicio from '../../components/Listagem/ListagemExercicios';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de listagem de exercício
 * @returns web page
 */
function ExercicioListagem() {
    // Define um componente funcional chamado ExercicioListagem.
    return (
        <div>
            <Navegacao />
            <ListagemExercicio />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e ListagemExercicio.
    );
}

export default ExercicioListagem;
