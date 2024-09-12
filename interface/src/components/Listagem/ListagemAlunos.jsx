import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from '../styles/StyleListagem.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

/**
 * Componente responsável por listar os alunos
 * @returns web component
 */
function ListarAluno() {
    const navegacao = useNavigate();
    const [alunos, setAlunos] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;
    const totalPaginas = Math.ceil(alunos.length / itensPorPagina);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos();
                setAlunos(aluno);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };
        fetchAlunos();
    }, []);

    const formatarData = (data) => new Date(data).toLocaleDateString('pt-br');
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    const deletar = (aluno) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o aluno ${aluno.nome}?`);
        if (deletar) {
            if (AlunoRequests.deletarAluno(aluno.id_aluno)) {
                window.location.reload();
                window.alert('Aluno removido com sucesso!');
            } else {
                window.alert('Erro ao remover aluno!');
            }
        }
    };

    const atualizar = (aluno) => {
        navegacao('/atualizar/aluno', { state: { objAluno: aluno }, replace: true });
    };

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const alunosPaginados = alunos.slice(indicePrimeiroItem, indiceUltimoItem);

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
                                <h1 className={styles.titulo}>Tabela Alunos</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.cntTb}>
                {alunos.length > 0 ? (
                    <>
                        <div className={styles.tableHeigth}>
                            <table className={`${styles.table} ${styles.tabela}`}>
                                <thead>
                                    <tr className={styles.tabelaHeader}>
                                        <th>Matricula</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Data de Nascimento</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th hidden>Altura</th>
                                        <th hidden>Peso</th>
                                        <th hidden>IMC</th>
                                        <th colSpan={2}>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunosPaginados.map((aluno) => (
                                        <tr key={aluno.id_aluno} className={styles.tabelaCorpo}>
                                            <td>{aluno.matricula}</td>
                                            <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{aluno.nome}</td>
                                            <td>{formatarCPF(aluno.cpf)}</td>
                                            <td>{formatarData(aluno.data_nascimento)}</td>
                                            <td>{formatarTelefone(aluno.celular)}</td>
                                            <td>{aluno.endereco}</td>
                                            <td hidden>{aluno.altura}</td>
                                            <td hidden>{aluno.peso}</td>
                                            <td hidden>{aluno.imc}</td>
                                            <td>
                                                <FaTrash onClick={() => deletar(aluno)} style={{ color: '#DB0135' }} />
                                            </td>
                                            <td>
                                                <MdEdit onClick={() => atualizar(aluno)} style={{ color: '#EAEEE7' }} />
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
                            </button >

                            <span>Página {paginaAtual} de {totalPaginas}</span>

                            <button
                                onClick={() => mudarPagina(paginaAtual + 1)}
                                disabled={indiceUltimoItem >= alunos.length}
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

export default ListarAluno;
