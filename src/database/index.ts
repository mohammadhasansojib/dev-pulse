import {Pool} from 'pg'
import config from '../config/index.js'

const pool = new Pool({
    connectionString: config.db_connection_string,
})

const initDB = async () => {
    try {
        // await pool.query(
        //     `
        //     CREATE TYPE user_role AS ENUM ('contributor', 'maintainer');
        //     `
        // );
        // await pool.query(
        //     `
        //     CREATE TYPE issue_type AS ENUM ('bug', 'feature_request');
        //     `
        // );
        // await pool.query(
        //     `
        //     CREATE TYPE issue_status AS ENUM ('open', 'in_progress', 'resolved');
        //     `
        // );
        
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role user_role DEFAULT 'contributor',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            `
        );

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description TEXT NOT NULL CHECK (char_length(description) >= 20),
                type issue_type NOT NULL,
                status issue_status DEFAULT 'open',
                reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            `
        );

        console.log("Database connected...");

    } catch (error: any) {
        throw new Error(`Something went wrong: ${error.message}`);
    }
}

export default {
    pool,
    initDB,
}