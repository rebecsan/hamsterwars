let auth = (req, res, next) => {

    if (req.method !== 'GET') {

        const key = process.env.KEY;
        
        if (key === req.headers['authorization']) {
            
            next();
            
        } else {
            
            res.status(400).send({ msg: 'Wrong key'})
            
        }
        
    } else {

        next();

    }
}

module.exports = auth;