import { Types,Document} from "mongoose";

export interface over extends Document
{
    matchId: Types.ObjectId;
    overNumber: number;
    deliveries: {
      deliveryId: Types.ObjectId;
      deliveryType: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}