-- CONSULTAS
-- Ficha de treino (id aluno)
SELECT 
    a.id_aluno,
    a.nome AS nome_aluno,
    p.id_professor,
    p.nome AS nome_professor,
    t.id_treino,
    et.id_exercicio,
	e.exercicio,
    et.carga,
    et.repeticoes,
    et.series,
    e.id_aparelho,
    ap.nome_aparelho
FROM 
    aluno a
JOIN 
    treino t ON a.id_aluno = t.id_aluno
JOIN 
    professor p ON t.id_professor = p.id_professor
JOIN 
    exercicio_treino et ON t.id_treino = et.id_treino
JOIN 
    exercicio e ON et.id_exercicio = e.id_exercicio
JOIN 
    aparelho ap ON e.id_aparelho = ap.id_aparelho
WHERE a.id_aluno = 1;










INSERT INTO exercicio_treino (id_treino, id_exercicio, repeticoes, carga, series)
	VALUES
	(1, 1, 10, 30, 4),
	(1, 2, 10, 30, 4),
	(1, 3, 10, 50, 4),
	(1, 10, 10, 30, 4),
	(1, 6, 10, 140, 4),
	(1, 16, 10, 0, 4),
	(1, 11, 10, 0, 4),
	(1, 13, 10, 5, 4),
	(1, 17, 10, 0, 4),
	(1, 15, 30, 0, 1);

SELECT * FROM exercicio_treino;

DELETE FROM exercicio_treino WHERE id_treino = 1;

SELECT 
                                                a.id_aluno,
                                                a.nome AS nome_aluno,
                                                p.id_professor,
                                                p.nome AS nome_professor,
                                                t.id_treino,
                                                et.id_exercicio,
                                                e.exercicio,
                                                et.carga,
                                                et.repeticoes,
                                                et.series,
                                                e.id_aparelho,
                                                ap.nome_aparelho
                                            FROM 
                                                aluno a
                                            JOIN 
                                                treino t ON a.id_aluno = t.id_aluno
                                            JOIN 
                                                professor p ON t.id_professor = p.id_professor
                                            JOIN 
                                                exercicio_treino et ON t.id_treino = et.id_treino
                                            JOIN 
                                                exercicio e ON et.id_exercicio = e.id_exercicio
                                            JOIN 
                                                aparelho ap ON e.id_aparelho = ap.id_aparelho
                                            WHERE t.id_treino =1;
