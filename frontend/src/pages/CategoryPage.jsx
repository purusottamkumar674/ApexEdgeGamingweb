import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/categories" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium gap-2">
            <ArrowLeft size={16} /> Back to Categories
          </Link>
        </div>
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryName} Articles</h1>
          <p className="text-xl text-gray-600 mb-8">We are curating the best content for {categoryName}. Check back soon!</p>
          <Link to="/" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg transition-all hover:-translate-y-1">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
