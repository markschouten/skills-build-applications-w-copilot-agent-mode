import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  durationMinutes: number;
  focusAreas: string[];
  createdBy: mongoose.Types.ObjectId;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusAreas: [{ type: String, required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
