import db from "../models/index";
import fs from 'fs';
import path from 'path';

const getAllProducts = async () => {
    try {
        let products = await db.Product.findAll({
            attributes: ["id", "name", "img", "quantity", "price"],
            include: { model: db.List_Product, attributes: ["categoryName"], },
        });
        if (products) {
            return {
                EM: 'success',
                EC: 0,
                DT: products,
            };
        }
        else {
            return {
                EM: 'success',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting users',
            EC: 1,
            DT: '',
        };
    }
}

const getProductsWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: limit,
            include: { model: db.List_Product, attributes: ["categoryName", "id"], },
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            products: rows,
        }

        return {
            EM: 'fetch  OKE',
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting users',
            EC: 1,
            DT: '',
        };
    }
}


const createProduct = async (data, file) => {
    try {
        await db.Product.create({
            name: data.name,
            ingredients: data.ingredients,
            objectOfUse: data.objectOfUse,
            price: data.price,
            img: "http://localhost:8888/image/" + file.filename,
            quantity: data.quantity,
            uses: data.uses,
            preserve: data.preserve,
            pack: data.pack,
            origin: data.origin,
            productionSite: data.productionSite,
            listProductId: data.listProductId,
        });
        return {
            EM: 'create successful',
            EC: 0,
            DT: [],
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting create user',
            EC: 1,
            DT: '',
        };
    }
};

const deleteProduct = async (id) => {
    try {
        let user = await db.Product.findOne({
            where: { id: id }
        });

        if (user) {
            await user.destroy();
            return {
                EM: 'Delete product successfully',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'product not exist',
                EC: 2,
                DT: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error from service',
            EC: 1,
            DT: [],
        };
    }
};

const getListProductService = async () => {
    try {
        let data = await db.List_Product.findAll({
            order: [
                ['categoryName', 'ASC']
            ]
        });
        return {
            EM: 'Get list product successfully',
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error from service',
            EC: 1,
            DT: [],
        };
    }
};

const deleteFile = async (idProduct) => {
    try {
        let product = await db.Product.findOne({
            where: { id: idProduct }
        });
        if (product) {
            const pathName = path.join(__dirname, '../assets/image/');
            const fileName = product.dataValues.img.split('/')[4];
            await fs.unlink(pathName + fileName, (err) => console.log(err));
            return {
                EM: 'Delete file successfully',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'product not found',
                EC: 2,
                DT: '',
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error delete file',
            EC: 1,
            DT: '',
        };
    }
};

const updateProduct = async (idProduct, data, file) => {
    try {
        let product = await db.Product.findOne({
            where: { id: idProduct }
        });
        if (product) {
            if (file) {
                await product.update({
                    name: data.name,
                    ingredients: data.ingredients,
                    objectOfUse: data.objectOfUse,
                    price: data.price,
                    img: "http://localhost:8888/image/" + file.filename,
                    quantity: data.quantity,
                    uses: data.uses,
                    preserve: data.preserve,
                    pack: data.pack,
                    origin: data.origin,
                    productionSite: data.productionSite,
                    listProductId: data.listProductId,
                });
            } else {
                await product.update({
                    name: data.name,
                    ingredients: data.ingredients,
                    objectOfUse: data.objectOfUse,
                    price: data.price,
                    quantity: data.quantity,
                    uses: data.uses,
                    preserve: data.preserve,
                    pack: data.pack,
                    origin: data.origin,
                    productionSite: data.productionSite,
                    listProductId: data.listProductId,
                });
            }
            return {
                EM: 'update user successfully',
                EC: 0,
                DT: '',
            };
        } else {
            return {
                EM: 'product not found',
                EC: 2,
                DT: '',
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error update product',
            EC: 1,
            DT: '',
        };
    }
};

module.exports = {
    getAllProducts,
    getProductsWithPagination,
    createProduct,
    deleteProduct,
    getListProductService,
    updateProduct,
    deleteFile,
}