/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    
    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeLogin = '/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param {*} login 
     * @returns token de autenticação
     */
    async login(login) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
            if (!response.ok) {
                console.log('Erro na autenticação');
                throw new Error('Falha no login');
            }
            const data = await response.json();
            console.log('Login bem-sucedido, dados recebidos:', data);
            if (data.auth) {
                console.log('Chamando persistToken com:', data.token, data.professor.nome);
                this.persistToken(data.token, data.professor.nome);
            }

            return data;
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token 
     * @param {*} username 
     */
    persistToken(token, username) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }

    /**
     * Remove o token no localStorage
     */
    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }

    /**
     * Verifica a validade do token
     * @returns **true** caso token válido, **false** caso token inválido
     */
    checkTokenExpiry() {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp;
            const now = Math.floor(Date.now() / 1000);

            if (expiry < now) {
                this.removeToken();
                return false;
            }
            return true;
        }
        return false;
    }
}

export default new AuthRequests();
