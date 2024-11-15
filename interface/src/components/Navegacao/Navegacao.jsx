import { ROUTES } from '../../appconfig';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import styles from './Navegacao.module.css';
import imagemLogo from '../../assets/imgLogoProSaude.png';
import AuthRequests from '../../fetch/AuthRequests';
import { MdLogout } from "react-icons/md";

/**
 * Componente responsável por montar a barra de navegação
 * @returns web component
 */
function Navegacao() {
    /**
     * Define o estado de autenticação do usuário
     */
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    /**
     * Define informações do usuário
     */
    const [username, setUsername] = useState('');

    /**
     * Realiza a autenticação do usuário
     */
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    /**
     * Lida com o login
     */
    const handleLogin = () => {
        window.location.href = '/login';
    };

    /**
     * Lida com o logout
     */
    const handleLogout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.CtnNavbar}>
            <Container>
                <Navbar.Brand href="/" target="_blank" className={styles.logoAtividade}>
                    <img src={imagemLogo} alt="Logo" className={styles.logoImage} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ backgroundColor: '#ffeba7' }} />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/" className={styles.navbar}>Home</Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <NavDropdown title="Aluno" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href={ROUTES.CADASTRO_ALUNO} className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href={ROUTES.LISTAGEM_ALUNO} className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Professor" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href={ROUTES.CADASTRO_PROFESSOR} className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href={ROUTES.LISTAGEM_PROFESSOR} className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Exercicio" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href={ROUTES.CADASTRO_EXERCICIO} className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href={ROUTES.LISTAGEM_EXERCICIO} className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Aparelho" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href={ROUTES.CADASTRO_APARELHO} className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href={ROUTES.LISTAGEM_APARELHO} className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Treino" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href={ROUTES.CADASTRO_TREINO} className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href={ROUTES.LISTAGEM_TREINO} className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title={`Olá ${username.split(' ')[0].toUpperCase()}`} id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href={ROUTES.ATUALIZAR_SENHA_PROFESSOR} className={styles.navDropdown}>Atualizar Senha</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout} className={styles.navDropdown}><MdLogout /> Sair</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Button onClick={handleLogin} className={styles.botao} variant="primary">Login</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navegacao;
