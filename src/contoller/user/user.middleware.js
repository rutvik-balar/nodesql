const jwt = require('jsonwebtoken');

    const verifyToken = (roles) => (req, res, next) => {
    const token = req.header('authorization');
    jwt.verify(token, process.env.JWT_SECRET, (error, auth) => {
        if (error) {
            res.status(401).send({ result: 'Unauthorized user' })
        } else {
            req.data = auth
            console.log(req.data);
            console.log(roles);

            if (roles.indexOf(auth.role) < 0) {
                res.status(401).send({ result: 'you are not admin' })
            }
            console.log(roles.indexOf(auth.role));
            
            next();
        }
    })
}


module.exports = { verifyToken }