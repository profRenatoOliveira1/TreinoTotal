import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfessoresRequests from '../../../fetch/ProfessoresRequests';

function ProfessorModal({ show, handleClose, onSelectProfessor }) {
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const aluno = await ProfessoresRequests.listarProfessor();
                setProfessores(aluno);
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
                    <ul style={{ listStyleType: 'none' }}>
                        {professores.map((professor) => (
                            <li key={professor.id_aluno}>
                                {professor.nome}
                                <Button
                                    variant="link"
                                    onClick={() => onSelectProfessor(professor)}
                                >
                                    Selecionar
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Carregando alunos...</p>
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
