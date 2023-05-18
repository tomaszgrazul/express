const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    create: (req, res) => {
        let newUser = new User(req.body);

        newUser
        .save()
        .then(() => {
            res.json({ name: newUser.name, email: newUser.email });
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.json({
                    error: true,
                    message: 'User already exist'
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
                res.json({
                    error: true,
                    message: 'That user not exist',
                    user: req.body
                    })
                    return;
            } else {
                bcrypt.compare(req.body.password, user.password, (err, logged) => {

                    if (err) {
                        res.json({
                            error: true,
                            message: 'Login error'
                            })
                        return;
                    }

                    if (logged) {
                        const token = user.generateAuthToken(user);
                        res.json({ name: user.name, jwt: token });
                    } else {
                        res.json({
                            error: true,
                            message: 'Login data do not match'
                            })
                        return;
                    }
                })
            }
            
      })
      .catch((err) => {
            res.json({ error: 'error'});
        })
    }
}