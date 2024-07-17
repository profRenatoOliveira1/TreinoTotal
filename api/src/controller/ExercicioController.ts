import { Exercicio } from "../model/Exercicio";
import { Request, Response } from "express";

/**
 * Controller para manipular o modelo Atracao
 */
class ExercicioController extends Exercicio {

    /**
     * Acessa o método do Model que lista todas as atrações
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Reposta do resultado da operação
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        // tenta recuperar a lista de objetos
        try {
            const exercicios = await Exercicio.listarExercicios();

            return res.status(200).json(exercicios);
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json(`Erro ao acessar as informações, consulte os logs no servidor`);
        }
    }

    /**
     * Acessa o método do Model para cadastrar uma nova atração
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const { id_exercicio, id_aparelho, exercicio, carga, repeticoes, regiao_corpo_ativa } = req.body;

            // Instanciando objeto Exercicio
            const novoExercicio = new Exercicio(id_exercicio, id_aparelho, exercicio, carga, repeticoes, regiao_corpo_ativa);

            // Chama o método para persistir o exercicio no banco de dados
            const result = await Exercicio.cadastrarExercicio(novoExercicio);

            if (result) {
                return res.status(200).json('Exercicio cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o exercicio no banco de dados');
            }

        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json(`Erro ao acessar as informações, consulte os logs no servidor`);
        }
        // caso aconteça algum erro, é lançada uma exceção
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idExercicio = parseInt(req.query.id_exercicio as string);

            if (await Exercicio.removerExercicio(idExercicio)) {
                return res.status(200).json('exercicio removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar exercicio');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { id_aparelho, exercicio, carga, repeticoes, regiao_corpo_ativada } = req.body;
            const novoExercicio = new Exercicio(0, id_aparelho, exercicio, carga, repeticoes, regiao_corpo_ativada);
            novoExercicio.setIdExercicio(parseInt(req.query.id_exercicio as string));

            if (await Exercicio.atualizarExercicio(novoExercicio)) {
                return res.status(200).json('exercicio atualizado com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar o exercicio no banco de dados');
            }

        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}
export default ExercicioController;