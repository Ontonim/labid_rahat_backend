export enum isActive {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked"
}
export enum Role {
  ADMIN = "admin",
  MODERATOR = "moderator",
  MEMBER = "member",
  USER = "user"
}
export interface IUser {
  _id?: string;
  name: string;
  role: string;
  access?: Role;
  bio?: string;
  expertise?: string[]; 
  image?: string;
  email: string;
  password: string;
  mobile?: string;
  status?: isActive;
  isDeleted?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
