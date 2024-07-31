import express from "express";
import AlunoController from "./controller/AlunoController";
import AparelhoController from "./controller/AparelhoController";
import ExercicioController from "./controller/ExercicioController";
import ProfessorController from "./controller/ProfessorController";
import { TreinoController } from "./controller/TreinoController";
import { Authentication } from "./utils/Authentication";

// Instanciando um novo objeto do controller AveController
// assim podemos acessar os métodos do controller
const alunoController = new AlunoController(0, '', '', new Date(), '', '', 0, 0, 0);
const aparelhoController = new AparelhoController(0, '', '');
const exercicioController = new ExercicioController(0, 0, '', '');
const professorController = new ProfessorController(0, '', '', new Date(), '', '', new Date(), '', '');
const treinoController = new TreinoController(0, 0, 0, []);

const router = express.Router();

// Rota padrão para testar se o servidor está rodando
router.get('/', Authentication.verifyToken, (req, res) => {
    res.json("ola"); // Retorna uma resposta JSON com a mensagem "ola"
});

router.post('/login', Authentication.validacaoUsuario);

/**
 * Rotas para a entidade aluno
 */
// Listar todos os alunos cadastrados
router.get('/listar/alunos', Authentication.verifyToken, alunoController.todos);
// Cadastra um aluno 
router.post('/novo/aluno', Authentication.verifyToken, alunoController.cadastrar);
// Remove um aluno 
router.delete('/delete/aluno', Authentication.verifyToken, alunoController.remover);
// Atualiza um aluno 
router.put('/update/aluno', Authentication.verifyToken, alunoController.atualizar);

/**
* Rotas para a entidade professor
*/
// Listar todos os professores cadastrados
router.get('/listar/professores', Authentication.verifyToken, professorController.todos);
// Cadastra um professor
router.post('/novo/professor', Authentication.verifyToken, professorController.cadastrar);
// Remove um professor 
router.delete('/delete/professor', Authentication.verifyToken, professorController.remover);
// Atualiza um professor 
router.put('/update/professor', Authentication.verifyToken, professorController.atualizar);

/**
* Rotas para a entidade aparelho
*/
// Listar todos os aparelhos cadastrados
router.get('/listar/aparelhos', Authentication.verifyToken, aparelhoController.todos);
// Cadastra um aparelho
router.post('/novo/aparelho', Authentication.verifyToken, aparelhoController.cadastrar);
// Remove um aparelho 
router.delete('/delete/aparelho', Authentication.verifyToken, aparelhoController.remover);
// Atualiza um aparelho 
router.put('/update/aparelho', Authentication.verifyToken, aparelhoController.atualizar);

/**
* Rotas para a entidade exercício
*/
// Listar todos os exercicios cadastrados
router.get('/listar/exercicios', Authentication.verifyToken, exercicioController.todos);
// Cadastra um exercicio
router.post('/novo/exercicio', Authentication.verifyToken, exercicioController.cadastrar);
// Remove um exercício 
router.delete('/delete/exercicio', Authentication.verifyToken, exercicioController.remover);
// Atualiza um exercicio 
router.put('/update/exercicio', Authentication.verifyToken, exercicioController.atualizar);

/**
* Rotas para a entidade exercício
*/
// Listar todos os treinos cadastrados para um aluno (usando nome como parâmetro)
router.get('/listar/treino/nome', Authentication.verifyToken, treinoController.treinoNomeAluno);
// Listar todos os treinos cadastrados para um aluno (usando ID como parâmetro)
router.get('/listar/treino/id', Authentication.verifyToken, treinoController.listarTreino);
// Cadastra um novo treino
router.post('/novo/treino', Authentication.verifyToken, treinoController.novo);
// Remove um treino 
router.delete('/delete/treino', Authentication.verifyToken, treinoController.remover);
// Atualiza um treino 
router.put('/update/treino', Authentication.verifyToken, treinoController.atualizar);

export { router }