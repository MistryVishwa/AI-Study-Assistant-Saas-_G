import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Download, Star, User, Tag, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const items = [
  { id: 1, title: 'Complete Biology Notes (Unit 1-4)', author: 'Sarah Miller', price: 15, rating: 4.8, downloads: 1240, category: 'Biology', thumbnail: 'https://picsum.photos/seed/bio/400/300' },
  { id: 2, title: 'Calculus Cheat Sheet & Formulas', author: 'Dr. James', price: 5, rating: 4.9, downloads: 5600, category: 'Math', thumbnail: 'https://picsum.photos/seed/math/400/300' },
  { id: 3, title: 'AI Ethics Case Studies', author: 'EduPilot Team', price: 0, rating: 4.7, downloads: 890, category: 'AI', thumbnail: 'https://picsum.photos/seed/ethics/400/300' },
  { id: 4, title: 'Organic Chemistry Diagrams', author: 'ChemMaster', price: 12, rating: 4.6, downloads: 430, category: 'Chemistry', thumbnail: 'https://picsum.photos/seed/chem2/400/300' },
  { id: 5, title: 'World History Timeline PDF', author: 'History Buff', price: 8, rating: 4.5, downloads: 2100, category: 'History', thumbnail: 'https://picsum.photos/seed/history/400/300' },
  { id: 6, title: 'Python for Beginners Guide', author: 'Code Academy', price: 0, rating: 4.9, downloads: 15000, category: 'Programming', thumbnail: 'https://picsum.photos/seed/python/400/300' },
];

export const Marketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Biology', 'Math', 'AI', 'Chemistry', 'History', 'Programming'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Marketplace</h2>
          <p className="text-white/40 mt-1">Buy and sell high-quality study materials.</p>
        </div>
        <button className="btn-gold flex items-center gap-2">
          <Plus size={18} />
          Sell Material
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input 
            type="text" 
            placeholder="Search notes, guides, diagrams..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold/50 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-gold text-black" 
                  : "glass text-white/60 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="glass rounded-3xl overflow-hidden group hover:border-gold/30 transition-all flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-gold border border-gold/20">
                {item.category}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col space-y-4">
              <div className="space-y-2">
                <h4 className="font-bold text-lg line-clamp-2 group-hover:text-gold transition-colors">{item.title}</h4>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <User size={14} />
                  <span>{item.author}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">{item.rating}</span>
                  <span className="text-white/20 text-xs font-normal">({item.downloads})</span>
                </div>
                <div className="text-xl font-bold">
                  {item.price === 0 ? <span className="text-emerald-400">FREE</span> : `$${item.price}`}
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-black hover:border-gold transition-all mt-auto">
                <Download size={18} />
                {item.price === 0 ? 'Download Now' : 'Purchase Access'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
