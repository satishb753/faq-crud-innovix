import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import cors from 'cors';
import path from 'path';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import mysql from 'mysql2';
import connection from 'express-myconnection';

// var con = mysql.createConnection({
//   host: process.env.MYSQL_DB_HOST || "localhost",
//   user: process.env.MYSQL_DB_USER || "root",
//   password: process.env.MYSQL_DB_PASSWORD || "",
//   port: process.env.MYSQL_DB_PORT || "3306",
//   database: process.env.MYSQL_DB_DATABASE || "taskcrud"
// });

var config = {
  host: process.env.MYSQL_DB_HOST || "localhost",
  user: process.env.MYSQL_DB_USER || "root",
  password: process.env.MYSQL_DB_PASSWORD || "",
  port: process.env.MYSQL_DB_PORT || "3306",
  database: process.env.MYSQL_DB_DATABASE || "taskcrud"
};


const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(ExpressMongoSanitize({ allowDots:true, replaceWith:'_'}));
// Use Mysql Connection
app.use(connection(mysql, config, 'single'));

// routes with mongodb
import authenticationRouter from './routes/api/authentication.router.js';
import faqsRouter from './routes/api/faqs.router.js';
import usersRouter from './routes/api/users.router.js';
import companiesRouter from './routes/api/companies.router.js';
import projectsRouter from './routes/api/projects.router.js';


// routes with mysql  
import mysqlUserRouter from './routes/api/mysql/users.router.js';
import mysqlTaskRouter from './routes/api/mysql/tasks.router.js';


//setting routers for mongodb database
app.use('/api/authentication', authenticationRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/users', usersRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/projects', projectsRouter);


// Routers for mysql database
app.use('/api/mysql/user', mysqlUserRouter);
app.use('/api/mysql/task', mysqlTaskRouter);



//client side reactJS SPA routing:
const __dirname = path.resolve();
const publicPath = path.join(__dirname, 'public');
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

export default app;