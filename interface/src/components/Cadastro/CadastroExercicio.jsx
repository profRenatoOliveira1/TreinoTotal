import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests';
import AparelhosRequests from '../../fetch/AparelhosRequests';
// Componente funcional CadastroExercicio
function CadastroExercicio() {
   
    const [formData, setFormData] = useState({
        id_aparelho: '',
        exercicio: '',
        regiao_corpo_ativa: ''
    });

    const [aparelhos, setAparelhos] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
            window.alert('Erro ao cadastrar exercício');
        }
    };

    // Renderização do formulário
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Exercício</h1>
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
