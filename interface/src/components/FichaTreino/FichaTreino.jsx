import './FichaTreino.css';

function conteudoDaHome() {
    // const [nomeAluno, setNomeAluno] = useState('');
    // const [nomeProfessor, setNomeProfessor] = useState('');
    // const [exercicios, setExercicios] = useState([
    //     { id: 1, carga: '', repeticoes: '', series: '' },
    //     { id: 2, carga: '', repeticoes: '', series: '' },
    //     { id: 3, carga: '', repeticoes: '', series: '' }
    // ]);
    return (
        <>
            <div className='nomeAluno'>
                <h4>Nome do Aluno:</h4>
                <h3>****</h3>
            </div>

            <div className='nomeProfessor'>
                <h4>Nome do Professor:</h4>
                <h3>****</h3>
            </div>

            <div className='exercicios'>
                <h4>`Exercício ${ }:`</h4>
                <h3>****</h3>
                <h4>Carga:</h4>
                <h3>****</h3>
                <h4>Repetições</h4>
                <h3>****</h3>
                <h4>Séries</h4>
                <h3>****</h3>
            </div>
        </>
    );
}

// Exporta o componente 'conteudoDaHome' para ser utilizado em outras partes do código
export default conteudoDaHome;
