import { useState } from "react";
import ProfessoresRequests from "../../../fetch/ProfessoresRequests";
import style from '../../styles/StyleCadastro.module.css';

function AtualizarSenhaProfessor() {
    const [formSenha, setFormSenha] = useState({
        idProfessor: localStorage.getItem('idProfessor'),
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
    });

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Atualiza o estado com o novo valor do campo modificado
        setFormSenha(prevState => ({
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

        // verifica se a nova senha digitada e a confirmação de senha são as mesmas
        if (formSenha.novaSenha === formSenha.confirmarSenha) {
            try {
                // Envia os dados do formulário para a API
                const response = await ProfessoresRequests.atualizarSenhaProfessor(formSenha);
                if (response) {
                    console.log('Senha atualizada com sucesso', response);
                    // Mostra um alerta de sucesso para o usuário
                    window.alert('Senha atualizada com sucesso');
                    // recarrega a página
                    window.location.reload();
                }
            } catch (error) {
                // Mostra um alerta de erro para o usuário em caso de falha
                console.error('Erro ao atualizra senha do professor:', error);
            }
        } else {
            // Mostra um alerta dizendo que as senhas digitadas não conferem
            alert('As senhas não conferem.');
        }
    };

    return (
        <>
            <div className={style.section}>
                <h1 className={style.h1}>Atualizar senha</h1>

                <div className={style.container}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Senha Atual</label>
                            <input
                                type="password"
                                name="senhaAtual"
                                value={formSenha.senhaAtual}
                                onChange={handleChange}
                                className={style.formStyle}
                                placeholder="Informe a senha atual"
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Nova Senha</label>
                            <input
                                type="password"
                                name="novaSenha"
                                value={formSenha.novaSenha}
                                onChange={handleChange}
                                className={style.formStyle}
                                placeholder="Informe a nova senha"
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Confirme Nova Senha</label>
                            <input
                                type="password"
                                name="confirmarSenha"
                                value={formSenha.confirmarSenha}
                                onChange={handleChange}
                                className={style.formStyle}
                                placeholder="Confirme a nova senha"
                            />
                        </div>


                        <button type="submit" className={style.btn}>Atualizar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AtualizarSenhaProfessor;