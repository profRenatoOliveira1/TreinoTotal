import { ROUTES } from '../../appconfig';
import React, { useState } from 'react';
import InputMask from "react-input-mask";
import styles from '../styles/StyleCadastro.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import { useNavigate } from 'react-router-dom';
import Utilitarios from '../../util/Utilitarios';

/**
 * Componente responsável por montar o formulário de cadastro do aluno
 * @returns web component
 */
function CadastroAluno() {
    const navigate = useNavigate();
    const hoje = new Date();
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        celular: '',
        endereco: '',
        altura: '',
        peso: '',
        imc: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Verifica se ambos altura e peso foram preenchidos e calcula o IMC
        if (name === 'peso' || name === 'altura') {
            const altura = parseFloat(name === 'altura' ? value : formData.altura);
            const peso = parseFloat(name === 'peso' ? value : formData.peso);

            if (altura > 0 && peso > 0) {
                const imc = (peso / (altura * altura)).toFixed(2); // Calcula o IMC com 2 casas decimais
                setFormData(prevState => ({
                    ...prevState,
                    imc
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.cpf) {
            window.alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const cleanData = { ...formData, cpf: Utilitarios.cleanCPF(formData.cpf), celular: Utilitarios.cleanCelular(formData.celular) };

        try {
            if (await AlunoRequests.cadastrarAluno(cleanData)) {
                console.log('Aluno cadastrado com sucesso!');
                window.alert(`${formData.nome} foi cadastrado com sucesso`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            window.alert('Ocorreu um erro: ' + error.message);
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aluno</h1>
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
                                    type="text"
                                    className={styles.formStyleDireita}
                                    placeholder="Data de Nascimento"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                                    value={formData.data_nascimento}
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

export default CadastroAluno;
