import { Request, Response } from "express";
import { Treino } from "../model/Treino";

export class TreinoController extends Treino {

    public async treinoNomeAluno(req: Request, res: Response) {
        try {
            const treinoAluno = await Treino.listarTreinoNomeAluno(req.query.nome_aluno as string);
            return res.status(200).json(treinoAluno);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async listarTreino(req: Request, res: Response) {
        try {
            const idAluno = req.query.id_aluno;
            const idTreino = req.query.id_treino;

            if (idAluno && !isNaN(parseInt(idAluno as string))) {
                const treinoAluno = await Treino.listarTreinoIDAluno(parseInt(idAluno as string));
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
            } else {
                return res.status(400).json({ error: "Parâmetro inválido. Forneça um id_aluno ou id_treino válido." });
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(500).json({ error: "Erro ao acessar as informações" });
        }
    }

    public async novo(req: Request, res: Response) {     
        try {
            const { id_aluno, id_professor, exercicios } = req.body;

            // Extraindo os IDs dos exercícios
            const idsExercicios = exercicios.map((exercicio: { id_exercicio: number }) => exercicio.id_exercicio);

            const result = await Treino.cadastrarTreino(id_aluno, id_professor, idsExercicios);

            if(result) {
                return res.status(200).json({ message: 'Treino cadastrado com sucesso' });
            } else {
                return res.status(400).json({ message: 'Erro ao cadastrar o treino' });
            }
        } catch (error) {
            console.log(`Erro ao cadastrar treino: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async remover(req: Request, res: Response) {
        try {
            const idTreino = parseInt(req.query.id_treino as string);

            if (await Treino.removerTreino(idTreino)) {
                return res.status(200).json('Treino removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar treino');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const { id_aluno, id_professor, exercicios } = req.body;
            const id_treino = parseInt(req.query.id_treino as string);

            console.log(typeof(req.query.id_treino));
            console.log(id_treino);

            // Extraindo os IDs dos exercícios
            const idsExercicios = exercicios.map((exercicio: { id_exercicio: number }) => exercicio.id_exercicio);

            const result = await Treino.atualizarTreino(id_aluno, id_professor, idsExercicios, id_treino);

            if(result) {
                return res.status(200).json({ message: 'Treino atualizado com sucesso' });
            } else {
                return res.status(400).json({ message: 'Erro ao atualizar o treino' });
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}