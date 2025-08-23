import { IUser } from "../user/user.interface";

export enum ContentRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface IRequest {
  subscriberName: string;
  subscriberEmail: string;
  topic: string;
  details?: string;
  user?: IUser;
  status?: ContentRequestStatus;
}
