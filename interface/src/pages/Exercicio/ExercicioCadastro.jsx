import React from 'react';
import CadastroExercicio from '../../components/Cadastro/CadastroExercicio';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de cadastro de exercício
 * @returns web page
 */
function ExercicioCadastro() {
    return (
        <div>
            <Navegacao />
            <CadastroExercicio />
        </div>
    );
}

export default ExercicioCadastro;
