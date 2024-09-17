import { ROUTES } from '../../appconfig';
import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdSecurityUpdate } from "react-icons/md";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router';

function ListarProfessor() {
    const navegacao = useNavigate();

    const [professores, setProfessor] = useState([]);
    const [filtroNome, setFiltroNome] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

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

    const deletar = (professor) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o professor ${professor.nome}?`);

        if (deletar) {
            if (ProfessoresRequests.deletarProfessor(professor.idProfessor)) {
                window.location.reload();
                window.alert('Professor removido com sucesso!');
            } else {
                window.alert('Erro ao remover professor!');
            }
        }
    };

    const atualizar = (professor) => {
        navegacao(ROUTES.ATUALIZAR_PROFESSOR, { state: { objProfessor: professor }, replace: true });
    };

    const exibeFichaProfessor = (professor) => {
        navegacao(ROUTES.FICHA_PROFESSOR, { state: { professor: professor }, replace: true });
    };

    const professoresFiltrados = professores.filter((professor) =>
        professor.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const professoresPaginados = professoresFiltrados.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(professoresFiltrados.length / itensPorPagina);

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
                                <input
                                    type="text"
                                    placeholder="Buscar professor por nome"
                                    value={filtroNome}
                                    onChange={(e) => setFiltroNome(e.target.value)}
                                    className={styles.inputBusca}
                                />
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
                                <tr key={professor.idProfessor} className={styles.tabelaCorpo}>
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
                        disabled={indiceUltimoItem >= professoresFiltrados.length}
                    >
                        <MdOutlineArrowForwardIos />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ListarProfessor;
