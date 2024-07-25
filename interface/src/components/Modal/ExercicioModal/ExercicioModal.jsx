import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExercicioRequests from '../../../fetch/ExerciciosRequests';

function ExercicioModal({ show, handleClose, onSelectProfessor }) {
    const [exercicios, setExercicios] = useState([]);

    useEffect(() => {
        const fetchExercicios = async () => {
            try {
                const exercicios = await ExercicioRequests.listarExercicio();
                setExercicios(exercicios);
            } catch (error) {
                console.error('Erro ao buscar exercicios: ', error);
            }
        };

        if (show) {
            fetchExercicios();
        }
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lista de Exercícios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {exercicios.length > 0 ? (
                    <ul style={{ listStyleType: 'none' }}>
                        {exercicios.map((exercicio) => (
                            <li key={exercicio.id_aluno}>
                                {exercicio.exercicio}
                                <Button
                                    variant="link"
                                    onClick={() => onSelectProfessor(exercicio)}
                                >
                                    Selecionar
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Carregando exercicios...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ExercicioModal;
