const { createClient } = require('redis');

console.log('🔍 Loading Redis configuration...');
console.log('📍 Redis Host: redis-14154.c212.ap-south-1-1.ec2.cloud.redislabs.com');
console.log('📍 Redis Port: 14154');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-14154.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14154
        // NO TLS
    }
});

redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err.message);
});

redisClient.on('connect', () => {
    console.log('🔄 Redis connecting...');
});

redisClient.on('ready', () => {
    console.log('✅ Redis Connected Successfully');
});

// Auto-connect when module is loaded
(async () => {
    try {
        console.log('🚀 Attempting Redis connection...');
        await redisClient.connect();
    } catch (error) {
        console.error('❌ Redis Connection Failed:', error.message);
        console.error('Full error:', error);
    }
})();

module.exports = redisClient;