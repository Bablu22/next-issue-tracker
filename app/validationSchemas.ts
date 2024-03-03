import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(1, { message: "Must be 1 or more characters long" })
    .max(255, { message: "Must be 255 or fewer characters long" }),
  description: z
    .string({
      required_error: "Descrption is required",
      invalid_type_error: "Descrption is required",
    })
    .min(1, { message: "Must be 1 or more characters long" }),
});

export const updateIssueSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(1, { message: "Must be 1 or more characters long" })
    .max(255, { message: "Must be 255 or fewer characters long" })
    .optional(),
  description: z
    .string({
      required_error: "Descrption is required",
      invalid_type_error: "Descrption is required",
    })
    .min(1, { message: "Must be 1 or more characters long" })
    .optional(),

  userId: z
    .string({
      required_error: "userId is required",
      invalid_type_error: "userId is required",
    })
    .min(1, { message: "Must be 1 or more characters long" })
    .optional()
    .nullable(),
});
