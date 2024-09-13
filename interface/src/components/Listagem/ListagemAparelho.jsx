import { ROUTES } from '../../appconfig';
import styles from '../styles/StyleListagem.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AparelhoRequests from '../../fetch/AparelhosRequests';
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

function ListarAparelho() {
    const navegacao = useNavigate();
    const [aparelhos, setAparelho] = useState([]);
    const [filtroAparelho, setFiltroAparelho] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    useEffect(() => {
        const fetchAparelho = async () => {
            try {
                const aparelhos = await AparelhoRequests.listarAparelho();
                setAparelho(aparelhos);
            } catch (error) {
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };
        fetchAparelho();
    }, []);

    const deletar = (aparelho) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o aparelho ${aparelho.nome_aparelho}`);

        if (deletar) {
            if (AparelhoRequests.deletarAparelho(aparelho.id_aparelho)) {
                window.location.reload();
                window.alert('Aparelho removido com sucesso!');
            } else {
                window.alert('Erro ao remover o aparelho!');
            }
        }
    };

    const atualizar = (aparelho) => {
        navegacao(ROUTES.ATUALIZAR_APARELHO, { state: { objAparelho: aparelho }, replace: true });
    };

    // Função para filtrar os aparelhos pelo nome
    const aparelhosFiltrados = aparelhos.filter((aparelho) =>
        aparelho.nome_aparelho.toLowerCase().includes(filtroAparelho.toLowerCase())
    );

    // Lógica de paginação com base nos aparelhos filtrados
    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const aparelhosPaginados = aparelhosFiltrados.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(aparelhosFiltrados.length / itensPorPagina);

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
                                <h1 className={styles.titulo}>Tabela Aparelhos</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input
                type="text"
                placeholder="Buscar aparelho"
                value={filtroAparelho}
                onChange={(e) => setFiltroAparelho(e.target.value)}
                className={styles.inputBusca}
            />

            <div className={styles.cntTb} style={{ width: '90%', margin: 'auto auto' }}>
                <div className={styles.tableHeigth}>
                    <table className={`${styles.table} ${styles.tabela}`} style={{ width: '80%', margin: 'auto auto' }}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th style={{ width: '20%' }}>Nome</th>
                                <th style={{ width: '10%' }}>Músculo Ativado</th>
                                <th style={{ width: '3%' }} colSpan={2}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aparelhosPaginados.map(aparelho => (
                                <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                    <td>{aparelho.nome_aparelho}</td>
                                    <td>{aparelho.musculo_ativado}</td>
                                    <td>
                                        <FaTrash onClick={() => deletar(aparelho)} style={{ color: '#DB0135' }} />
                                    </td>
                                    <td>
                                        <MdEdit onClick={() => atualizar(aparelho)} style={{ color: '#EAEEE7' }} />
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
                        disabled={indiceUltimoItem >= aparelhosFiltrados.length}
                    >
                        <MdOutlineArrowForwardIos />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ListarAparelho;
