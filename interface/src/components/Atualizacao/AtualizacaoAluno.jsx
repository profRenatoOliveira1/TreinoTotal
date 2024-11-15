import { ROUTES } from '../../appconfig';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from '../styles/StyleCadastro.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import InputMask from "react-input-mask";
import Utilitarios from '../../util/Utilitarios';

/**
 * Componente responsável por montar o formulário de atualização do aluno
 * @returns web component
 */
function AtualizacaoAluno() {
    const location = useLocation();
    const navegacao = useNavigate();
    const objAluno = location.state.objAluno;
    const hoje = new Date().toISOString().split('T')[0];

    /**
     * Define o estado inicial do formulário com o campo data de nascimento no formato "yyyy-MM-dd"
     */
    const [formData, setFormData] = useState({
        idAluno: objAluno.idAluno,
        nome: objAluno.nome,
        cpf: objAluno.cpf,
        dataNascimento: new Date(objAluno.dataNascimento).toISOString().split('T')[0],
        celular: objAluno.celular,
        endereco: objAluno.endereco,
        altura: objAluno.altura,
        peso: objAluno.peso,
        imc: objAluno.imc,
        email: objAluno.email
    });

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Lida com o envio do formulário
     * @param {*} e evento de atualização
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanData = { ...formData, cpf: Utilitarios.cleanCPF(formData.cpf), celular: Utilitarios.cleanCelular(formData.celular) };

        try {
            if(await AlunoRequests.atualizarAluno(cleanData)) {
                console.log('Aluno atualizado com sucesso!');
                window.alert(`${formData.nome} foi atualizado com sucesso`);
                navegacao(ROUTES.LISTAGEM_ALUNO, { replace: true });
            }
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            window.alert('Erro ao atualizar aluno');
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Atualizar Cadastro Aluno</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
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

                    <div className={styles.formGroup}>
                        <div className={styles.inputGroup}>
                            <label>
                                <p>CPF</p>
                                <InputMask
                                    mask="999.999.999-99"
                                    type="text"
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
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>
                            <p>Celular</p>
                            <InputMask
                                mask="(99) 99999-9999"
                                type="text"
                                className={styles.formStyle}
                                placeholder="Celular"
                                value={formData.celular}
                                onChange={handleChange}
                                name="celular"
                            />
                        </label>
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

                    <div className={styles.formGroup}>
                        <div className={styles.inputGroup}>
                            <label>
                                <p>Altura (m)</p>
                                <input
                                    type="number"
                                    className={styles.formStyleEsquerda}
                                    placeholder="Altura/m"
                                    value={formData.altura}
                                    onChange={handleChange}
                                    name="altura"
                                    min="1.00"
                                    max="2.30"
                                    step="0.01"
                                />
                            </label>

                            <label>
                                <p>Peso (kg)</p>
                                <input
                                    type="number"
                                    className={styles.formStyleDireita}
                                    placeholder="Peso/Kg"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    name="peso"
                                    min="40"
                                    max="399"
                                    step="0.01"
                                />
                            </label>

                            <label>
                                <p>IMC</p>
                                <input
                                    type="number"
                                    className={styles.formStyleDireita}
                                    placeholder="IMC"
                                    value={formData.imc}
                                    onChange={handleChange}
                                    name="imc"
                                    disabled
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.btn}>
                            Cadastrar
                        </button>
                        <button type="button" className={styles.btn} onClick={() => navigate(ROUTES.LISTAGEM_ALUNO)}>
                            Alunos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AtualizacaoAluno;
