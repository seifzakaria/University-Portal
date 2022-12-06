const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('token');
        const jwt_Password = "abcRaneem";
        const verified = jwt.verify(token, jwt_Password);
        if (!verified){
            return res.status(401).json({msg: "Unauthorized user"});
        }
        req.userid = verified.id;
        if (verified.id.includes("ac")) {
            req.userrole = verified.role;
        }
        else {
            req.userrole = "HR";
        }
        next();        
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
};

module.exports = auth;