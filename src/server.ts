import config from "./config/index.js";
import app from './app.js'
import db from './database/index.js'


const main = () => {

    app.listen(config.port, () => console.log(`Server running at port ${config.port}...`));
    db.initDB();
    
}


main();