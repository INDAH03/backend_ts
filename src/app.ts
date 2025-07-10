import dotenv from 'dotenv';
import inviteRoutes from './routes/Invite.route';
import projectRoutes from './routes/Project.route';
import sequelize from './config/database';
dotenv.config();

import express from 'express';
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', inviteRoutes); 
app.use('/api', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Halo dari backend TypeScript di Render!");
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});