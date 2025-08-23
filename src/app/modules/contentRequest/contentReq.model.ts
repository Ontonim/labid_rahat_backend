import { Schema, model } from "mongoose";
import { IRequest } from "./contentReq.interface";



const requestSchema = new Schema<IRequest>(
  {
    subscriberName: { type: String, required: true },
    subscriberEmail: { type: String, required: true },
    topic: { type: String, required: true },
    details: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export const ContentRequestModel = model<IRequest>("Request", requestSchema);
