import { isActive, IUser, ModeratorApprovalStatus, Role } from "./user.interface";
import httpStatus from "http-status-codes"
import { User } from "./user.model";
import AppError from "../../../helpers/AppError";
import bcrypt from "bcryptjs";
import { envVars } from "../../../config/envConfig";


const createNewUser = async (payload: Partial<IUser> )=>{

const {email , password , ...rest} = payload;

    const isUserExists = await User.findOne({
        email
    })

    if(isUserExists){
        throw new AppError(httpStatus.BAD_REQUEST,'User Already Exist');
    }

    const  passwordHash = await bcrypt.hash(password as string,envVars.BCRYPT_SALT_ROUND);

    const userData: Partial<IUser> = {
        ...rest,
        email,
        password: passwordHash,
        role: payload.role || Role.USER, 
        status: isActive.ACTIVE,
        isVerified: false,
        isDeleted: false,
    };
    if (payload.role === Role.MODERATOR) {
        userData.role = Role.PENDING; 
    }
    const user = await User.create(userData);



    
  
    return user;
}

const updateModeratorApprovalStatus = async (
  userId: string,
  approvalStatus: ModeratorApprovalStatus
) => {
  if (!Object.values(ModeratorApprovalStatus).includes(approvalStatus)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid approval status");
  }

  let newRole = Role.USER;
  if (approvalStatus === ModeratorApprovalStatus.ACCEPTED) {
    newRole = Role.MODERATOR;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      agentApproval: approvalStatus,
      role: newRole,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

export const UserService = {
    createNewUser,
    updateModeratorApprovalStatus
  
}