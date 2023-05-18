const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
const token = req.header('Authorization');
console.log(token);
try {
    if(!token) {
        return res.status(403).json({ message: "Access denied"});
    }
    
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
} catch {
    res.status(400).json({ message: "Invalid token"});
}

};