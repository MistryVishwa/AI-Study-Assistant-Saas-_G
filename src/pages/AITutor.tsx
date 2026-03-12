import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { generateStudyContent } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello! I'm your EduPilot AI Tutor. What topic would you like to explore today? I can explain complex concepts, help with code, or generate practice examples." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await generateStudyContent(userMessage, "You are an expert academic tutor. Provide step-by-step explanations, clear examples, and encourage critical thinking. Use markdown for formatting.");
      setMessages(prev => [...prev, { role: 'bot', content: response || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Error: Failed to connect to AI services. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] glass rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">AI Learning Assistant</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Online & Ready
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-4 max-w-[80%]",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-edu-blue" : "bg-gold"
            )}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-black" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed",
              msg.role === 'user' 
                ? "bg-edu-blue/20 border border-edu-blue/30 text-white" 
                : "bg-white/5 border border-white/10 text-white/90"
            )}>
              <div className="markdown-body">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0">
              <Bot size={16} className="text-black" />
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <Loader2 size={20} className="animate-spin text-gold" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/5 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything... (e.g., Explain Quantum Entanglement)"
            className="w-full bg-edu-black border border-white/10 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-gold/50 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold text-black rounded-xl flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-white/20 mt-3">
          EduPilot AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};
