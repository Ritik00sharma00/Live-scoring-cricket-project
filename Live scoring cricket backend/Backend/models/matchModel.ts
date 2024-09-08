import { Schema, model, Types} from 'mongoose';
import { Match } from '../Interfaces/matchinterface';
import _deliverySchema from './deliveryModel';
import _overSchema from './overModel';



const matchSchema = new Schema<Match>({
  matchName: { type: String, required: true },
  matchType: { type: String, enum: ['ODI', 'T20'], required: true },
  teamA: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  currentTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  currentBatsmen: {
    type: [{
      playerId: { type: Schema.Types.ObjectId, ref: 'Team.players', required: true },
      role: { type: String, enum: ['striker', 'runner'], required: true }
    }],
    validate: {
      validator: function(v: any[]) {
        return v.length === 2; 
      },
      message: 'currentBatsmen array must contain exactly 2 items (one striker and one runner).'
    }
  },
  currentBowler: { type: Schema.Types.ObjectId  , ref: 'Team.players', required: true },
  deliveries: [{ type: Schema.Types.ObjectId, ref: '_deliverySchema' }], 
  

  matchStatus: { type: String, enum: ['in progress', 'completed'], required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const _matchSchema = model<Match>('Match', matchSchema);

export default _matchSchema;
