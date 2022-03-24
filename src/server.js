import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import cors from 'cors';
import path from 'path';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(ExpressMongoSanitize({ allowDots:true, replaceWith:'_'}));


import authenticationRouter from './routes/api/authentication.router.js';
import faqsRouter from './routes/api/faqs.router.js';
import usersRouter from './routes/api/users.router.js';
import companiesRouter from './routes/api/companies.router.js';


//setting routers
app.use('/api/authentication', authenticationRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/users', usersRouter);
app.use('/api/companies', companiesRouter);


//client side reactJS SPA routing:
const __dirname = path.resolve();
const publicPath = path.join(__dirname, 'public');
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

export default app;