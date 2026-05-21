import config from "./config/index.js";
import app from './app.js'


const main = () => {
    app.listen(config.port, () => console.log(`Server running at port ${config.port}...`));
}

main();