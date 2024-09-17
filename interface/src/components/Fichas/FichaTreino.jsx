import React, { useEffect, useState } from 'react';
import TreinoRequests from '../../fetch/TreinoRequests';
import styles from '../styles/FichaTreino.module.css';
import AlunoModal from '../Modal/AlunoModal/AlunoModal';

/**
 * Componente responsável por exibir a lista de treino
 * @returns web component
 */
function FichaTreino() {
    /**
     * Define o estado dos inputs e valores da ficha de treino
     */
    const [searchType, setSearchType] = useState('matricula');
    const [searchValue, setSearchValue] = useState('');
    const [exercicios, setExercicios] = useState([]);
    const [aluno, setAluno] = useState('');
    const [professor, setProfessor] = useState('');

    /**
     * Controla o estado do modal aluno
     */
    const [showAlunoModal, setShowAlunoModal] = useState(false);

    /**
     * Controla o aluno selecionado
     */
    const [selectedAluno, setSelectedAluno] = useState(null);

    /**
     * Atualiza o estado do modal Aluno
     * @returns **true** habilita o modal, **false** desabilita o modal
     */
    const handleShowAlunoModal = () => setShowAlunoModal(true);
    const handleCloseAlunoModal = () => setShowAlunoModal(false);

    /**
     * Lida com a atualização do campo de pesquisa
     * @param {*} event evento gerado
     */
    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    /**
     * Lida com a atualização do campo aluno
     * @param {*} event evento gerado
     */
    const handleSelectAluno = (aluno) => {
        setSelectedAluno(aluno);
        setSearchValue(aluno.matricula);
        handleCloseAlunoModal();
    };

    /**
     * Atualiza o estado do aluno caso a pesquisa esteja vazia
     */
    useEffect(() => {
        if (selectedAluno) {
            handleSearch();
        }
    }, [selectedAluno]);

    /**
     * Lida com a busca dos valores da ficha de treino
     */
    const handleSearch = async () => {
        if (searchValue === '') {
            handleShowAlunoModal();
        } else {
            try {
                const response = await TreinoRequests.listarTreino(searchType, searchValue);
                setAluno(response.nomeAluno);
                setProfessor(response.nomeProfessor);
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
                <label htmlFor="searchType" className={styles.labelMatricula}>Matricula aluno:</label>

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
                    <div key={exercicio.id} className={styles.exercicio}>
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
