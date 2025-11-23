interface WordResearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface WordResearchResponse {
  success: boolean;
  results: {
    results: WordResearchResult[];
    count: number;
  };
}

interface SaveWordResearchRequest {
  results: {
    results: WordResearchResult[];
    count: number;
  };
  project_id: string;
}

interface SaveWordResearchResponse {
  success: boolean;
  blobId: string;
  wordResearch: {
    id: string;
    wallet: string;
    blob_id: string;
    project_id: string;
    created_at: string;
  };
}
