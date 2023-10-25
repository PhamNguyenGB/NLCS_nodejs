import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import productController from "../controller/productController";
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
import multer from 'multer';

const upload = multer({ dest: './assets/image' });

const router = express.Router();

const initApiRoutes = (app) => {
    // api routes
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);


    router.post("/admin", apiController.handleLoginAdmin);
    router.post("/register", apiController.handleRegister);
    router.get("/account", checkUserJWT, userController.getUserAccount);
    router.get("/admin/users/read", userController.read);
    router.post("/admin/users/create", userController.create);
    router.put("/admin/users/update", userController.update);
    router.delete("/admin/users/delete", userController.deleteUser);

    router.get("/admin/products/read", productController.readProducts);
    router.post("/admin/products/create", productController.createProducts);

    return app.use("/api/", router);
};

export default initApiRoutes;
