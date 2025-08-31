// video.service.ts

import { IVideo } from "./upCommingVideo.interface";
import { UpcomingVideoModel } from "./upCommingVideo.model";


const createUpcomingVideoUpdate = async (payload: IVideo) => {
    return await UpcomingVideoModel.create(payload);
  }


   const getUpcomingVideos = async () => {
    const today = new Date();
    return await UpcomingVideoModel.find({ releaseDate: { $gt: today } })
      .sort({ releaseDate: 1 });
  }

export const upCommingVideoService = {
    createUpcomingVideoUpdate,
    getUpcomingVideos,
  };
