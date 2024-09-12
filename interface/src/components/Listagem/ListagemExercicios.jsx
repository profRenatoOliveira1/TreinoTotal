import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/StyleListagem.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests';
import AparelhosRequests from '../../fetch/AparelhosRequests';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";

function ListagemExercicios() {
    const navegacao = useNavigate();
    const [exercicios, setExercicios] = useState([]);
    const [aparelhos, setAparelho] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;
    const totalPaginas = Math.ceil(exercicios.length / itensPorPagina);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const exercicios = await ExerciciosRequests.listarExercicio();
                const aparelhos = await AparelhosRequests.listarAparelho();

                const aparelhosMap = aparelhos.reduce((map, aparelho) => {
                    map[aparelho.id_aparelho] = aparelho;
                    return map;
                }, {});

                const exerciciosComAparelhos = exercicios.map(exercicio => ({
                    ...exercicio,
                    nome_aparelho: aparelhosMap[exercicio.id_aparelho]?.nome_aparelho || 'N/A'
                }));

                setExercicios(exerciciosComAparelhos);
            } catch (error) {
                console.error('Erro ao buscar dados: ', error);
            }
        };

        fetchDados();
    }, []);

    const deletar = (exercicio) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o exercício ${exercicio.exercicio}?`);

        if (deletar) {
            if (ExerciciosRequests.deletarExercicio(exercicio.id_exercicio)) {
                window.location.reload();
                window.alert('Exercicio removido com sucesso');
            } else {
                window.alert('Erro ao remover exercicio');
            }
        }
    };

    const atualizar = (exercicio) => {
        navegacao('/atualizar/exercicio', { state: { objExercicio: exercicio }, replace: true });
    };

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const exerciciosPaginados = exercicios.slice(indicePrimeiroItem, indiceUltimoItem);

    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <>
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>

            <div className={styles.cntTb} style={{ width: '90%', height: '70vh', margin: 'auto auto' }}>
                {exercicios.length > 0 ? (
                    <>
                        <div className={styles.tableHeigth}>
                            <table className={`${styles.table} ${styles.tabela}`} style={{ margin: 'auto auto' }}>
                                <thead>
                                    <tr className={styles.tabelaHeader}>
                                        <th style={{ width: '20%' }}>Nome do Exercício</th>
                                        <th style={{ width: '10%' }}>Aparelho</th>
                                        <th colSpan={2} style={{ width: '5%' }}>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciciosPaginados.map(exercicio => (
                                        <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                            <td>{exercicio.exercicio}</td>
                                            <td>{exercicio.nome_aparelho}</td>
                                            <td>
                                                <FaTrash onClick={() => deletar(exercicio)} style={{ color: '#DB0135' }} />
                                            </td>
                                            <td>
                                                <MdEdit onClick={() => atualizar(exercicio)} style={{ color: '#EAEEE7' }} />
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
                                disabled={indiceUltimoItem >= exercicios.length}
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default ListagemExercicios;
