import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
function authentication(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token==null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if(err){
      console.log(err.message)
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })

}

export default authentication;