class AlunoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAluno = '/listar-aluno';
        this.routeCadastrarAluno = '/novo/aluno';
        this.routeRemoverAluno = '/delete/aluno';
        this.routeAtualizarAluno = '/update/aluno';
    }

    async listarAlunos() { // Método assíncrono para listar alunos
        try {
            // Realiza uma requisição GET para obter a lista de alunos
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }
            // Converte a resposta para JSON
            const data = await response.json();
            // Verifica se a resposta é um array JSON
            if (!Array.isArray(data)) {
                throw new Error('Resposta inválida: não é um array JSON');
            }
            // Retorna os dados
            return data;
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    async cadastrarAluno(aluno) { // Método assíncrono para cadastrar um aluno
        try {
            // Realiza uma requisição POST para cadastrar um aluno
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            // Se o cadastro for bem-sucedido, exibe uma mensagem no console
            console.log('Aluno cadastrado com sucesso!');

            // Retorna os dados do aluno cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Deleta um aluno do servidor
     * 
     * @param {*} idAluno ID do aluno a ser deletado
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async deletarAluno(idAluno) {
        try {
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeRemoverAluno}?id_aluno=${idAluno}`, {
                // Informa o verbo a ser acessado
                method: 'DELETE'
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
            window.alert('Erro ao remover aluno');
            return null;
        }
    }

    /**
     * Atualiza o registro de um aluno no servidor
     * 
     * @param {*} aluno animal Objeto com as informações do animal
     * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
     */
    async atualizarAluno(aluno) {
        try {
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAluno}?id_aluno=${aluno.idAluno}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json'
                },
                // informa o corpo da requisição, contendo as informações do aluno
                body: JSON.stringify(aluno)
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
            window.alert('Erro ao ataulizar animal');
            return null;
        }
    }
}

// Exporta uma instância da classe AlunoRequests para ser utilizada em outras partes do código
export default new AlunoRequests();
