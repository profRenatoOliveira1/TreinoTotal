import React from 'react';
import CadastroTreino from '../../components/Cadastro/CadastroTreino/CadastroTreino';

import Navegacao from '../../components/Navegacao/Navegacao';

function CriarTreino() {
    return (
        <div>
            <Navegacao />
            <CadastroTreino />
        </div>
    );
}

export default CriarTreino;
