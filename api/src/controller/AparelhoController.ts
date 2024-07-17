import { Aparelho } from "../model/Aparelho";
import { Request, Response } from "express";

/**
 * Controller para manipular o modelo Atracao
 */
class AparelhoController extends Aparelho {

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
            const aparelhos = await Aparelho.listarAparelhos();
            // retorna a lista de aparelhos em formato json
            return res.status(200).json(aparelhos);
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
        const { id_aparelho, nome_aparelho, musculo_ativado } = req.body;

        // Instanciando objeto Aparelho
        const novoAparelho = new Aparelho(id_aparelho, nome_aparelho, musculo_ativado);
    
        // Chama o método para persistir o aparelho no banco de dados
        const result = await Aparelho.cadastrarAparelho(novoAparelho);
    
        // Verifica se a query foi executada com sucesso
        if (result) {
            return res.status(200).json('Aparelho cadastrado com sucesso');
        } else {
            return res.status(400).json('Não foi possível cadastrar o aparelho no banco de dados');
        }

    } catch (error) {
        // caso aconteça algum erro, este é lançado nos logs do servidor
        console.log(`Erro ao acessar o modelo: ${error}`);
        // retorna um status 400 com uma mensagem de erro
        return res.status(400).json(`Erro ao acessar as informações, consulte os logs no servidor`);
    }
        // caso aconteça algum erro, é lançada uma exceção
}

    /**
     * Acessa o método do Model para remover uma atração
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAparelho = parseInt(req.query.id_aparelho as string);

            if (await Aparelho.removerAparelho(idAparelho)) {
                return res.status(200).json('aparelho removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar aparelho');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { nome_aparelho, musculo_ativado } = req.body;
            const aparelho = new Aparelho(0, nome_aparelho, musculo_ativado);
            aparelho.setIdAparelho(parseInt(req.query.id_aparelho as string));

            console.log(aparelho.getMusculoAtivado(), aparelho.getNomeAparelho(), aparelho.getIdAparelho());

            if (await Aparelho.atualizarAparelho(aparelho)) {
                return res.status(200).json('aparelho atualizado com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar o aparelho no banco de dados');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

}
export default AparelhoController;