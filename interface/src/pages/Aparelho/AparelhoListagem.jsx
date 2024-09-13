import React from 'react';
import ListarAparelho from '../../components/Listagem/ListagemAparelho';
import Navegacao from '../../components/Navegacao/Navegacao';

/**
 * Página de listagem de aparelho
 * @returns web page
 */
function AparelhoListagem() {
    return (
        <div>
            <Navegacao />
            <ListarAparelho />
        </div>
    );
}

export default AparelhoListagem;
