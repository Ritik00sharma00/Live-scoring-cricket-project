import { Types } from 'mongoose';

export interface Delivery {
    
  deliveryType: 'normal' | 'wide' | 'no-ball' | 'bye' | 'leg-bye';  
  runs: number;  
  legal:boolean;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    overthrows: number;  
  };
  dismissal: 'not out' | 'bowled' | 'caught' | 'run out' | 'lbw' | 'stumped' | 'hit wicket' | null;  
  createdAt?: Date;
  updatedAt?: Date;
}
