import { isActive, IUser, Role} from "./user.interface";
import httpStatus from "http-status-codes"
import { User } from "./user.model";
import AppError from "../../../helpers/AppError";
import bcrypt from "bcryptjs";
import { envVars } from "../../../config/envConfig";
import { QueryBuilder } from "../../../utils/QueryBuilder";

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
        role: payload.role || Role.MEMBER,
        status: isActive.ACTIVE,
     
        isDeleted: false,
    };
    
    const user = await User.create(userData);



    
  
    return user;
};

const updateUser = async (userId: string, updateData: Partial<IUser>) => {
  if (updateData && "access" in updateData) {
    delete updateData.access;
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Access field cannot be updated directly"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser)
    throw new AppError(httpStatus.NOT_FOUND, "User not found");

  return updatedUser;
};


const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    User.find({ isDeleted: false }),
    query
  )
    .filter()
    .search(["name"])
    .sort()
    .paginate();

  const data = await queryBuilder.build();
  const meta = await queryBuilder.getMeta();

  return { data, meta };
};


const getSingleUser = async (userId: string) => {
  const user = await User.findOne({ _id: userId, isDeleted: false }); 
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};


const getUsersByRole = async (role: string) => {
  if (!Object.values(Role).includes(role as Role)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid role");
  }

  const users = await User.find({ role, isDeleted: false }); 
  return users;
};





const updateAccountStatus = async (id: string, status?: string) => {
  if (!status || typeof status !== 'string') {
    throw new AppError(httpStatus.BAD_REQUEST, "Status is required and must be a string");
  }

  const normalizedStatus = status.trim().toLowerCase() as isActive;

  if (!Object.values(isActive).includes(normalizedStatus)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid account status");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isActive: normalizedStatus }, // এখানে ঠিক করা হয়েছে
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

const updateUserRole = async (userId: string, newRole: Role) => {
  
  if (!Object.values(Role).includes(newRole)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid role");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }


  return updatedUser;
};
const getAllLimitedMembers = async () => {
  const members = await User.find({ access: Role.MEMBER, isDeleted: false }) 
    .select("name role bio expertise image");
  return members;
};

const deleteUser = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
 
  const deletedUser = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  );
  return deletedUser;
}
export const UserService = {
  getAllUsers,
  getSingleUser,
  getUsersByRole,
  createNewUser,
  getAllLimitedMembers,
  updateAccountStatus,
  updateUser,
  updateUserRole,
  deleteUser
}