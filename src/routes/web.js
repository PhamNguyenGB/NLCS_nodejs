import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.homePage);
    router.get("/user", homeController.userPage);
    router.post("/user/create-user", homeController.handleCreateUser);
    router.get("/user/:id/delete", homeController.handleDeleteUser);
    router.get("/user/:id/update", homeController.getUpdateUser);
    router.post("/user/update-user", homeController.handleUpdateUser);

    return app.use("/", router);
};

export default initWebRoutes;
