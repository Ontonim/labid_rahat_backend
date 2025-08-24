import { QueryBuilder } from "../../../utils/QueryBuilder";
import { IBlog } from "./blogs.interface";
import { BlogModel } from "./blogs.model";

// ১. Admin blog create
const createBlogByAdmin = async (payload: IBlog, adminId: string) => {
  return await BlogModel.create({
    ...payload,
    status: "approved",
    author: adminId,
    authorModel: "Admin",
  });
};

// ২. User blog submit
const submitBlogByUser = async (payload: IBlog, userId: string) => {
  return await BlogModel.create({
    ...payload,
    status: "pending",
    author: userId,
    authorModel: "User",
  });
};

// ৩. Approve blog
const approveBlog = async (id: string) => {
  return await BlogModel.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true }
  );
};

// ৪. Update blog (title, description, image)
const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedBlog;
};

// ৫. Get Admin Blogs
const getAdminBlogs = async (query: Record<string, string>) => {
  const blogQuery = new QueryBuilder(
    BlogModel.find({ authorModel: "Admin" }),
    query
  )
    .filter()
    .search(["title", "category", "content"])
    .sort()
    .fields()
    .paginate();

  const data = await blogQuery.build();
  const meta = await blogQuery.getMeta();

  return { data, meta };
};

const getUserBlogs = async (query: Record<string, string>) => {
  const blogQuery = new QueryBuilder(
    BlogModel.find({ authorModel: "User", status: "approved" })
      .populate("author", "name email"),
    query
  )
    .filter()
    .search(["title", "category", "content"])
    .sort()
    .fields()
    .paginate();

  const data = await blogQuery.build();
  const meta = await blogQuery.getMeta();

  return { data, meta };
};

const getPendingUserBlogs = async (query: Record<string, string>) => {
  const status = query.status || "pending";

  const blogQuery = new QueryBuilder(
    BlogModel.find({ authorModel: "User", status }).populate("author", "name email"),
    query
  )
    .filter()
    .search(["title", "category", "content"])
    .sort()
    .fields()
    .paginate();

  const data = await blogQuery.build();
  const meta = await blogQuery.getMeta();

  return { data, meta };
};

const deleteBlog = async (id: string) => {
  const deletedBlog = await BlogModel.findByIdAndDelete(id);
  return deletedBlog;
};
export const BlogServices = {
  createBlogByAdmin,
  submitBlogByUser,
  approveBlog,
  updateBlog,
  getAdminBlogs,
  getUserBlogs,
  getPendingUserBlogs,
  deleteBlog
};
