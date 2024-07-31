import AuthRequests from "../../fetch/AuthRequests";
import { useState } from 'react';
import styles from '../styles/StyleLogin.module.css';

function Login() {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthRequests.login(formLogin);
            if (response) {
                AuthRequests.persistToken(response.token);
            }
        } catch (error) {
            console.error('Erro ao tentar realizar login:', error);
            window.alert('Ocorreu um erro: ' + error.message);
        }
    };

    return (
        <div className={styles.containerLogin}>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
            <h1 className={styles.h1}>Login</h1>
            <input
                type="text"
                className={styles.inpuLogin}
                placeholder="E-mail"
                value={formLogin.email}
                onChange={handleChange}
                name="email"
            />
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
        </form>
        </div>
    );
}

export default Login;
