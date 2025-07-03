// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

module.exports = async (ctx, next) => {
  console.log('Auth middleware - checking authorization');
  const authHeader = ctx.headers.authorization;
  
  if (!authHeader) {
    console.log('Auth middleware - no authorization header');
    ctx.throw(401, 'No token provided');
  }

  console.log('Auth middleware - authorization header present');
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    console.log('Auth middleware - no token in authorization header');
    ctx.throw(401, 'Invalid authorization format');
  }

  try {
    console.log('Auth middleware - verifying token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - token verified, userId:', decoded.userId);
    ctx.state.userId = decoded.userId;
    await next();
  } catch (err) {
    console.error('Auth middleware - token verification failed:', err.message);
    ctx.throw(401, `Invalid token: ${err.message}`);
  }
};
