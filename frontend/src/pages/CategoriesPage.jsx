import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Monitor, PenTool, Coffee, TrendingUp, Plane, Heart, Cpu } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    { name: 'Technology', path: '/category/Technology', icon: <Monitor size={24} />, count: 234, color: 'from-blue-500 to-cyan-500' },
    { name: 'Design', path: '/category/Design', icon: <PenTool size={24} />, count: 189, color: 'from-pink-500 to-rose-500' },
    { name: 'Lifestyle', path: '/category/Lifestyle', icon: <Coffee size={24} />, count: 156, color: 'from-yellow-500 to-orange-500' },
    { name: 'Business', path: '/category/Business', icon: <TrendingUp size={24} />, count: 98, color: 'from-green-500 to-emerald-500' },
    { name: 'Travel', path: '/category/Travel', icon: <Plane size={24} />, count: 76, color: 'from-blue-400 to-indigo-500' },
    { name: 'Health', path: '/category/Health', icon: <Heart size={24} />, count: 54, color: 'from-red-500 to-pink-600' },
    { name: 'AI', path: '/category/AI', icon: <Cpu size={24} />, count: 45, color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover topics that matter to you. Browse our extensive collection of articles across various categories.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <Link key={cat.name} to={cat.path} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{cat.name}</h2>
              <p className="text-gray-500 mb-4">{cat.count} articles published</p>
              <div className="flex items-center text-purple-600 font-medium group-hover:gap-2 transition-all">
                Browse Articles <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
