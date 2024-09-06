import { Document, Types } from 'mongoose';

export interface Match extends Document {
  matchName: string;
  matchType: 'ODI' | 'T20' | 'Test';
  teamA: Types.ObjectId; // Reference to team A
  teamB: Types.ObjectId; // Reference to team B
  currentTeam: Types.ObjectId; // Reference to the team currently batting
  currentBatsmen: {
    playerId: Types.ObjectId; // Reference to the batsman
    role: 'striker' | 'runner'; // Role of the batsman
  }[];
  currentBowler: Types.ObjectId;
  totalruns:number; // Reference to the current bowler
  deliveries: Types.ObjectId[]; // Array of delivery references
  matchStatus: 'in progress' | 'completed'; // Status of the match
  createdAt: Date;
  updatedAt: Date;
}
