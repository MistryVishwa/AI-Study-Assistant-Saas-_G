import React, { useState } from 'react';
import { CreditCard, Plus, Sparkles, RotateCcw, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateStudyContent } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export const Flashcards: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([
    { id: '1', question: 'What is the powerhouse of the cell?', answer: 'Mitochondria' },
    { id: '2', question: 'Define "Quantum Entanglement".', answer: 'A physical phenomenon that occurs when pairs or groups of particles are generated, interact, or share spatial proximity in ways such that the quantum state of each particle cannot be described independently of the state of the others.' },
    { id: '3', question: 'Who wrote "The Republic"?', answer: 'Plato' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const response = await generateStudyContent(
        `Generate 5 flashcards for the topic: ${topic}. Return them in JSON format: [{question: string, answer: string}]`,
        "You are an expert educator. Create high-quality flashcards with clear questions and concise answers."
      );
      
      // Basic extraction of JSON from text
      const jsonStr = response?.match(/\[.*\]/s)?.[0];
      if (jsonStr) {
        const newCards = JSON.parse(jsonStr);
        setCards(prev => [...prev, ...newCards.map((c: any) => ({ ...c, id: Math.random().toString() }))]);
        setTopic('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Flashcards</h2>
          <p className="text-white/40 mt-1">Master topics with spaced repetition.</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Enter topic for AI cards..." 
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-gold/50"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="btn-gold flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? <RotateCcw size={18} className="animate-spin" /> : <Sparkles size={18} />}
            AI Generate
          </button>
        </div>
      </div>

      {cards.length > 0 ? (
        <div className="space-y-8">
          <div className="relative h-[400px] perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + (isFlipped ? '-back' : '-front')}
                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className={cn(
                  "w-full h-full glass rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer select-none border-2 transition-colors",
                  isFlipped ? "border-gold/40 bg-gold/5" : "border-white/10 hover:border-white/20"
                )}
              >
                <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-8">
                  {isFlipped ? 'Answer' : 'Question'}
                </p>
                <h3 className={cn(
                  "text-2xl md:text-3xl font-bold leading-tight",
                  isFlipped ? "text-gold" : "text-white"
                )}>
                  {isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}
                </h3>
                <p className="mt-12 text-white/20 text-sm italic">Click to flip</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button onClick={prevCard} className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextCard} className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20 transition-all">
                <X size={20} />
                Hard
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-400/20 transition-all">
                <Check size={20} />
                Easy
              </button>
            </div>

            <div className="text-white/40 font-medium">
              {currentIndex + 1} / {cards.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[400px] glass rounded-3xl flex flex-col items-center justify-center gap-4 text-white/20">
          <CreditCard size={64} />
          <p>No flashcards yet. Generate some with AI!</p>
        </div>
      )}
    </div>
  );
};
