import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Moon, Sun, Shield, Camera, Save, Globe, Target } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { useAuth } from '@/src/context/AuthContext';

export const Profile: React.FC = () => {
  const { user, profile } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">User Profile</h2>
        <button className="btn-gold flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl text-center space-y-6">
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gold to-edu-blue p-1">
                <div className="w-full h-full rounded-full bg-edu-black flex items-center justify-center overflow-hidden">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={64} className="text-white/20" />
                  )}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-gold text-black rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold">{profile?.full_name || user?.user_metadata?.full_name || 'Student'}</h3>
              <p className="text-white/40 text-sm">{user?.email}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                {profile?.learning_goal || 'General Learning'}
              </div>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-gold">1</p>
                <p className="text-[10px] text-white/40 uppercase font-bold">Streak</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <p className="text-xl font-bold text-edu-blue">0</p>
                <p className="text-[10px] text-white/40 uppercase font-bold">AI Tasks</p>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl space-y-2">
            {[
              { label: 'Personal Info', icon: User, active: true },
              { label: 'Security', icon: Shield, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Preferences', icon: Globe, active: false },
            ].map((item, i) => (
              <button 
                key={i}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  item.active ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl space-y-8">
            <h4 className="text-lg font-bold border-b border-white/10 pb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="text" defaultValue={profile?.full_name || user?.user_metadata?.full_name || ''} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="email" defaultValue={user?.email || ''} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all opacity-50 cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Learning Goal</label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="text" defaultValue={profile?.learning_goal || ''} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <h4 className="text-lg font-bold border-b border-white/10 pb-4">App Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-400/10 text-purple-400 rounded-lg">
                    {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <p className="font-bold">Dark Mode</p>
                    <p className="text-xs text-white/40">Optimize for low-light environments.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    darkMode ? "bg-gold" : "bg-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    darkMode ? "left-7" : "left-1"
                  )}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-400/10 text-blue-400 rounded-lg">
                    <Bell size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Push Notifications</p>
                    <p className="text-xs text-white/40">Receive study reminders and AI updates.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    notifications ? "bg-gold" : "bg-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    notifications ? "left-7" : "left-1"
                  )}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
