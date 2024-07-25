import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;


/**
 * Representa um exercício realizado em um aparelho de academia.
 */
export class Exercicio {
    /**
     * O identificador do exercício.
     */
    private id_exercicio: number;

    /**
     * O identificador do aparelho utilizado no exercício.
     * Relacionamento com Aparelho.
     */
    private id_aparelho: number;

    /**
     * O nome do exercício.
     */
    private exercicio: string;

    /**
     * A carga utilizada no exercício (em kg).
     */
    private carga: number = 0;

    /**
     * O número de repetições realizadas no exercício.
     */
    private repeticoes: number = 0;

    /**
     * O número de séries realizadas no exercício.
     */
    private series: number = 0;

    /**
     * A região do corpo ativada pelo exercício.
     */
    private regiao_corpo_ativa: string;

    /**
     * Cria uma nova instância de Exercicio.
     * 
     * @param _id_exercicio O identificador do exercício.
     * @param _idAparelho O identificador do aparelho utilizado no exercício.
     * @param _exercicio O nome do exercício.
     * @param _carga A carga utilizada no exercício (em kg).
     * @param _repeticoes O número de repetições realizadas no exercício.
     * @param _series O número de séries do exercício.
     * @param _regiao_corpo_ativa A região do corpo ativada pelo exercício.
     */
    constructor(
        _id_exercicio: number,
        _id_aparelho: number,
        _exercicio: string,
        _regiao_corpo_ativa: string
    ) {
        this.id_exercicio = _id_exercicio;
        this.id_aparelho = _id_aparelho;
        this.exercicio = _exercicio;
        this.regiao_corpo_ativa = _regiao_corpo_ativa;
    }

    // Getters e Setters
    /**
     * Obtém o identificador do exercício.
     * 
     * @returns O identificador do exercício.
     */
    public getIdExercicio(): number {
        return this.id_exercicio;
    }

    /**
     * Define o identificador do exercício.
     * 
     * @param idExercicio O identificador a ser atribuído ao exercício.
     */
    public setIdExercicio(id_exercicio: number): void {
        this.id_exercicio = id_exercicio;
    }

    /**
     * Obtém o identificador do aparelho utilizado no exercício.
     * 
     * @returns O identificador do aparelho.
     */
    public getIdAparelho(): number {
        return this.id_aparelho;
    }

    /**
     * Define o identificador do aparelho utilizado no exercício.
     * 
     * @param idAparelho O identificador do aparelho a ser atribuído.
     */
    public setIdAparelho(id_aparelho: number): void {
        this.id_aparelho = id_aparelho;
    }

    /**
     * Obtém o nome do exercício.
     * 
     * @returns O nome do exercício.
     */
    public getExercicio(): string {
        return this.exercicio;
    }

    /**
     * Define o nome do exercício.
     * 
     * @param exercicio O nome a ser atribuído ao exercício.
     */
    public setExercicio(exercicio: string): void {
        this.exercicio = exercicio;
    }

    /**
     * Obtém a carga utilizada no exercício.
     * 
     * @returns A carga utilizada no exercício.
     */
    public getCarga(): number {
        return this.carga;
    }

    /**
     * Define a carga utilizada no exercício.
     * 
     * @param carga A carga a ser atribuída ao exercício.
     */
    public setCarga(carga: number): void {
        this.carga = carga;
    }

    /**
     * Obtém o número de repetições realizadas no exercício.
     * 
     * @returns O número de repetições realizadas.
     */
    public getRepeticoes(): number {
        return this.repeticoes;
    }

    /**
     * Define o número de repetições realizadas no exercício.
     * 
     * @param repeticoes O número de repetições a ser atribuído.
     */
    public setRepeticoes(repeticoes: number): void {
        this.repeticoes = repeticoes;
    }

    /**
     * Obtém o número de séries realizadas no exercício.
     * 
     * @returns O número de séries realizadas.
     */
    public getSeries(): number {
        return this.series;
    }

    /**
     * Define o número de séries realizadas no exercício.
     * 
     * @param series O número de repetições a ser atribuído.
     */
    public setSeries(series: number): void {
        this.series = series;
    }

    /**
     * Obtém a região do corpo ativada pelo exercício.
     * 
     * @returns A região do corpo ativada pelo exercício.
     */
    public getRegiaoCorpoAtiva(): string {
        return this.regiao_corpo_ativa;
    }

    /**
     * Define a região do corpo ativada pelo exercício.
     * 
     * @param regiaoCorpoAtiva A região do corpo a ser atribuída ao exercício.
     */
    public setRegiaoCorpoAtiva(regiao_corpo_ativa: string): void {
        this.regiao_corpo_ativa = regiao_corpo_ativa;
    }


    /**
    * Retorna uma lista com todos os Exercicios cadastrados no banco de dados
    * 
    * @returns Lista com todos os Exercicios cadastrados no banco de dados
    */
    static async listarExercicios() {
        // Cria uma lista (array) vazia do tipo Exercicio
        const listaDeExercicios: Array<Exercicio> = [];

        // Construção da query para selecionar as informações de um Exercicio
        const querySelectExercicio = `SELECT * FROM Exercicio;`;

        try {
            // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
            const queryReturn = await database.query(querySelectExercicio);
            // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
            queryReturn.rows.forEach(exercicio => {
                // Coloca o objeto dentro da lista de Exercicio
                listaDeExercicios.push(exercicio);
            });

            // retorna a lista de Exercico para quem chamou a função
            return listaDeExercicios;
        } catch (error) {
            // Caso dê algum erro na query do banco, é lançado o erro para quem chamou a função
            console.log(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    static async cadastrarExercicio(exercicio: Exercicio): Promise<Boolean> {
        let insertResult = false;

        try {
            const queryInsertExercicio = `
                INSERT INTO exercicio (id_aparelho, exercicio, regiao_corpo_ativa)
                VALUES (
                    ${exercicio.getIdAparelho()},
                    '${exercicio.getExercicio().toUpperCase()}',
                    '${exercicio.getRegiaoCorpoAtiva().toUpperCase()}'
                )
                RETURNING id_exercicio;`;

            const result = await database.query(queryInsertExercicio);

            if (result.rows.length > 0) {
                const idExercicio = result.rows[0].id_exercicio;
                console.log(`Exercicio cadastrado com sucesso. ID: ${idExercicio}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.log(`Erro ao cadastrar exercicio: ${error}`);
            return insertResult;
        }
    }

    static async removerExercicio(idExercicio: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDeleteExercicio = `DELETE FROM exercicio WHERE id_exercicio=${idExercicio}`;
            await database.query(queryDeleteExercicio)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })
            return queryResult;
        } catch (error) {
            console.log(error);
            return queryResult;
        }
    }

    static async atualizarExercicio(exercicio: Exercicio): Promise<boolean> {
        let queryResult = false;

        try {
            const queryUpdateExercicio = `UPDATE exercicio SET 
                                        id_aparelho=${exercicio.getIdAparelho()},
                                        exercicio='${exercicio.getExercicio().toUpperCase()}',
                                        carga=${exercicio.getCarga()},
                                        repeticoes=${exercicio.getRepeticoes()},
                                        regiao_corpo_ativa='${exercicio.getRegiaoCorpoAtiva().toUpperCase()}'
                                        WHERE id_exercicio=${exercicio.getIdExercicio()}`;

            await database.query(queryUpdateExercicio)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })

            return queryResult;
        } catch (error) {
            console.log(error, queryResult);
            return queryResult;
        }
    }
}