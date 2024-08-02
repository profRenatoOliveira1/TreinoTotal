import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests';
import AparelhosRequests from '../../fetch/AparelhosRequests';

/**
 * Componente responsável por montar o formulário de cadastro do exercicio
 * @returns web component
 */
function CadastroExercicio() {
   /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formData, setFormData] = useState({
        id_aparelho: '',
        exercicio: '',
        regiao_corpo_ativa: ''
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
        try {
            const response = await ExerciciosRequests.cadastrarExercicio(formData);
            console.log('Exercício cadastrado com sucesso:', response);
            window.alert(formData.exercicio + ': foi cadastrado com sucesso');
            setFormData({
                id_aparelho: '',
                exercicio: '',
                regiao_corpo_ativa: ''
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
            window.alert('Erro ao cadastrar exercício');
        }
    };

    return (
        <div className={styles.section}>
                <h1 className={styles.h1}>Cadastro de Exercício</h1>

            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para id_aparelho */}
                    <div className={styles.formGroup}>
                        <select
                            className={styles.formStyle}
                            value={formData.id_aparelho}
                            onChange={handleChange}
                            name="id_aparelho"
                            required
                        >
                            <option value="">Selecione o Aparelho</option>
                            {aparelhos.map(aparelho => (
                                <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                                    {aparelho.nome_aparelho}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Campo para nome do exercício */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="exercicio"
                            value={formData.exercicio}
                            onChange={handleChange}
                            name="exercicio"
                        />
                    </div>
                   
                    {/* Campo para região do corpo ativa */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Região do corpo ativada"
                            value={formData.regiao_corpo_ativa}
                            onChange={handleChange}
                            name="regiao_corpo_ativa"
                        />
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

export default CadastroExercicio;
