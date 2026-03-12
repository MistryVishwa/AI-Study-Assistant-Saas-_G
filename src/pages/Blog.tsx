import React from 'react';
import { Newspaper, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const posts = [
  { 
    id: 1, 
    title: 'How AI is Revolutionizing Personalized Learning', 
    excerpt: 'Discover how artificial intelligence is changing the way students learn and adapt to complex subjects...',
    author: 'EduPilot Research',
    date: 'March 10, 2026',
    category: 'AI Education',
    image: 'https://picsum.photos/seed/ai-edu/800/400'
  },
  { 
    id: 2, 
    title: '10 Study Habits for Peak Productivity', 
    excerpt: 'Master your schedule and improve your focus with these scientifically proven study techniques...',
    author: 'Dr. Emily Chen',
    date: 'March 8, 2026',
    category: 'Productivity',
    image: 'https://picsum.photos/seed/study/800/400'
  },
  { 
    id: 3, 
    title: 'The Future of Remote Internships', 
    excerpt: 'What you need to know about landing and excelling in a remote internship in the modern era...',
    author: 'Career Coach',
    date: 'March 5, 2026',
    category: 'Careers',
    image: 'https://picsum.photos/seed/career/800/400'
  },
];

export const Blog: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold">EduPilot Blog</h2>
        <p className="text-white/40">Insights, tips, and news from the world of AI-powered learning.</p>
      </div>

      {/* Featured Post */}
      <div className="glass rounded-[40px] overflow-hidden group cursor-pointer border-gold/20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img 
              src={posts[0].image} 
              alt={posts[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-12 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 bg-gold/20 text-gold rounded-full text-xs font-bold border border-gold/20">
                {posts[0].category}
              </span>
              <span className="text-white/40 text-xs flex items-center gap-1">
                <Calendar size={14} /> {posts[0].date}
              </span>
            </div>
            <h3 className="text-3xl font-bold group-hover:text-gold transition-colors leading-tight">
              {posts[0].title}
            </h3>
            <p className="text-white/60 leading-relaxed">
              {posts[0].excerpt}
            </p>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User size={16} className="text-white/40" />
                </div>
                <span className="text-sm font-medium text-white/80">{posts[0].author}</span>
              </div>
              <button className="flex items-center gap-2 text-gold font-bold group/btn">
                Read More <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.slice(1).map((post) => (
          <div key={post.id} className="glass rounded-3xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">{post.category}</span>
                <span className="text-white/20 text-xs">{post.date}</span>
              </div>
              <h4 className="text-xl font-bold group-hover:text-gold transition-colors">{post.title}</h4>
              <p className="text-white/40 text-sm line-clamp-2">{post.excerpt}</p>
              <button className="flex items-center gap-2 text-sm font-bold pt-2 group/btn">
                Read Article <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="glass p-12 rounded-[40px] text-center space-y-6 bg-edu-blue/5 border-edu-blue/20">
        <h3 className="text-2xl font-bold">Stay Updated</h3>
        <p className="text-white/40 max-w-md mx-auto">Subscribe to our newsletter for the latest study tips and AI features.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-edu-blue/50 transition-all"
          />
          <button className="btn-blue px-8 rounded-2xl">Subscribe</button>
        </div>
      </div>
    </div>
  );
};
