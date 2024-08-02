import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../styles/StyleListagem.module.css'; 
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; 
import AparelhosRequests from '../../fetch/AparelhosRequests'; 
import { FaTrash } from "react-icons/fa"; 
import { MdEdit } from "react-icons/md";

/**
 * Componente responsável por listar os exercícios
 * @returns web component
 */
function ListagemExercicios() {
    /**
     * Define o estado inicial para armazenar os exercícios
     */
    const [exercicios, setExercicios] = useState([]); 
    /**
     * Define o estado inicial para armazenar os aparelhos
     */
    const [aparelhos, setAparelho] = useState([]);

    /**
     * Busca lista dos aparelhos e exercícios no servidor
     */
    useEffect(() => {
        const fetchDados = async () => {
            try {
                const exercicios = await ExerciciosRequests.listarExercicio(); // Requisição para buscar os exercícios
                const aparelhos = await AparelhosRequests.listarAparelho(); // Requisição para buscar os aparelhos

                // Mapeia aparelhos com os seus respectivos ids
                const aparelhosMap = aparelhos.reduce((map, aparelho) => {
                    map[aparelho.id_aparelho] = aparelho;
                    return map;
                }, {});

                // Adiciona o nome do aparelho ao exercício correspondente
                const exerciciosComAparelhos = exercicios.map(exercicio => ({
                    ...exercicio,
                    nome_aparelho: aparelhosMap[exercicio.id_aparelho]?.nome_aparelho || 'N/A'
                }));

                setExercicios(exerciciosComAparelhos); // Atualiza o estado com os exercícios obtidos
            } catch (error) {
                console.error('Erro ao buscar dados: ', error); // Em caso de erro, exibe no console
            }
        };

        fetchDados(); // Chama a função para buscar os dados ao montar o componente
    }, []);

    /**
     * Lida com a remoção do exercício
     * @param {*} exercicio 
     */
    const deletar = (exercicio) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o exercício ${exercicio.exercicio}?`);
        
        if(deletar) {
            if(ExerciciosRequests.deletarExercicio(exercicio.id_exercicio)) {
                window.location.reload();
                window.alert('Exercicio removido com sucesso');
            } else {
                window.alert('Erro ao remover exercicio');
            }
        }
    };

    /**
     * Lida com a atualização do exercício
     * @param {*} exercicio 
     */
    const atualizar = (exercicio) => {
        window.alert('Atualizar');
    }

    return (
        <>
            {/* Título da tabela de exercícios */}
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>

            {/* Tabela para listar os exercícios */}
            <div className={styles.cntTb} style={{ width: '90%', height: '70vh' , margin: 'auto auto' }}>
                {/* Verifica se há exercícios a serem exibidos */}
                {exercicios.length > 0 ? (
                    <table className={`${styles.table} ${styles.tabela}`} style={{ width: '75%', margin: 'auto auto'}}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th style={{ width: '20%'}}>Nome do Exercício</th>
                                <th style={{ width: '10%'}}>Aparelho</th>
                                <th colSpan={2} style={{ width: '5%'}}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeia os exercícios e renderiza cada um como uma linha na tabela */}
                            {exercicios.map(exercicio => (
                                <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                    <td>{exercicio.exercicio}</td>
                                    <td>{exercicio.nome_aparelho}</td>
                                    <td>
                                        <FaTrash onClick={() => deletar(exercicio)} style={{ color: '#DB0135' }} />
                                    </td> {/* Botão para deletar um exercício */}
                                    <td>
                                        <MdEdit onClick={() => atualizar(exercicio)} style={{ color: '#EAEEE7' }}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default ListagemExercicios;
