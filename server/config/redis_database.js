import redis from 'redis';
Promise.all(redis.RedisClient.prototype);
Promise.all(redis.Multi.prototype);

let redisClient = redis.createClient('6379', '127.0.0.1');

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

export default {
    redis,
    redisClient
};