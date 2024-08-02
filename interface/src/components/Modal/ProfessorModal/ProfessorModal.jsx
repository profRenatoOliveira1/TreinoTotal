import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfessoresRequests from '../../../fetch/ProfessoresRequests';

/**
 * Componente responsável por montar o modal do aluno
 * @returns web component
 */
function ProfessorModal({ show, handleClose, onSelectProfessor }) {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [professores, setProfessores] = useState([]);

    /**
     * Busca lista de professores no servidor
     */
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
            <Modal.Header closeButton style={{backgroundColor: '#343A40', color: '#FFFFFF'}}>
                <Modal.Title>Lista de professores</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#343A40', color: '#FFFFFF'}}>
                {professores.length > 0 ? (
                    <table className="table table-striped">
                        <tbody>
                            {professores.map((professor) => (
                                <tr key={professor.id_professor}>
                                    <td hidden>{professor.id_professor}</td>
                                    <td>{professor.nome}</td>
                                    <td>
                                        <Button
                                            style={{backgroundColor: '#ffeba7', color: 'black'}}
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
            <Modal.Footer style={{backgroundColor: '#343A40', color: '#FFFFFF'}}>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProfessorModal;
