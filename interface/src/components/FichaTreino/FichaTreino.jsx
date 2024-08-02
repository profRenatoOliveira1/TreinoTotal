import React, { useEffect, useState } from 'react';
import TreinoRequests from '../../fetch/TreinoRequests';
import styles from '../styles/FichaTreino.module.css';
import AlunoModal from '../Modal/AlunoModal/AlunoModal';

function FichaTreino() {
    const [searchType, setSearchType] = useState('matricula');
    const [searchValue, setSearchValue] = useState('');
    const [exercicios, setExercicios] = useState([]);
    const [aluno, setAluno] = useState('');
    const [professor, setProfessor] = useState('');

    const [showAlunoModal, setShowAlunoModal] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState(null);

    const handleShowAlunoModal = () => setShowAlunoModal(true);
    const handleCloseAlunoModal = () => setShowAlunoModal(false);

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSelectAluno = (aluno) => {
        setSelectedAluno(aluno);
        setSearchValue(aluno.matricula);
        handleCloseAlunoModal();
    };

    useEffect(() => {
        if (selectedAluno) {
            handleSearch();
        }
    }, [selectedAluno]);

    const handleSearch = async () => {
        if (searchValue === '') {
            handleShowAlunoModal();
        } else {
            try {
                const response = await TreinoRequests.listarTreino(searchType, searchValue);
                setAluno(response.nome_aluno);
                setProfessor(response.nome_professor);
                setExercicios(response.exercicios);
                setSearchValue('');
            } catch (error) {
                alert('Treino não cadastrado para o aluno informado');
                console.log(`Erro na busca: ${error}`);
                setSearchValue('');
                setAluno('');
                setProfessor('');
                setExercicios([]);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection} style={{ display: 'flex', justifyContent: 'center' }}>
                <label htmlFor="searchType">Matricula aluno:</label>

                <input
                    type={searchType === 'matricula' ? 'number' : 'text'}
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    style={{ width: '50%' }}
                />

                <button onClick={handleSearch} style={{ width: '20%' }}>Pesquisar</button>
                <AlunoModal
                    show={showAlunoModal}
                    handleClose={handleCloseAlunoModal}
                    onSelectAluno={handleSelectAluno}
                />
            </div>

            <div className={styles.nomeAluno}>
                <h4>Nome do Aluno:</h4>
                <h3>{aluno}</h3>
            </div>

            <div className={styles.nomeProfessor}>
                <h4>Nome do Professor:</h4>
                <h3>{professor}</h3>
            </div>

            <div className={styles.exerciciosSection}>
                {exercicios.map((exercicio) => (
                                <div key={exercicio.id}  className={styles.exercicio}>
                                <table className={styles.tabelaListTreino}>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: 'left' }}>Exercício: {exercicio.exercicio}</td>
                                    </tr>
                                    <tr>
                                        <td width={'30%'}>Repetições: {exercicio.repeticoes}</td>
                                        <td width={'30%'} style={{ textAlign: 'center' }}>Carga (kg): {exercicio.carga}</td>
                                        <td width={'30%'} style={{ textAlign: 'right' }}>Séries: {exercicio.series}</td>
                                    </tr>
                                </table>
                            </div>
                ))}
            </div>
        </div>
    );
}

export default FichaTreino;
