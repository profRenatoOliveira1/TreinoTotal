import express from "express";
import AlunoController from "./controller/AlunoController";
import AparelhoController from "./controller/AparelhoController";
import ExercicioController from "./controller/ExercicioController";
import ProfessorController from "./controller/ProfessorController";
import { TreinoController } from "./controller/TreinoController";

// Instanciando um novo objeto do controller AveController
// assim podemos acessar os métodos do controller
const alunoController = new AlunoController(0, '', '', new Date(), '', '', '', '', 0, 0, 0);
const aparelhoController = new AparelhoController(0, '', '');
const exercicioController = new ExercicioController(0, 0, '', 0, 0, '');
const professorController = new ProfessorController(0, '', '', new Date(), '', '', '', '', new Date(), '', '');
const treinoController = new TreinoController(0, 0, 0, []);

const router = express.Router();

// Rota padrão para testar se o servidor está rodando
router.get('/', (req, res) => {
    res.json("ola"); // Retorna uma resposta JSON com a mensagem "ola"
});

/**
 * Rotas para a entidade aluno
 */
// Listar todos os alunos cadastrados
router.get('/listar/alunos', alunoController.todos);
// Cadastra um aluno 
router.post('/novo/aluno', alunoController.cadastrar);
// Remove um aluno 
router.delete('/delete/aluno', alunoController.remover);
// Atualiza um aluno 
router.put('/update/aluno', alunoController.atualizar);

/**
* Rotas para a entidade professor
*/
// Listar todos os professores cadastrados
router.get('/listar/professores', professorController.todos);
// Cadastra um professor
router.post('/novo/professor', professorController.cadastrar);
// Remove um professor 
router.delete('/delete/professor', professorController.remover);
// Atualiza um professor 
router.put('/update/professor', professorController.atualizar);

/**
* Rotas para a entidade aparelho
*/
// Listar todos os aparelhos cadastrados
router.get('/listar/aparelhos', aparelhoController.todos);
// Cadastra um aparelho
router.post('/novo/aparelho', aparelhoController.cadastrar);
// Remove um aparelho 
router.delete('/delete/aparelho', aparelhoController.remover);
// Atualiza um aparelho 
router.put('/update/aparelho', aparelhoController.atualizar);

/**
* Rotas para a entidade exercício
*/
// Listar todos os exercicios cadastrados
router.get('/listar/exercicios', exercicioController.todos);
// Cadastra um exercicio
router.post('/novo/exercicio', exercicioController.cadastrar);
// Remove um exercício 
router.delete('/delete/exercicio', exercicioController.remover);
// Atualiza um aluno 
router.put('/update/exercicio', exercicioController.atualizar);

/**
* Rotas para a entidade exercício
*/
router.get('/listar/treino/nome', treinoController.treinoNomeAluno);
router.get('/listar/treino/id', treinoController.treinoIdAluno);
router.post('/novo/treino', treinoController.novo);
router.delete('/delete/treino', treinoController.remover);
router.put('/update/treino', treinoController.atualizar);

export { router }