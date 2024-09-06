import { Schema, model, Document, Types } from 'mongoose';
import { Delivery } from '../Interfaces/deliveryInterface';
import _matchSchema from './matchModel';

const deliverySchema = new Schema<Delivery>({  
    deliveryType: { 
    type: String, 
    enum: ['normal', 'wide', 'no-ball', 'bye', 'leg-bye'], 
    required: true 
  },
  legal: { type: Boolean, required: true},
  extras: {
    wides: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    byes: { type: Number, default: 0 },
    legByes: { type: Number, default: 0 },
    overthrows: { type: Number, default: 0 }
  },
  runs: [{ type: Number, required: true, default: 0 }],
  dismissal: { 
    type: String, 
    enum: ['not out', 'bowled', 'caught', 'run out', 'lbw', 'stumped', 'hit wicket', null], 
    default: 'not out'  
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



const _deliverySchema = model<Delivery>('Delivery',deliverySchema);
export default _deliverySchema;
