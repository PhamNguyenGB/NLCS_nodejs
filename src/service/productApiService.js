import db from "../models/index";

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
            attributes: ["id", "name", "img", "quantity", "price"],
            include: { model: db.List_Product, attributes: ["categoryName", "id"], },
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
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


const createProduct = async (data) => {
    try {
        console.log(data);

        await db.Product.create({
            name: data.name,
            ingredients: data.ingredients,
            objectOfUse: data.objectOfUse,
            price: data.price,
            img: data.img,
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

module.exports = {
    getAllProducts,
    getProductsWithPagination,
    createProduct,
}