import * as z from "zod";

// Contributor Schema
export const contributorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum([
    "video editor",
    "content writer",
    "thumbnail designer",
    "admin",
  ]),
});

// Video Schema
export const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtubeLink: z.string().url("Must be a valid YouTube link"),
  contributors: z.array(contributorSchema).nonempty("At least one contributor is required"),
  createdAt: z.date().optional(),
});


export const updateVideoValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    youtubeLink: z.string().url("Must be a valid YouTube link").optional(),
    contributors: z
      .array(
        z.object({
          name: z.string().min(1, "Name is required"),
          role: z.enum([
            "video editor",
            "content writer",
            "thumbnail designer",
            "admin",
          ]),
        })
      )
      .optional(),
  }),
});
