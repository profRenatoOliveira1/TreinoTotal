    class TreinoRequests {
        constructor() {
            this.serverURL = import.meta.env.VITE_API_URL;
            this.routeCadastrarTreino = '/novo/treino';
            this.routeListarTreinoNome = '/listar/treino/nome';
            this.routeListarTreinoId = '/listar/treino/id';
        }

        getAuthToken() {
            return localStorage.getItem('token');
        }

        async listarTreino(tipoBusca, valorBusca) { 
            try {
                const token = this.getAuthToken();
                let url = `${this.serverURL}`;
                let headers = {
                    'x-access-token': `${token}`
                };
                if (tipoBusca === 'matricula') {
                    url += `${this.routeListarTreinoId}?matricula=${valorBusca}`;
                } else {
                    url += `${this.routeListarTreinoNome}?nome_aluno=${valorBusca}`;
                }
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error('Erro ao buscar treinos');
                }
                return await response.json();
            } catch (error) {
                console.error('Erro: ', error);
            }
        }        

        async cadastrarTreino(treino) {
            try {
                const token = this.getAuthToken();
                const response = await fetch(`${this.serverURL}${this.routeCadastrarTreino}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },
                    body: JSON.stringify(treino)
                });

                if(!response.ok) {
                    throw new Error('Não foi possível cadastrar o treino');
                }

                console.log('Treino cadastrado com sucesso');

                return true;
            } catch (error) {
                // Em caso de erro, exibe e relança o erro
                console.error('Erro: ', error);
                throw error;
            }
        }
    }

    export default new TreinoRequests();