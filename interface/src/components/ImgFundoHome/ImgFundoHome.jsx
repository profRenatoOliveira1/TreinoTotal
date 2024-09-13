import './ImgFundoHome.css'
import imgFundo from '../../assets/imgFundo.png'

/**
 * Componente responsável por montar o conteúdo da página home
 * @returns web component
 */
function ImgFundoHome() {

  return (
    <>
      <div className='div-img'>

        <img className="imgFundo" src={imgFundo} alt="ERRO" />
      </div>
    </>
  );
}

export default ImgFundoHome;