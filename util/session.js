const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('../database/redis');

// Session Expiration Time
const sessionDefaultTime = 60000 * 60 * 24;

// Enable Session
module.exports = session({
  secret: process.env.SECRET, // hashing
  saveUninitialized: true,
  cookie: {
    maxAge: sessionDefaultTime,
    secure: false, // requires HTTPS connections
    httpOnly: true,
    sameSite: true, // blocks CORS requests on cookies
  },
  store: new RedisStore({ client: redisClient, ttl: 86400 }), // expire will override ttl
  resave: false, // resave: false -> this param forces the session to store the session store
});
