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
                    <table className="table table-striped">
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.id_aluno}>
                                    <td hidden>{aluno.id_aluno}</td>
                                    <td>{aluno.nome}</td>
                                    <td>
                                        <Button
                                            variant="link"
                                            onClick={() => onSelectAluno(aluno)}
                                        >
                                            Selecionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
