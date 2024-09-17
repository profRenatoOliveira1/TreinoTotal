import { Pessoa } from "./Pessoa";
import { Pool, QueryResult } from 'pg';
import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados
 */
const database: Pool = new DatabaseModel().pool;

/**
 * Representa um professor, que é uma extensão da classe Pessoa.
 */
export class Professor extends Pessoa { 
    
    /**
     * O identificador da pessoa.
     */
    private idProfessor: number = 0;

    /**
     * A data de contratação do professor.
     */
    private dataContratacao: Date;

    /**
     * A formação do professor.
     */
    private formacao: string;

    /**
     * A especialidade do professor.
     */
    private especialidade: string;

    /**
     * Cria uma nova instância de Professor.
     * 
     * @param _id O identificador do professor.
     * @param _nome O nome do professor.
     * @param _cpf O CPF do professor.
     * @param _dataNascimento A data de nascimento do professor.
     * @param _celular O número de telefone do professor.
     * @param _endereco O endereço do professor.
     * @param _dataContratacao A data de contratação do professor.
     * @param _formacao A formação do professor.
     * @param _especialidade A especialidade do professor.
     */
    constructor(
        _nome: string,
        _cpf: string,
        _dataNascimento: Date,
        _celular: string,
        _endereco: string,
        _dataContratacao: Date,
        _formacao: string,
        _especialidade: string
    ) {
        super(_nome, _cpf, _dataNascimento, _celular, _endereco);
        this.dataContratacao = _dataContratacao;
        this.formacao = _formacao;
        this.especialidade = _especialidade;
    }

    // Getters e Setters

    /**
     * Obtém o identificador da pessoa.
     * 
     * @returns O identificador da pessoa.
     */
    public getIdProfessor(): number {
        return this.idProfessor;
    }

    /**
     * Define o identificador da pessoa.
     * 
     * @param id O identificador a ser atribuído à pessoa.
     */
    public setIdProfessor(idProfessor: number): void {
        this.idProfessor = idProfessor;
    }

    /**
     * Obtém a data de contratação do professor.
     * 
     * @returns A data de contratação do professor.
     */
    public getDataContratacao(): Date {
        return this.dataContratacao;
    }

    /**
     * Define a data de contratação do professor.
     * 
     * @param data_contratacao A data de contratação a ser atribuída ao professor.
     */
    public setDataContratacao(data_contratacao: Date): void {
        this.dataContratacao = data_contratacao;
    }

    /**
     * Obtém a formação do professor.
     * 
     * @returns A formação do professor.
     */
    public getFormacao(): string {
        return this.formacao;
    }

    /**
     * Define a formação do professor.
     * 
     * @param formacao A formação a ser atribuída ao professor.
     */
    public setFormacao(formacao: string): void {
        this.formacao = formacao;
    }

    /**
     * Obtém a especialidade do professor.
     * 
     * @returns A especialidade do professor.
     */
    public getEspecialidade(): string {
        return this.especialidade;
    }

    /**
     * Define a especialidade do professor.
     * 
     * @param especialidade A especialidade a ser atribuída ao professor.
     */
    public setEspecialidade(especialidade: string): void {
        this.especialidade = especialidade;
    }

