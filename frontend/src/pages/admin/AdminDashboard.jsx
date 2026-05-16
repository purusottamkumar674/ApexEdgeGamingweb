import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBlogStats } from '../../utils/api'
import AdminSidebar from '../../components/AdminSidebar'
import { format } from 'date-fns'
import { 
  Plus, TrendingUp, Users, Eye, FileText, 
  CheckCircle, Clock, Calendar, ArrowRight,
  MoreHorizontal, Zap, Award, Crown, Activity
} from 'lucide-react'

const StatCard = ({ label, value, icon, color, trend, trendValue }) => (
  <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-xs text-green-600 font-medium">{trendValue}</span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        )}
      </div>
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
  </div>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogStats()
      .then(res => setStats(res.data.stats))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={20} className="text-purple-600" />
              <span className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-500 text-sm mt-1">Here's what's happening with your ApexEdge Gaming today.</p>
          </div>
          <Link 
            to="/admin/blogs/new" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
          >
            <Plus size={18} />
            <span>New ApexEdge Gaming Post</span>
          </Link>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-8 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : stats && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                label="Total Blogs" 
                value={stats.totalBlogs} 
                icon={<FileText size={24} className="text-blue-600" />}
                color="bg-blue-100"
                trend={true}
                trendValue="+12%"
              />
              <StatCard 
                label="Published" 
                value={stats.publishedBlogs} 
                icon={<CheckCircle size={24} className="text-green-600" />}
                color="bg-green-100"
                trend={true}
                trendValue="+8%"
              />
              <StatCard 
                label="Drafts" 
                value={stats.draftBlogs} 
                icon={<Clock size={24} className="text-yellow-600" />}
                color="bg-yellow-100"
                trend={false}
              />
              <StatCard 
                label="Total Views" 
                value={stats.totalViews?.toLocaleString() || 0} 
                icon={<Eye size={24} className="text-purple-600" />}
                color="bg-purple-100"
                trend={true}
                trendValue="+23%"
              />
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold">TOTAL READERS</p>
                    <p className="text-xl font-bold text-gray-900">12,847</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">+2,345 new readers this month</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Award size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-semibold">ENGAGEMENT RATE</p>
                    <p className="text-xl font-bold text-gray-900">68%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">+5% from previous month</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Activity size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-orange-600 font-semibold">AVG. READ TIME</p>
                    <p className="text-xl font-bold text-gray-900">4.2 min</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Above industry average</p>
              </div>
            </div>

            {/* Recent Posts Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    Recent ApexEdge Gaming Posts
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">Your latest published content</p>
                </div>
                <Link to="/admin/blogs" className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 group">
                  View All
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-100">
                {stats.recentBlogs?.map((blog, idx) => (
                  <div key={blog._id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-lg font-bold text-purple-600">
                        {blog.title?.charAt(0) || '📝'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                          {blog.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar size={10} />
                            {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                          </p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            blog.status === 'published' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {blog.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-13 sm:ml-0">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Eye size={14} />
                        <span className="text-xs font-medium">{blog.views || 0} views</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={14} />
                        <span className="text-xs font-medium">{blog.readTime || 3} min read</span>
                      </div>
                      <Link 
                        to={`/admin/blogs/edit/${blog._id}`} 
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-all"
                      >
                        Edit
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {(!stats.recentBlogs || stats.recentBlogs.length === 0) && (
                <div className="px-6 py-12 text-center">
                  <FileText size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">No ApexEdge Gaming posts yet</p>
                  <Link to="/admin/blogs/new" className="text-purple-600 text-sm hover:underline mt-2 inline-block">
                    Create your first post →
                  </Link>
                </div>
              )}
            </div>

            {/* Performance Tip */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Crown size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Performance Tip</p>
                  <p className="text-xs text-gray-600">Posts with images get 3x more engagement. Add a cover image to your next ApexEdge Gaming post!</p>
                </div>
                <button className="text-purple-600 text-xs font-medium hover:underline">Dismiss</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}