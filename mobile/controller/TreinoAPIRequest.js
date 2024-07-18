class TreinoAPIRequest {

    constructor() {
        this.serverURL = 'http://10.90.14.252:3003';
        this.routeListTreinos = '/lista/treinos';
        this.routeListTreino = '/lista/treino';
        this.routeListTreinoAluno = '/lista/treinoaluno';
        this.routeCadastroTreino = '/cadastro/treino';
        this.routeDeleteTreino = '/delete/treino';
        this.routeAtualizarTreino = '/atualiza/treino';
    }

    async buscarTreinos() {
        try {
            const response = await fetch(`${this.serverURL}${this.routeListTreinos}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            return null;
        }
    }

    async buscarTreino(idTreino) {
        try {
            const response = await fetch(`${this.serverURL}${this.routeListTreino}?idTreino=${idTreino}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            return null;
        }
    }

    async buscarTreinoAluno(idAluno) {
        try {
            const response = await fetch(`${this.serverURL}${this.routeListTreinoAluno}?idAluno=${idAluno}`);
            if(!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            return null;
        }
    }

    async cadastrarTreino(treino) {
        try {
            const response = await fetch(`${this.serverURL}${this.routeCadastroTreino}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(treino)
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            // Trate a resposta do servidor conforme necessário
            window.alert(`Treino ${treino.nomeTreino} cadastrado com sucesso`);
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao cadastrar animal');
            return null;
        }
    }

    async deletarTreino(idTreino) {
        try {
            const response = await fetch(`${this.serverURL}${this.routeDeleteTreino}?idTreino=${idTreino}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            // Trate a resposta do servidor conforme necessário
            window.alert(`Treino ${idTreino} deletado com sucesso`);
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao cadastrar animal');
            return null;
        }
    }

    async atualizarTreino(treino) {
        try {
            const response = await fetch(`${this.serverURL}${this.routeAtualizarTreino}?idTreino=${treino.idTreino}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(treino)
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            // Trate a resposta do servidor conforme necessário
            window.alert(`Treino ${treino.idTreino} atualizado com sucesso`);
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao cadastrar animal');
            return null;
        }
    }

}

export default new TreinoAPIRequest;