import { Schema, model, Document, Types } from 'mongoose';

export interface Bowler extends Document {
  playerId: Types.ObjectId;
  overs: number;
  runs: number;
  maidens: number;
  wickets: number;
  createdAt: Date;
  updatedAt: Date;
}