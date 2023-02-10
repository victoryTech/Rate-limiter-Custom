const express = require('express');

const rateLimiterMiddleware = require('./middlewares/rate-limiter-middleware.js');

const PORT = process.env.PORT || 3000;

const app = express();


app.get('/api/home', (req, res) => {
    res.send(`Rendered home page.`);
});

app.get('/api/post', rateLimiterMiddleware.rateLimiter(10, 60 * 1000), (req, res) => {
    res.send(`Post Created from IP : ${req.ip}`);
});

  
app.listen(PORT, (err) => {
    if(err)
        return console.log(`Error in running servre : ${err}`);

    console.log(`Example app listening on port : ${PORT}!`);
});
  
  
  
  
  