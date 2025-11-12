import express from 'express';
import connectDB from './config/db.js';
import authroutes from './routes/auth.routes.js';
import getInforoutes from './routes/getInfo.routes.js';
import uploadFilesRoutes from './routes/uploadFiles.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(express.json());
connectDB();

const port = 2020;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authroutes);
app.use('/api/info', getInforoutes);
app.use('/api/files', uploadFilesRoutes);
app.use('/api/ai', aiRoutes);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});