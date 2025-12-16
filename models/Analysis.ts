import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalysis extends Document {
  userId: string;
  productivity_score: number;
  total_wasted_hours: number;
  money_wasted: number;
  timeline: {
    activity: string;
    duration_minutes: number;
    category: 'Productive' | 'Wasted' | 'Neutral';
  }[];
  leaks: {
    name: string;
    time_lost: string;
  }[];
  roast: string;
  fixes: string[];
  suggestions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    productivity_score: { type: Number, required: true },
    total_wasted_hours: { type: Number, required: true },
    money_wasted: { type: Number, required: true },
    timeline: [
      {
        activity: { type: String, required: true },
        duration_minutes: { type: Number, required: true },
        category: {
          type: String,
          enum: ['Productive', 'Wasted', 'Neutral'],
          required: true,
        },
      },
    ],
    leaks: [
      {
        name: { type: String, required: true },
        time_lost: { type: String, required: true },
      },
    ],
    roast: { type: String, required: true },
    fixes: [{ type: String, required: true }],
    suggestions: [{ type: String, required: true }],
  },
  { timestamps: true }
);

// Prevent overwriting model if already compiled
const Analysis: Model<IAnalysis> =
  mongoose.models.Analysis || mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

export default Analysis;
