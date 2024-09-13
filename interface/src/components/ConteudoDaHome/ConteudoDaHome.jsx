import './ConteudoDaHome.css';

/**
 * Componente responsável por montar o conteúdo da página home
 * @returns web component
 */
function conteudoDaHome() {
    return (
        <>
            <div className='div-conteudo home'>

                <h1 className='titulo'>Treino Total</h1>
                <br />

                <p className='paragrafo'>Bem-vindo ao Treino Total! Aqui começa sua jornada de transformação. Desafie-se, conquiste seus objetivos e alcance o melhor de você mesmo. Com uma equipe dedicada, oferecemos as ferramentas e o apoio para você atingir o sucesso em seu bem-estar total. Junte-se a nós e descubra seu potencial.</p>
            </div>
        </>
    );
}

export default conteudoDaHome;
