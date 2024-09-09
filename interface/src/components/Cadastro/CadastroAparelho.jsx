import React, { useState } from 'react'; 
import styles from '../styles/StyleCadastro.module.css'; 
import AparelhoRequests from '../../fetch/AparelhosRequests';

/**
 * Componente responsável por montar o formulário de cadastro do aparelho
 * @returns web component
 */
function CadastroAparelho() {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        id_aparelho: '',
        nome_aparelho: '',
        musculo_ativado: ''
    });

    /**
     * Atualiza o estado do formulário conforme o preenchimento do aparelho
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
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        try {
            // Envia os dados do formulário para a API e aguarda a resposta
            const response = await AparelhoRequests.cadastrarAparelho(formData);
            console.log('Aparelho cadastrado com sucesso:', response);
            window.alert(formData.nome_aparelho + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso
            window.location.reload(); // recarrega a página
        } catch (error) {
            console.error('Erro ao cadastrar aparelho:', error); // Exibe uma mensagem de erro
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aparelho</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para o nome do aparelho */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome"
                            value={formData.nome_aparelho} // Define o valor do input com base no estado
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="nome_aparelho" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                        />
                    </div>
                    {/* Campo para o músculo ativado */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Músculo Ativado"
                            value={formData.musculo_ativado} // Define o valor do input com base no estado
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="musculo_ativado" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
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

export default CadastroAparelho; // Exporta o componente para ser utilizado em outras partes da aplicação
