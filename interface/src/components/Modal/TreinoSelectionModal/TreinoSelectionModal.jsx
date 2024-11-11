import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

function TreinoSelectionModal({ show, treinos, onSelect, onClose }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Selecione um Treino</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {treinos.map((treino, index) => (
                        <ListGroup.Item 
                            key={treino.id_treino} 
                            action 
                            onClick={() => onSelect(treino)}
                        >
                            {`Treino ${index + 1} - Professor: ${treino.professor.nome_professor}`}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TreinoSelectionModal;
