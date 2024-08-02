import { server } from './server';
import dotenv from 'dotenv';
import { DatabaseModel } from "./model/DatabaseModel";

/**
 * Módulo para carregar as variáveis de ambiente
 */
dotenv.config();

/**
 * Configuração da porta do servidor
 */
const port: number = parseInt(process.env.SERVER_PORT as string);

/**
 * Inicia o servidor após a verificação de conexão com o banco de dados
 */
new DatabaseModel().testeConexao().then((resbd) => {
    console.clear();
    if (resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${process.env.SERVER_PORT}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});