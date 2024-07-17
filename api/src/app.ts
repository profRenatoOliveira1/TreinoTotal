import express from "express"; // Importa o framework Express
import cors from "cors"; // Importa o middleware Cors
import dotenv from 'dotenv';
import ExercicioController from './controller/ExercicioController';
import AparelhoController from './controller/AparelhoController';
import AlunoController from './controller/AlunoController';
import ProfessorController from './controller/ProfessorController';
import { DatabaseModel } from "./model/DatabaseModel";

dotenv.config();

// Instanciando um novo objeto do controller AveController
// assim podemos acessar os métodos do controller
const alunoController = new AlunoController(0, '', '', new Date(), '', '', '', '', 0, 0, 0);
const aparelhoController = new AparelhoController(0, '', '');
const exercicioController = new ExercicioController(0, 0, '', 0, 0, '');
const professorController = new ProfessorController(0, '', '', new Date(), '', '', '', '', new Date(), '', '');

const server = express(); // Cria uma instância do servidor Express
const port: number = parseInt(process.env.SERVER_PORT as string); // Define a porta do servidor

server.use(express.json()); // Habilita o uso de JSON no servidor
server.use(cors()); // Habilita o uso do middleware Cors para lidar com CO

// Rota padrão para testar se o servidor está rodando
server.get('/', (req, res) => {
    res.json("ola"); // Retorna uma resposta JSON com a mensagem "ola"
});

/**
 * Listar informações cadastradas no banco de dados
 */
// Listar todos os alunos cadastrados
server.get('/listar-aluno', alunoController.todos);
// Listar todos os aparelhos cadastrados
server.get('/listar-aparelho', aparelhoController.todos);
// Listar todos os exercicios cadastrados
server.get('/listar-exercicio', exercicioController.todos);
// Listar todos os professores cadastrados
server.get('/listar-professor', professorController.todos);


/**
 * Cadastra informações no banco de dados
 */
// Cadastra um aluno 
server.post('/novo/aluno', alunoController.cadastrar);
// Cadastra um aparelho
server.post('/novo/aparelho', aparelhoController.cadastrar);
// Cadastra um exercicio
server.post('/novo/exercicio', exercicioController.cadastrar);
// Cadastra um professor
server.post('/novo/professor', professorController.cadastrar);

new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${process.env.SERVER_EXPOSED_PORT}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});