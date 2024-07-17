import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;


/**
 * Representa um aparelho de exercício.
 */
export class Aparelho {
    /**
     * O identificador do aparelho.
     */
    private id_aparelho: number;



    /**
     * O nome do aparelho.
     */
    private nome_aparelho: string;

    /**
     * O músculo ativado pelo aparelho.
     */
    private musculo_ativado: string;

    /**
     * Cria uma nova instância de Aparelho.
     * 
     * @param _idAparelho O identificador do aparelho.
     * @param _nomeAparelho O nome do aparelho.
     * @param _musculo_ativado O músculo ativado pelo aparelho.
     */
    constructor(
        _id_aparelho: number,
        _nome_aparelho: string,
        _musculo_ativado: string
    ) {
        this.id_aparelho = _id_aparelho;
        this.nome_aparelho = _nome_aparelho;
        this.musculo_ativado = _musculo_ativado;
    }

    // Getters e Setters

    /**
     * Obtém o identificador do aparelho.
     * 
     * @returns O identificador do aparelho.
     */
    public getIdAparelho(): number {
        return this.id_aparelho;
    }

    /**
     * Define o identificador do aparelho.
     * 
     * @param id_aparelho O identificador a ser atribuído ao aparelho.
     */
    public setIdAparelho(id_aparelho: number): void {
        this.id_aparelho = id_aparelho;
    }

    /**
     * Obtém o nome do aparelho.
     * 
     * @returns O nome do aparelho.
     */
    public getNomeAparelho(): string {
        return this.nome_aparelho;
    }

    /**
     * Define o nome do aparelho.
     * 
     * @param nomeAparelho O nome a ser atribuído ao aparelho.
     */
    public setNomeAparelho(nome_aparelho: string): void {
        this.nome_aparelho = nome_aparelho;
    }

    /**
     * Obtém o músculo ativado pelo aparelho.
     * 
     * @returns O músculo ativado pelo aparelho.
     */
    public getMusculoAtivado(): string {
        return this.musculo_ativado;
    }

    /**
     * Define o músculo ativado pelo aparelho.
     * 
     * @param musculoAtivado O músculo a ser atribuído ao aparelho.
     */
    public setMusculoAtivado(musculo_ativado: string): void {
        this.musculo_ativado = musculo_ativado;
    }

    /**
    * Retorna uma lista com todos os Aparelhos cadastrados no banco de dados
    * 
    * @returns Lista com todos os Aparelhos cadastrados no banco de dados
    */
    static async listarAparelhos() {
        // Cria uma lista (array) vazia do tipo Aparelho
        const listaDeAparelhos: Array<Aparelho> = [];

        // Construção da query para selecionar as informações de um Aparelho
        const querySelectAparelho = `SELECT * FROM Aparelho;`;

        try {
            // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
            const queryReturn = await database.query(querySelectAparelho);
            // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
            queryReturn.rows.forEach(aparelho => {
                // Coloca o objeto dentro da lista de Aparelhos
                listaDeAparelhos.push(aparelho);
            });

            // retorna a lista de Aparelhos para quem chamou a função
            return listaDeAparelhos;
        } catch (error) {
            // Caso dê algum erro na query do banco, é lançado o erro para quem chamou a função
            console.log(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    static async cadastrarAparelho(aparelho: Aparelho): Promise<Boolean> {
        let insertResult = false;

        try {
            const queryInsertAparelho = `
                INSERT INTO aparelho (nome_aparelho, musculo_ativado)
                VALUES (
                    '${aparelho.getNomeAparelho().toUpperCase()}',
                    '${aparelho.getMusculoAtivado().toUpperCase()}'
                )
                RETURNING id_aparelho;`;

            const result = await database.query(queryInsertAparelho);

            if (result.rows.length > 0) {
                const id_aparelho = result.rows[0].id_aparelho;
                console.log(`Aparelho cadastrado com sucesso. ID: ${id_aparelho}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.log(`Erro ao cadastrar aparelho: ${error}`);
            return insertResult;
        }
    }

}