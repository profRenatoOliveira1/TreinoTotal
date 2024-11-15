import { Pessoa } from "./Pessoa";
import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;

/**
 * Representa um aluno, que é uma extensão da classe Pessoa.
 */
export class Aluno extends Pessoa { // Herança de Pessoa

    /**
     * O identificador da pessoa.
     */
    private idAluno: number = 0;

    /**
     * A altura do aluno.
     */
    private altura: number;

    /**
     * O peso do aluno.
     */
    private peso: number;

    /**
     * O índice de massa corporal (IMC) do aluno.
     */
    private imc: number;

    /**
     * O número de matrícula do aluno.
     */
    private matricula: number = 0;

    /**
     * Cria uma nova instância de Aluno.
     * 
     * @param _nome O nome do aluno.
     * @param _cpf O CPF do aluno.
     * @param _dataNascimento A data de nascimento do aluno.
     * @param _celular O número de telefone do aluno.
     * @param _endereco O endereço do aluno.
     * @param _altura A altura do aluno.
     * @param _peso O peso do aluno.
     * @param _imc O índice de massa corporal (IMC) do aluno.
     */
    constructor(
        _nome: string,
        _cpf: string,
        _dataNascimento: Date,
        _celular: string,
        _endereco: string,
        _altura: number,
        _peso: number,
        _imc: number
    ) {
        super(_nome, _cpf, _dataNascimento, _celular, _endereco);
        this.altura = _altura;
        this.peso = _peso;
        this.imc = _imc;
    }

    // Getters e Setters

    /**
     * Obtém o identificador da pessoa.
     * 
     * @returns O identificador da pessoa.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador da pessoa.
     * 
     * @param id O identificador a ser atribuído à pessoa.
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Obtém a altura do aluno.
     * 
     * @returns A altura do aluno.
     */
    public getAltura(): number {
        return this.altura;
    }

    /**
     * Define a altura do aluno.
     * 
     * @param altura A altura a ser atribuída ao aluno.
     */
    public setAltura(altura: number): void {
        this.altura = altura;
    }

    /**
     * Obtém o peso do aluno.
     * 
     * @returns O peso do aluno.
     */
    public getPeso(): number {
        return this.peso;
    }

    /**
     * Define o peso do aluno.
     * 
     * @param peso O peso a ser atribuído ao aluno.
     */
    public setPeso(peso: number): void {
        this.peso = peso;
    }

    /**
     * Obtém o índice de massa corporal (IMC) do aluno.
     * 
     * @returns O índice de massa corporal (IMC) do aluno.
     */
    public getImc(): number {
        return this.imc;
    }

    /**
     * Define o índice de massa corporal (IMC) do aluno.
     * 
     * @param imc O índice de massa corporal (IMC) a ser atribuído ao aluno.
     */
    public setImc(imc: number): void {
        this.imc = imc;
    }

    /**
     * Calcula o IMC da pessoa
     * 
     * @param peso peso da pessoa (em kg)
     * @param altura altura da pessoa (em metros)
     * @returns valor do IMC
     */
    public static calculaIMC(peso: number, altura: number): number {
        return peso / (altura * altura);
    }

    /**
     * Obtém o número de matrícula do aluno.
     * 
     * @returns O número de matrícula do aluno.
     */
    public getMatricula(): number {
        return this.matricula;
    }

    /**
     * Define a matrícula do aluno.
     * 
     * @param matricula Número de matrícula a ser atribuído ao aluno.
     */
    public setMatricula(matricula: number): void {
        this.matricula = matricula;
    }

