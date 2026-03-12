import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Mic, 
  Calendar, 
  CreditCard, 
  Trophy, 
  ShoppingBag, 
  Newspaper, 
  User, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'library', label: 'Lecture Library', icon: BookOpen },
  { id: 'notes', label: 'AI Notes', icon: FileText },
  { id: 'tutor', label: 'AI Tutor', icon: MessageSquare },
  { id: 'voice', label: 'Voice Assistant', icon: Mic },
  { id: 'planner', label: 'Study Planner', icon: Calendar },
  { id: 'flashcards', label: 'Flashcards', icon: CreditCard },
  { id: 'quizzes', label: 'Quizzes', icon: Trophy },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'blog', label: 'Blog', icon: Newspaper },
  { id: 'tools', label: 'Extra AI Tools', icon: Sparkles },
  { id: 'support', label: 'Support', icon: LifeBuoy },
  { id: 'profile', label: 'Profile', icon: User },
];

import { LifeBuoy, Sparkles } from 'lucide-react';

import { useAuth } from '@/src/context/AuthContext';

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 h-screen glass border-r border-white/10 flex flex-col sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
          EduPilot
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-gold/20 text-gold border border-gold/30" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              activeTab === item.id ? "text-gold" : "text-white/40 group-hover:text-white"
            )} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {user && (
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};
