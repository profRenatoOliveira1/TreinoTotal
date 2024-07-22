-- CRIANDO TABELAS
CREATE TABLE IF NOT EXISTS professor (id_professor SERIAL NOT NULL PRIMARY KEY,  
					nome VARCHAR(100) NOT NULL,
					cpf VARCHAR(11) NOT NULL UNIQUE,
					data_nascimento DATE NOT NULL,
					celular VARCHAR(14) NOT NULL UNIQUE,
					endereco VARCHAR(100) NOT NULL,
					--email VARCHAR(50) NOT NULL,
					--senha VARCHAR(50) NOT NULL,
					data_contratacao DATE NOT NULL,
					formacao VARCHAR(70) NOT NULL,
					especialidade VARCHAR(70));
					
CREATE TABLE IF NOT EXISTS aluno (id_aluno SERIAL NOT NULL PRIMARY KEY, 
					nome VARCHAR(100) NOT NULL,
					cpf VARCHAR(11) NOT NULL UNIQUE,
					data_nascimento DATE NOT NULL,
					celular VARCHAR(14) NOT NULL UNIQUE,
					endereco VARCHAR(100) NOT NULL,
					--email VARCHAR (50) NOT NULL,
					-- senha VARCHAR(50) NOT NULL,
					altura DECIMAL(5,2),
					peso DECIMAL(5,2),
					imc DECIMAL(5,2));

CREATE TABLE users (id_user SERIAL PRIMARY KEY,
					--username VARCHAR(50) NOT NULL UNIQUE,
					cpf VARCHAR(11),
					email VARCHAR(50) NOT NULL UNIQUE,
					password VARCHAR(255) NOT NULL,
					role VARCHAR(50) NOT NULL CHECK (role IN ('Professor', 'Aluno')),
					created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS aparelho (id_aparelho SERIAL NOT NULL PRIMARY KEY,  
					nome_aparelho VARCHAR(80) NOT NULL,
					musculo_ativado VARCHAR(80));
					
CREATE TABLE IF NOT EXISTS exercicio (id_exercicio SERIAL NOT NULL PRIMARY KEY,
					id_aparelho INT,
					exercicio VARCHAR (100) NOT NULL,
					--carga INT NOT NULL,
					--repeticoes INT  NOT NULL,
					regiao_corpo_ativada VARCHAR(70),
					FOREIGN KEY (id_aparelho) REFERENCES aparelho(id_aparelho));

CREATE TABLE IF NOT EXISTS treino (id_treino SERIAL NOT NULL PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_professor INT NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor));

CREATE TABLE IF NOT EXISTS exercicio_treino(id_exercicio_treino SERIAL NOT NULL PRIMARY KEY,
						   id_treino INT,
						   id_exercicio INT,
						   repeticoes INT  NOT NULL DEFAULT 10,
						   carga INT NOT NULL DEFAULT 0,
						   series INT DEFAULT 3,
						   FOREIGN KEY (id_treino) REFERENCES treino(id_treino),
						   FOREIGN KEY (id_exercicio) REFERENCES exercicio(id_exercicio));

			
