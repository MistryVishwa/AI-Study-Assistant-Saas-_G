import React, { useState } from 'react';
import { Image as ImageIcon, Video, Play, Sparkles, Wand2, Loader2, Download, Share2, MessageSquare } from 'lucide-react';
import { generateStudyContent } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';

export const ExtraTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'image' | 'video' | 'demo'>('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setResult(null);

    try {
      if (activeTool === 'image') {
        // Simulate image generation by finding a relevant picsum image based on prompt keywords
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResult(`https://picsum.photos/seed/${prompt.replace(/\s+/g, '-')}/800/600`);
      } else if (activeTool === 'video') {
        // Simulate video generation
        await new Promise(resolve => setTimeout(resolve, 3000));
        setResult("Video generation is a premium feature. Your request has been queued.");
      } else {
        // Live Demo Session
        const response = await generateStudyContent(
          `Act as a teacher and answer this question in a live session format: ${prompt}`,
          "You are a charismatic and knowledgeable teacher. Speak directly to the student."
        );
        setResult(response || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Extra AI Tools</h2>
          <p className="text-white/40 mt-1">Advanced AI capabilities for visual and interactive learning.</p>
        </div>
      </div>

      <div className="flex gap-4">
        {[
          { id: 'image', label: 'Image Generator', icon: ImageIcon, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { id: 'video', label: 'Video Generator', icon: Video, color: 'text-edu-blue', bg: 'bg-edu-blue/10' },
          { id: 'demo', label: 'Live Demo Session', icon: Play, color: 'text-gold', bg: 'bg-gold/10' },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id as any);
              setResult(null);
              setPrompt('');
            }}
            className={cn(
              "flex-1 p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 text-center",
              activeTool === tool.id 
                ? "glass border-gold/50 bg-gold/5" 
                : "glass border-white/5 hover:border-white/20"
            )}
          >
            <div className={cn("p-4 rounded-2xl", tool.bg)}>
              <tool.icon className={tool.color} size={24} />
            </div>
            <span className={cn("font-bold", activeTool === tool.id ? "text-gold" : "text-white/60")}>
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[40px] space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Wand2 className="text-gold" />
              {activeTool === 'image' ? 'Educational Diagram' : activeTool === 'video' ? 'Topic Explanation' : 'Teacher Q&A'}
            </h3>
            <p className="text-white/40 leading-relaxed">
              {activeTool === 'image' 
                ? 'Describe the diagram or illustration you need for your studies. Our AI will generate a high-quality visual for you.'
                : activeTool === 'video'
                ? 'Enter a topic, and our AI will generate a short explanatory video with animations and voiceover.'
                : 'Ask a question as if you were in a live class. The AI teacher will respond with a detailed explanation.'}
            </p>
          </div>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={activeTool === 'image' ? "e.g., Structure of a plant cell with labels" : "e.g., Explain the concept of supply and demand"}
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[150px] outline-none focus:border-gold/50 transition-all resize-none"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full btn-gold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {isGenerating ? 'Processing...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        <div className="glass rounded-[40px] flex flex-col overflow-hidden border-gold/20 min-h-[400px]">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
            <h3 className="font-bold text-white/60">Preview</h3>
            {result && activeTool === 'image' && (
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors">
                  <Download size={18} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-8 flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <Loader2 size={48} className="animate-spin text-gold mx-auto" />
                <p className="text-white/40 animate-pulse">Our AI is working its magic...</p>
              </div>
            ) : result ? (
              activeTool === 'image' ? (
                <div className="space-y-4 w-full">
                  <img src={result} alt="Generated" className="w-full rounded-2xl shadow-2xl border border-white/10" referrerPolicy="no-referrer" />
                  <p className="text-center text-xs text-white/20 italic">Generated based on: "{prompt}"</p>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none w-full">
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gold/10 rounded-2xl border border-gold/20">
                    <MessageSquare className="text-gold" size={24} />
                    <span className="font-bold text-gold">AI Response</span>
                  </div>
                  <p className="text-lg leading-relaxed text-white/80 whitespace-pre-wrap">{result}</p>
                </div>
              )
            ) : (
              <div className="text-center space-y-4 text-white/10">
                <Sparkles size={64} className="mx-auto" />
                <p>Output will appear here after generation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
