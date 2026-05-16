import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, FileQuestion } from 'lucide-react';

export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Search size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
            <p className="text-gray-500">Showing results for "{query}"</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <FileQuestion size={64} className="text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any articles matching your search query. Try using different keywords or browse our categories.</p>
          <Link to="/categories" className="px-8 py-3 bg-purple-50 text-purple-600 font-medium rounded-full hover:bg-purple-100 transition-colors">
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
