import React from 'react';
import ListarAparelho from '../../components/Listagem/ListagemAparelho';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de listagem de aparelho
 * @returns web page
 */
function AparelhoListagem() {
    // Define um componente funcional chamado AparelhoListagem.
    return (
        <div>
            <Navegacao />
            <ListarAparelho />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e ListarAparelho.
    );
}

export default AparelhoListagem;
