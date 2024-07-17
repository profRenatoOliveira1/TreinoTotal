import express from "express";
import AlunoController from "./controller/AlunoController";
import AparelhoController from "./controller/AparelhoController";
import ExercicioController from "./controller/ExercicioController";
import ProfessorController from "./controller/ProfessorController";

// Instanciando um novo objeto do controller AveController
// assim podemos acessar os métodos do controller
const alunoController = new AlunoController(0, '', '', new Date(), '', '', '', '', 0, 0, 0);
const aparelhoController = new AparelhoController(0, '', '');
const exercicioController = new ExercicioController(0, 0, '', 0, 0, '');
const professorController = new ProfessorController(0, '', '', new Date(), '', '', '', '', new Date(), '', '');

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


/**
* Rotas para a entidade aparelho
*/
// Listar todos os aparelhos cadastrados
router.get('/listar/aparelhos', aparelhoController.todos);
// Cadastra um aparelho
router.post('/novo/aparelho', aparelhoController.cadastrar);

/**
* Rotas para a entidade exercício
*/
// Listar todos os exercicios cadastrados
router.get('/listar/exercicios', exercicioController.todos);
// Cadastra um exercicio
router.post('/novo/exercicio', exercicioController.cadastrar);


export { router }