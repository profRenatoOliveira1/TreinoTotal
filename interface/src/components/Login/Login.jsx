import AuthRequests from "../../fetch/AuthRequests";
import { useState } from 'react';
import styles from '../styles/StyleLogin.module.css';

/**
 * Componente responsável pelo formulário de login
 * @returns web component
 */
function Login() {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });

    /**
     * Define o estado de erro da aplicação
     */
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin(prevState => ({
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
            const response = await AuthRequests.login(formLogin);
            if (response.auth) {
                setTimeout(() => {
                    AuthRequests.persistToken(response.token);
                }, 1000);
                window.location.href = '/';
            } else {
                setErrorMessage('Autenticação falhou. Por favor, verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao tentar realizar login:', error);
            setErrorMessage('Usuário e/ou senha incorretos. Tente novamente.');
        }
    };

    return (
        <div className={styles.containerLogin}>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <h1 className={styles.h1}>Login</h1>
                <p style={{ color: '#b39f72', fontWeight: 'bold' }}>E-mail</p>
                <input
                    type="text"
                    className={styles.inpuLogin}
                    placeholder="E-mail"
                    value={formLogin.email}
                    onChange={handleChange}
                    name="email"
                />
                <p style={{ color: '#b39f72', fontWeight: 'bold' }}>Senha</p>
                <input
                    type="password"
                    className={styles.inpuLogin}
                    placeholder="Senha"
                    value={formLogin.password}
                    onChange={handleChange}
                    name="password"
                />
                <button className={styles.buttonLogin} type="submit">
                    Login
                </button>
                {errorMessage && <p className={styles.errorMessage} style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
