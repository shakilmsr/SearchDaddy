import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 text-center text-gray-600">
        No results found. Try a different search query.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {result.title}
              </h3>
              <p className="text-gray-600 mb-2">{result.description}</p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                {result.url}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full text-green-800 text-sm">
              {(result.relevance * 100).toFixed(0)}% relevant
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}