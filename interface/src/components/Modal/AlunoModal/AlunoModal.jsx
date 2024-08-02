import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AlunoRequests from '../../../fetch/AlunoRequests';

/**
 * Componente responsável por montar o modal do aluno
 * @returns web component
 */
function AlunoModal({ show, handleClose, onSelectAluno }) {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [alunos, setAlunos] = useState([]);

    /**
     * Busca lista de alunos no servidor
     */
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
            <Modal.Header closeButton style={{backgroundColor: '#343A40', color: '#FFFFFF'}}>
                <Modal.Title>Lista de alunos</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#343A40', color: '#FFFFFF'}}>
                {alunos.length > 0 ? (
                    <table className="table table-striped">
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.id_aluno}>
                                    <td hidden>{aluno.id_aluno}</td>
                                    <td>{aluno.matricula}</td>
                                    <td>{aluno.nome}</td>
                                    <td>
                                        <Button
                                            style={{backgroundColor: '#ffeba7', color: 'black'}}
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
            <Modal.Footer style={{backgroundColor: '#343A40', color: '#FFFFFF'}}>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlunoModal;
