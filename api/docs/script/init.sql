CREATE TABLE professor (idProfessor SERIAL NOT NULL PRIMARY KEY,  
					nome  VARCHAR(50)  NOT NULL,
					cpf VARCHAR(11) NOT NULL UNIQUE,
					data_nascimento DATE,
					telefone VARCHAR(11) NOT NULL UNIQUE,
					endereco VARCHAR NOT NULL,
					email VARCHAR(50) NOT NULL,
					senha VARCHAR(50) NOT NULL,
					dataContratacao DATE,
					formacao VARCHAR(50) NOT NULL,
					especialidade VARCHAR(50) NOT NULL
	
					);
					
CREATE TABLE aluno (idAluno SERIAL NOT NULL PRIMARY KEY, 
					nome VARCHAR(50) NOT NULL,
					cpf VARCHAR(11) NOT NULL UNIQUE,
					data_nascimento DATE,
					telefone VARCHAR(11) NOT NULL UNIQUE,
					endereco VARCHAR NOT NULL,
					email VARCHAR (50) NOT NULL,
					senha VARCHAR(50) NOT NULL,
					altura FLOAT(4) NOT NULL ,
					peso FLOAT(4) NOT NULL ,
					imc FLOAT (4) NOT NULL 	
					);

CREATE TABLE aparelho (idAparelho SERIAL NOT NULL PRIMARY KEY,  
					nomeAparelho VARCHAR(50) NOT NULL,
					musculoAtivado VARCHAR(50) NOT NULL	
					);
					
CREATE TABLE exercicio (idExercicio SERIAL NOT NULL PRIMARY KEY,
					idAparelho INT,
					exercicio VARCHAR (50) NOT NULL,
					carga INT NOT NULL,
					repeticoes INT  NOT NULL,
					regiaoCorpoAtivada VARCHAR(50) NOT NULL,
					FOREIGN KEY (idAparelho) REFERENCES aparelho(idAparelho)		
					);

CREATE TABLE treino (idTreino SERIAL NOT NULL PRIMARY KEY,
    idAluno INT NOT NULL,
    idProfessor INT NOT NULL,
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idProfessor) REFERENCES professor(idProfessor)
);

CREATE TABLE exercicio_treino(idExerciciolTreino SERIAL NOT NULL PRIMARY KEY,
						   idTreino INT,
						   idExercicio INT,
						   FOREIGN KEY (idTreino) REFERENCES treino(idTreino),
						   FOREIGN KEY (idExercicio) REFERENCES exercicio(idExercicio)
);

         
			
INSERT INTO professor (nome, cpf, data_nascimento, telefone, endereco, email, senha, dataContratacao, formacao, especialidade)
VALUES
(UPPER('Ana Carolina Fernandes Nascimento '), '11111111111', '1995-04-28', '16666666666', UPPER('Rua dos Acadêmicos'), UPPER('cf4168548@gmail.com'), 'senha123', '2023-01-10', UPPER('Mestrado em Educação Física'), UPPER('Treinamento Funcional')),
(UPPER('João Pedro Tamião'), '22222222222', '1990-08-15', '17777777777', UPPER('Avenida das Barras Paralelas'), UPPER('jpstz2013@hotmail.com'), 'senha456', '2022-05-20', UPPER('Graduação em Nutrição'), UPPER('Nutrição Esportiva')),
(UPPER('Lucas Hideki Miyazaki'), '33333333333', '1987-11-10', '18888888888', UPPER('Rua dos Exercícios Físicos'), UPPER('lucasmiyazaki6@gmail.com'), 'senha789', '2020-08-30', UPPER('Doutorado em Fisiologia do Exercício'), UPPER('Fisiologia do Treinamento')),
(UPPER('Rian Siqueira Durigan'), '44444444444', '1984-02-20', '19999999999', UPPER('Avenida da Academia'), UPPER('durigansrian@gmail.com'), 'senha101112', '2019-03-25', UPPER('Mestrado em Educação Física'), UPPER('Psicologia do Esporte')),
(UPPER('Vitor Joaquim de Almeida'), '55555555555', '1993-06-15', '10101010101', UPPER('Rua das Ciências do Esporte'), UPPER('vitoreojoaquim@gmail.com'), 'senha131415', '2017-10-05', UPPER('Pós-graduação em Nutrição Esportiva'), UPPER('Suplementação Alimentar'));


