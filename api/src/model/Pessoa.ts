/**
 * Representa uma pessoa.
 */
export class Pessoa {
    /**
     * O identificador da pessoa.
     */
    private id: number;

    /**
     * O nome da pessoa.
     */
    private nome: string;

    /**
     * O CPF da pessoa.
     */
    private cpf: string;

    /**
     * A data de nascimento da pessoa.
     */
    private data_nascimento: Date;

    /**
     * O celular da pessoa.
     */
    private celular: string;

    /**
     * O endereço da pessoa.
     */
    private endereco: string;

    /**
     * O email da pessoa.
     */
    private email: string;

    /**
     * A senha da pessoa.
     */
    private senha: string;

    /**
     * Cria uma nova instância de Pessoa.
     * 
     * @param _id O identificador da pessoa.
     * @param _nome O nome da pessoa.
     * @param _cpf O CPF da pessoa.
     * @param _data_nascimento A data de nascimento da pessoa.
     * @param _celular O celular da pessoa.
     * @param _endereco O endereço da pessoa.
     * @param _email O email da pessoa.
     * @param _senha A senha da pessoa.
     */
    constructor(_id: number, _nome: string, _cpf: string, _data_nascimento: Date, _celular: string, _endereco: string, _email: string, _senha: string) {
        this.id = _id;
        this.nome = _nome;
        this.cpf = _cpf;
        this.data_nascimento = _data_nascimento;
        this.celular = _celular;
        this.endereco = _endereco;
        this.email = _email;
        this.senha = _senha;
    }

    // Getters e Setters

    /**
     * Obtém o identificador da pessoa.
     * 
     * @returns O identificador da pessoa.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Define o identificador da pessoa.
     * 
     * @param id O identificador a ser atribuído à pessoa.
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Obtém o nome da pessoa.
     * 
     * @returns O nome da pessoa.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome da pessoa.
     * 
     * @param nome O nome a ser atribuído à pessoa.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Obtém o CPF da pessoa.
     * 
     * @returns O CPF da pessoa.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o CPF da pessoa.
     * 
     * @param cpf O CPF a ser atribuído à pessoa.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Obtém a data de nascimento da pessoa.
     * 
     * @returns A data de nascimento da pessoa.
     */
    public getDataNascimento(): Date {
        return this.data_nascimento;
    }

    /**
     * Define a data de nascimento da pessoa.
     * 
     * @param data_nascimento A data de nascimento a ser atribuída à pessoa.
     */
    public setDataNascimento(data_nascimento: Date): void {
        this.data_nascimento = data_nascimento;
    }

    /**
     * Obtém o celular da pessoa.
     * 
     * @returns O celular da pessoa.
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o celular da pessoa.
     * 
     * @param celular O celular a ser atribuído à pessoa.
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    /**
     * Obtém o endereço da pessoa.
     * 
     * @returns O endereço da pessoa.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereço da pessoa.
     * 
     * @param endereco O endereço a ser atribuído à pessoa.
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * Obtém o email da pessoa.
     * 
     * @returns O email da pessoa.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email da pessoa.
     * 
     * @param email O email a ser atribuído à pessoa.
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Obtém a senha da pessoa.
     * 
     * @returns A senha da pessoa.
     */
    public getSenha(): string {
        return this.senha;
    }

    /**
     * Define a senha da pessoa.
     * 
     * @param senha A senha a ser atribuída à pessoa.
     */
    public setSenha(senha: string): void {
        this.senha = senha;
    }
}
