import { QueryBuilder } from "../../../utils/QueryBuilder";
import { Comment } from "../comment/comment.model";
import { Blog } from "./blogs.model";

const createBlog = async (data: any) => {
  const blog = await Blog.create(data);
  return blog;
};

const updateBlog = async (id: string, data: any) => {
  const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  if (!blog) throw new Error("Blog not found");
  return blog;
};


 const getAllBlogs = async (query: Record<string, string>) => {
  const builder = new QueryBuilder(Blog.find(), query)
    .filter()
    .search(["title", "excerpt", "content", "category", "author"])
    .sort()
    .fields()
    .paginate();

  const blogs = await builder.build();
  const meta = await builder.getMeta();

  return { blogs, meta };
};

/**
 * Get single blog by ID including approved comments
 */
const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");

  const comments = await Comment.find({ blogId: id, approved: true }).sort({ timestamp: -1 });

  return { ...blog.toObject(), comments };
};
const deleteBlog = async (id: string) => {
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) throw new Error("Blog not found");
  return deletedBlog;
};
export const blogService = {
  getAllBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
};
