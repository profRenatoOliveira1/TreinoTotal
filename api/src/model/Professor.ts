import { Pessoa } from "./Pessoa";

import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;

/**
 * Representa um professor, que é uma extensão da classe Pessoa.
 */
export class Professor extends Pessoa { // Herança de Pessoa
    /**
     * A data de contratação do professor.
     */
    private data_contratacao: Date;

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
     * @param _data_nascimento A data de nascimento do professor.
     * @param _celular O número de telefone do professor.
     * @param _endereco O endereço do professor.
     * @param _email O email do professor.
     * @param _senha A senha do professor.
     * @param _data_contratacao A data de contratação do professor.
     * @param _formacao A formação do professor.
     * @param _especialidade A especialidade do professor.
     */
    constructor(
        _id: number,
        _nome: string,
        _cpf: string,
        _data_nascimento: Date,
        _celular: string,
        _endereco: string,
        _email: string,
        _senha: string,
        _data_contratacao: Date,
        _formacao: string,
        _especialidade: string
    ) {
        super(_id, _nome, _cpf, _data_nascimento, _celular, _endereco, _email, _senha);
        this.data_contratacao = _data_contratacao;
        this.formacao = _formacao;
        this.especialidade = _especialidade;
    }

    // Getters e Setters

    /**
     * Obtém a data de contratação do professor.
     * 
     * @returns A data de contratação do professor.
     */
    public getDataContratacao(): Date {
        return this.data_contratacao;
    }

    /**
     * Define a data de contratação do professor.
     * 
     * @param data_contratacao A data de contratação a ser atribuída ao professor.
     */
    public setDataContratacao(data_contratacao: Date): void {
        this.data_contratacao = data_contratacao;
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
        const querySelectProfessor = `SELECT * FROM Professor;`;

        try {
            // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
            const queryReturn = await database.query(querySelectProfessor);
            // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
            queryReturn.rows.forEach(professor => {
                // Coloca o objeto dentro da lista de Profesores
                listaDeProfessores.push(professor);
            });

            // retorna a lista de Professores para quem chamou a função
            return listaDeProfessores;
        } catch (error) {
            // Caso dê algum erro na query do banco, é lançado o erro para quem chamou a função
            console.log(`Erro no modelo\n${error}`);
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
            console.log(`Erro ao cadastrar professor: ${error}`);
            return insertResult;
        }
    }
}