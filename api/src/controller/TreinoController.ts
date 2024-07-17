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
}