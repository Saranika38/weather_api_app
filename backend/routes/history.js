// history.js
const Router = require("@koa/router");
const historyController = require("../controllers/history");

const router = new Router();

router.get("/", async (ctx) => {
  try {
    console.log('History Route - Received GET request');
    const userId = ctx.state.userId;
    console.log('History Route - Authenticated user ID:', userId);

    const history = await historyController.getHistory(userId);
    
    if (history && history.length > 0) {
      console.log('History Route - Returning history records:', history.length);
      ctx.body = history;
    } else {
      console.log('History Route - No history found for user:', userId);
      ctx.status = 404;
      ctx.body = { error: "No search history found for this user" };
    }
  } catch (error) {
    console.error('History Route - Error processing request:', error);
    ctx.status = 500;
    ctx.body = { 
      error: "Failed to fetch search history",
      details: error.message
    };
  }
});

router.delete("/", async (ctx) => {
  try {
    console.log('History Route - Received DELETE request');
    const userId = ctx.state.userId;
    console.log('History Route - Clearing history for user:', userId);

    const result = await historyController.clearHistory(userId);
    console.log('History Route - History cleared successfully');
    ctx.body = result;
  } catch (error) {
    console.error('History Route - Error clearing history:', error);
    ctx.status = 500;
    ctx.body = { 
      error: "Failed to clear search history",
      details: error.message
    };
  }
});

module.exports = router;
