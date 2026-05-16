import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast'
import { 
  LayoutDashboard, FileText, PlusCircle, Tag, 
  LogOut, User, ChevronRight, Sparkles, 
  Crown, Bell, Settings, HelpCircle, 
  Zap, BookOpen, FolderOpen, PenTool
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, exact: true },
  { path: '/admin/blogs', label: 'Blogs', icon: <FileText size={18} /> },
  { path: '/admin/blogs/new', label: 'New Blog', icon: <PlusCircle size={18} /> },
  { path: '/admin/categories', label: 'Categories', icon: <Tag size={18} /> },
]

export default function AdminSidebar() {
  const { pathname } = useLocation()
  const { logoutUser, user } = useAuth()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    logoutUser()
    toast.success('Logged out successfully', { icon: '👋' })
    navigate('/admin/login')
  }

  return (
    <aside className={`relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 min-h-screen flex flex-col transition-all duration-300 shadow-2xl ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-300 z-10"
      >
        <ChevronRight size={12} className={`text-white transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Header */}
      <div className={`p-6 ${isCollapsed ? 'px-4' : ''} border-b border-gray-800/50`}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ApexEdge Gaming
              </span>
              <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = item.exact 
            ? pathname === item.path 
            : pathname.startsWith(item.path) && !(item.path === '/admin/blogs' && pathname === '/admin/blogs/new')
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}>
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.label}</span>}
              {isActive && !isCollapsed && (
                <Sparkles size={12} className="ml-auto text-yellow-400" />
              )}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="my-4 pt-2 border-t border-gray-800/50">
          {!isCollapsed && (
            <p className="text-xs text-gray-500 px-4 mb-2 uppercase tracking-wider">Quick Actions</p>
          )}
          
          {/* Quick Action Buttons */}
          <Link 
            to="/admin/blogs/new"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group text-gray-400 hover:text-white hover:bg-gray-800/50 ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? 'New Post' : ''}
          >
            <PenTool size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
            {!isCollapsed && <span>Quick Write</span>}
          </Link>
          
          <Link 
            to="/admin/categories"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group text-gray-400 hover:text-white hover:bg-gray-800/50 ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? 'Manage Categories' : ''}
          >
            <FolderOpen size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
            {!isCollapsed && <span>Manage Categories</span>}
          </Link>
        </div>
      </nav>

      {/* User Section */}
      <div className={`p-4 border-t border-gray-800/50 ${isCollapsed ? 'px-2' : ''}`}>
        {/* User Info */}
        <div className={`flex items-center gap-3 rounded-xl p-2 transition-all duration-300 ${!isCollapsed ? 'bg-gray-800/30' : 'justify-center'}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">{user?.name?.[0] || 'A'}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-white text-sm font-semibold truncate">{user?.name || 'Admin User'}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email || 'admin@apexedgegaming.com'}</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className={`mt-3 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 group ${isCollapsed ? 'justify-center px-2' : ''}`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
          {!isCollapsed && <span>Logout</span>}
        </button>

        {/* Version Info */}
        {!isCollapsed && (
          <div className="mt-4 pt-3 text-center">
            <p className="text-xs text-gray-600">Version 2.0.0</p>
            <p className="text-xs text-gray-700 mt-1">© 2026  ApexEdge Gaming</p>
          </div>
        )}
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
    </aside>
  )
}