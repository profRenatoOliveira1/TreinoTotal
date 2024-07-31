import { Request, Response } from "express";
import { Treino } from "../model/Treino";

/**
 * Controller para manipular o modelo Treino.
 */
export class TreinoController extends Treino {

    /**
     * Acessa o método do Model que lista os treinos pelo nome do aluno.
     * 
     * @param req Objeto de requisição HTTP com o parâmetro `nome_aluno`.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async treinoNomeAluno(req: Request, res: Response): Promise<Response> {
        try {
            const treinoAluno = await Treino.listarTreinoNomeAluno(req.query.nome_aluno as string);
            return res.status(200).json(treinoAluno);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    /**
     * Acessa o método do Model para listar um treino baseado no ID do aluno ou ID do treino.
     * 
     * @param req Objeto de requisição HTTP com os parâmetros `id_aluno` ou `id_treino`.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async listarTreino(req: Request, res: Response): Promise<Response> {
        try {
            const matricula = req.query.matricula;
            const idTreino = req.query.id_treino;
            const nomeAluno = req.query.nome_aluno;
            
            if (matricula && !isNaN(parseInt(matricula as string))) {
                const treinoAluno = await Treino.listarTreinoMatriculaAluno(parseInt(matricula as string));
                if (!treinoAluno) {
                    return res.status(404).json({ error: "Treino não encontrado para o aluno especificado" });
                }
                return res.status(200).json(treinoAluno);
            } else if (idTreino && !isNaN(parseInt(idTreino as string))) {
                const treinoAluno = await Treino.listarTreinoIDTreino(parseInt(idTreino as string));
                if (!treinoAluno) {
                    return res.status(404).json({ error: "Treino não encontrado para o ID especificado" });
                }
                return res.status(200).json(treinoAluno);
            } else if (nomeAluno && typeof nomeAluno === 'string') {
                const treinoAluno = await Treino.listarTreinoNomeAluno(nomeAluno.toUpperCase());
                if (!treinoAluno) {
                    return res.status(404).json({ error: "Treino não encontrado para o nome especificado" });
                }
                return res.status(200).json(treinoAluno);
            }
             else {
                return res.status(400).json({ error: "Parâmetro inválido. Forneça um id_aluno ou id_treino válido." });
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(500).json({ error: "Erro ao acessar as informações" });
        }
    }

    /**
     * Acessa o método do Model para cadastrar um novo treino.
     * 
     * @param req Objeto de requisição HTTP com os dados do treino.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { id_aluno, id_professor, exercicios } = req.body;

            // Extraindo os IDs dos exercícios
            const exerciciosDetalhados = exercicios.map((exercicio: { id: number, repeticoes: string, carga: string, series: string }) => ({
                id_exercicio: exercicio.id,
                repeticoes: exercicio.repeticoes,
                carga: exercicio.carga,
                series: exercicio.series
            }));

            const result = await Treino.cadastrarTreino(id_aluno, id_professor, exerciciosDetalhados);

            if (result) {
                return res.status(200).json({ message: 'Treino cadastrado com sucesso' });
            } else {
                return res.status(400).json({ message: 'Erro ao cadastrar o treino' });
            }
        } catch (error) {
            console.log(`Erro ao cadastrar treino: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    /**
     * Acessa o método do Model para remover um treino.
     * 
     * @param req Objeto de requisição HTTP com o parâmetro `id_treino`.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idTreino = parseInt(req.query.id_treino as string);

            if (await Treino.removerTreino(idTreino)) {
                return res.status(200).json('Treino removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar treino');
            }
        } catch (error) {
            console.log("Error on controller method remover");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Acessa o método do Model para atualizar um treino existente.
     * 
     * @param req Objeto de requisição HTTP com os dados atualizados do treino.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { id_aluno, id_professor, exercicios } = req.body;
            const id_treino = parseInt(req.query.id_treino as string);

            // Extraindo os IDs dos exercícios
            const idsExercicios = exercicios.map((exercicio: { id_exercicio: number }) => exercicio.id_exercicio);

            const result = await Treino.atualizarTreino(id_aluno, id_professor, idsExercicios, id_treino);

            if (result) {
                return res.status(200).json({ message: 'Treino atualizado com sucesso' });
            } else {
                return res.status(400).json({ message: 'Erro ao atualizar o treino' });
            }
        } catch (error) {
            console.log("Error on controller method atualizar");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}
