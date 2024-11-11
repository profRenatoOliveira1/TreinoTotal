import { DatabaseModel } from "./DatabaseModel";
import { Exercicio } from "./Exercicio";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;

/**
 * Representa um treino que contém uma lista de exercícios.
 */
export class Treino {
    /**
     * O identificador do treino.
     */
    private idTreino: number = 0;

    /**
     * O identificador do aluno associado ao treino.
     */
    private idAluno: number;

    /**
     * O identificador do professor responsável pelo treino.
     */
    private idProfessor: number;

    /**
     * A lista de exercícios que compõem o treino.
     */
    private exercicios: Exercicio[]; // Array de Exercicios

    /**
     * Cria uma nova instância de Treino.
     * 
     * @param _idAluno O identificador do aluno associado ao treino.
     * @param _idProfessor O identificador do professor responsável pelo treino.
     * @param _exercicios A lista de exercícios que compõem o treino.
     */
    constructor(
        _idAluno: number,
        _idProfessor: number,
        _exercicios: Exercicio[]
    ) {
        this.idAluno = _idAluno;
        this.idProfessor = _idProfessor;
        this.exercicios = _exercicios;
    }

    // Getters e Setters

    /**
     * Obtém o identificador do treino.
     * 
     * @returns O identificador do treino.
     */
    public getIdTreino(): number {
        return this.idTreino;
    }

    /**
     * Define o identificador do treino.
     * 
     * @param idTreino O identificador a ser atribuído ao treino.
     */
    public setIdTreino(idTreino: number): void {
        this.idTreino = idTreino;
    }

    /**
     * Obtém o identificador do aluno associado ao treino.
     * 
     * @returns O identificador do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador do aluno associado ao treino.
     * 
     * @param idAluno O identificador do aluno a ser associado ao treino.
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Obtém o identificador do professor responsável pelo treino.
     * 
     * @returns O identificador do professor.
     */
    public getIdProfessor(): number {
        return this.idProfessor;
    }

    /**
     * Define o identificador do professor responsável pelo treino.
     * 
     * @param idProfessor O identificador do professor a ser associado ao treino.
     */
    public setIdProfessor(idProfessor: number): void {
        this.idProfessor = idProfessor;
    }

    /**
     * Obtém a lista de exercícios que compõem o treino.
     * 
     * @returns A lista de exercícios.
     */
    public getExercicios(): Exercicio[] {
        return this.exercicios;
    }

    /**
     * Define a lista de exercícios que compõem o treino.
     * 
     * @param exercicios A lista de exercícios a ser associada ao treino.
     */
    public setExercicios(exercicios: Exercicio[]): void {
        this.exercicios = exercicios;
    }

    /**
     * Lista a ficha de treino de acordo com a condição informada
     * @param condicao **ID aluno** ou **ID treino**
     * @returns Ficha de treino
     */
    static async listarTreino(condicao: string): Promise<any | null> {
        const querySelectTreino = `
            SELECT 
                a.id_aluno,
                a.matricula,
                a.nome AS nome_aluno,
                json_agg(
                    json_build_object(
                        'id_treino', t.id_treino,
                        'professor', json_build_object(
                            'id_professor', p.id_professor,
                            'nome_professor', p.nome
                        ),
                        'exercicios', (
                            SELECT json_agg(
                                json_build_object(
                                    'id_exercicio', e.id_exercicio,
                                    'exercicio', e.exercicio,
                                    'carga', et.carga,
                                    'repeticoes', et.repeticoes,
                                    'series', et.series,
                                    'aparelho', json_build_object(
                                        'id_aparelho', ap.id_aparelho,
                                        'nome_aparelho', ap.nome_aparelho
                                    )
                                )
                            )
                            FROM exercicio_treino et
                            JOIN exercicio e ON et.id_exercicio = e.id_exercicio
                            JOIN aparelho ap ON e.id_aparelho = ap.id_aparelho
                            WHERE et.id_treino = t.id_treino
                        )
                    )
                ) AS treinos
            FROM 
                aluno a
            JOIN 
                treino t ON a.id_aluno = t.id_aluno
            JOIN 
                professor p ON t.id_professor = p.id_professor
            WHERE 
                ${condicao}
            GROUP BY 
                a.id_aluno, a.matricula, a.nome;
        `;

        try {
            const queryReturn = await database.query(querySelectTreino);
            const rows = queryReturn.rows;

            if (rows.length === 0) {
                return null;
            }

            // Extraindo apenas o primeiro registro, já que a agregação é feita na query
            const aluno = rows[0];

            // Retornando a estrutura desejada
            const response = {
                treino: {
                    idAluno: aluno.id_aluno,
                    nomeAluno: aluno.nome_aluno,
                    treinos: aluno.treinos // Aqui você já tem os treinos e exercícios
                }
            };

            return response;
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return null;
        }
    }


