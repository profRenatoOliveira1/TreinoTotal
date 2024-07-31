import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import React, { useState, useEffect } from 'react';
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa as requisições para buscar aparelhos
import { FaTrash } from "react-icons/fa"; // Importa o ícone de lixeira da biblioteca react-icons
import { MdEdit } from "react-icons/md";

function ListarAparelho() {
    // Define o estado inicial para armazenar os aparelhos
    const [aparelhos, setAparelho] = useState([]);

    // useEffect para carregar os aparelhos quando o componente é montado
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

    // Função para deletar um aparelho (ainda não implementada)
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
    
    const atualizar = (aparelho) => {
        window.alert('Atualizar');
    }

    // Renderização do componente
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
