import { Exercicio } from "../model/Exercicio";
import { Request, Response } from "express";

/**
 * Controller para manipular o modelo Exercicio.
 */
class ExercicioController extends Exercicio {

    /**
     * Acessa o método do Model que lista todos os exercícios.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
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
     * Acessa o método do Model para cadastrar um novo exercício.
     * 
     * @param req Objeto de requisição HTTP com os dados do exercício.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const { id_aparelho, exercicio, regiao_corpo_ativa } = req.body;

            // Instanciando objeto Exercicio
            const novoExercicio = new Exercicio(id_aparelho, exercicio, regiao_corpo_ativa);

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
    }

    /**
     * Acessa o método do Model para remover um exercício.
     * 
     * @param req Objeto de requisição HTTP com o ID do exercício a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idExercicio = parseInt(req.query.id_exercicio as string);

            if (await Exercicio.removerExercicio(idExercicio)) {
                return res.status(200).json('Exercicio removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar exercicio');
            }
        } catch (error) {
            console.log("Error on controller method remover");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Acessa o método do Model para atualizar as informações de um exercício.
     * 
     * @param req Objeto de requisição HTTP com os dados do exercício a serem atualizados.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {       
            // Desestruturando objeto recebido pelo front-end
            const { idAparelho, exercicio, regiaoCorpoAtivada } = req.body;

            // Instanciando objeto Exercício
            const novoExercicio = new Exercicio(
                idAparelho,
                exercicio,
                regiaoCorpoAtivada
            );

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
