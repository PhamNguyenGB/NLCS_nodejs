import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
    // api routes
    router.get("/testApi", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.post("/admin", apiController.handleLoginAdmin);


    return app.use("/api/", router);
};

export default initApiRoutes;
