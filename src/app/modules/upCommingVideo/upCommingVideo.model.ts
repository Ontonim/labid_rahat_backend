// video.model.ts
import { Schema, model } from "mongoose";
import { IVideo } from "./upCommingVideo.interface";

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date, required: true },
    Imageurl: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UpcomingVideoModel = model<IVideo>("UpcomingVideo", videoSchema);
