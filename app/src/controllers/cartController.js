import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
import ProductsDaoMongoDB from "../daos/mongodb/productsDao.js";
import UsersDaoMongoDB from "../daos/mongodb/usersDao.js";
const userDao = new UsersDaoMongoDB();
const cartDao = new CartsDaoMongoDB();
const prodDao = new ProductsDaoMongoDB();

export const createCartController = async (req, res, next) =>{
    try {
        const newCart = await cartDao.createCart()
        res.json(newCart)
    } catch (error) {
        next(error)
    };
};
export const addProductToCartController = async (req, res, next) =>{
    try {
        const userId= req.session.passport.user
        const userData = await userDao.getUserById(userId)
        const cartId = userData.cartId;
        const prodId = req.params.prodId;
        const existenceValidator = await prodDao.getProductById(prodId)
        if(existenceValidator){
            const prodAdded = await cartDao.addProductToCart(prodId, cartId);
            res.json(prodAdded);
        } else{
            res.status(404).json('the product you are trying to add does not exist')
        }
    } catch (error) {
        next(error)
    };
};
export const deleteProductToCartController = async (req, res, next) =>{
    try {
        const userId= req.session.passport.user
        const userData = await userDao.getUserById(userId)
        const cartId = userData.cartId;
        const prodId = req.params.prodId;
        const prodDelete = await cartDao.deleteProductToCart(prodId, cartId)
        if(prodDelete){
            res.json(prodDelete);
        } else{
            res.status(404).json('error: the product you are trying to remove does not exist')
        }
    } catch (error) {
        next(error)
    };
};
export const deleteAllProductsToCartController = async (req, res, next) =>{
    try {
        const userId= req.session.passport.user
        const userData = await userDao.getUserById(userId)
        const cartId = userData.cartId;
        const cartToDelete = await cartDao.deleteAllProductsToCart(cartId)
        res.json(`cart with id ${cartId} successfully products removed`)
    } catch (error) {
        next(error)
    };
};
export const updateQuantityOfProductController = async (req, res, next) =>{
    try {
        const userId= req.session.passport.user
        const userData = await userDao.getUserById(userId)
        const cartId = userData.cartId;
        const prodId = req.params.prodId;
        const newQuantity = req.body.quantity;
        const updatedProd = await cartDao.updateQuantityOfProduct(cartId, prodId, newQuantity)
        if(updatedProd){
            res.json(updatedProd);
        } else{
            res.status(404).json('error: the product you are trying to remove does not exist')
        }
    } catch (error) {
        next(error)
    };
};