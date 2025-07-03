const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();
const cors = require('@koa/cors');

const authRouter = require('./routes/auth');
const weatherRouter = require('./routes/weather');
const historyRouter = require('./routes/history');
const authMiddleware = require('./middleware/auth');

const app = new Koa();
// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4001'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message || 'Internal Server Error',
      status: ctx.status
    };
    console.error('Server error:', err);
  }
});

const apiRouter = new Router({ prefix: '/api' });

app.use(bodyParser());

apiRouter.use(authRouter.routes());
apiRouter.use('/weather', authMiddleware, weatherRouter.routes());
apiRouter.use('/history', authMiddleware, historyRouter.routes());

app.use(apiRouter.routes());
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));