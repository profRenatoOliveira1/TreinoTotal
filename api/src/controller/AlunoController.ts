import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

/**
 * Controlador para operações relacionadas aos alunos.
 */
class AlunoController extends Aluno {

    /**
     * Lista todos os alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON.
     */
    public async todos(req: Request, res: Response) {
        console.log('função todos executada em alunos');
        
        try {
            // Cria objeto alunos e atribui a ele o retorno do método listarAlunos
            const alunos = await Aluno.listarAlunos();

            // Retorna a lista de alunos em formato JSON
            return res.status(200).json(alunos);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    /**
     * Cadastra um novo aluno.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    public async cadastrar(req: Request, res: Response) {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { id_aluno, nome, cpf, altura, peso, imc, data_nascimento, celular, endereco } = req.body;

            // Instanciando objeto Aluno
            const novoAluno = new Aluno(
                id_aluno,
                nome,
                cpf,
                data_nascimento,
                celular,
                endereco,
                altura,
                peso,
                imc
            );

            // Chama o método para persistir o aluno no banco de dados
            const result = await Aluno.cadastrarAluno(novoAluno);

            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json('Aluno cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o aluno no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o aluno: ${error}`);
            return res.status(400).json('Erro ao cadastrar o aluno');
        }
    }

    /**
     * Remove um aluno.
     * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAluno = parseInt(req.query.id_aluno as string);

            if (await Aluno.removerAluno(idAluno)) {
                return res.status(200).json('Aluno removido com sucesso');
            } else {
                return res.status(400).json('Erro ao deletar aluno');
            }
        } catch (error) {
            console.log("Error on controller method remover");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Atualiza as informações de um aluno.
     * @param req Objeto de requisição HTTP com os dados do aluno a serem atualizados.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    public async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { id_aluno, nome, cpf, altura, peso, imc, data_nascimento, celular, endereco, email, senha } = req.body;

            // Instanciando objeto Aluno
            const novoAluno = new Aluno(
                id_aluno,
                nome,
                cpf,
                data_nascimento,
                celular,
                endereco,
                altura,
                peso,
                imc
            );

            novoAluno.setId(parseInt(req.query.id_aluno as string));

            console.log(novoAluno);
            if (await Aluno.atualizarAluno(novoAluno)) {
                return res.status(200).json('Aluno atualizado com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar o aluno no banco de dados');
            }
        } catch (error) {
            console.log("Error on controller method atualizar");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}

export default AlunoController;
