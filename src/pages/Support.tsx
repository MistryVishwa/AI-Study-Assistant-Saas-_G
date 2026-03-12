import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle2, HelpCircle, LifeBuoy, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Support: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">How can we help?</h2>
        <p className="text-white/40 text-lg">Our team and AI assistants are here to support your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Email Support', desc: 'Get help from our team via email.', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { title: 'AI Help Assistant', desc: 'Instant answers to your questions.', icon: MessageSquare, color: 'text-gold', bg: 'bg-gold/10' },
          { title: 'Community Forum', desc: 'Connect with other EduPilot users.', icon: LifeBuoy, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((item, i) => (
          <div key={i} className="glass p-8 rounded-3xl text-center space-y-4 hover:border-white/20 transition-all cursor-pointer group">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform", item.bg)}>
              <item.icon className={item.color} size={32} />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-white/40 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="glass p-10 rounded-[40px] space-y-8">
            <h3 className="text-2xl font-bold">Send us a message</h3>
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-400/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-2xl font-bold">Message Sent!</h4>
                <p className="text-white/40">We've received your inquiry and will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-gold font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-gold/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email</label>
                    <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-gold/50 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-gold/50 transition-all">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Message</label>
                  <textarea required placeholder="How can we help you today?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[150px] outline-none focus:border-gold/50 transition-all resize-none" />
                </div>
                <button type="submit" className="w-full btn-gold py-4 rounded-2xl flex items-center justify-center gap-2">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              { q: 'How does the AI Tutor work?', a: 'Our AI Tutor uses advanced language models trained on academic content to provide personalized explanations and examples.' },
              { q: 'Is my data secure?', a: 'Yes, we use industry-standard encryption and secure cloud storage to protect all your study materials and personal information.' },
              { q: 'Can I use EduPilot offline?', a: 'While most AI features require an internet connection, you can access your downloaded notes and flashcards offline.' },
              { q: 'What is the marketplace?', a: 'The marketplace is a platform where students can share and sell their high-quality study materials with the community.' },
            ].map((faq, i) => (
              <div key={i} className="glass p-6 rounded-3xl space-y-2 hover:border-white/20 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold group-hover:text-gold transition-colors">{faq.q}</h4>
                  <HelpCircle size={18} className="text-white/20" />
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="glass p-8 rounded-3xl bg-edu-blue/5 border-edu-blue/20 flex items-center gap-6">
            <div className="p-4 bg-edu-blue/10 text-edu-blue rounded-2xl">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="font-bold">Premium Support</h4>
              <p className="text-sm text-white/40">Premium users get 24/7 priority support and dedicated AI resources.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