    /**
     * Chama a função listarTreino passando o ID do treino como parâmetro
     * @param idAlidTreinouno 
     * @returns Ficha de treino (ID treino)
     */
    static async listarTreinoIDTreino(idTreino: number): Promise<any | null> {
        const condicao = `t.id_treino = ${idTreino}`;
        return this.listarTreino(condicao);
    }

    /**
     * Chama a função listarTreino passando o ID do aluno como parâmetro
     * @param idAluno 
     * @returns Ficha de treino (ID aluno)
     */
    static async listarTreinoNomeAluno(nomeAluno: string): Promise<any | null> {
        const condicao = `a.nome LIKE '%${nomeAluno}%'`;
        return this.listarTreino(condicao);
    }

    /**
     * Chama a função listarTreino passando o ID do professor como parâmetro
     * @param idProfessor 
     * @returns Ficha de treino (ID professor)
     */
    static async listarTreinoMatriculaAluno(matricula: number): Promise<any | null> {
        const condicao = `a.matricula = '${matricula}'`;
        return this.listarTreino(condicao);
    }

    /**
     * Cadastra o treino de um aluno no banco de dados
     * @param idAluno ID do aluno
     * @param idProfessor ID do professor que montou o treino
     * @param exercicios Lista de exercícios
     * @returns Booleano indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarTreino(idAluno: number, idProfessor: number, exercicios: Array<any>): Promise<boolean> {
        // Inicializa a variável 'queryResult' como false para indicar se a operação foi bem-sucedida.
        let queryResult = false;
        // Conecta-se ao banco de dados e obtém um cliente.
        const client = await database.connect();

        try {
            // Inicia uma transação.
            await client.query('BEGIN');

            // Define a query SQL para inserir um novo treino na tabela 'treino', retornando o id do treino inserido.
            const queryInsertTreino = 'INSERT INTO treino (id_aluno, id_professor) VALUES ($1, $2) RETURNING id_treino';
            // Executa a query de inserção do treino com os valores de id do aluno e do professor.
            const result = await client.query(queryInsertTreino, [idAluno, idProfessor]);

            // Verifica se a inserção do treino foi bem-sucedida.
            if (result.rowCount != 0) {
                // Obtém o id do treino inserido.
                const idTreino = result.rows[0].id_treino;

                // Mapeia os exercícios para criar um array de promessas de inserção na tabela 'exercicio_treino'.
                const insertExercicioPromises = exercicios.map((exercicio) => {
                    // Define a query SQL para inserir um exercício na tabela 'exercicio_treino'.
                    const queryInsertExercicio = 'INSERT INTO exercicio_treino (id_treino, id_exercicio, carga, repeticoes, series) VALUES ($1, $2, $3, $4, $5)';
                    // Retorna a promessa de execução da query com os valores de id do treino e id do exercício.
                    return client.query(queryInsertExercicio, [idTreino, exercicio.id_exercicio, exercicio.carga, exercicio.repeticoes, exercicio.series]);
                });

                // Aguarda que todas as promessas de inserção dos exercícios sejam concluídas.
                await Promise.all(insertExercicioPromises);

                // Confirma a transação.
                await client.query('COMMIT');

                console.log(`Treino cadastrado com sucesso. ID: ${idTreino}`);

                // Define 'queryResult' como true para indicar que a operação foi bem-sucedida.
                queryResult = true;
            } else {
                // Caso a inserção do treino falhe, reverte a transação.
                await client.query('ROLLBACK');
            }
        } catch (error) {
            // Em caso de erro, reverte a transação.
            await client.query('ROLLBACK');
            // Loga o erro no console.
            console.error(`Erro no modelo: ${error}`);
        } finally {
            // Libera o cliente de volta para o pool de conexões.
            client.release();
        }

        // Retorna o resultado da operação.
        return queryResult;
    }

    /**
     * Remove um treino do banco de dados
     * @param idTreino 
     * @returns Booleano indicando se a remoção foi bem-sucedida
     */
    static async removerTreino(idTreino: number): Promise<boolean> {
        let queryResult = false;
        const client = await database.connect(); // Conecta-se ao banco de dados e obtém um cliente.

        try {
            // Inicia uma transação.
            await client.query('BEGIN');

            // Define a query SQL para remover os exercícios associados ao treino na tabela 'exercicio_treino'.
            const queryRemoveExercicioTreino = `DELETE FROM exercicio_treino WHERE id_treino = $1`;
            await client.query(queryRemoveExercicioTreino, [idTreino]);

            // Define a query SQL para remover o treino na tabela 'treino'.
            const queryRemoveTreino = `DELETE FROM treino WHERE id_treino = $1`;
            const result = await client.query(queryRemoveTreino, [idTreino]);

            // Verifica se a remoção do treino foi bem-sucedida.
            if (result.rowCount != 0) {
                console.log(`Treino removido com sucesso. ID: ${idTreino}`);
                queryResult = true;
            }

            // Confirma a transação.
            await client.query('COMMIT');
        } catch (error) {
            // Em caso de erro, reverte a transação.
            await client.query('ROLLBACK');
            console.error(`Erro no modelo: ${error}`);
        } finally {
            // Libera o cliente de volta para o pool de conexões.
            client.release();
        }

        return queryResult;
    }

