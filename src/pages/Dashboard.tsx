import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Zap,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', hours: 4 },
  { name: 'Tue', hours: 6 },
  { name: 'Wed', hours: 3 },
  { name: 'Thu', hours: 8 },
  { name: 'Fri', hours: 5 },
  { name: 'Sat', hours: 2 },
  { name: 'Sun', hours: 4 },
];

const tasks = [
  { id: 1, title: 'Complete AI Ethics Essay', time: '10:00 AM', completed: true },
  { id: 2, title: 'Review Calculus Chapter 4', time: '02:00 PM', completed: false },
  { id: 3, title: 'Practice Flashcards: Biology', time: '04:30 PM', completed: false },
  { id: 4, title: 'AI Tutor Session: Neural Networks', time: '07:00 PM', completed: false },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Alex! 👋</h2>
          <p className="text-white/40 mt-1">You have 3 tasks to complete today.</p>
        </div>
        <button className="btn-gold flex items-center gap-2">
          <Zap size={18} />
          Quick AI Tutor
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Study Hours', value: '32.5h', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Completed Topics', value: '18', icon: BookOpen, color: 'text-gold', bg: 'bg-gold/10' },
          { label: 'Learning Streak', value: '12 Days', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'AI Assistance', value: '142', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm text-white/40">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Study Analytics</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#D4AF37" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Today's Tasks</h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                {task.completed ? (
                  <CheckCircle2 className="text-emerald-400" size={20} />
                ) : (
                  <Circle className="text-white/20 group-hover:text-gold transition-colors" size={20} />
                )}
                <div className="flex-1">
                  <p className={cn("font-medium", task.completed && "line-through text-white/40")}>
                    {task.title}
                  </p>
                  <p className="text-xs text-white/30">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-all text-sm font-medium">
            + Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

import { cn } from '@/src/lib/utils';
