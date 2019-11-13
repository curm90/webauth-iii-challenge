const express = require('express');
const helmet = require('helmet');

const userRouter = require('./src/users/user-router');
const authRouter = require('./src/users/auth-router');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api', authRouter);

app.get('/', (req, res) => {
  res.send('server running');
});

module.exports = app;
