import styles from '../styles/StyleListagem.module.css'; 
import React, { useState, useEffect } from 'react';
import AparelhoRequests from '../../fetch/AparelhosRequests'; 
import { FaTrash } from "react-icons/fa"; 
import { MdEdit } from "react-icons/md";

/**
 * Componente responsável por listar os aparelhos
 * @returns web component
 */
function ListarAparelho() {
    /**
     * Define o estado inicial para armazenar os alunos
     */
    const [aparelhos, setAparelho] = useState([]);

    /**
     * Busca lista de aparelhos no servidor
     */
    useEffect(() => {
        // Função assíncrona para buscar os aparelhos da API
        const fetchAparelho = async () => {
            try {
                // Realiza a requisição para buscar os aparelhos
                const aparelhos = await AparelhoRequests.listarAparelho();
                // Atualiza o estado com os aparelhos obtidos da API
                setAparelho(aparelhos);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };

        // Chama a função para buscar os aparelhos
        fetchAparelho();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    /**
     * Lida com a remoção de um aparelho
     * @param {*} aparelho 
     */
    const deletar = (aparelho) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o aparelho ${aparelho.nome_aparelho}`)
    
        if(deletar) {
            if(AparelhoRequests.deletarAparelho(aparelho.id_aparelho)) {
                window.location.reload();
                window.alert('Aparelho removido com sucesso!');
            } else {
                window.alert('Erro ao remover o aparelho!');
            }
        }
    };
    
    /**
     * Lida com a atualização do aparelho
     * @param {*} aparelho 
     */
    const atualizar = (aparelho) => {
        window.alert('Atualizar');
    }

    return (
        <>
            {/* Cabeçalho da seção */}
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
            
            {/* Tabela para listar os aparelhos */}
            <div className={styles.cntTb} style={{ width: '90%', margin: 'auto auto'}}>
                <table className={`${styles.table} ${styles.tabela}`} style={{ width: '80%', margin: 'auto auto'}}>
                    <thead>
                        <tr className={styles.tabelaHeader}>
                            <th style={{ width: '20%'}}>Nome</th>
                            <th style={{ width: '10%'}}>Músculo Ativado</th>
                            <th style={{ width: '3%'}} colSpan={2}>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeia os aparelhos e renderiza cada um como uma linha na tabela */}
                        {aparelhos.map(aparelho => (
                            <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                <td>{aparelho.nome_aparelho}</td>
                                <td>{aparelho.musculo_ativado}</td>
                                <td>
                                    <FaTrash onClick={() => deletar(aparelho)} style={{ color: '#DB0135' }} />
                                </td> {/* Botão para deletar um aparelho */}
                                <td>
                                    <MdEdit onClick={() => atualizar(aparelho)} style={{ color: '#EAEEE7' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarAparelho;
