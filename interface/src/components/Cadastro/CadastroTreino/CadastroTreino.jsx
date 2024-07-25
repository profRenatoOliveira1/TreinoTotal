import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa";
import AlunoModal from '../../Modal/AlunoModal/AlunoModal';
import ProfessorModal from '../../Modal/ProfessorModal/ProfessorModal';
import ExercicioModal from '../../Modal/ExercicioModal/ExercicioModal';
import TreinoRequests from '../../../fetch/TreinoRequests';

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
        <>
            <div className='select-aluno'>
                <p hidden>{selectedAluno?.id_aluno}</p>
                <p>{selectedAluno?.nome}</p>
                <Button variant="primary" onClick={handleShowAlunoModal}>
                    Selecionar Aluno
                </Button>
            </div>

            <div className='select-professor'>
                <p hidden>{selectedProfessor?.id_professor}</p>
                <p>{selectedProfessor?.nome}</p>
                <Button variant="primary" onClick={handleShowProfessorModal}>
                    Selecionar Professor
                </Button>
            </div>

            <div className='select-exercicio'>
                <Button variant="primary" onClick={handleShowExercicioModal}>
                    Selecionar Exercício
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th hidden>ID</th>
                        <th>Exercício</th>
                        <th>Repetições</th>
                        <th>Carga</th>
                        <th>Séries</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedExercicios.map((exercicio, index) => (
                        <tr key={index}>
                            <td hidden>{exercicio.id}</td>
                            <td>{exercicio.nome}</td>
                            <td>
                                <input
                                    type="number"
                                    value={exercicio.repeticoes}
                                    onChange={(e) => handleInputChange(index, 'repeticoes', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={exercicio.carga}
                                    onChange={(e) => handleInputChange(index, 'carga', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={exercicio.series}
                                    onChange={(e) => handleInputChange(index, 'series', e.target.value)}
                                />
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveExercicio(index)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="primary" onClick={cadastrar}>Cadastrar</Button>

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
        </>
    );
}

export default CadastroTreino;
