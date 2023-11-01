import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import productController from "../controller/productController";
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
import customerController from "../controller/customerController";
import { upload } from '../middleware/uploadFile';
const router = express.Router();

const initApiRoutes = (app) => {
    // api routes

    // Customer routes
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/product/:name/:id", customerController.getProduct);
    router.get("/listProduct/:categoryName", customerController.getProductCategory);

    // Admin users routes
    router.post("/admin", apiController.handleLoginAdmin);
    router.get("/account", checkUserJWT, userController.getUserAccount);
    router.get("/admin/users/read", userController.read);
    router.post("/admin/users/create", userController.create);
    router.put("/admin/users/update", userController.update);
    router.delete("/admin/users/delete", userController.deleteUser);

    // Admin products routes
    router.get("/admin/products/read", productController.readProducts);
    router.post("/admin/products/create", upload.single('img'), productController.createProducts);
    router.delete("/admin/products/delete", productController.deleteProducts);

    router.get("/admin/products/listProduct", productController.getListProduct);


    return app.use("/api/", router);
};

export default initApiRoutes;
