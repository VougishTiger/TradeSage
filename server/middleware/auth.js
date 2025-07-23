const jwt= require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req,res,next) {
  const token= req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied'});
  }

  try {
    const decoded= jwt.verify(token.split('')[1], process.env.JWT_SECRET);
    req.user= decoded;
    next();
  } catch(err) {
    res.status(400).json({msg:'Token is not valid'});
  }
}

function verifyAdmin(req,res,next) {
  if(!req.user.is_admin) {
    return res.status(403).json({msg:'Access denied. Admins only.'});
  }
  next();
}

module.exports= {verifyToken, verifyAdmin}; 