--INSERT INTO professor (nome, cpf, data_nascimento, celular, endereco, email, senha, data_contratacao, formacao, especialidade)
--VALUES
--(UPPER('Ricardo Cláudio Isaac Carvalho'), '45764338654', '1961-03-01', '86984481466', UPPER('Rua Aldir da Silva Costa'), 'ricardo_carvalho@camilapassos.com.br', 'bWS0ZB1Ego', '2023-01-10', UPPER('Mestrado em Educação Física'), UPPER('Treinamento Funcional')),
--(UPPER('Sara Sueli Juliana Alves'), '95456722771', '1994-07-12', '98983607930', UPPER('Avenida das Barras Paralelas'), 'sara-alves86@dmcard.com.br', 'LpwfM884OF', '2022-05-20', UPPER('Graduação em Nutrição'), UPPER('Nutrição Esportiva')),
--(UPPER('Arthur Miguel Igor da Cruz'), '47849401387', '1980-02-22', '71984280637', UPPER('Rua dos Exercícios Físicos'), 'arthur.miguel.dacruz@abcautoservice.net', 'ub7xFEMRHB', '2020-08-30', UPPER('Doutorado em Fisiologia do Exercício'), UPPER('Fisiologia do Treinamento')),
--(UPPER('Rodrigo Roberto Aparício'), '34744224059', '1952-05-08', '83998808822', UPPER('Avenida da Academia'), 'rodrigorobertoaparicio@picolotoengenharia.com.br', '6deaHr6beu', '2019-03-25', UPPER('Mestrado em Educação Física'), UPPER('Psicologia do Esporte')),
--(UPPER('Alessandra Daniela Amanda Almeida'), '06929104680', '1971-07-03', '84984799214', UPPER('Rua das Ciências do Esporte'), 'alessandra_almeida@unifesp.br', 'UgyyMl9fiW', '2017-10-05', UPPER('Pós-graduação em Nutrição Esportiva'), UPPER('Suplementação Alimentar'));
INSERT INTO professor (nome, cpf, data_nascimento, celular, endereco, data_contratacao, formacao, especialidade)
VALUES
(UPPER('Ricardo Cláudio Isaac Carvalho'), '45764338654', '1961-03-01', '86984481466', UPPER('Rua Aldir da Silva Costa'), '2023-01-10', UPPER('Mestrado em Educação Física'), UPPER('Treinamento Funcional')),
(UPPER('Sara Sueli Juliana Alves'), '95456722771', '1994-07-12', '98983607930', UPPER('Avenida das Barras Paralelas'), '2022-05-20', UPPER('Graduação em Nutrição'), UPPER('Nutrição Esportiva')),
(UPPER('Arthur Miguel Igor da Cruz'), '47849401387', '1980-02-22', '71984280637', UPPER('Rua dos Exercícios Físicos'), '2020-08-30', UPPER('Doutorado em Fisiologia do Exercício'), UPPER('Fisiologia do Treinamento')),
(UPPER('Rodrigo Roberto Aparício'), '34744224059', '1952-05-08', '83998808822', UPPER('Avenida da Academia'), '2019-03-25', UPPER('Mestrado em Educação Física'), UPPER('Psicologia do Esporte')),
(UPPER('Alessandra Daniela Amanda Almeida'), '06929104680', '1971-07-03', '84984799214', UPPER('Rua das Ciências do Esporte'), '2017-10-05', UPPER('Pós-graduação em Nutrição Esportiva'), UPPER('Suplementação Alimentar'));


