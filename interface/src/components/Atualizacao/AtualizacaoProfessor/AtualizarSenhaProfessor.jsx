import { useState } from "react";
import ProfessoresRequests from "../../../fetch/ProfessoresRequests";

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

        if(formSenha.novaSenha === formSenha.confirmarSenha) {
            try {
                // Envia os dados do formulário para a API
                const response = await ProfessoresRequests.atualizarSenhaProfessor(formSenha);
                if(response) {
                    console.log('Senha atualizada com sucesso', response);
                    // Mostra um alerta de sucesso para o usuário
                    window.alert('Senha atualizada com sucesso');
                    window.location.reload();
                }
            } catch (error) {
                // Mostra um alerta de erro para o usuário em caso de falha
                console.error('Erro ao atualizra senha do professor:', error);
            }
        } else {
            alert('As senhas não conferem.');
        }
    };

    return (
        <>
            <h1>Atualizar senha</h1>
            <form onSubmit={handleSubmit}>
                <label>Senha Atual</label>
                <input 
                    type="password" 
                    name="senhaAtual" 
                    value={formSenha.senhaAtual}
                    onChange={handleChange}
                />

                <label>Nova Senha</label>
                <input 
                    type="password" 
                    name="novaSenha" 
                    value={formSenha.novaSenha}
                    onChange={handleChange}
                />

                <label>Confirme Nova Senha</label>
                <input
                    type="password" 
                    name="confirmarSenha" 
                    value={formSenha.confirmarSenha}
                    onChange={handleChange}
                />

                <button type="submit">Atualizar</button>
            </form>
        </>
    );
}

export default AtualizarSenhaProfessor;