import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Calendar, Clock, Eye, Heart, Bookmark, ArrowRight, User } from 'lucide-react'
import { useState } from 'react'

export default function BlogCard({ blog, viewMode = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <article 
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
        viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      {blog.coverImage && (
        <Link to={`/blog/${blog.slug}`} className={`block overflow-hidden ${viewMode === 'list' ? 'md:w-72 flex-shrink-0' : ''}`}>
          <div className={`aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 ${viewMode === 'list' ? 'h-full' : ''}`}>
            <img
              src={blog.coverImage}
              alt={blog.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 rotate-1' : 'scale-100'
              }`}
            />
          </div>
        </Link>
      )}

      {/* Content Section */}
      <div className={`p-5 flex-1 ${!blog.coverImage ? 'pt-5' : ''}`}>
        {/* Category Badge */}
        {blog.category && (
          <Link 
            to={`/category/${blog.category.slug || blog.category.name?.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 mb-3 group/category"
          >
            <span 
              className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: blog.category.color + '20', 
                color: blog.category.color,
                boxShadow: isHovered ? `0 2px 8px ${blog.category.color}30` : 'none'
              }}
            >
              {blog.category.name}
            </span>
          </Link>
        )}

        {/* Title */}
        <Link to={`/blog/${blog.slug}`}>
          <h3 className={`font-bold text-gray-900 group-hover:text-purple-600 transition-all duration-300 mb-2 leading-snug ${
            viewMode === 'list' ? 'text-xl' : 'text-lg'
          }`}>
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          {/* Author */}
          <Link to={`/author/${blog.author?._id}`} className="flex items-center gap-2 group/author">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-sm group-hover/author:shadow-md transition-all duration-300">
              {blog.author?.avatar ? (
                <img src={blog.author.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-purple-600 font-bold text-sm">{blog.author?.name?.[0]}</span>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 group-hover/author:text-purple-600 transition-colors">
                {blog.author?.name}
              </p>
              <p className="text-xs text-gray-400">Author</p>
            </div>
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-gray-400" />
              <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-gray-400" />
              <span>{blog.readTime || 5} min</span>
            </div>
            {blog.views > 0 && (
              <div className="flex items-center gap-1">
                <Eye size={12} className="text-gray-400" />
                <span>{blog.views}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between mt-4 pt-2">
          {/* Read More Link */}
          <Link 
            to={`/blog/${blog.slug}`} 
            className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-all duration-300 group/link"
          >
            <span>Read More</span>
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {/* Like Button */}
          <button 
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-xs transition-all duration-300 ${
              liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={14} className={liked ? 'fill-red-500' : ''} />
            <span>{liked ? 'Liked' : 'Like'}</span>
          </button>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-all duration-500 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </article>
  )
}