const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const { submitCode,runCode } = require('../controllers/userSubmission'); // <- destructure karna hoga
const submitCodeRateLimiter = require('../middleware/rateLimiter');
const submitRouter = express.Router();
 

// submitRouter.post('/submit/:id', userMiddleware,submitCodeRateLimiter, submitCode);
submitRouter.post('/submit/:id', userMiddleware,submitCodeRateLimiter, submitCode);
submitRouter.post('/run/:id',userMiddleware,submitCodeRateLimiter,runCode);
//submitRouter.post('/run/:id',userMiddleware,submitCodeRateLimiter,runCode);

module.exports = submitRouter;
