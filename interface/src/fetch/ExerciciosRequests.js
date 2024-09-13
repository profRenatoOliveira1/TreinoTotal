/**
 * Classe para requisição de exercícios
 */
class ExerciciosRequests {

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarExercicio = '/listar/exercicios';
        this.routeCadastrarExercicio = '/novo/exercicio';
        this.routeRemoverExercicio = '/delete/exercicio';
        this.routeAtualizarExercicio = '/update/exercicio';
    }

    /**
     * Recupera um token salvo no localStorage
     * @returns token armazenado
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Faz a busca dos exercícios no servidor
     * @returns lista de exercícios
     */
    async listarExercicio() {
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de exercícios
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicio}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar exercícios');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e propaga o erro para o código que chama esta função
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Faz o cadastro de um exercício no servidor
     * @param {*} exercicio 
     * @returns **true** caso sucesso, **false** caso erro
     */
    async cadastrarExercicio(exercicio) { // Método assíncrono para cadastrar um exercício
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição POST para cadastrar um exercício
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarExercicio}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(exercicio)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar exercício');
            }
            // Retorna os dados do exercício cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e propaga o erro para o código que chama esta função
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Deleta um exercicio do servidor
     * @param {*} idExercicio ID do aluno a ser deletado
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async deletarExercicio(idExercicio) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeRemoverExercicio}?id_exercicio=${idExercicio}`, {
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
     * Atualiza o registro de um aluno no servidor
     * @param {*} exercicio animal Objeto com as informações do animal
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async atualizarExercicio(exercicio) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarExercicio}?id_exercicio=${exercicio.idExercicio}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                // informa o corpo da requisição, contendo as informações do aluno
                body: JSON.stringify(exercicio)
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
            window.alert('Erro ao atualizar exercicio');
            return null;
        }
    }
}

export default new ExerciciosRequests();