--INSERT INTO aluno (nome, cpf, data_nascimento, celular, endereco, email, senha, altura, peso, imc)
--VALUES
--(UPPER('Bianca Lara Sandra Pinto'), '26346906739', '2000-09-12', '86987715691', UPPER('Rua dos Estudantes'), 'biancalarapinto@somma.net.br', 'YKKPSCDIpa'),
--(UPPER('Rosa Valentina Jesus'), '11246284286', '1998-07-25', '43986050742', UPPER('Avenida do Conhecimento'), 'rosa-jesus76@nine9.com.br', 'TE4c3SAPMl'),
--(UPPER('Jorge Marcelo Dias'), '17725616730', '2001-03-18', '98997328207', UPPER('Rua da Biblioteca'), 'jorge-dias95@nogueiramoura.adv.br', 'TfUmW1bNMA'),
--(UPPER('Regina Simone Fogaça'), '05216881166', '1999-11-05', '84985894692', UPPER('Avenida do Saber'), 'regina_fogaca@amaralmonteiro.com.br', 'CA9wKF2TbQ'),
--(UPPER('Lívia Agatha da Rosa'), '12154778488', '1969-01-15', '65999783586', UPPER('Rua São Fábio'), 'liviaagathadarosa@babo.adv.br', 'xmjnNlh5d7'),
--(UPPER('Murilo Igor Oliveira'), '82882018495', '1975-06-23', '79992475149', UPPER('Rua Doutor Jorge Ricardo Rocha'), 'muriloigoroliveira@ugeda.com.br', 'AaKjNxdgyR'),
--(UPPER('Emily Stella das Neves'), '71150317205', '1987-01-05', '44988247764', UPPER('Rua Francisca de Almeida'), 'emily_dasneves@msltecnologia.com.br', 'YRxzHDY0Bd'),
--(UPPER('Rafael Fernando Bruno da Rocha'), '44774263052', '1972-07-10', '68999700922', UPPER('Travessa Wilson Ribeiro II'), 'rafael-darocha71@nhrtaxiaereo.com', 'tUWQMw6DOg'),
--(UPPER('Matheus Enrico Augusto Bernardes'), '52374659941', '2000-05-15', '84993210418', UPPER('Rua João Vilar da Cunha'), 'matheus_bernardes@gigaonline.com.br', 'yuZGhfDr3m'),
--(UPPER('Antonio Otávio César da Paz'), '67404799848', '2002-05-20', '67995888670', UPPER('Rua da Aprendizagem'), 'antonio_otavio_dapaz@unicamp.br', 'cxWDlLsqjq');
INSERT INTO aluno (nome, cpf, data_nascimento, celular, endereco)
VALUES
(UPPER('Bianca Lara Sandra Pinto'), '26346906739', '2000-09-12', '86987715691', UPPER('Rua dos Estudantes')),
(UPPER('Rosa Valentina Jesus'), '11246284286', '1998-07-25', '43986050742', UPPER('Avenida do Conhecimento')),
(UPPER('Jorge Marcelo Dias'), '17725616730', '2001-03-18', '98997328207', UPPER('Rua da Biblioteca')),
(UPPER('Regina Simone Fogaça'), '05216881166', '1999-11-05', '84985894692', UPPER('Avenida do Saber')),
(UPPER('Lívia Agatha da Rosa'), '12154778488', '1969-01-15', '65999783586', UPPER('Rua São Fábio')),
(UPPER('Murilo Igor Oliveira'), '82882018495', '1975-06-23', '79992475149', UPPER('Rua Doutor Jorge Ricardo Rocha')),
(UPPER('Emily Stella das Neves'), '71150317205', '1987-01-05', '44988247764', UPPER('Rua Francisca de Almeida')),
(UPPER('Rafael Fernando Bruno da Rocha'), '44774263052', '1972-07-10', '68999700922', UPPER('Travessa Wilson Ribeiro II')),
(UPPER('Matheus Enrico Augusto Bernardes'), '52374659941', '2000-05-15', '84993210418', UPPER('Rua João Vilar da Cunha')),
(UPPER('Antonio Otávio César da Paz'), '67404799848', '2002-05-20', '67995888670', UPPER('Rua da Aprendizagem'));

INSERT INTO aparelho (nome_aparelho, musculo_ativado)
VALUES
(UPPER('Supino'), UPPER('Peito')), -- 1
(UPPER('Leg Press'), UPPER('Perna')), -- 2
(UPPER('Cadeira abdutora'), UPPER('Lateral Perna')), -- 3
(UPPER('Cadeira adutora'), UPPER('Interior Perna')), -- 4
(UPPER('Peck Deck'), UPPER('Peito')), -- 5
(UPPER('Roman Chair'), UPPER('Costas')), -- 6
(UPPER('Barra Fixa'), UPPER('Biceps')), -- 7
(UPPER('Esteira'), UPPER('Cardio')), -- 8
(UPPER('Bicicleta'), UPPER('Cardio')), -- 9
(UPPER('Livre'), UPPER('Livre')), -- 10
(UPPER('Puxador'), UPPER('Costas')), -- 11
(UPPER('Crossover'), UPPER('Multi')), -- 12
(UPPER('Elevação Pelvica'), UPPER('Gluteo')); --13

