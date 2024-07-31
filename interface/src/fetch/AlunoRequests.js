class AlunoRequests {
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAluno = '/listar/alunos';
        this.routeCadastrarAluno = '/novo/aluno';
        this.routeRemoverAluno = '/delete/aluno';
        this.routeAtualizarAluno = '/update/aluno';
    }

    getAuthToken() {
        return localStorage.getItem('token');
    }

    async listarAlunos() {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Resposta inválida: não é um array JSON');
            }
            return data;
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    async cadastrarAluno(aluno) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }
            console.log('Aluno cadastrado com sucesso!');
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    async deletarAluno(idAluno) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeRemoverAluno}?id_aluno=${idAluno}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao remover aluno');
            return null;
        }
    }

    async atualizarAluno(aluno) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAluno}?id_aluno=${aluno.idAluno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aluno');
            return null;
        }
    }
}

export default new AlunoRequests();
