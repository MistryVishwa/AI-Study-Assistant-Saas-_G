import React from 'react';
import { Search, Bell, User } from 'lucide-react';

import { useAuth } from '@/src/context/AuthContext';
import { LogIn } from 'lucide-react';

interface HeaderProps {
  onLoginClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { user, profile } = useAuth();

  return (
    <header className="h-20 glass border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text" 
            placeholder="Search lectures, notes, or tasks..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-gold/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-white/60 hover:text-white transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-edu-blue rounded-full"></span>
        </button>
        
        {user ? (
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}</p>
              <p className="text-xs text-white/40">{profile?.role === 'admin' ? 'Admin' : 'Premium Student'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-edu-blue p-[2px]">
              <div className="w-full h-full rounded-full bg-edu-black flex items-center justify-center overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User size={20} className="text-white/60" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="btn-gold px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold"
          >
            <LogIn size={18} />
            Log In
          </button>
        )}
      </div>
    </header>
  );
};
