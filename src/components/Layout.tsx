import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, History, Users, LogOut, User } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/track', label: 'Track Mood', icon: Heart },
    { path: '/social', label: 'Social', icon: Users },
    { path: '/history', label: 'History', icon: History },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/home" className="text-2xl font-semibold text-apple-text tracking-tight">
              MoodTrack
            </Link>

            <div className="flex items-center space-x-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === path
                      ? 'text-apple-blue bg-apple-blue/10 shadow-sm'
                      : 'text-apple-secondary hover:text-apple-text hover:bg-gray-100/80'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  <span className="max-w-24 truncate">{label}</span>
                </Link>
              ))}

              {user && (
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-apple-text hover:bg-gray-100/80 transition-all duration-300"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-7 h-7 rounded-full ring-2 ring-apple-blue/20"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-apple-blue to-purple-500 flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                    <span className="max-w-24 truncate">{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-gray-200/50 py-2 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <div className="font-semibold text-apple-text">{user.name}</div>
                        <div className="text-sm text-apple-secondary truncate mt-0.5">
                          {user.email}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-apple-text hover:bg-gray-100/80 transition-colors mt-1"
                      >
                        <LogOut size={16} className="mr-2.5" strokeWidth={2.5} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}

      <main className="container mx-auto px-6 py-12 max-w-7xl">{children}</main>
    </div>
  );
};

export default Layout;
