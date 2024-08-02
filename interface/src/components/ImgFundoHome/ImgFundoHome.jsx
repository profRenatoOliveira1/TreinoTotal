import './ImgFundoHome.css'
import imgFundo from '../../assets/imgFundo.png'

/**
 * Componente responsável por montar o conteúdo da página home
 * @returns web component
 */
function ImgFundoHome() {

  return (
    <>
      {/* Div para a imagem de fundo */}
      <div className='div-img'>

        <img className="imgFundo" src={imgFundo} alt="ERRO" />
      </div>
    </>
  );
}
// Exporta a função ImgFundoHome para que possa ser utilizada em outras partes do código
export default ImgFundoHome;