import './Professor.css';
import CadastroProfessor from '../../components/Cadastro/CadastroProfessor';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página cadastro professor
 * @returns web page
 */
function cadastro() {
    return (
        <>
            <Navegacao />
            <CadastroProfessor /> 
        </>
    );
}

export default cadastro;
