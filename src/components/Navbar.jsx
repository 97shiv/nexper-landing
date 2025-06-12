import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut, Settings, ShieldCheck, UserPlus } from 'lucide-react';

export function Navbar({ onNavigate, currentPage }) {
  const { user, logout, isVendor, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-white hover:text-purple-200 transition-colors"
            >
              Nexper
            </button>
          </div>

          <div className="flex items-center lg:space-x-4">
            {user ? (
              <>
                <span className="text-white/90 text-sm">
                  Welcome, {user.name}
                </span>
                {isVendor && (
                  <Button
                    variant="ghost"
                    // onClick={() => onNavigate('vendor-dashboard')}
                    className="text-white hover:bg-white/70"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Vendor Dashboard
                  </Button>
                )}
                {isAdmin && (
                   <Button
                    variant="ghost"
                    // onClick={() => onNavigate('admin-dashboard')}
                    className="text-white hover:bg-white/70"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/70"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                  className="text-white hover:bg-white/60"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                 variant="ghost"
                  onClick={() => onNavigate('register')}
                  className="text-white hover:bg-white/60"
                >
                   <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
                <Button
                  onClick={() => onNavigate('become-nexpert')}
                  className=" bg-white text-purple-600 hover:bg-purple-50 px-3 py-1 text-sm"
                >
                  Become a Nexpert
                </Button>
              </>
            )}
          </div>

          
        </div>
      </div>
    </nav>
  );
}