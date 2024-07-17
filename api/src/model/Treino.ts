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
    private idTreino: number;

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
     * @param _idTreino O identificador do treino.
     * @param _idAluno O identificador do aluno associado ao treino.
     * @param _idProfessor O identificador do professor responsável pelo treino.
     * @param _exercicios A lista de exercícios que compõem o treino.
     */
    constructor(
        _idTreino: number,
        _idAluno: number,
        _idProfessor: number,
        _exercicios: Exercicio[]
    ) {
        this.idTreino = _idTreino;
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

    static async listarTreinoNomeAluno(nomeAluno: string): Promise<any | null> {

        const querySelectTreinoNomeAluno = `SELECT 
                                                a.id_aluno,
                                                a.nome AS nome_aluno,
                                                p.id_professor,
                                                p.nome AS nome_professor,
                                                t.id_treino,
                                                e.id_exercicio,
                                                e.exercicio,
                                                e.carga,
                                                e.repeticoes,
                                                ap.id_aparelho,
                                                ap.nome_aparelho
                                            FROM 
                                                aluno a
                                            JOIN 
                                                treino t ON a.id_aluno = t.id_aluno
                                            JOIN 
                                                professor p ON t.id_professor = p.id_professor
                                            JOIN 
                                                exercicio_treino et ON t.id_treino = et.id_treino
                                            JOIN 
                                                exercicio e ON et.id_exercicio = e.id_exercicio
                                            JOIN 
                                                aparelho ap ON e.id_aparelho = ap.id_aparelho
                                            WHERE 
                                                a.nome = UPPER('${nomeAluno.toUpperCase()}');`
        
        try {
            const queryReturn = await database.query(querySelectTreinoNomeAluno);
            return queryReturn.rows;
        } catch (error) {
            console.log(`Erro no modelo: ${error}`);
            return null;
        }
    }
}
