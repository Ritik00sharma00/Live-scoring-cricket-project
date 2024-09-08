import {Types,Schema,model,Document} from 'mongoose';
import { over } from '../Interfaces/overInterfaces';


const  overSchema = new Schema<over>({
    _id:Schema.Types.ObjectId,
    matchId:{type:Schema.Types.ObjectId, ref:'_matchSchema',required:true},
    overNumber: { type: Number, required: true },
    deliveries: [
      {
        deliveryId: { type: Schema.Types.ObjectId, ref: 'Delivery', required: true }, 
        deliveryType: { type: String, enum: ['normal', 'wide', 'no-ball'], required: true },
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const _overSchema = model<over>('Over', overSchema);

export default _overSchema;