import React, { useState } from 'react';
import { Trophy, Sparkles, Check, X, RotateCcw, Loader2, ChevronRight, HelpCircle } from 'lucide-react';
import { generateStudyContent } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const Quizzes: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);

    try {
      const response = await generateStudyContent(
        `Generate 5 multiple choice questions for the topic: ${topic}. Return them in JSON format: [{question: string, options: [string, string, string, string], correctAnswer: number (0-3)}]`,
        "You are an expert quiz master. Create challenging but fair MCQs."
      );
      
      const jsonStr = response?.match(/\[.*\]/s)?.[0];
      if (jsonStr) {
        setQuestions(JSON.parse(jsonStr));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setTopic('');
    setIsFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Quiz Generator</h2>
          <p className="text-white/40 mt-1">Test your knowledge with custom quizzes.</p>
        </div>
        {questions.length > 0 && !isFinished && (
          <div className="glass px-4 py-2 rounded-xl text-gold font-bold">
            Score: {score} / {questions.length}
          </div>
        )}
      </div>

      {!questions.length && !isGenerating && (
        <div className="glass p-12 rounded-3xl text-center space-y-6">
          <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto">
            <HelpCircle size={40} />
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-2xl font-bold">Ready to test yourself?</h3>
            <p className="text-white/40">Enter a topic and EduPilot will generate a personalized quiz for you.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g., Photosynthesis, World War II, Python Basics" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-gold/50 transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={!topic}
                className="btn-gold px-8 rounded-2xl disabled:opacity-50"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="glass p-20 rounded-3xl flex flex-col items-center justify-center gap-6">
          <Loader2 size={48} className="animate-spin text-gold" />
          <p className="text-xl font-medium animate-pulse">Crafting your quiz questions...</p>
        </div>
      )}

      {questions.length > 0 && !isFinished && (
        <div className="space-y-8">
          <div className="glass p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-gold transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            <p className="text-sm font-bold text-white/20 uppercase tracking-widest mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <h3 className="text-2xl font-bold leading-tight mb-10">
              {questions[currentQuestionIndex].question}
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group",
                    selectedOption === null 
                      ? "bg-white/5 border-white/10 hover:border-gold/50 hover:bg-gold/5" 
                      : i === questions[currentQuestionIndex].correctAnswer
                        ? "bg-emerald-400/10 border-emerald-400/50 text-emerald-400"
                        : i === selectedOption
                          ? "bg-red-400/10 border-red-400/50 text-red-400"
                          : "bg-white/5 border-white/10 opacity-50"
                  )}
                >
                  <span className="font-medium">{option}</span>
                  {selectedOption !== null && i === questions[currentQuestionIndex].correctAnswer && <Check size={20} />}
                  {selectedOption === i && i !== questions[currentQuestionIndex].correctAnswer && <X size={20} />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={nextQuestion}
              disabled={selectedOption === null}
              className="btn-gold flex items-center gap-2 disabled:opacity-50 px-10 py-4 rounded-2xl"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="glass p-12 rounded-3xl text-center space-y-8 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto">
            <Trophy size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold">Quiz Completed!</h3>
            <p className="text-white/40 text-xl">You scored {score} out of {questions.length}</p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="glass px-8 py-4 rounded-2xl">
              <p className="text-xs text-white/40 uppercase font-bold">Accuracy</p>
              <p className="text-2xl font-bold">{(score / questions.length) * 100}%</p>
            </div>
            <div className="glass px-8 py-4 rounded-2xl">
              <p className="text-xs text-white/40 uppercase font-bold">Points</p>
              <p className="text-2xl font-bold">{score * 100}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <button onClick={resetQuiz} className="glass px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-colors">
              <RotateCcw size={20} />
              Try Another Topic
            </button>
            <button className="btn-gold px-10 py-4 rounded-2xl">
              Share Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
