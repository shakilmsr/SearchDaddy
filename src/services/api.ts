import axios from 'axios';
import { SearchResult } from '../types';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;

export async function searchWeb(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CX,
        q: query,
        num: 10
      }
    });

    return response.data.items.map((item: any) => ({
      url: item.link,
      title: item.title,
      description: item.snippet,
      relevance: calculateRelevance(item.title, item.snippet, query)
    }));
  } catch (error) {
    console.error('Google Search API error:', error);
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      throw new Error('API key is invalid or quota exceeded');
    }
    throw new Error('Failed to fetch search results');
  }
}

function calculateRelevance(title: string, description: string, query: string): number {
  const searchTerms = query.toLowerCase().split(' ');
  const contentText = `${title} ${description}`.toLowerCase();
  
  // Count how many search terms appear in the content
  const matchCount = searchTerms.filter(term => contentText.includes(term)).length;
  const relevanceScore = (matchCount / searchTerms.length) * 0.3 + 0.7;
  
  return Math.min(1, Math.max(0.7, relevanceScore));
}