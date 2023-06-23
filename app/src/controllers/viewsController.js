import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
import ProductsDaoMongoDB from "../daos/mongodb/productsDao.js";
const cartDao = new CartsDaoMongoDB();
const prodDao = new ProductsDaoMongoDB();

export const getAllProductsController = async (req, res, next) =>{
    try {
        const { page, limit, key, value, sortField, sortOrder } = req.query;
        const allProducts = await prodDao.getAllProducts(page, limit, key, value, sortField, sortOrder);
        const nextLink = allProducts.hasNextPage ? `http://localhost:8080/products?page=${allProducts.nextPage}` : null
        const prevLink = allProducts.hasPrevPage ? `http://localhost:8080/products?page=${allProducts.prevPage}` : null
        const userData = req.session.userData
            const productsFile = {
                results: allProducts.docs,
                userData: userData,
                info: {
                    count: allProducts.totalDocs,
                    pages: allProducts.totalPages,
                    actualPage: allProducts.page,
                    hasPrevPage: allProducts.hasPrevPage,
                    hasNextPage: allProducts.hasNextPage,
                    nextPageLink: nextLink,
                    prevPageLink: prevLink
                }
            };
        res.render('products', {productsFile});
    } catch (error) {
        next(error)
    };
};
export const getCartController = async (req, res, next) =>{
    try {
        const cartId = req.session.cartId;
        if(!cartId){
            res.redirect('/views/login')
        }else{
            const cart = await cartDao.getCart(cartId);
            res.render('carts', {cart});
        }
    } catch (error) {
        next(error)
    };
};
export const renderRegisterController = async(req, res, next) =>{
    try {
        res.render('register');
    } catch (error) {
        next(error)
    };
};
export const renderLoginController = async(req, res, next) =>{
    try {
        res.render('login');
    } catch (error) {
        next(error)
    };
};
export const renderRegisterErrorController = async(req, res, next) =>{
    try {
        res.render('registerError');
    } catch (error) {
        next(error)
    };
};
export const renderLoginErrorController = async(req, res, next) =>{
    try {
        res.render('loginError');
    } catch (error) {
        next(error)
    };
};
export const renderProfile = async(req, res, next) =>{
    try {
        res.render('profile');
    } catch (error) {
        next(error)
    };
};