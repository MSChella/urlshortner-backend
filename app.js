const express = require("express");
const APP_SERVER = express();





const userRouter = require('./routes/auth.routes');



APP_SERVER.use('/api/auth', userRouter);


module.exports = APP_SERVER;