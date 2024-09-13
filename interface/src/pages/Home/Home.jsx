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
  return (
    <>
      <Navegacao></Navegacao>

      <div className='div-mae'>
        <ImgFundoHome></ImgFundoHome>

        <ConteudoDaHome></ConteudoDaHome>
      </div>
    </>
  );
}

export default Home;
