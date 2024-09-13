import './Professor.css';
import Navegacao from '../../components/Navegacao/Navegacao';
import ListarProfessor from '../../components/Listagem/ListagemProfessor';

/**
 * Página listagem de professores
 * @returns web page
 */
function cadastro() {
    return (
        <> 
            <Navegacao /> 
            <ListarProfessor />
        </>
    );
}

export default cadastro;
