import productApiService from '../service/productApiService';

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
        console.log("check req", req);
        let data = await productApiService.createProduct(req.body);
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

module.exports = {
    readProducts,
    createProducts,
}