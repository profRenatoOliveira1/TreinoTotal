import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExercicioRequests from '../../../fetch/ExerciciosRequests';

function ExercicioModal({ show, handleClose, onSelectExercicio }) {
    const [exercicios, setExercicios] = useState([]);

    useEffect(() => {
        const fetchExercicios = async () => {
            try {
                const exercicios = await ExercicioRequests.listarExercicio();
                setExercicios(exercicios);
            } catch (error) {
                console.error('Erro ao buscar exercícios: ', error);
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
                    <table className="table table-striped">
                        <thead>
                            <th hidden>ID</th>
                            <th>Exercício</th>
                            <th>Região ativada</th>
                        </thead>
                        <tbody>
                            {exercicios.map((exercicio) => (
                                <tr key={exercicio.id_exercicio}>
                                    <td hidden>{exercicio.id_exercicio}</td>
                                    <td>{exercicio.exercicio}</td>
                                    <td>{exercicio.regiao_corpo_ativada}</td>
                                    <td>
                                        <Button
                                            variant="link"
                                            onClick={() => onSelectExercicio(exercicio)}
                                        >
                                            Selecionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando exercícios...</p>
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
