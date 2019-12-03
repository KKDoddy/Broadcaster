import express from 'express';
import dotenv from 'dotenv';
import parser from 'body-parser';
import authRoutes from './v1/routes/auth';
import rfRoutes from './v1/routes/red-flags';
import authRoutes2 from './v2/routes/auth';
import rfRoutes2 from './v2/routes/red-flags';

dotenv.config();

const app = express();

// configuring body-parser to app
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/red-flags', rfRoutes);
app.use('/api/v2/auth', authRoutes2);
app.use('/api/v2/red-flags', rfRoutes2);

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'welcome to BROADCASTER' });
});

app.get('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Resource not found' });
});

app.listen(process.env.PORT, () => {
  console.log('Broadcaster server is running...');
});

export default app;