    /**
     * Atualiza o treino de um aluno no banco de dados
     * @param idAluno 
     * @param idProfessor 
     * @param exercicios Lista de exercícios
     * @param idTreino 
     * @returns Booleano indicando se a atualização foi bem-sucedida
     */
    static async atualizarTreino(idAluno: number, idProfessor: number, exercicios: Array<number>, idTreino: number): Promise<boolean> {
        // Inicializa a variável 'queryResult' como false para indicar se a operação foi bem-sucedida.
        let queryResult = false;
        // Conecta-se ao banco de dados e obtém um cliente.
        const client = await database.connect();

        try {
            // Inicia uma transação.
            await client.query('BEGIN');

            // Define a query SQL para atualizar o treino na tabela 'treino'.
            const queryUpdateTreino = 'UPDATE treino SET id_aluno=$1, id_professor=$2 WHERE id_treino=$3';
            // Executa a query de atualização do treino com os valores de id do aluno e do professor.
            const result = await client.query(queryUpdateTreino, [idAluno, idProfessor, idTreino]);

            // Verifica se a atualização do treino foi bem-sucedida.
            if (result.rowCount != 0) {
                // Remove os exercícios antigos associados ao treino.
                const queryDeleteExercicios = 'DELETE FROM exercicio_treino WHERE id_treino=$1';
                await client.query(queryDeleteExercicios, [idTreino]);

                // Mapeia os exercícios para criar um array de promessas de inserção na tabela 'exercicio_treino'.
                const insertExercicioPromises = exercicios.map((idExercicio) => {
                    // Define a query SQL para inserir um exercício na tabela 'exercicio_treino'.
                    const queryInsertExercicio = 'INSERT INTO exercicio_treino (id_treino, id_exercicio) VALUES ($1, $2)';
                    // Retorna a promessa de execução da query com os valores de id do treino e id do exercício.
                    return client.query(queryInsertExercicio, [idTreino, idExercicio]);
                });

                // Aguarda que todas as promessas de inserção dos exercícios sejam concluídas.
                await Promise.all(insertExercicioPromises);

                // Confirma a transação.
                await client.query('COMMIT');
                // Define 'queryResult' como true para indicar que a operação foi bem-sucedida.
                queryResult = true;
            } else {
                // Caso a atualização do treino falhe, reverte a transação.
                await client.query('ROLLBACK');
            }
        } catch (error) {
            // Em caso de erro, reverte a transação.
            await client.query('ROLLBACK');
            // Loga o erro no console.
            console.error(`Erro no modelo: ${error}`);
        } finally {
            // Libera o cliente de volta para o pool de conexões.
            client.release();
        }

        // Retorna o resultado da operação.
        return queryResult;
    }
}