const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');



module.exports = (req, res, next) => {
    // res.render('userViews/loginUser', {
    //     error: true,
    //     message: 'Please login to use app',
    //     })
    const token = req.cookies['AuthToken'];
    // console.log(token);
    try {
        if(!token) {
            res.redirect('/user/login?loginRedirect=true');
        } else {
            const decoded = jwt.verify(token, 'secret');

            User.findById(decoded._id).then((user) => {
                if(!user) {
                    res.redirect('/user/login?loginRedirect=true');
                } else {
                    res.locals.userId = decoded._id;
                    res.locals.userName = user.name;
                    next();
                }

            }).catch((err) => {
                res.redirect('/user/login?loginRedirect=true');
            })
            // console.log(decoded);    
        }
    } catch {
        res.redirect('/user/login?loginRedirect=true'); 
    }
};