class ExerciciosRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarExercicio = '/listar-exercicio';
        this.routeCadastrarExercicio = '/novo/exercicio';
    }

    async listarExercicio() { // Método assíncrono para listar exercícios
        try {
            // Realiza uma requisição GET para obter a lista de exercícios
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicio}`);
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

    async cadastrarExercicio(exercicio) { // Método assíncrono para cadastrar um exercício
        try {
            // Realiza uma requisição POST para cadastrar um exercício
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarExercicio}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
}

// Exporta uma instância da classe ExerciciosRequests para ser utilizada em outras partes do código
export default new ExerciciosRequests();
