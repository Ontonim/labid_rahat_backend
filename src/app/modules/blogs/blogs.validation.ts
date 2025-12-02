import * as z from "zod";



export const createBlogByAdminValidation = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    featureImage: z.string().url("Invalid image URL").optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
  }),
});


export const submitBlogByUserValidation = z.object({

    title: z.string().min(3, "Title must be at least 3 characters"),
    featureImage: z.string().url("Invalid image URL").optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),

});

export const updateBlogValidation = z.object({
  id: z.string().min(1, "Blog ID is required"),
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  featureImage: z.string().url("Invalid image URL").optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
});
