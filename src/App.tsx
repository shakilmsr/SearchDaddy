import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { SearchState } from './types';
import { searchWeb } from './services/api';

export default function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    results: [],
    error: null
  });

  const handleSearch = async (query: string) => {
    setSearchState(prev => ({ ...prev, isLoading: true, results: [], error: null }));

    try {
      const results = await searchWeb(query);
      setSearchState(prev => ({
        ...prev,
        results,
        isLoading: false
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred while searching',
        isLoading: false
      }));
    }
  };

  const isApiConfigured = Boolean(
    import.meta.env.VITE_GOOGLE_API_KEY && 
    import.meta.env.VITE_GOOGLE_CX
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SearchDaddy
          </h1>
          
          {!isApiConfigured && (
            <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg inline-block">
              ⚠️ API configuration missing. Please add VITE_GOOGLE_API_KEY and VITE_GOOGLE_CX to your .env file.
            </div>
          )}
        </div>

        <SearchBar onSearch={handleSearch} />

        {searchState.error && (
          <div className="w-full max-w-3xl mx-auto mt-8 p-4 bg-red-100 text-red-800 rounded-lg">
            {searchState.error}
          </div>
        )}

        <SearchResults
          results={searchState.results}
          isLoading={searchState.isLoading}
        />
      </div>
    </div>
  );
}