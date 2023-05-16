const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    create: (req, res) => {
        let newUser = new User(req.body);
        // newUser.save((err) => {
        //     if(err) {
        //         res.render('userViews/signupUser', {
        //             error: true,
        //             message: 'User already exist',
        //             user: req.body
        //         })
        //     } else {
        //         res.redirect('/blog');
        //     }   
        // });

        newUser
        .save()
        .then(() => {
            res.redirect("/blog");
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.render('userViews/signupUser', {
                    error: true,
                    message: 'User already exist',
                    user: req.body
                })
            }
        }); 
    },

    login: (req, res) => {

        User
        .findOne({email: req.body.email})
        .then((user) => {
            // console.log(user);
            if(!user) {
                res.render('userViews/loginUser', {
                    error: true,
                    message: 'That user not exist',
                    user: req.body
                    })
                    return;
            } else {
                bcrypt.compare(req.body.password, user.password, (err, logged) => {

                    if (err) {
                        res.render('userViews/loginUser', {
                            error: true,
                            message: 'Login error',
                            user: req.body
                            })
                        return;
                    }

                    if (logged) {
                        const token = user.generateAuthToken(user);
                        // res.send(token);
                        res.cookie('AuthToken', token);
                        res.redirect('/blog');
                    } else {
                        res.render('userViews/loginUser', {
                            error: true,
                            message: 'Login data do not match',
                            user: { email: req.body.email, password: '' }
                            })
                        return;
                    }
                })
            }
            
      })
      .catch((err) => {
            res.send(err);
        })
    },

    logout: (req, res) => {
        res.clearCookie('AuthToken');
        res.redirect('/user/login');
    }
}