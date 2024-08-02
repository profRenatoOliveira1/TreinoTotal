import './Professor.css';
import CadastroProfessor from '../../components/Cadastro/CadastroProfessor';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página cadastro professor
 * @returns web page
 */
function cadastro() {
    // Define um componente funcional chamado cadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <CadastroProfessor /> {/* Renderiza o componente de cadastro de professores */}
        </>
        // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
    );
}

export default cadastro;