INSERT INTO aluno (nome, cpf, data_nascimento, telefone, endereco, email, senha, altura, peso, imc)
VALUES
(UPPER('Marcos'), '98711111111', '2000-09-12', '11111111111', UPPER('Rua dos Estudantes'), UPPER('marcos@gmail.com'), 'senha123', 1.75, 70, 22.9),
(UPPER('Carla'), '31322222222', '1998-07-25', '22222222222', UPPER('Avenida do Conhecimento'), UPPER('carla@gmail.com'), 'senha456', 1.65, 55, 20.2),
(UPPER('Bruno'), '88333333333', '2001-03-18', '33333333333', UPPER('Rua da Biblioteca'), UPPER('bruno@gmail.com'), 'senha789', 1.80, 75, 23.1),
(UPPER('Camila'), '12344444444', '1999-11-05', '44444444444', UPPER('Avenida do Saber'), UPPER('camila@gmail.com'), 'senha101112', 1.70, 60, 20.8),
(UPPER('Renata'), '87655555555', '2002-05-20', '55555555555', UPPER('Rua da Aprendizagem'), UPPER('renata@gmail.com'), 'senha131415', 1.68, 58, 20.6);

INSERT INTO aparelho (nomeAparelho, musculoAtivado)
VALUES
(UPPER('Supino'), UPPER('Peito')),
(UPPER('LegPress'), UPPER('Perna')),
(UPPER('Cadeira abdutora'), UPPER('Lateral Perna')),
(UPPER('Cadeira adutora'), UPPER('Interior Perna')),
(UPPER('Elevação Pelvica'), UPPER('Gluteo'));

INSERT INTO exercicio ( idAparelho, exercicio, carga, repeticoes, regiaoCorpoAtivada)
VALUES
(1,UPPER('Adução'), 30, 10, UPPER('Pernas')),
(4,UPPER('Abdução'), 50, 11, UPPER('Pernas')),
(5,UPPER('Panturrilha sentada'), 70, 12, UPPER('Panturrilha')),
(2,UPPER('Desenvolvimento de ombro'), 16, 12, UPPER('Ombros')),
(3,UPPER('Puxador'), 90, 20, UPPER('Costas'));


INSERT INTO treino (idAluno, idProfessor)
	VALUES
	(1,4),
	(5,3),
	(3,1),
	(2,5),
	(4,4);

INSERT INTO exercicio_treino (idTreino, idExercicio)
	VALUES
	(5,5),
	(3,2),
	(1,1),
	(4,5),
	(2,5);



-------ALTERANDO A COLUNA DOS ID

ALTER TABLE Professor
RENAME COLUMN idProfessor TO id_professor;

ALTER TABLE Aluno
RENAME COLUMN idAluno TO id_aluno;

ALTER TABLE Treino
RENAME COLUMN idTreino TO id_treino;

ALTER TABLE Exercicio
RENAME COLUMN idExercicio TO id_exercicio;

ALTER TABLE Aparelho
RENAME COLUMN idAparelho TO id_aparelho;

ALTER TABLE exercicio_treino
RENAME COLUMN idexercicioltreino TO id_exercicio_treino;

-------ALTERANDO AS OUTRAS COLUNAS COM NOMES DIFERENTES


-------PROFESSOR

ALTER TABLE Professor
RENAME COLUMN telefone TO celular;

ALTER TABLE Professor
RENAME COLUMN dataContratacao TO data_contratacao;

-------ALUNO

ALTER TABLE Aluno
RENAME COLUMN telefone TO celular;

-------APARELHO

ALTER TABLE Aparelho
RENAME COLUMN nomeAparelho TO nome_aparelho;

ALTER TABLE Aparelho
RENAME COLUMN musculoAtivado TO musculo_ativado;

-------TREINO

ALTER TABLE Treino
RENAME COLUMN idProfessor TO id_professor;

ALTER TABLE Treino
RENAME COLUMN idAluno TO id_aluno;

