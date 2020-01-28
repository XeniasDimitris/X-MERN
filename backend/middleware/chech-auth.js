const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header('X-OBSERVATORY-AUTH');
    if (!token) return res.status(401).json({
        message: 'Access Denied'
    })
    try{
        const verified = jwt.verify(token,process.env.JWT_KEY);
        req.user = verified;
        req.token = token;
        next()
    }catch (err){
        res.status(401).json({
            message:"Access Denied"
        })
    }
}