export enum isActive {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked"
}
export enum Role {
  USER = "user",
  MODERATOR = "moderator",
  ADMIN = "admin",
  PENDING = "pending",
}

export enum ModeratorApprovalStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}


export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role:Role;
  status?: isActive;
picture?: string; 
  isActive?: isActive;
  isDeleted?: boolean;
   isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
