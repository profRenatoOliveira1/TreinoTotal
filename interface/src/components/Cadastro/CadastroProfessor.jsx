import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import InputMask from "react-input-mask";

/**
 * Componente responsável por montar o formulário de cadastro do professor
 * @returns web component
 */
function CadastroProfessor() {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        celular: '',
        endereco: '',
        data_contratacao: '',
        formacao: '',
        especialidade: ''
    });

    /**
     * Máscara CPF
     */
    const cleanCPF = formData.cpf.replace(/\D/g, '');
    /**
     * Máscata celular
     */
    const cleanCelular = formData.celular.replace(/\D/g, '');
    /**
     * Reseta valores
     */
    const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };


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
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página
        try {
            // Envia os dados do formulário para a API
            const response = await ProfessoresRequests.cadastrarProfessor(cleanData);
            console.log('Professor cadastrado com sucesso:', response);
            // Mostra um alerta de sucesso para o usuário
            window.alert(formData.nome + ': foi cadastrado com sucesso');
            window.location.reload();   // recarrega a página
        } catch (error) {
            // Mostra um alerta de erro para o usuário em caso de falha
            console.error('Erro ao cadastrar professor:', error);
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
                                />
                            </label>
                            <label>
                                <p>Data de Nascimento</p>
                                <input
                                    type="text"
                                    className={styles.formStyleDireita}
                                    placeholder="Data de Nascimento"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                                    value={formData.data_nascimento}
                                    onChange={handleChange}
                                    name="data_nascimento"
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
                                    type="text"
                                    className={styles.formStyleDireita}
                                    placeholder="Data Contratação"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                                    value={formData.data_contratacao}
                                    onChange={handleChange}
                                    name="data_contratacao"
                                />
                            </label>
                        </div>
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
                            />
                        </label>
                    </div>
                    {/* Campo para formação */}
                    <div className={styles.formGroup}>
                        <label>
                            <p>Formação</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Formacao"
                                value={formData.formacao}
                                onChange={handleChange}
                                name="formacao"
                            />
                        </label>
                    </div>
                    {/* Campo para especialidade */}
                    <div className={styles.formGroup}>
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
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroProfessor;