INSERT INTO exercicio (id_aparelho, exercicio, regiao_corpo_ativada)
VALUES
(3,UPPER('Adução'), UPPER('Pernas')), -- 1
(4,UPPER('Abdução'), UPPER('Pernas')), -- 2
(10,UPPER('Panturrilha sentada'), UPPER('Panturrilha')), -- 3
(10,UPPER('Desenvolvimento de ombro'), UPPER('Ombros')), -- 4
(11,UPPER('Puxada frontal pegada pronada'), UPPER('Costas')), -- 5
(2,UPPER('Legpress 45'), UPPER('Pernas')), -- 6
(10,UPPER('Rosca martelo'), UPPER('Biceps')), -- 7
(5,UPPER('Peck deck'), UPPER('peito')), -- 8
(5,UPPER('Peck deck invertido'), UPPER('Costas')), -- 9
(10,UPPER('agachamento livre'), UPPER('pernas')), -- 10
(6,UPPER('Flexao lombar'), UPPER('Costas')), -- 11
(7,UPPER('Remada alta'), UPPER('Costas')), -- 12
(10,UPPER('elevacao lateral'), UPPER('ombros')), -- 13
(8,UPPER('Esteira'), UPPER('Cardio')), -- 14
(9,UPPER('bicicleta'), UPPER('Cardio')), -- 15
(10,UPPER('Abdominal'), UPPER('Abdomen')), -- 16
(10,UPPER('Abdominal declinado'), UPPER('Abdomen')), -- 17
(12,UPPER('Triceps barra v'), UPPER('Triceps')), -- 18
(12,UPPER('rosca barra reta'), UPPER('Biceps')), -- 19
(11,UPPER('Remada conjugada'), UPPER('Costas')), -- 20
(1,UPPER('Supino reto'), UPPER('Peito')), -- 21
(10,UPPER('Supino inclinado com halteres'), UPPER('Peito')); -- 22


INSERT INTO treino (id_aluno, id_professor)
	VALUES
	(1,4), -- 1
	(5,3), -- 2
	(3,1), -- 3
	(2,5), -- 4
	(4,4); -- 5

INSERT INTO exercicio_treino (id_treino, id_exercicio, repeticoes, carga)
	VALUES
	(1, 1, 10, 30),
	(1, 2, 10, 30),
	(1, 3, 10, 50),
	(1, 10, 10, 30),
	(1, 6, 10, 140),
	(1, 16, 10, 0),
	(1, 11, 10, 0),
	(1, 13, 10, 5),
	(1, 17, 10, 0),
	(1, 15, 30, 0),

	(2, 4, 10, 7),
	(2, 13, 10, 7),
	(2, 5, 10, 60),
	(2, 9, 10, 80),
	(2, 21, 10, 60),
	(2, 22, 10, 50),
	(2, 12, 10, 70),
	(2, 9, 10, 0),
	(2, 16, 10, 0),
	(2, 14, 30, 0),

	(3, 13, 10, 60),
	(3, 8, 10, 12),
	(3, 9, 10, 6),
	(3, 18, 10, 40),
	(3, 20, 10, 60),
	(3, 17, 10, 0),
	(3, 7, 10, 15),
	(3, 4, 10, 7),
	(3, 22, 10, 20),
	(3, 14, 30, 0),

	(4, 10, 10, 60),
	(4, 2, 10, 40),
	(4, 1, 10, 40),
	(4, 3, 10, 40),
	(4, 16, 10, 0),
	(4, 19, 10, 15),
	(4, 7, 10, 15),
	(4, 22, 10, 18),
	(4, 17, 10, 0),
	(4, 15, 30, 0),

	(5, 11, 10, 0),
	(5, 8, 10, 40),
	(5, 5, 10, 40),
	(5, 12, 10, 40),
	(5, 17, 10, 0),
	(5, 4, 10, 15),
	(5, 13, 10, 15),
	(5, 20, 10, 18),
	(5, 18, 10, 12),
	(5, 15, 30, 0);


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
