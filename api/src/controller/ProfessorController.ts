import { Request, Response } from "express";
import { Professor } from "../model/Professor";

/**
 * Controller para manipular o modelo Professor.
 */
class ProfessorController extends Professor {

    /**
     * Acessa o método do Model que lista todos os professores.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            // cria objeto professores e atribui a ele o retorno do método listarProfessores
            const professores = await Professor.listarProfessores();

            // retorna a lista de professores em formato json
            return res.status(200).json(professores);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    /**
     * Acessa o método do Model para cadastrar um novo professor.
     * 
     * @param req Objeto de requisição HTTP com os dados do professor.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nome, cpf, dataNascimento, celular, endereco, dataContratacao, formacao, especialidade } = req.body;

            // Instanciando objeto Professor
            const novoProfessor = new Professor(
                nome,
                cpf,
                dataNascimento,
                celular,
                endereco,
                dataContratacao,
                formacao,
                especialidade
            );

            // Chama o método para persistir o professor no banco de dados
            const result = await Professor.cadastrarProfessor(novoProfessor);

            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json('Professor cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o professor no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o professor: ${error}`);
            return res.status(400).json('Erro ao cadastrar o professor');
        }
    }

    /**
     * Acessa o método do Model para remover um professor.
     * 
     * @param req Objeto de requisição HTTP com o ID do professor a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idProfessor = parseInt(req.query.idProfessor as string);

            if (await Professor.removerProfessor(idProfessor)) {
                return res.status(200).json('Professor removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar professor');
            }
        } catch (error) {
            console.log("Error on controller method remover");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Acessa o método do Model para atualizar as informações de um professor.
     * 
     * @param req Objeto de requisição HTTP com os dados do professor a serem atualizados.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta do resultado da operação em formato JSON.
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nome, cpf, dataNascimento, celular, endereco, dataContratacao, formacao, especialidade } = req.body;

            // Instanciando objeto Professor
            const professor = new Professor(
                nome,
                cpf,
                dataNascimento,
                celular,
                endereco,
                dataContratacao,
                formacao,
                especialidade
            );

            professor.setIdProfessor(parseInt(req.query.idProfessor as string));

            if (await Professor.atualizarProfessor(professor)) {
                return res.status(200).json('Professor atualizado com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar o professor no banco de dados');
            }

        } catch (error) {
            console.log("Error on controller method atualizar");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async atualizarSenha(req: Request, res: Response): Promise<Response> {
        try {
            const idProfessor = parseInt(req.query.idProfessor as string);
            const { senhaAtual, novaSenha } = req.body;

            if(idProfessor === 6) {
                return res.status(403).json('Não é possível alterar a senha do administrador.');
            }

            if(await Professor.atualizarSenha(senhaAtual, novaSenha, idProfessor)) {
                return res.status(200).json('Senha atualizada com sucesso.');
            } else {
                return res.status(400).json('Não foi possível atualizar a senha do professor. Verifique se a senha atual está correta.');
            }
        } catch (error) {
            console.log("Error on controller method atualizar senha");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}

export default ProfessorController;
