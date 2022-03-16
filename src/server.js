import express from 'express';

import authenticationRouter from './routes/api/authentication.router.js';
import faqsRouter from './routes/api/faqs.router.js';
import usersRouter from './routes/api/users.router.js';

const app = express();

app.use(express.json());

//setting routers
app.use('/api/authentication', authenticationRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/users', usersRouter);

export default app;