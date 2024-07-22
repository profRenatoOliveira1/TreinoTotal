import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DatabaseModel } from '../model/DatabaseModel';

const SECRET = process.env.SECRET_KEY || 'MundoSENAI2024';
const database = new DatabaseModel().pool;

interface JwtPayload {
    id: number;
    nome: string;
    email: string;
    exp: number;
}

export class Authentication {

    /**
     * Valida as credenciais do usuário no banco de dados
     * @param req Requisição com as informações do usuário
     * @param res Resposta enviada a quem requisitou o login
     * @returns Token de autenticação caso o usuário seja válido, mensagem de login não autorizado caso negativo
     */
    static async validacaoUsuarioAluno(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;

        const querySelectUser = `SELECT id_professor, nome, email FROM professor WHERE email=$1 AND senha=$2;`;

        try {
            const queryResult = await database.query(querySelectUser, [email, password]);

            if (queryResult.rowCount != 0) {
                const professor = {
                    id_professor: queryResult.rows[0].id_professor,
                    nome: queryResult.rows[0].nome,
                    email: queryResult.rows[0].email
                }

                const tokenAluno = Authentication.generateToken(parseInt(professor.id_professor), professor.nome, professor.email);

                return res.status(200).json({ auth: true, token: tokenAluno, aluno: professor });
            } else {
                return res.status(401).json({ auth: false, token: null, message: "Usuário e/ou senha incorretos" });
            }
        } catch (error) {
            console.log(`Erro no modelo: ${error}`);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    /**
     * Gera token de validação do usuário
     * 
     * @param id ID do usuário no banco de dados
     * @param nome Nome do usuário no banco de dados
     * @param email Email do usuário no banco de dados
     * @returns Token de autenticação do usuário
     */
    static generateToken(id: number, nome: string, email: string) {
        return jwt.sign({ id, nome, email }, SECRET, { expiresIn: '1h' });
    }

    /**
     * Verifica o token do usuário para saber se ele é válido
     * 
     * @param req Requisição
     * @param res Resposta
     * @param next Próximo middleware
     * @returns Token validado ou erro
     */
    static verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['x-access-token'] as string;

        if (!token) {
            console.log('Token não informado');
            return res.status(401).json({ message: "Token não informado", auth: false }).end();
        }

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('Token expirado');
                    return res.status(401).json({ message: "Token expirado, faça o login novamente", auth: false }).end();
                } else {
                    console.log('Token inválido.');
                    return res.status(401).json({ message: "Token inválido, faça o login", auth: false }).end();
                }
            }

            const { exp, id } = decoded as JwtPayload;

            if (!exp || !id) {
                console.log('Data de expiração ou ID não encontrada no token');
                return res.status(401).json({ message: "Token inválido, faça o login", auth: false }).end();
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime > exp) {
                console.log('Token expirado');
                return res.status(401).json({ message: "Token expirado, faça o login novamente", auth: false }).end();
            }

            req.body.userId = id;

            next();
        });
    }
}
