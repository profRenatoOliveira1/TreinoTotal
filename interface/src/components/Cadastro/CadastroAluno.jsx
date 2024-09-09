import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import InputMask from "react-input-mask";

/**
 * Componente responsável por montar o formulário de cadastro do aluno
 * @returns web component
 */
function CadastroAluno() {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        celular: '',
        endereco: '',
        altura: '',
        peso: ''
    });

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    /**
     * Lida com o envio do formulário
     * @param {*} e evento de atualização
     * @returns **true** caso cadastro sucesso, **false** caso erro no cadastro
     */
    const handleSubmit = async (e) => {
        const dt_nasc = new Date(formData.data_nascimento);
        const hoje = new Date();
        if(dt_nasc.getFullYear() > hoje.getFullYear()) {

        }
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        // Validação básica para garantir que os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.cpf /*|| !formData.email || !formData.senha*/) {
            window.alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const cleanCPF = formData.cpf.replace(/\D/g, '');
        const cleanCelular = formData.celular.replace(/\D/g, '');
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };

        try {
            const response = await AlunoRequests.cadastrarAluno(cleanData);
            console.log('Aluno cadastrado com sucesso:', response);
            if (response) {
                window.alert(`${formData.nome} foi cadastrado com sucesso`);
                window.location.reload(); // recarrega a página
            }
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            window.alert('Ocorreu um erro: ' + error.message);
        }
    };

    const dt_nasc = new Date(formData.data_nascimento);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    /**
     * Valida a data para não ultrapassar a data atual
     */
    if (dt_nasc > hoje) {
        setErrorMessage('A data de nascimento não pode ser uma data futura.');
        return;
    }

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aluno</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome completo"
                            value={formData.nome}
                            onChange={handleChange}
                            name="nome"
                            required
                        />
                    </div>
                    {/* Campo para CPF */}
                    <div className={styles.formGroup}>
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
                            className={styles.formStyleEsquerda}
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            name="cpf"
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Nascimento"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            name="data_nascimento"
                            max={hoje.toISOString().split('T')[0]} 
                        />
                    </div>
                    {/* Campo para número de celular */}
                    <div className={styles.formGroup}>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            className={styles.formStyle}
                            placeholder="Telefone"
                            value={formData.celular}
                            onChange={handleChange}
                            name="celular"
                        />
                    </div>
                    {/* Campo para endereço */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Endereço"
                            value={formData.endereco}
                            onChange={handleChange}
                            name="endereco"
                        />
                    </div>
                    {/* Campo para data de contratação */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyleEsquerda}
                            placeholder="Altura/m"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                        />
                        <input
                            type="number"
                            className={styles.formStyleDireita}
                            placeholder="Peso/Kg"
                            value={formData.peso}
                            onChange={handleChange}
                            name="peso"
                        />
                    </div>

                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroAluno;
