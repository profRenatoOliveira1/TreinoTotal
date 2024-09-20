import { ROUTES } from '../../appconfig';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from '../styles/StyleCadastro.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import InputMask from "react-input-mask";
import Utilitarios from '../../util/Utilitarios';

/**
 * Componente responsável por montar o formulário de cadastro do professor
 * @returns web component
 */
function AtualizacaoProfessor() {
    const navegacao = useNavigate();
    const location = useLocation();
    const objProfessor = location.state.objProfessor;
    const hoje = new Date().toISOString().split('T')[0];

    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        idProfessor: objProfessor.idProfessor,
        nome: objProfessor.nome,
        cpf: objProfessor.cpf,
        dataNascimento: new Date(objProfessor.dataNascimento).toISOString().split('T')[0],
        celular: objProfessor.celular,
        endereco: objProfessor.endereco,
        dataContratacao: new Date(objProfessor.dataContratacao).toISOString().split('T')[0],
        formacao: objProfessor.formacao,
        especialidade: objProfessor.especialidade,
        email: objProfessor.email
    });

    console.table(objProfessor);
    /**
     * Reseta valores
     */
    const cleanData = { ...formData, cpf: Utilitarios.cleanCPF(formData.cpf), celular: Utilitarios.cleanCelular(formData.celular) };

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Atualiza o estado com o novo valor do campo modificado
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Lida com o envio do formulário
     * @param {*} e evento de atualização
     * @returns **true** caso cadastro sucesso, **false** caso erro no cadastro
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (await ProfessoresRequests.atualizarProfessor(cleanData)) {
                console.log('Professor atualizado com sucesso!');
                window.alert(formData.nome + ': foi atualizado com sucesso');
                navegacao(ROUTES.LISTAGEM_PROFESSOR, { replace: true });
            }
        } catch (error) {
            console.error('Erro ao atualizar professor:', error);
            window.alert('Erro ao atualizar professor');
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Professor</h1>

            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para nome completo */}
                    <div className={styles.formGroup}>
                        <label>
                            <p>Nome completo</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Nome completo"
                                value={formData.nome}
                                onChange={handleChange}
                                name="nome"
                                required
                            />
                        </label>
                    </div>
                    {/* Campo para CPF */}
                    <div className={styles.formGroup}>
                        <div className={styles.inputGroup}>
                            <label>
                                <p>CPF</p>
                                <InputMask
                                    type="text"
                                    mask="999.999.999-99"
                                    className={styles.formStyleEsquerda}
                                    placeholder="CPF"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    name="cpf"
                                    required
                                />
                            </label>
                            <label>
                                <p>Data de Nascimento</p>
                                <input
                                    type="date"
                                    className={styles.formStyleDireita}
                                    placeholder="Data de Nascimento"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    name="dataNascimento"
                                    min="1950-01-01"
                                    max={hoje}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Campo para número de celular */}
                    <div className={styles.formGroup}>
                        <div className={styles.inputGroup}>
                            <label>
                                <p>Número de celular</p>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    type="text"
                                    className={styles.formStyleEsquerda}
                                    placeholder="Telefone"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    name="celular"
                                />
                            </label>
                            <label>
                                <p>Data de Contratação</p>
                                <input
                                    type="date"
                                    className={styles.formStyleDireita}
                                    placeholder="Data Contratação"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                                    value={formData.dataContratacao}
                                    onChange={handleChange}
                                    name="dataContratacao"
                                    min="1980-01-01"
                                    max={hoje}
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>
                            <p>E-mail</p>
                            <input
                                type="email"
                                className={styles.formStyle}
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </label>
                    </div>
                    
                    {/* Campo para endereço */}
                    <div className={styles.formGroup}>
                        <label>
                            <p>Endereço</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Endereço"
                                value={formData.endereco}
                                onChange={handleChange}
                                name="endereco"
                                required
                            />
                        </label>
                    </div>
                    {/* Campo para formação */}
                    <div className={styles.inputGroup}>
                        <div className={styles.formGroup} style={{ width: '49%'}}>
                            <label>
                                <p>Formação</p>
                                <input
                                    type="text"
                                    className={styles.formStyle}
                                    placeholder="Formacao"
                                    value={formData.formacao}
                                    onChange={handleChange}
                                    name="formacao"
                                    required
                                />
                            </label>
                        </div>
                        {/* Campo para especialidade */}
                        <div className={styles.formGroup} style={{ width: '49%'}}>
                            <label>
                                <p>Especialidade</p>
                                <input
                                    type="text"
                                    className={styles.formStyle}
                                    placeholder="Especialidade"
                                    value={formData.especialidade}
                                    onChange={handleChange}
                                    name="especialidade"
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.btn}>
                            Cadastrar
                        </button>
                        <button type="button" className={styles.btn} onClick={() => navigate(ROUTES.LISTAGEM_PROFESSOR)}>
                            Professores
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AtualizacaoProfessor;
