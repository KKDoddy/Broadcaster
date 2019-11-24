import express from 'express';
import dotenv from 'dotenv';
import parser from 'body-parser';// routes
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// configuring body-parser to app
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to BROADCASTER' });
});

app.listen(process.env.PORT, () => {
  console.log('Broadcaster server is running...');
});

export default app;