import { Schema, model, Document, Types } from 'mongoose';

export interface Team extends Document {
  teamName: string;
  players: {
    runs: number;
    playerId: Types.ObjectId;
    playerName: string;
    role:string;
  }[];
  total_runs: number,
  createdAt: Date;
  updatedAt: Date;
}
