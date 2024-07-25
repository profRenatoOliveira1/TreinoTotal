import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AlunoRequests from '../../../fetch/AlunoRequests';

function AlunoModal({ show, handleClose, onSelectAluno }) {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos();
                setAlunos(aluno);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };

        if (show) {
            fetchAlunos();
        }
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lista de alunos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alunos.length > 0 ? (
                    <ul style={{ listStyleType: 'none' }}>
                        {alunos.map((aluno) => (
                            <li key={aluno.id_aluno}>
                                {aluno.nome}
                                <Button
                                    variant="link"
                                    onClick={() => onSelectAluno(aluno)}
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

export default AlunoModal;
