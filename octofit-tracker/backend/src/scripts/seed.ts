import mongoose from 'mongoose';
import { getDatabaseUri } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI || getDatabaseUri();

async function seed() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding:', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Avery Chen', email: 'avery@octofit.com', role: 'trainer' },
    { name: 'Jamal Brooks', email: 'jamal@octofit.com', role: 'member' },
    { name: 'Sophia Patel', email: 'sophia@octofit.com', role: 'member' },
  ]);

  const team = await Team.create({
    name: 'Peak Performers',
    description: 'A dedicated team targeting weekly fitness milestones.',
    members: [users[1]._id, users[2]._id],
  });

  await User.updateMany(
    { _id: { $in: [users[1]._id, users[2]._id] } },
    { team: team._id }
  );

  const workouts = await Workout.create([
    {
      name: 'Full Body Strength',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      focusAreas: ['strength', 'mobility'],
      createdBy: users[0]._id,
    },
    {
      name: 'Morning Cardio Blast',
      difficulty: 'Beginner',
      durationMinutes: 30,
      focusAreas: ['cardio', 'endurance'],
      createdBy: users[0]._id,
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[1]._id,
      type: 'Running',
      durationMinutes: 32,
      distanceKm: 5.2,
      caloriesBurned: 420,
      recordedAt: new Date(),
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 50,
      caloriesBurned: 210,
      recordedAt: new Date(),
    },
  ]);

  const leaderboard = await Leaderboard.create([
    { user: users[1]._id, score: 1420, rank: 1, updatedAt: new Date() },
    { user: users[2]._id, score: 1265, rank: 2, updatedAt: new Date() },
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log('Inserted:', {
    users: users.length,
    team: team.name,
    workouts: workouts.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
  });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding.');
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
