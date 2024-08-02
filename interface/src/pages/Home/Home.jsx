import './Home.css';
import React from 'react';
import Navegacao from '../../components/Navegacao/Navegacao';
import ImgFundoHome from '../../components/ImgFundoHome/ImgFundoHome';
import ConteudoDaHome from '../../components/ConteudoDaHome/ConteudoDaHome';

/**
 * Página home
 * @returns web page
 */
function Home() {
  // Define um componente funcional chamado Home.
  return (
    <>
      {/* Renderiza o componente de navegação */}
      <Navegacao></Navegacao>

      {/* Div principal contendo o conteúdo da página */}
      <div className='div-mae'>
        <ImgFundoHome></ImgFundoHome>
        {/* Renderiza o componente ImgFundoHome, exibindo a imagem de fundo da página inicial. */}

        <ConteudoDaHome></ConteudoDaHome>
        {/* Renderiza o componente ConteudoDaHome, exibindo o conteúdo principal da página inicial. */}
      </div>
    </>
    // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
  );
}

export default Home;
