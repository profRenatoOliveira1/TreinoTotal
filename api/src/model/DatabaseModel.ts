import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseModel {
    private _config: pg.PoolConfig;
    private _pool: pg.Pool;

    constructor() {
        this._config = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT as string),
            max: 10,
            idleTimeoutMillis: 10000
        };

        this._pool = new pg.Pool(this._config);
    }

    public async getConnection(user: string, password: string) {
        const config = {
            ...this._config,
            user: user,
            password: password
        };
        return new pg.Pool(config).connect();
    }

    public async testeConexao() {
        try {
            const client = await this._pool.connect();
            console.log('Database connected!');
            client.release(); // Liberar o cliente de volta ao pool
            return true;
        } catch (error) {
            console.error('Error connecting to database:');
            console.error(error);
            return false;
        }
    }

    public get pool() {
        return this._pool;
    }
}
