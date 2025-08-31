
import { QueryBuilder } from "../../../utils/QueryBuilder";
import { IVideo } from "./video.interface";
import { Video } from "./video.model";

const createVideo = async (payload: IVideo) => {
  const video = await Video.create(payload);
  return video;
};

const getVideos = async (query: Record<string, string>) => {
  const videoQuery = new QueryBuilder(Video.find(), query)
    .filter()
    .search(["title", "description", "contributors.name", "contributors.role"]) 
    .sort()
    .fields()
    .paginate();

  const data = await videoQuery.build();
  const meta = await videoQuery.getMeta();

  return { data, meta };
};

const updateVideo = async (id: string, payload: Partial<IVideo>) => {
  const updatedVideo = await Video.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedVideo;
};
const deleteVideoById = async (id: string) => {
  const deletedVideo = await Video.findByIdAndDelete(id);
  if (!deletedVideo) {
    throw new Error("Video not found");
  }
  return deletedVideo;
};

export const VideoServices = {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideoById,
};
