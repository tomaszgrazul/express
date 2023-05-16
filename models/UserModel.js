const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, {
    timestamps: true
});

User.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {

        if(err) {
            return next();
        }


        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next();
            }

            user.password = hash;
            next();
        })

    })
})

User.methods.generateAuthToken = (user) => {
    const token = jwt.sign({_id: user._id}, 'secret', { expiresIn: '1h' });
    return token;
}

module.exports = mongoose.model('User', User);