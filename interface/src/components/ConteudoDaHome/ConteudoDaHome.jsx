import './ConteudoDaHome.css';

/**
 * Componente responsável por montar o conteúdo da página home
 * @returns web component
 */
function conteudoDaHome() {
    return (
        <>
            {/* Div que envolve o conteúdo da página inicial */}
            <div className='div-conteudo home'>

                {/* Título da página */}
                <h1 className='titulo'>Treino Total</h1>
                <br />

                {/* Parágrafo com informações sobre o Treino Total */}
                <p className='paragrafo'>Bem-vindo ao Treino Total! Aqui começa sua jornada de transformação. Desafie-se, conquiste seus objetivos e alcance o melhor de você mesmo. Com uma equipe dedicada, oferecemos as ferramentas e o apoio para você atingir o sucesso em seu bem-estar total. Junte-se a nós e descubra seu potencial.</p>
            </div>
        </>
    );
}

// Exporta o componente 'conteudoDaHome' para ser utilizado em outras partes do código
export default conteudoDaHome;
