import express from 'express';
import dotenv from 'dotenv';
import parser from 'body-parser';
import authRoutes from './routes/auth';
import rfRoutes from './routes/red-flags';

dotenv.config();

const app = express();

// configuring body-parser to app
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/red-flags', rfRoutes);

app.get('/', (req, res) => {
  res.status(200).json({status: 200, message: 'welcome to BROADCASTER' });
});

app.get('*', (req,res)=>{
  res.status(404).json({status: 404, message: 'Resource not found' });
});

app.listen(process.env.PORT, () => {
  console.log('Broadcaster server is running...');
});

export default app;
