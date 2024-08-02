import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

/**
 * Componente responsável por listar os professores
 * @returns web component
 */
function ListarProfessor() {
    /**
     * Define o estado inicial para armazenar os professores
     */
    const [professores, setProfessor] = useState([]);

    /**
     * Busca lista de professores no servidor
     */
    useEffect(() => {
        // Função assíncrona para buscar os professores da API
        const fetchProfessor = async () => {
            try {
                // Realiza a requisição para buscar os professores
                const professor = await ProfessoresRequests.listarProfessor();
                // Atualiza o estado com os professores obtidos da API
                setProfessor(professor);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar professores: ', error);
            }
        };

        // Chama a função para buscar os professores
        fetchProfessor();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    /**
     * Formata datas no padrão brasileiro
     * @param {*} data 
     * @returns data formatada DD/MM/AAAA
     */
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    }

    /**
     * Máscara CPF
     * @param {*} cpf 
     * @returns cpf formatado xxx.xxx.xxx.-xx
     */
    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    /**
     * Máscara telefone
     * @param {*} telefone 
     * @returns telefone formatado (xx) xxxxx-xxxx
     */
    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    /**
     * Lida com a remoção de um prfessor
     * @param {*} aluno 
     */
    const deletar = (professor) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o professor ${professor.nome}?`);

        if(deletar) {
            if(ProfessoresRequests.deletarProfessor(professor.id_professor)) {
                window.location.reload();
                window.alert('Professor removido com sucesso!');
            } else {
                window.alert('Erro ao remover professor!');
            }
        }
    };

    /**
     * Lida com a atualização de um aluno
     * @param {*} aluno 
     */
    const atualizar = (aluno) => {
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
                                <h1 className={styles.titulo}>Tabela Professor</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela para listar os professores */}
            <div className={styles.cntTb} style={{ width: '90%', height: '70vh' , margin: 'auto auto' }}>
                <table className={`${styles.table} ${styles.tabela}`}>
                    <thead>
                        <tr className={styles.tabelaHeader}>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Data de Contratação</th>
                            <th>Formação</th>
                            <th>Especialidade</th>
                            <th colSpan={2}>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeia os professores e renderiza cada um como uma linha na tabela */}
                        {professores.map(professor => (
                            <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                <td>{professor.nome}</td>
                                <td>{formatarCPF(professor.cpf)}</td>
                                <td>{formatarData(professor.data_nascimento)}</td>
                                <td>{formatarTelefone(professor.celular)}</td>
                                <td>{professor.endereco}</td>
                                <td>{formatarData(professor.data_contratacao)}</td>
                                <td>{professor.formacao}</td>
                                <td>{professor.especialidade}</td>
                                <td>
                                    <FaTrash onClick={() => deletar(professor)} style={{ color: '#DB0135' }}/>
                                </td> {/* Botão para deletar um professor */}
                                <td>
                                    <MdEdit onClick={() => atualizar(professor)} style={{ color: '#EAEEE7' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarProfessor;