    /**
     * Retorna uma lista com todos os alunos cadastrados no banco de dados
     * 
     * @returns Lista com todos os alunos cadastrados no banco de dados
     */
    static async listarAlunos() {
        // Cria uma lista (array) vazia do tipo ALuno
        const listaDeAlunos: Array<Aluno> = [];

        // Construção da query para selecionar as informações de um Aluno
        const querySelectAparelho = `SELECT * FROM Aluno WHERE situacao = true ORDER BY nome ASC;`;

        try {
            // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
            const queryReturn = await database.query(querySelectAparelho);
            // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
            queryReturn.rows.forEach(aluno => {
                const novoAluno = new Aluno(
                    aluno.nome,
                    aluno.cpf,
                    aluno.data_nascimento,
                    aluno.celular,
                    aluno.endereco,
                    aluno.altura,
                    aluno.peso,
                    aluno.imc
                );

                novoAluno.setIdAluno(aluno.id_aluno);
                novoAluno.setEmail(aluno.email);
                novoAluno.setMatricula(aluno.matricula);

                // Coloca o objeto dentro da lista de Alunos
                listaDeAlunos.push(novoAluno);
            });

            // retorna a lista de Alunos para quem chamou a função
            return listaDeAlunos;
        } catch (error) {
            // Caso dê algum erro na query do banco, é lançado o erro para quem chamou a função
            console.error(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    /**
     * Cadastra um novo aluno no banco de dados
     * @param aluno Objeto Aluno contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarAluno(aluno: Aluno): Promise<Boolean> {
        let insertResult = false;
        const imcCalculado = this.calculaIMC(aluno.getPeso(), aluno.getAltura());

        try {
            const queryInsertAluno = `
                INSERT INTO aluno (nome, cpf, altura, peso, imc, data_nascimento, celular, endereco, email, senha)
                VALUES (
                    '${aluno.getNome().toUpperCase()}',
                    '${aluno.getCpf()}',
                    ${aluno.getAltura()},
                    ${aluno.getPeso()},
                    ${imcCalculado.toFixed(2)},
                    '${aluno.getDataNascimento()}',
                    '${aluno.getCelular()}',
                    '${aluno.getEndereco().toUpperCase()}',
                    '${aluno.getEmail()}',
                    '${aluno.getSenha()}'
                )
                RETURNING id_aluno;`;

            const result = await database.query(queryInsertAluno);

            if (result.rows.length > 0) {
                const idAluno = result.rows[0].id_aluno;
                console.log(`Aluno cadastrado com sucesso. ID: ${idAluno}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar aluno: ${error}`);
            return insertResult;
        }
    }

    /**
     * Remove um aluno do banco de dados
     * @param idAluno ID do aluno a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
     */
    static async removerAluno(idAluno: number): Promise<boolean> {
        let queryResult = false;
    
        try {
            // Atualiza a situação do aluno para inativo
            const queryUpdateSituacaoAluno = `
                UPDATE aluno 
                SET situacao = false
                WHERE id_aluno = $1
            `;
            const result = await database.query(queryUpdateSituacaoAluno, [idAluno]);
            
            // Verifica se a atualização foi bem-sucedida
            if (result.rowCount != 0) {
                console.log(`Aluno removido com sucesso. ID: ${idAluno}`);
                queryResult = true;
            } else {
                console.log(`Aluno não encontrado. ID: ${idAluno}`);
            }
    
            return queryResult;
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return queryResult;
        }
    }
    

    /**
     * Atualiza as informações de um aluno no banco de dados
     * @param aluno Objeto Aluno contendo as informações a serem atualizadas
     * @returns Boolean indicando se a atualização foi bem-sucedida
     */
    static async atualizarAluno(aluno: Aluno): Promise<boolean> {
        let queryResult = false;

        try {
            const queryUpdateAluno = `UPDATE Aluno SET 
                                        nome='${aluno.getNome().toUpperCase()}',
                                        cpf='${aluno.getCpf()}',
                                        data_nascimento='${aluno.getDataNascimento()}',
                                        celular='${aluno.getCelular()}',
                                        endereco='${aluno.getEndereco().toUpperCase()}',
                                        email='${aluno.getEmail().toUpperCase()}',
                                        altura=${aluno.getAltura()},
                                        peso=${aluno.getPeso()},
                                        imc=${aluno.getImc()}
                                    WHERE id_aluno=${aluno.getIdAluno()}`;

            await database.query(queryUpdateAluno)
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
}