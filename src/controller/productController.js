import productApiService from '../service/productApiService';
import fs from 'fs';
import path from 'path';

const readProducts = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await productApiService.getProductsWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            let data = await productApiService.getAllProducts();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
};

const createProducts = async (req, res) => {
    try {
        let data = await productApiService.createProduct(req.body, req.file);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create',
            EC: '-1',
        });
    }
};

const deleteProducts = async (req, res) => {
    try {
        await productApiService.deleteFile(req.body.id);
        let data = await productApiService.deleteProduct(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
};

const getListProduct = async (req, res) => {
    try {
        let data = await productApiService.getListProductService();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
};

const updateProducts = async (req, res) => {
    try {
        if (req.file) {
            await productApiService.deleteFile(req.body.id);
        }
        let data = await productApiService.updateProduct(req.body.id, req.body, req.file);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create',
            EC: '-1',
        });
    }
}

module.exports = {
    readProducts,
    createProducts,
    deleteProducts,
    getListProduct,
    updateProducts,
}