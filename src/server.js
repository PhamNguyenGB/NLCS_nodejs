import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import configCors from "./config/cors";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;

// config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//init web routes
initWebRoutes(app);
initApiRoutes(app);

//test connection DB
// connection();

app.listen(PORT, () => {
    console.log("Backend is running on port " + PORT);
});