import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";

const router = express.Router();

const initApiRoutes = (app) => {
    // api routes
    router.get("/testApi", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.post("/admin", apiController.handleLoginAdmin);

    router.get("/admin/users/read", userController.read);
    router.post("/admin/users/create", userController.create);
    router.put("/admin/users/update", userController.update);
    router.delete("/admin/users/delete", userController.deleteUser);

    return app.use("/api/", router);
};

export default initApiRoutes;
