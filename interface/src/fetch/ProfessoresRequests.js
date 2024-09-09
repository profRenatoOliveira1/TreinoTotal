/**
 * Classe para requisição de professores
 */
class ProfessoresRequests {

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarProfessor = '/listar/professores';
        this.routeCadastrarProfessor = '/novo/professor';
        this.routeRemoverProfessor = '/delete/professor';
        this.routeAtualizarProfessor = '/update/professor';
        this.routeAtualizarSenhaProfessor = '/update/senha/professor';
    }

    /**
     * Recupera um token salvo no localStorage
     * @returns token armazenado
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Faz a busca dos alunos no servidor
     * @returns lista de alunos
     */
    async listarProfessor() { // Método assíncrono para listar professores
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de professores
            const response = await fetch(`${this.serverUrl}${this.routeListarProfessor}`, {
                headers: {
                    'x-access-token': `${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar professores');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
        }
    }

    /**
     * Faz o cadastro de um professor no servidor
     * @param {*} professor 
     * @returns **true** caso sucesso, **false** caso erro
     */
    async cadastrarProfessor(professor) { // Método assíncrono para cadastrar um professor
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição POST para cadastrar um professor
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarProfessor}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(professor)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar professor');
            }
            // Retorna os dados do professor cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
        }
    }

    /**
     * Remove um professor do servidor
     * @param {*} idProfessor ID do aluno a ser deletado
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async deletarProfessor(idProfessor) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeRemoverProfessor}?id_professor=${idProfessor}`, {
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
     * Atualiza o registro de um professor no servidor
     * @param {*} professor animal Objeto com as informações do animal
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async atualizarProfessor(professor) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarProfessor}?id_professor=${professor.idProfessor}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                // informa o corpo da requisição, contendo as informações do aluno
                body: JSON.stringify(professor)
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
            window.alert('Erro ao atualizar professor');
            return null;
        }
    }

    async atualizarSenhaProfessor(professor) {
        try {
            console.log(`${this.serverUrl}${this.routeAtualizarSenhaProfessor}?idProfessor=${professor.idProfessor}`);
            
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarSenhaProfessor}?idProfessor=${professor.idProfessor}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                // informa o corpo da requisição, contendo as informações do aluno
                body: JSON.stringify(professor)
            });

            /**
             * Para os alunos engraçadinhos não trocarem a senha do usuário admin
             */
            if(response.status === 403) {
                console.error('Não é possível alterar a senha do administrador');
                alert('Não é possível alterar a senha do administrador');
                return null;
            }

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
            window.alert('Erro ao atualizar senha do professor');
            return null;
        }
    }
}

export default new ProfessoresRequests();