    /**
     * Retorna uma lista com todos os Professores cadastrados no banco de dados
     * 
     * @returns Lista com todos os Professores cadastrados no banco de dados
     */
    static async listarProfessores() {
        // Cria uma lista (array) vazia do tipo Professor
        const listaDeProfessores: Array<Professor> = [];

        // Construção da query para selecionar as informações de um Professor
        const querySelectProfessor = `SELECT * FROM Professor WHERE situacao = true AND nome != UPPER('admin') ORDER BY nome ASC;`;

        try {
            // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
            const queryReturn = await database.query(querySelectProfessor);
            // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
            queryReturn.rows.forEach(professor => {
                const novoProfessor = new Professor(
                    professor.nome,
                    professor.cpf,
                    professor.data_nascimento,
                    professor.celular,
                    professor.endereco,
                    professor.data_contratacao,
                    professor.formacao,
                    professor.especialidade
                );

                novoProfessor.setIdProfessor(professor.id);
                novoProfessor.setEmail(professor.email);

                // Coloca o objeto dentro da lista de Profesores
                listaDeProfessores.push(novoProfessor);
            });

            // retorna a lista de Professores para quem chamou a função
            return listaDeProfessores;
        } catch (error) {
            // Caso dê algum erro na query do banco, é lançado o erro para quem chamou a função
            console.error(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    /**
     * Cadastra um objeto do tipo Professor no banco de dados
     * 
     * @param professor Objeto do tipo Professor
     * @returns *true* caso sucesso, *false* caso erro
    */
    static async cadastrarProfessor(professor: Professor): Promise<Boolean> {
        let insertResult = false;

        try {
            const queryInsertProfessor = `
                INSERT INTO professor (nome, cpf, data_contratacao, formacao, especialidade, data_nascimento, celular, endereco, email, senha)
                VALUES (
                    '${professor.getNome().toUpperCase()}',
                    '${professor.getCpf()}',
                    '${professor.getDataContratacao()}',
                    '${professor.getFormacao().toUpperCase()}',
                    '${professor.getEspecialidade().toUpperCase()}',
                    '${professor.getDataNascimento()}',
                    '${professor.getCelular()}',
                    '${professor.getEndereco().toUpperCase()}',
                    '${professor.getEmail()}',
                    '${professor.getSenha()}'
                )
                RETURNING id_professor;`;

            const result = await database.query(queryInsertProfessor);

            if (result.rows.length > 0) {
                const idProfessor = result.rows[0].id_professor;
                console.log(`Professor cadastrado com sucesso. ID: ${idProfessor}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar professor: ${error}`);
            return insertResult;
        }
    }

    /**
     * Remove um professor do banco de dados
     * @param idProfessor ID do professor a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
     */
    static async removerProfessor(idProfessor: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryUpdateSituacaoProfessor = `UPDATE professor 
                                                    SET situacao = false 
                                                    WHERE id_professor = $1`;
            //const result = await database.query(queryUpdateSituacaoProfessor, [idProfessor]);
            await database.query(queryUpdateSituacaoProfessor, [idProfessor])
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })
            return queryResult;
        } catch (error) {
            console.error(error);
            return queryResult;
        }
    }

    /**
     * Atualiza as informações de um professor no banco de dados
     * @param professor Objeto Professor contendo as informações a serem atualizadas
     * @returns Boolean indicando se a atualização foi bem-sucedida
     */
    static async atualizarProfessor(professor: Professor): Promise<boolean> {
        let queryResult = false;

        try {
            const queryUpdateProfessor = `UPDATE Professor SET 
                                            nome='${professor.getNome().toUpperCase()}',
                                            cpf='${professor.getCpf()}',
                                            data_nascimento='${professor.getDataNascimento()}',
                                            celular='${professor.getCelular()}',
                                            endereco='${professor.getEndereco().toUpperCase()}',
                                            email='${professor.getEmail().toUpperCase()}',
                                            senha='${professor.getSenha()}',
                                            data_contratacao='${professor.getDataContratacao()}',
                                            formacao='${professor.getFormacao().toUpperCase()}',
                                            especialidade='${professor.getEspecialidade().toUpperCase()}'
                                        WHERE id_professor=${professor.getIdProfessor()}`;

            await database.query(queryUpdateProfessor)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })

            return queryResult;
        } catch (error) {
            console.error(error, queryResult);
            return queryResult;
        }
    }

    /**
     * Atualiza a senha de um professor no banco de dados
     * @param senhaAtual Senha atual do professor
     * @param novaSenha Nova senha a ser definida
     * @param idProfessor ID do professor
     * @returns Objeto indicando se a atualização foi bem-sucedida
     */
    static async atualizarSenha(senhaAtual: string, novaSenha: string, idProfessor: number): Promise<Boolean> {
        const queryVerifyPassword = `SELECT id_professor FROM professor WHERE id_professor=$1 AND senha=$2;`;
        const queryUpdatePassword = `UPDATE professor SET senha=$1 WHERE id_professor=$2;`;

        try {
            const queryResult = await (database.query as any)(queryVerifyPassword, [idProfessor, senhaAtual]);

            if (queryResult.rowCount === 0) {
                return false;
            }

            await (database.query as any)(queryUpdatePassword, [novaSenha, idProfessor]);

            return true;
        } catch (error) {
            console.error('Erro ao atualizar a senha:', error);
            return false;
        }
    }

}