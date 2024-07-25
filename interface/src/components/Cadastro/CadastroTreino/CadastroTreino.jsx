import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AlunoModal from '../../Modal/AlunoModal/AlunoModal';  // Certifique-se de ajustar o caminho de importação conforme necessário
import ProfessorModal from '../../Modal/ProfessorModal/ProfessorModal';
import ExercicioModal from '../../Modal/ExercicioModal/ExercicioModal';

function CadastroTreino() {
    const [showAlunoModal, setShowAlunoModal] = useState(false);
    const [showProfessorModal, setShowProfessorModal] = useState(false);
    const [showExercicioModal, setShowExercicioModal] = useState(false);

    const [selectedAluno, setSelectedAluno] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedExercicio, setSelectedExercicio] = useState(null);

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

    const handleSelectExercício = (exercicio) => {
        setSelectedExercicio(exercicio);
        handleCloseExercicioModal();
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
                <p hidden>{selectedExercicio?.id_exercicio}</p>
                <p>{selectedExercicio?.exercicio}</p>
                <Button variant="primary" onClick={handleShowExercicioModal}>
                    Selecionar Exercício
                </Button>
            </div>

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
                onSelectProfessor={handleSelectExercício}
            />
        </>
    );
}

export default CadastroTreino;
