export interface SearchResult {
  url: string;
  title: string;
  description: string;
  relevance: number;
}

export interface SearchState {
  isLoading: boolean;
  results: SearchResult[];
  error: string | null;
}