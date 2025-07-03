// authRoutes.js
const Router = require('@koa/router');
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

const router = new Router({ prefix: '/auth' });

router.post('/register', async (ctx) => {
  try {
    console.log('Registration attempt:', { username: ctx.request.body.username });
    const { username, password } = ctx.request.body;
    
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = { error: 'Username and password are required' };
      return;
    }

    await authController.register(username, password);
    console.log('Registration successful for user:', username);
    
    ctx.status = 201;
    ctx.body = { message: 'User registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    ctx.status = error.status || 500;
    ctx.body = { 
      error: error.message || 'Registration failed',
      status: ctx.status
    };
  }
});

router.post('/login', async (ctx) => {
  try {
    console.log('Login attempt:', { username: ctx.request.body.username });
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.status = 400;
      ctx.body = { error: 'Username and password are required' };
      return;
    }

    const { token, expiresIn } = await authController.login(username, password);
    console.log('Login successful for user:', username);

    ctx.body = { token, expiresIn, message: 'Login successful' };
  } catch (error) {
    console.error('Login error:', error);
    ctx.status = error.status || 401;
    ctx.body = { 
      error: error.message || 'Invalid credentials',
      status: ctx.status
    };
  }
});

router.get('/verify', authMiddleware, async (ctx) => {
  try {
    // If middleware passes, token is valid
    ctx.body = { 
      valid: true,
      user: ctx.state.user
    };
  } catch (error) {
    console.error('Token verification error:', error);
    ctx.status = 401;
    ctx.body = { 
      valid: false,
      error: 'Invalid token'
    };
  }
});

module.exports = router;