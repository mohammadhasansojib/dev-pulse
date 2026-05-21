import dotenv from 'dotenv'
import path from 'path'
import { env } from 'process'


dotenv.config({
    path: path.join(process.cwd(), '.env'),
})

const config = {
    port: env.PORT,
    db_connection_string: env.DATABASE_CONNECTION_STRING,
    jwt_secret: env.JWT_SECRET,
}

export default config;
