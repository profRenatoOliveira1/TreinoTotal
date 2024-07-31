class AuthRequests {
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeLogin = '/login';
    }

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
                console.log('erro na autenticação');
                throw new Error('Falha no login');
            }
            const data = await response.json();
            if (data.auth) {
                this.persistToken(data.token);
            }
            return data;
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    persistToken(token) {
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

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
