import React from 'react';
import { Check, Sparkles, Zap, Star } from 'lucide-react';

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Sparkles size={16} /> Premium Access
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Unlock Your Full Potential</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of readers who receive exclusive content, early access, and ad-free experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Reader</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-500">/forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600"><Check size={18} className="text-green-500" /> Read up to 5 premium articles/mo</li>
              <li className="flex items-center gap-3 text-gray-600"><Check size={18} className="text-green-500" /> Access to basic categories</li>
              <li className="flex items-center gap-3 text-gray-600"><Check size={18} className="text-green-500" /> Weekly newsletter</li>
            </ul>
            <button className="w-full py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors">Current Plan</button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 text-yellow-400 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Star size={24} fill="currentColor" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Pro Subscriber</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">$9.99</span>
                <span className="text-purple-200">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-purple-100"><Check size={18} className="text-pink-400" /> Unlimited premium articles</li>
                <li className="flex items-center gap-3 text-purple-100"><Check size={18} className="text-pink-400" /> Ad-free reading experience</li>
                <li className="flex items-center gap-3 text-purple-100"><Check size={18} className="text-pink-400" /> Exclusive member community</li>
                <li className="flex items-center gap-3 text-purple-100"><Check size={18} className="text-pink-400" /> Early access to new features</li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
