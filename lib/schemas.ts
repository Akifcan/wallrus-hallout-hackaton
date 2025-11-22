import * as yup from "yup";

export const searchSchema = yup.object({
  site: yup
    .string()
    .required("Site is required")
    .url("Site must be a valid URL"),
  keyword: yup
    .string()
    .required("Keyword is required")
    .min(2, "Keyword must be at least 2 characters")
    .max(200, "Keyword must not exceed 200 characters"),
});

export const uploadSchema = yup.object({
  url: yup.string().required("URL is required").url("URL must be a valid URL"),
});

export const summarySchema = yup.object({
  content: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content max 10000 characters"),
  language: yup
    .string()
    .required("Language is required")
    .oneOf(
      ["English", "Turkish", "Spanish", "French", "German"],
      "Invalid language"
    ),
  summaryLength: yup
    .string()
    .required("Summary length is required")
    .oneOf(
      ["short", "medium", "long"],
      "Summary length must be short, medium, or long"
    ),
});
