const jwt = require('jsonwebtoken');


function auth(req,res,next){


    const token = req.cookies.token;


    if (!token){
        return res.status(401).json({
            message:'unauthorised'
        })
    }


    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        req.user= decode;
        return next();
        
    } catch (error) {

        return res.status(401).json({
            message:'unauthorised'
        })
        
    }

}

module.exports= auth;



