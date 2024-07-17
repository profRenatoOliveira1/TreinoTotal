import { server } from './server';
import dotenv from 'dotenv';
import { DatabaseModel } from "./model/DatabaseModel";

dotenv.config();

const port: number = parseInt(process.env.SERVER_PORT as string); // Define a porta do servidor

new DatabaseModel().testeConexao().then((resbd) => {
    console.clear();
    if (resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${process.env.SERVER_EXPOSED_PORT}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});