import React, { useState, useEffect } from 'react';
import TreinoRequests from '../../fetch/TreinoRequests';
import AlunoRequests from '../../fetch/AlunoRequests'; // Certifique-se de que esta importação esteja correta
import ProfessoresRequests from '../../fetch/ProfessoresRequests'; // Certifique-se de que esta importação esteja correta
import styles from '../styles/FichaTreino.module.css';

function FichaTreino() {
    const [searchType, setSearchType] = useState('id'); // Pode ser 'id' ou 'nome'
    const [searchValue, setSearchValue] = useState('');
    const [exercicios, setExercicios] = useState([]);
    const [aluno, setAluno] = useState({ nome: 'Nome não encontrado' });
    const [professor, setProfessor] = useState({ nome: 'Nome não encontrado' });

    // useEffect para carregar os alunos quando o componente é montado
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const alunos = await AlunoRequests.listarAlunos();
                console.log('Alunos recebidos: ', alunos);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };

        fetchAlunos();
    }, []);

    // useEffect para carregar os professores quando o componente é montado
    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const professores = await ProfessoresRequests.listarProfessores();
                console.log('Professores recebidos: ', professores);
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };

        fetchProfessores();
    }, []);

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSearchValue(''); // Limpa o valor do input ao mudar o tipo de busca
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = async () => {
        console.log('Tipo de busca:', searchType); // Log para verificar o tipo de busca
        console.log('Valor da busca:', searchValue); // Log para verificar o valor da busca

        try {
            const data = await TreinoRequests.listarTreino(searchType, searchValue);
            console.log('Dados recebidos: ', data); // Log dos dados recebidos

            if (data) {
                setAluno({ nome: data.nomeAluno || 'Nome não encontrado' });
                setProfessor({ nome: data.nomeProfessor || 'Nome não encontrado' });
                setExercicios(data.exercicios || []);
            } else {
                console.error('Dados retornados estão vazios ou inválidos.');
                setAluno({ nome: 'Nome não encontrado' });
                setProfessor({ nome: 'Nome não encontrado' });
                setExercicios([]);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do treino:', error);
            setAluno({ nome: 'Erro ao buscar dados' });
            setProfessor({ nome: 'Erro ao buscar dados' });
            setExercicios([]);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <label htmlFor="searchType">Buscar por:</label>
                <select id="searchType" value={searchType} onChange={handleSearchTypeChange}>
                    <option value="id">ID do Aluno</option>
                    <option value="nome">Nome do Aluno</option>
                </select>

                <input
                    type={searchType === 'id' ? 'number' : 'text'}
                    value={searchValue}
                    onChange={handleSearchValueChange}
                />

                <button onClick={handleSearch}>Pesquisar</button>
            </div>

            <div className={styles.nomeAluno}>
                <h4>Nome do Aluno:</h4>
                <h3>{aluno.nome}</h3>
            </div>

            <div className={styles.nomeProfessor}>
                <h4>Nome do Professor:</h4>
                <h3>{professor.nome}</h3>
            </div>

            <div className={styles.exerciciosSection}>
                {exercicios.map((exercicio, index) => (
                    <div key={exercicio.id} className={styles.exercicio}>
                        <div className={styles.divs}>
                            <h4>Exercício {index + 1}:</h4>
                            <h3>{exercicio.exercicio}</h3>
                        </div>
                        <div className={styles.divs}>
                            <h4>Carga:</h4>
                            <h3>{exercicio.carga} Kg</h3>
                        </div>
                        <div className={styles.divs}>
                            <h4>Repetições:</h4>
                            <h3>{exercicio.repeticoes}</h3>
                        </div>
                        <div className={styles.divs}>
                            <h4>Séries:</h4>
                            <h3>{exercicio.series}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FichaTreino;
