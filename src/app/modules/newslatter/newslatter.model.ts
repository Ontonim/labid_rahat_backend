// newsletter.model.ts
import mongoose, { Schema } from "mongoose";
import { INewsletter } from "./newslatter.interface";


const NewsletterSchema: Schema = new Schema<INewsletter>({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date().toISOString() },
});

export const Newsletter = mongoose.model<INewsletter>("Newsletter", NewsletterSchema);
