import { Schema, model } from "mongoose";
import { IContributor, IVideo } from "./video.interface";

const ContributorSchema = new Schema<IContributor>(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["video editor", "content writer", "thumbnail designer", "admin"],
      required: true,
    },
  },
  { _id: false }
);

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    youtubeLink: { type: String, required: true },
    contributors: { type: [ContributorSchema], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Video = model<IVideo>("Video", VideoSchema);
