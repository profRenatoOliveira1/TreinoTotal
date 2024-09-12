/**
 * Classe para requisição de aparelho
 */
class AparelhoRequests {

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAparelho = '/listar/aparelhos';
        this.routeCadastrarAparelho = '/novo/aparelho';
        this.routeRemoverAparelho = '/delete/aparelho';
        this.routeAtualizarAparelho = '/update/aparelho';
    }

    /**
     * Recupera um token salvo no localStorage
     * @returns token armazenado
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Faz a busca dos aparelhos no servidor
     * @returns lista de aparelhos
     */
    async listarAparelho() { // Método assíncrono para listar aparelhos
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de aparelhos
            const response = await fetch(`${this.serverUrl}${this.routeListarAparelho}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar aparelhos');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
        }
    }

    /**
     * Faz o cadastro de um aparelho no servidor
     * @param {*} aparelho 
     * @returns **true** caso sucesso, **false** caso erro
     */
    async cadastrarAparelho(aparelho) { // Método assíncrono para cadastrar um aparelho
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição POST para cadastrar um aparelho
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAparelho}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(aparelho)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aparelho');
            }
            // Retorna os dados do aparelho cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
        }
    }

    /**
     * Remove um aluno do servidor
     * @param {*} idAparelho ID do aluno a ser deletado
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async deletarAparelho(idAparelho) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeRemoverAparelho}?id_aparelho=${idAparelho}`, {
                // Informa o verbo a ser acessado
                method: 'DELETE',
                headers: {
                    'x-access-token': `${token}`
                }
            });
            // Verifica se a resposta não foi bem sucedida ...
            if (!response.ok) {
                // ... lança um erro
                throw new Error('Erro ao enviar formulário');
            }
            // retorna true caso a resposta seja bem sucedida
            return true;
        } catch (error) {
            // caso ocorra algum erro na comunicação
            console.error('Erro: ', error);
            return null;
        }
    }

    /**
     * Atualiza o registro de um aparelho no servidor
     * 
     * @param {*} aparelho animal Objeto com as informações do animal
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async atualizarAparelho(aparelho) {
        try {          
            const token = this.getAuthToken();
            
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAparelho}?id_aparelho=${aparelho.idAparelho}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                // informa o corpo da requisição, contendo as informações do aluno
                body: JSON.stringify(aparelho)
            });
            // Verifica se a resposta não foi bem sucedida ...
            if (!response.ok) {
                // ... lança um erro
                throw new Error('Erro ao enviar formulário');
            }
            // retorna true caso a resposta seja bem sucedida
            return true;
        } catch (error) {
            // caso ocorra algum erro na comunicação
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aparelho');
            return null;
        }
    }
}

// Exporta uma instância da classe AparelhoRequests para ser utilizada em outras partes do código
export default new AparelhoRequests();
