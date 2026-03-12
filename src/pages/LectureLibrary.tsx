import React, { useState } from 'react';
import { Play, Search, Plus, Clock, FileText, Sparkles, MoreVertical } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const lectures = [
  { id: 1, title: 'Introduction to Quantum Computing', duration: '45:20', date: '2 days ago', thumbnail: 'https://picsum.photos/seed/quantum/400/225' },
  { id: 2, title: 'Advanced Data Structures: B-Trees', duration: '32:15', date: '1 week ago', thumbnail: 'https://picsum.photos/seed/data/400/225' },
  { id: 3, title: 'History of Modern Architecture', duration: '58:00', date: '2 weeks ago', thumbnail: 'https://picsum.photos/seed/arch/400/225' },
  { id: 4, title: 'Organic Chemistry: Carbon Bonds', duration: '41:10', date: '1 month ago', thumbnail: 'https://picsum.photos/seed/chem/400/225' },
];

export const LectureLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Lecture Library</h2>
          <p className="text-white/40 mt-1">Manage and review your study materials.</p>
        </div>
        <button className="btn-gold flex items-center gap-2">
          <Plus size={18} />
          Upload Lecture
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input 
            type="text" 
            placeholder="Search your lectures..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="glass px-6 rounded-2xl text-sm font-medium hover:bg-white/10 transition-colors">
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-gold/30 transition-all">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={lecture.thumbnail} 
                alt={lecture.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-[10px] font-bold">
                {lecture.duration}
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold line-clamp-2 group-hover:text-gold transition-colors">{lecture.title}</h4>
                <button className="text-white/20 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1"><Clock size={12} /> {lecture.date}</span>
              </div>

              <div className="pt-3 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all">
                  <Sparkles size={12} />
                  AI SUMMARY
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold hover:bg-edu-blue/10 hover:border-edu-blue/30 hover:text-edu-blue transition-all">
                  <FileText size={12} />
                  NOTES
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
