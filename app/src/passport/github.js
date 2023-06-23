import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/mongodb/usersDao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID : 'Iv1.9bc6eb5e06e707c9',
    clientSecret: '78c15426ddf12e38dfab579629c62d5ec69c0dc6',
    callbackURL:'http://localhost:8080/views/github-profile'
};

const registerOrLogin = async(accesToken, refreshToken, profile, done) =>{
    const email = profile._json.email 
    let user = await userDao.getUserByEmail(email)
    console.log('profile', email)
    if(!user === []) {
        return done(null, user)
    }else{
        user = await userDao.createUser({
            firstName : profile._json.name.split('')[0],
            lastName: profile._json.name.split('')[1],
            email: email,
            password: '',
            isGithub: true
        });
        return done(null, user)
    };
};

const githubStrategy = new GithubStrategy(strategyOptions, registerOrLogin)
passport.use('github', githubStrategy);

export const frontResponseGithub = {
    failureRedirect: '/views/register/Error',
    successRedirect: '/views/github-profile',
    passReqToCallback: true,
};
