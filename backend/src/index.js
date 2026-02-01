const express = require('express');
const main = require('./config/db');
require('dotenv').config({ path: __dirname + '/.env' });
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis.js');
const problemRouter = require('./routes/problemCreator')
const submitRouter = require('./routes/submit')
const videoRouter = require('./routes/videoCreator')

console.log('🔍 Starting server initialization...');
console.log('PORT:', process.env.PORT);
console.log('DB_CONNECT_STRING:', process.env.DB_CONNECT_STRING ? 'SET' : 'NOT SET');

const app = express();

const cors = require('cors');
const aiRouter = require('./routes/aiChatting');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use('/user', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter)
app.use('/ai', aiRouter)
app.use("/video", videoRouter);


const initializeConnection = async () => {
  try {
    console.log('🔄 Attempting MongoDB connection...');
    await main(); // MongoDB
    console.log("✅ MongoDB Connected");

    // Redis is already connected in config
    console.log("✅ Redis Connected");

    console.log(`🚀 Starting server on port ${process.env.PORT}...`);
    app.listen(process.env.PORT, () => {
      console.log("🚀 Server started on port " + process.env.PORT);
    });
  } catch (err) {
    console.log("❌ Error:", err.message);
    console.error(err);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

console.log('🔄 Calling initializeConnection...');
initializeConnection().catch(err => {
  console.error('❌ Fatal error in initializeConnection:', err);
  process.exit(1);
});
