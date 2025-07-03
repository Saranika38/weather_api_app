const Router = require('@koa/router');
const weatherController = require('../controllers/weather');

const router = new Router();

router.get('/', async (ctx) => {
  console.log('Weather request received:', { query: ctx.query, userId: ctx.state.userId });
  const location = ctx.query.location;
  if (!location) {
    ctx.status = 400;
    ctx.body = { error: 'Location is required' };
    return;
  }

  try {
    const weatherData = await weatherController.getWeather(location, ctx.state.userId);
    ctx.body = weatherData;
  } catch (error) {
    console.error('Error in weather route:', error);
    ctx.status = error.response?.status || 500;
    ctx.body = { 
      error: error.message,
      details: error.response?.data || 'Internal server error'
    };
  }
});

module.exports = router;
