import * as z from "zod";

// Status type
export const contentRequestStatusEnum = ["pending", "accepted", "rejected"] as const;


export const createContentRequestValidation = z.object({

    subscriberName: z.string().min(1, "Subscriber name is required"),
    subscriberEmail: z.string().email("Invalid email address"),
    topic: z.string().min(1, "Topic is required"),
    details: z.string().optional(),
    user: z.string().optional(),

});


export const updateContentRequestValidation = z.object({
  status: z.enum(contentRequestStatusEnum, "Status must be pending, accepted, or rejected"),
});
