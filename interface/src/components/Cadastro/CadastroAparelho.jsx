import { ROUTES } from '../../appconfig';
import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests';
import { useNavigate } from 'react-router-dom';

/**
 * Componente responsável por montar o formulário de cadastro do aparelho
 * @returns web component
 */
function CadastroAparelho() {
    const navigate = useNavigate();

    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        idAparelho: '',
        nomeAparelho: '',
        musculoAtivado: ''
    });

    /**
     * Atualiza o estado do formulário conforme o preenchimento do aparelho
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
     * @returns **true** caso cadastro sucesso, **false** caso erro no cadastro
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (await AparelhoRequests.cadastrarAparelho(formData)) {
                console.log('Aparelho cadastrado com sucesso!');
                window.alert(formData.nomeAparelho + ': foi cadastrado com sucesso');
                navigate(ROUTES.LISTAGEM_APARELHO, { replace: true });
            }
        } catch (error) {
            console.error('Erro ao cadastrar aparelho:', error); // Exibe uma mensagem de erro
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aparelho</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>
                            <p>Nome do aparelho</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Nome"
                                value={formData.nomeAparelho} 
                                onChange={handleChange} 
                                name="nomeAparelho"
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            <p>Músculo ativado</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Músculo Ativado"
                                value={formData.musculoAtivado} 
                                onChange={handleChange} 
                                name="musculoAtivado"
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.btn}>
                            Cadastrar
                        </button>
                        <button type="button" className={styles.btn} onClick={() => navigate(ROUTES.LISTAGEM_APARELHO)}>
                            Aparelhos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastroAparelho;
