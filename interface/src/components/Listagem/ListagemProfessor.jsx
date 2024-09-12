import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdSecurityUpdate } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router';

function ListarProfessor() {
    const navegacao = useNavigate();

    const [professores, setProfessor] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;
    const totalPaginas = Math.ceil(professores.length / itensPorPagina);

    useEffect(() => {
        const fetchProfessor = async () => {
            try {
                const professor = await ProfessoresRequests.listarProfessor();
                setProfessor(professor);
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };
        fetchProfessor();
    }, []);

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    };

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const deletar = (professor) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o professor ${professor.nome}?`);

        if (deletar) {
            if (ProfessoresRequests.deletarProfessor(professor.id_professor)) {
                window.location.reload();
                window.alert('Professor removido com sucesso!');
            } else {
                window.alert('Erro ao remover professor!');
            }
        }
    };

    const atualizar = (professor) => {
        navegacao('/atualizar/professor', { state: { objProfessor: professor }, replace: true });
    };

    const exibeFichaProfessor = (professor) => {
        navegacao('/ficha/professor', { state: { professor: professor }, replace: true });
    };

    // Lógica de paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const professoresPaginados = professores.slice(indicePrimeiroItem, indiceUltimoItem);

    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <>
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Professor</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.cntTb} style={{ width: '90%', height: '70vh', margin: 'auto auto' }}>
                <div className={styles.tableHeigth}>
                    <table className={`${styles.table} ${styles.tabela}`} style={{ width: '100%' }}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th>Nome</th>
                                <th>Formação</th>
                                <th>Especialidade</th>
                                <th colSpan={2}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professoresPaginados.map(professor => (
                                <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                    <td onClick={() => exibeFichaProfessor(professor)}>{professor.nome}</td>
                                    <td>{professor.formacao}</td>
                                    <td>{professor.especialidade}</td>
                                    <td>
                                        <FaTrash onClick={() => deletar(professor)} style={{ color: '#DB0135' }} />
                                    </td>
                                    <td>
                                        <MdEdit onClick={() => atualizar(professor)} style={{ color: '#EAEEE7' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.paginacao}>
                    <button
                        onClick={() => mudarPagina(paginaAtual - 1)}
                        disabled={paginaAtual === 1}
                    >
                        <MdOutlineArrowBackIos />
                    </button>

                    <span>Página {paginaAtual} de {totalPaginas}</span>

                    <button
                        onClick={() => mudarPagina(paginaAtual + 1)}
                        disabled={indiceUltimoItem >= professores.length}
                    >
                        <MdOutlineArrowForwardIos />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ListarProfessor;
