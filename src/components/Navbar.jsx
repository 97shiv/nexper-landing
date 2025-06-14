import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut, Settings, ShieldCheck, UserPlus, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Navbar({ onNavigate, currentPage ,phone}) {
  const { user, logout, isVendor, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <nav className="bg-gradient-to-br from-purple-100  to-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

           {/* nexper logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-black hover:text-purple-600 transition-colors"
            >
              Nexper
            </button>
          </div>

 {/* menu */}
 <div className="flex items-center space-x-7 text-sm  ">
            <button
              onClick={() => onNavigate('home')}
              className="text-black hover:text-purple-600 transition-colors"
            >
              About Us
            </button>
              <button
              onClick={() => onNavigate('home')} 
               className="text-black hover:text-purple-600 transition-colors"           
            >
               Services
            </button>
              <button
              onClick={() => onNavigate('home')}  
               className="text-black hover:text-purple-600 transition-colors"          
            >
               Cources
            </button>
             <button
              onClick={() => onNavigate('home')}  
               className="text-black hover:text-purple-600 transition-colors"          
            >
               Subsciptions
            </button>
              <button
              onClick={() => onNavigate('home')}   
               className="text-black hover:text-purple-600 transition-colors"         
            >
              Contact Us
            </button>
          </div>

          {/* <div className="flex items-center space-x-7 text-sm  ">
           <a
  href={`https://wa.me/${phone}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center bg-green-500 text-white px-3 py-2 rounded shadow hover:bg-green-600"
>
  <FaWhatsapp size={19} />
  
</a>  
          </div> */}

 {/* login/register*/}
          <div className="flex items-center ">
            {user ? (
              <>
                <span className="text-black text-sm">
                  Welcome, {user.name}
                </span>
                {isVendor && (
                  <Button
                    variant="ghost"
                    // onClick={() => onNavigate('vendor-dashboard')}
                    className="text-black hover:bg-white/70"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Vendor Dashboard
                  </Button>
                )}
                {isAdmin && (
                   <Button
                    variant="ghost"
                    // onClick={() => onNavigate('admin-dashboard')}
                    className="text-black hover:bg-white/70"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-black hover:bg-white/70"
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
                  className="text-black hover:bg-white/60"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                 variant="ghost"
                  onClick={() => onNavigate('register')}
                  className="text-black hover:bg-white/60"
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