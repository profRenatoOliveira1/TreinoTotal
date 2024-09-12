import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import styles from '../styles/StyleCadastro.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests';
import AparelhosRequests from '../../fetch/AparelhosRequests';

/**
 * Componente responsável por montar o formulário de cadastro do exercicio
 * @returns web component
 */
function AtualizacaoExercicio() {
    const navegacao = useNavigate();
    const location = useLocation();
    const objExercicio = location.state.objExercicio;

    /**
      * Define o estado inicial do formulário com todos os campos vazios
      */
    const [formData, setFormData] = useState({
        idExercicio: objExercicio.id_exercicio,
        idAparelho: objExercicio.id_aparelho,
        exercicio: objExercicio.exercicio,
        regiaoCorpoAtivada: objExercicio.regiao_corpo_ativada
    });

    /**
     * Define o estado inicial da lista de aparelhos
     */
    const [aparelhos, setAparelhos] = useState([]);

    /**
     * Busca os aparelhos cadastrados no servidor
     */
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhosRequests.listarAparelho();
                if (aparelhosData) {
                    setAparelhos(aparelhosData);
                }
            } catch (error) {
                console.error('Erro ao buscar aparelhos:', error);
            }
        };

        fetchAparelhos();
    }, []);

    /**
     * Atualiza o valor do input
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
        console.log(formData);
        try {
            if (await ExerciciosRequests.atualizarExercicio(formData)) {
                console.log('Exercício atualizado com sucesso!');
                window.alert(formData.exercicio + ': foi atualizado com sucesso');
                navegacao('/listagem/exercicio', { replace: true });
            }
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
            window.alert('Erro ao cadastrar exercício');
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Atualizar Cadastro de Exercício</h1>

            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para id_aparelho */}
                    <div className={styles.formGroup}>
                        <label>
                            <p>Aparelho</p>
                            <select
                                className={styles.formStyle}
                                value={formData.idAparelho}
                                onChange={handleChange}
                                name="idAparelho"
                                required
                            >
                                <option value="">Selecione o Aparelho</option>
                                {aparelhos.map(aparelho => (
                                    <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                                        {aparelho.nome_aparelho}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    {/* Campo para nome do exercício */}
                    <div className={styles.formGroup}>
                        <label>
                            <p>Nome exercício</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Exercicio"
                                value={formData.exercicio}
                                onChange={handleChange}
                                name="exercicio"
                            />
                        </label>
                    </div>

                    {/* Campo para região do corpo ativa */}
                    <div className={styles.formGroup}>
                        <label>
                            <p>Região do corpo ativa</p>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Região do corpo ativada"
                                value={formData.regiaoCorpoAtivada}
                                onChange={handleChange}
                                name="regiaoCorpoAtivada"
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

export default AtualizacaoExercicio;