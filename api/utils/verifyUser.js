import jwt from 'jsonwebtoken';
export const verifyToken=(res,res,next)=>{
const token  = req.cookies.acces_token;
if(!token) return next(eventHandler(401,'unauthorized'));
jwt.verify(token,process.JWT_SECRET,(err,user)=>{
    if(err)return next(eventHandler(403,'Forbidden'));
    req.user = user;
    next();
})
}