import { Request, Response } from "express";
import { Professor } from "../model/Professor";

class ProfessorController extends Professor {

    public async todos(req: Request, res: Response) {
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

    public async cadastrar(req: Request, res: Response) {
        try {
           // Desestruturando objeto recebido pelo front-end
    const { id_professor, nome, cpf, data_nascimento, celular, endereco, email, senha, data_contratacao, formacao, especialidade } = req.body;

    // Instanciando objeto Professor
    const novoProfessor = new Professor(
        id_professor,
        nome,
        cpf,
        data_nascimento,
        celular,
        endereco,
        email,
        senha,
        data_contratacao,
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
            console.log(`Erro ao cadastrar a professor: ${error}`);
            return res.status(400).json('Erro ao cadastrar o professor');
        }
    }
}

export default ProfessorController;