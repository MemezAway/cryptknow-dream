import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import winston from 'winston';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js'; // import after defining

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json( {limit: '50mb'} ));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'dalle-app' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.get('/', async (req, res) => {
  res.send('Hello from DALL-E!');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
  app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
  });  
};

startServer();
