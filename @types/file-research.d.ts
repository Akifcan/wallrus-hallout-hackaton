interface FileSearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface FileResearchResponse {
  success: boolean;
  results: {
    results: FileSearchResult[];
    count: number;
  };
  researchId: string;
}

interface SaveFileResearchRequest {
  file_research_id: string;
  project_id: string;
  file_url: string;
}

interface SaveFileResearchResponse {
  success: boolean;
  blobId: string;
  fileResearch: {
    id: string;
    wallet: string;
    blob_id: string;
    project_id: string;
    created_at: string;
  };
}
