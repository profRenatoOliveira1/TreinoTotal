import './Professor.css';
import Navegacao from '../../components/Navegacao/Navegacao';
import ListarProfessor from '../../components/Listagem/ListagemProfessor';

/**
 * Página listagem de professores
 * @returns web page
 */
function cadastro() {
    // Define um componente funcional chamado cadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <ListarProfessor /> {/* Renderiza o componente de listagem de professores */}
        </>
        // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
    );
}

export default cadastro;
