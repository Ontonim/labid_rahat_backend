export interface IContributor {
  name: string;
  role: "video editor" | "content writer" | "thumbnail designer" | "admin";
}

export interface IVideo {
  title: string;
  description?: string;
  youtubeLink: string;
  contributors: IContributor[];
  createdAt?: Date;
}
