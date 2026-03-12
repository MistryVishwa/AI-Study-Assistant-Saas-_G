import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Download, Copy, Check, Loader2 } from 'lucide-react';
import { generateStudyContent } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';
import ReactMarkdown from 'react-markdown';

export const AINotes: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type: 'summary' | 'concepts' | 'revision') => {
    if (!inputText.trim() || isGenerating) return;

    setIsGenerating(true);
    let prompt = "";
    
    if (type === 'summary') prompt = `Generate a comprehensive summary of the following text: \n\n${inputText}`;
    if (type === 'concepts') prompt = `Extract the key concepts and definitions from the following text: \n\n${inputText}`;
    if (type === 'revision') prompt = `Create concise revision notes and bullet points for the following text: \n\n${inputText}`;

    try {
      const response = await generateStudyContent(prompt, "You are an expert academic note-taker. Organize information logically using headings, bullet points, and bold text for emphasis.");
      setNotes(response || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-160px)]">
      {/* Input Section */}
      <div className="flex flex-col gap-6">
        <div className="glass p-8 rounded-3xl flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileText className="text-gold" />
              Source Material
            </h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-colors">
                <Upload size={18} />
              </button>
            </div>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your lecture notes, transcript, or article here..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-gold/30 transition-all resize-none text-white/80 leading-relaxed"
          />

          <div className="grid grid-cols-3 gap-4 mt-6">
            <button 
              onClick={() => handleGenerate('summary')}
              disabled={isGenerating || !inputText}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all group disabled:opacity-50"
            >
              <Sparkles className="text-gold group-hover:scale-110 transition-transform" size={20} />
              <span className="text-xs font-medium">Summary</span>
            </button>
            <button 
              onClick={() => handleGenerate('concepts')}
              disabled={isGenerating || !inputText}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-edu-blue/50 hover:bg-edu-blue/5 transition-all group disabled:opacity-50"
            >
              <FileText className="text-edu-blue group-hover:scale-110 transition-transform" size={20} />
              <span className="text-xs font-medium">Concepts</span>
            </button>
            <button 
              onClick={() => handleGenerate('revision')}
              disabled={isGenerating || !inputText}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-400/5 transition-all group disabled:opacity-50"
            >
              <Check className="text-emerald-400 group-hover:scale-110 transition-transform" size={20} />
              <span className="text-xs font-medium">Revision</span>
            </button>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="glass rounded-3xl flex flex-col overflow-hidden border-gold/20">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gold/5">
          <h3 className="font-bold text-gold flex items-center gap-2">
            <Sparkles size={18} />
            AI Generated Notes
          </h3>
          {notes && (
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
              >
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors">
                <Download size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-white/40">
              <Loader2 size={40} className="animate-spin text-gold" />
              <p className="animate-pulse">EduPilot is analyzing your content...</p>
            </div>
          ) : notes ? (
            <div className="markdown-body prose prose-invert max-w-none">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-white/20 text-center">
              <FileText size={48} />
              <p>Your AI-generated notes will appear here.<br/>Select an option to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
