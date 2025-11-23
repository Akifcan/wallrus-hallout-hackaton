import * as yup from "yup";

export const searchSchema = yup.object({
  site: yup.string().url("Site must be a valid URL").optional(),
  keyword: yup
    .string()
    .required("Keyword is required")
    .min(2, "Keyword must be at least 2 characters")
    .max(200, "Keyword must not exceed 200 characters"),
});

export const fileSearchSchema = yup.object({
  site: yup.string().url("Site must be a valid URL").optional(),
  keyword: yup
    .string()
    .required("Keyword is required")
    .min(2, "Keyword must be at least 2 characters")
    .max(200, "Keyword must not exceed 200 characters"),
  type: yup.string().max(5, "type must not exceed 5 characters"),
});

export const uploadSchema = yup.object({
  url: yup.string().required("URL is required").url("URL must be a valid URL"),
  project_id: yup.string().required("Project is required"),
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

export const projectSchema = yup.object({
  projectName: yup
    .string()
    .required("Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must not exceed 100 characters"),
});

export const noteSchema = yup.object({
  title: yup
    .string()
    .required("Note title is required")
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must not exceed 200 characters"),
  content: yup
    .string()
    .required("Note content is required")
    .min(1, "Content is required")
    .max(10000, "Content must not exceed 10000 characters"),
  project_id: yup.string().required("Project is required"),
});

export const wordResearchSchema = yup.object({
  site: yup
    .string()
    .required("Site is required")
    .url("Site must be a valid URL"),
  keyword: yup
    .string()
    .required("Keyword is required")
    .min(2, "Keyword must be at least 2 characters")
    .max(200, "Keyword must not exceed 200 characters"),
  project_id: yup.string().required("Project is required"),
});

export const saveWordResearchSchema = yup.object({
  word_research_id: yup.string().required("Research ID is required"),
  project_id: yup.string().required("Project is required"),
});

export const saveSummarySchema = yup.object({
  summary_id: yup.string().required("Summary ID is required"),
  project_id: yup.string().required("Project is required"),
});
