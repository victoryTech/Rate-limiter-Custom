const limit = (requests, interval) => {
    const cache = new Map();
    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
    
        if (!cache.has(ip)) {
            cache.set(ip, [now]);
            return next();
        }
    
        const times = cache.get(ip);
        times.push(now);
        cache.set(ip, times);
    
        if (times.length > requests) {
            if (now - times[0] < interval) {
                return res.status(429).send(`Too many requests, please try again after ${interval}ms.`);
            }
    
            cache.set(ip, [now]);
        }
    
        next();
    };
};

module.exports = {
    rateLimiter : limit
}