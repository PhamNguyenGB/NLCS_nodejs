import customerService from '../service/customerService';

// const readProducts = async (req, res) => {
//     try {
//         if (req.query.page && req.query.limit) {
//             let page = req.query.page;
//             let limit = req.query.limit;
//             let data = await customerService.getProductsWithPagination(+page, +limit);
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             });
//         } else {
//             let data = await customerService.getAllProducts();
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server read',
//             EC: '-1',
//         });
//     }
// };

// const createProducts = async (req, res) => {
//     try {
//         console.log(req.body);
//         console.log(req.body.files);
//         let data = await customerService.createProduct(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server create',
//             EC: '-1',
//         });
//     }
// };

// const deleteProducts = async (req, res) => {
//     try {
//         let data = await customerService.deleteProduct(req.body.id);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server read',
//             EC: '-1',
//         });
//     }
// };

const getProduct = async (req, res) => {
    try {
        let data = await customerService.getProductService(req.params.id);
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

const getProductCategory = async (req, res) => {
    try {
        let data = await customerService.getProductCategoryService(req.params.categoryName);
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

module.exports = {
    getProduct,
    getProductCategory,
}