import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa";
import AlunoModal from '../../Modal/AlunoModal/AlunoModal';
import ProfessorModal from '../../Modal/ProfessorModal/ProfessorModal';
import ExercicioModal from '../../Modal/ExercicioModal/ExercicioModal';
import TreinoRequests from '../../../fetch/TreinoRequests';
import styles from '../../styles/CadastroTreino.module.css';


function CadastroTreino() {
    const [showAlunoModal, setShowAlunoModal] = useState(false);
    const [showProfessorModal, setShowProfessorModal] = useState(false);
    const [showExercicioModal, setShowExercicioModal] = useState(false);

    const [selectedAluno, setSelectedAluno] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedExercicios, setSelectedExercicios] = useState([]);

    const handleShowAlunoModal = () => setShowAlunoModal(true);
    const handleCloseAlunoModal = () => setShowAlunoModal(false);

    const handleShowProfessorModal = () => setShowProfessorModal(true);
    const handleCloseProfessorModal = () => setShowProfessorModal(false);

    const handleShowExercicioModal = () => setShowExercicioModal(true);
    const handleCloseExercicioModal = () => setShowExercicioModal(false);

    const handleSelectAluno = (aluno) => {
        setSelectedAluno(aluno);
        handleCloseAlunoModal();
    };

    const handleSelectProfessor = (professor) => {
        setSelectedProfessor(professor);
        handleCloseProfessorModal();
    };

    const handleSelectExercicio = (exercicio) => {
        setSelectedExercicios([...selectedExercicios, {
            id: exercicio.id_exercicio,
            nome: exercicio.exercicio,
            repeticoes: '',
            carga: '',
            series: ''
        }]);
        handleCloseExercicioModal();
    };

    const handleInputChange = (index, field, value) => {
        const newSelectedExercicios = [...selectedExercicios];
        newSelectedExercicios[index][field] = value;
        setSelectedExercicios(newSelectedExercicios);
    };

    const handleRemoveExercicio = (index) => {
        const newSelectedExercicios = selectedExercicios.filter((_, i) => i !== index);
        setSelectedExercicios(newSelectedExercicios);
    };

    const cadastrar = async () => {
        const treino = {
            id_aluno: selectedAluno.id_aluno,
            id_professor: selectedProfessor.id_professor,
            exercicios: selectedExercicios
        };

        console.log(treino);

        try {
            const result = await TreinoRequests.cadastrarTreino(treino);
            if (result) {
                alert('Treino cadastrado com sucesso!');
            }
        } catch (error) {
            alert('Erro ao cadastrar treino!');
        }
    };

    return (
        <div className={styles.cadastroTreino}>
            <div className={styles.header}>
                <h1 className={styles.h1}>Cadastro Treino</h1>
            </div>

            <div className={styles.selections}>
                <div className={styles.selectionBox}>
                    <Button variant="outline-light" onClick={handleShowAlunoModal} className={styles.botaoSelecao}>
                        Escolher Aluno
                    </Button>
                    <div className={styles.selected}>{selectedAluno?.nome}</div>
                </div>

                <div className={styles.selectionBox}>
                    <Button variant="outline-light" onClick={handleShowProfessorModal} className={styles.botaoSelecao}>
                        Escolher Professor
                    </Button>
                    <div className={styles.selected}>{selectedProfessor?.nome}</div>
                </div>

                <div className={styles.selectionBox}>
                    <Button variant="outline-light" onClick={handleShowExercicioModal} className={styles.botaoSelecao}>
                        Escolher Exercício
                    </Button>
                </div>
            </div>

            {selectedExercicios.length > 0 && (
                <Table  className={styles.table}>
                    <thead>
                        <tr>
                            <th>Exercício</th>
                            <th style={{ width: '10%'}}>Repetições</th>
                            <th style={{ width: '10%'}}>Carga</th>
                            <th style={{ width: '10%'}}>Séries</th>
                            <th style={{ width: '10%'}}>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedExercicios.map((exercicio, index) => (
                            <tr key={index}>
                                <td>{exercicio.nome}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.repeticoes}
                                        onChange={(e) => handleInputChange(index, 'repeticoes', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.carga}
                                        onChange={(e) => handleInputChange(index, 'carga', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.series}
                                        onChange={(e) => handleInputChange(index, 'series', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveExercicio(index)} className={styles.removeButton}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Button variant="primary" onClick={cadastrar} className={styles.cadastrarButton}>Cadastrar</Button>

            <AlunoModal
                show={showAlunoModal}
                handleClose={handleCloseAlunoModal}
                onSelectAluno={handleSelectAluno}
            />

            <ProfessorModal 
                show={showProfessorModal}
                handleClose={handleCloseProfessorModal}
                onSelectProfessor={handleSelectProfessor}
            />

            <ExercicioModal 
                show={showExercicioModal}
                handleClose={handleCloseExercicioModal}
                onSelectExercicio={handleSelectExercicio}
            />
        </div>
    );
}

export default CadastroTreino;