-------EXERCICIO

ALTER TABLE Exercicio
RENAME COLUMN idAparelho TO id_aparelho;

ALTER TABLE Exercicio
RENAME COLUMN regiaoCorpoAtivada  TO regiao_corpo_ativa;

-------EXERCICIO_TREINO

ALTER TABLE exercicio_treino
RENAME COLUMN idTreino TO id_treino;

ALTER TABLE exercicio_treino
RENAME COLUMN idExercicio TO id_exercicio;

-------ALTERANDO OS NOT NULL´S E NULL`S


-------PROFESSOR
ALTER TABLE Professor
ALTER COLUMN email  DROP NOT NULL;

ALTER TABLE Professor
ALTER COLUMN senha  DROP NOT NULL;

ALTER TABLE Professor
ALTER COLUMN especialidade  DROP NOT NULL;

ALTER TABLE Professor
ALTER COLUMN data_nascimento SET NOT NULL;

ALTER TABLE Professor
ALTER COLUMN data_contratacao SET NOT NULL;

-------ALUNO
ALTER TABLE Aluno
ALTER COLUMN imc DROP NOT NULL;

ALTER TABLE Aluno
ALTER COLUMN peso DROP NOT NULL;

ALTER TABLE Aluno
ALTER COLUMN altura DROP NOT NULL;

ALTER TABLE Aluno
ALTER COLUMN email DROP NOT NULL;

ALTER TABLE Aluno
ALTER COLUMN senha DROP NOT NULL;

-------APARELHO
ALTER TABLE Aparelho
ALTER COLUMN nome_aparelho DROP NOT NULL;

ALTER TABLE Aparelho
ALTER COLUMN musculo_ativado DROP NOT NULL;

-------EXERCICIO
ALTER TABLE Exercicio
ALTER COLUMN regiao_corpo_ativa DROP NOT NULL;


-------ALTERANDO COM O TYPE


-------PROFESSOR
ALTER TABLE Professor
ALTER COLUMN nome TYPE VARCHAR(100) ;

ALTER TABLE Professor
ALTER COLUMN cpf TYPE VARCHAR(11) ;

ALTER TABLE Professor
ALTER COLUMN formacao TYPE VARCHAR(70) ;

ALTER TABLE Professor
ALTER COLUMN especialidade TYPE VARCHAR(70);

ALTER TABLE Professor
ALTER COLUMN celular TYPE VARCHAR(14);


ALTER TABLE Professor
ALTER COLUMN endereco TYPE VARCHAR(100);


ALTER TABLE Professor
ALTER COLUMN email TYPE VARCHAR(70);


ALTER TABLE Professor
ALTER COLUMN senha TYPE VARCHAR(50);

-------ALUNO
ALTER TABLE Aluno
ALTER COLUMN nome TYPE VARCHAR(100) ;


ALTER TABLE Aluno
ALTER COLUMN cpf TYPE VARCHAR(11) ;


ALTER TABLE Aluno
ALTER COLUMN altura TYPE DECIMAL (5,2) ;


ALTER TABLE Aluno
ALTER COLUMN peso TYPE DECIMAL (5,2) ;


ALTER TABLE Aluno
ALTER COLUMN imc TYPE DECIMAL (5,2);


ALTER TABLE Aluno
ALTER COLUMN celular TYPE VARCHAR(14);


ALTER TABLE Aluno
ALTER COLUMN endereco TYPE VARCHAR(100);


ALTER TABLE Aluno
ALTER COLUMN email TYPE VARCHAR(70);


ALTER TABLE Aluno
ALTER COLUMN senha TYPE VARCHAR(50);

-------APARELHO
ALTER TABLE Aparelho
ALTER COLUMN nome_aparelho TYPE VARCHAR(80) ;


ALTER TABLE Aparelho
ALTER COLUMN musculo_ativado TYPE VARCHAR(80) ;

-------EXERCICIO
ALTER TABLE Exercicio
ALTER COLUMN exercicio TYPE VARCHAR(100);


ALTER TABLE Exercicio
ALTER COLUMN regiao_corpo_ativa TYPE VARCHAR(70);

