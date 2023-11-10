const jwt = require('jsonwebtoken');

const verifyToken = (roles) => (req, res, next) => {
    const token = req.header('authorization');

    if (!token) {
        return res.status(401).send({ result: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, auth) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send({ result: 'Token expired' });
            } else {
                return res.status(401).send({ result: 'Invalid token' });
            }
        } else {
            req.data = auth;
            console.log(req.data);
            console.log(roles);

            if (roles && roles.length > 0 && roles.indexOf(auth.role) < 0) {
                return res.status(401).send({ result: 'You are not authorized' });
            }
            next();
        }
    });
};


module.exports = { verifyToken }