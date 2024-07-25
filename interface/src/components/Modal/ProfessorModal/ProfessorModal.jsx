import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfessoresRequests from '../../../fetch/ProfessoresRequests';

function ProfessorModal({ show, handleClose, onSelectProfessor }) {
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const professor = await ProfessoresRequests.listarProfessor();
                setProfessores(professor);
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };

        if (show) {
            fetchProfessores();
        }
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lista de professores</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {professores.length > 0 ? (
                    <table className="table table-striped">
                        <tbody>
                            {professores.map((professor) => (
                                <tr key={professor.id_professor}>
                                    <td hidden>{professor.id_professor}</td>
                                    <td>{professor.nome}</td>
                                    <td>
                                        <Button
                                            variant="link"
                                            onClick={() => onSelectProfessor(professor)}
                                        >
                                            Selecionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando professores...</p>
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

export default ProfessorModal;
