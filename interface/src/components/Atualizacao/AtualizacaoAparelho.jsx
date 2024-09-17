import { ROUTES } from '../../appconfig';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from '../styles/StyleCadastro.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests';

/**
 * Componente responsável por montar o formulário de cadastro do aparelho
 * @returns web component
 */
function AtualizacaoAparelho() {
    const location = useLocation();
    const navegacao = useNavigate();
    const objAparelho = location.state.objAparelho;
    
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        idAparelho: objAparelho.idAparelho,
        nomeAparelho: objAparelho.nomeAparelho,
        musculoAtivado: objAparelho.musculoAtivado
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
            if (await AparelhoRequests.atualizarAparelho(formData)) {
                console.log('Aparelho atualizado com sucesso!');
                window.alert(formData.nomeAparelho + ': foi atualizado com sucesso');
                navegacao(ROUTES.LISTAGEM_APARELHO, { replace: true });
            }
        } catch (error) {
            console.error('Erro ao atualizar aparelho:', error);
            window.alert('Erro ao atualizar aparelho');
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Atualizar Cadastro de Aparelho</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para o nome do aparelho */}
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
                            />
                        </label>
                    </div>
                    {/* Campo para o músculo ativado */}
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
                            />
                        </label>
                    </div>
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AtualizacaoAparelho;