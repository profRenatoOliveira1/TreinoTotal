import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

class AlunoController extends Aluno {

    public async todos(req: Request, res: Response) {
        console.log('função todos executada em alunos');
        
        try {
            // cria objeto alunos e atribui a ele o retorno do método listarAlunos
            const alunos = await Aluno.listarAlunos();

            // retorna a lista de alunos em formato json
            return res.status(200).json(alunos);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async cadastrar(req: Request, res: Response) {
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
                email,
                senha,
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
            console.log(`Erro ao cadastrar a atração: ${error}`);
            return res.status(400).json('Erro ao cadastrar a atração');
        }
    }
}

export default AlunoController;