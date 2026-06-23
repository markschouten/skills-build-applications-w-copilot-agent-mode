import express from 'express';
import { connectDatabase, getDatabaseUri } from './config/database';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Workout from './models/Workout';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName ? `${codespaceName}-8000.githubpreview.dev` : 'localhost';
const apiProtocol = codespaceName ? 'https' : 'http';
const apiUrl = `${apiProtocol}://${apiHost}`;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send({ status: 'OctoFit Tracker backend is running.', apiUrl });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().populate('team', 'name description');
  res.json({ users });
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email role');
  res.json({ teams });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json({ activities });
});

app.get('/api/leaderboard', async (_req, res) => {
  const entries = await Leaderboard.find().populate('user', 'name email');
  res.json({ leaderboard: entries });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().populate('createdBy', 'name email');
  res.json({ workouts });
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB at', getDatabaseUri());
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on ${apiProtocol}://${apiHost}`);
      console.log(`Local port available at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
