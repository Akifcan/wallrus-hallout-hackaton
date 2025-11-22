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
