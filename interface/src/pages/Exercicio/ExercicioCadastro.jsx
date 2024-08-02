import React from 'react';
import CadastroExercicio from '../../components/Cadastro/CadastroExercicio';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de cadastro de exercício
 * @returns web page
 */
function ExercicioCadastro() {
    // Define um componente funcional chamado ExercicioCadastro.
    return (
        <div>
            <Navegacao />
            <CadastroExercicio />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e CadastroExercicio.
    );
}

export default ExercicioCadastro;
