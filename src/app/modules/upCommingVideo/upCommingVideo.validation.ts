import * as z from "zod";

export const createUpcomingVideoValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    releaseDate: z.string().refine(
      (val) => !isNaN(Date.parse(val)),
      "releaseDate must be a valid date string"
    ),
    Imageurl: z.string().url("Invalid image URL").optional(),
    isPublished: z.boolean().optional(),
  }),
});


  
export const updateUpcomingVideoValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    releaseDate: z.string().refine(
      (val) => !isNaN(Date.parse(val)),
      "releaseDate must be a valid date string"
    ).optional(),
    Imageurl: z.string().url("Invalid image URL").optional(),
    isPublished: z.boolean().optional(),
  }),
});
