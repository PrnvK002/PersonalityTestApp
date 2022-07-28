import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import connectDB from './config/connection.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import personalityTestRoutes from './routes/personalityTestRouter.js';

//========= database connection ===========
connectDB();

const app = express();

//=========== Cors =================
app.use(cors({ origin : "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//setting up logger
app.use(logger("dev"));

//============= ADding routers ============

app.use('/api/v1',personalityTestRoutes);

//============= Error handler middlewares ======

app.use(notFound);
app.use(errorHandler);

app.listen(5000,console.log('server started at port 5000'));
