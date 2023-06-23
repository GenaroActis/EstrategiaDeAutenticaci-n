import UsersDaoMongoDB from "../daos/mongodb/usersDao.js";
const userDao = new UsersDaoMongoDB();
import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
const cartDao = new CartsDaoMongoDB();

export const createUserController = async (req, res, next) =>{
    try {
        const session = req.session
        if(!session){
            res.status(404).redirect('/views/register/Error')
        } else{
            res.status(304).redirect('/views/login');
        };
    } catch (error) {
        next()
    };
};
export const loginUserController = async (req, res, next) =>{
    try {
        const userData = req.body
        const cartId = req.session.cartId
        if(!cartId){
            const createCart = await cartDao.createCart()
            req.session.cartId = createCart._id
            req.session.userData = validate
        }
        res.status(304).redirect('/views/products');
    } catch (error) {
        next(error)
    };
};
export const logoutUserController = async (req, res, next) =>{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else{
                res.redirect('/views/login');
            };
        });
    } catch (error) {
        next(error)
    };
};
export const githubResponseController = async(req, res, next)=>{
    try {
        console.log(req.session)
        res.redirect('/views/profile')
    } catch (error) {
        next(error);
    };
};