import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import styles from './Navegacao.module.css';
import imagemLogo from '../../assets/imgLogoProSaude.png';
import AuthRequests from '../../fetch/AuthRequests'; // Importe sua classe AuthRequests

function Navegacao() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = '/login'; // Redireciona para a página de login
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.href = '/'; // Redireciona para a página inicial ou outra página após o logout
    };

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.CtnNavbar}>
            <Container>
                <Navbar.Brand href="https://www.instagram.com/dev.rank.s" target="_blank" className={styles.logoAtividade}>
                    <img src={imagemLogo} alt="Logo" className={styles.logoImage} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ backgroundColor: '#ffeba7'}}/>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/" className={styles.navbar}>Home</Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <NavDropdown title="Aluno" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href="/Cadastro/Aluno" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Aluno" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Professor" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href="/Cadastro/Professor" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Professor" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Exercicio" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href="/Cadastro/Exercicio" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Exercicio" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Aparelho" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href="/Cadastro/Aparelho" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Aparelho" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Treino" id="collapsible-nav-dropdown" className={styles.navbar}>
                                    <NavDropdown.Item href="/Cadastro/Treino" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Treino" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                             
                                <Button onClick={handleLogout} className={styles.botao}>Sair</Button>
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
