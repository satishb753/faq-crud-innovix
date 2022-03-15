const express = require('express');
const app = express();
const setHeaders = require('./utils/setHeaders');
const authenticationRouter = require('./routers/authentication.router');
const faqsRouter = require('./routers/faqs.router');
const usersRouter = require('./routers/users.router');

app.use(setHeaders);
app.use(express.json());

app.get('/publications', (req, res) => {
    res.send([]);
});

//setting routers
app.use('/authentication', authenticationRouter);
app.use('/faqs', faqsRouter);
app.use('/users', usersRouter);

module.exports = app;