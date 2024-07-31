import AuthRequests from "../../fetch/AuthRequests";
import { useState } from 'react';

function Login() {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    // Função para atualizar o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormLogin(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthRequests.login(formLogin);
            if(response) {
                AuthRequests.persistToken(response.token);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Erro ao tentar realizar login:', error);
            window.alert('Ocorreu um erro: ' + error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={formLogin.email}
                    onChange={handleChange}
                    name="email"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={formLogin.password}
                    onChange={handleChange}
                    name="password"
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;