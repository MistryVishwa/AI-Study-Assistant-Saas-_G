import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Bot, User, Loader2, Play, Square } from 'lucide-react';
import { generateStudyContent } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';

export const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          handleAIResponse(transcriptText);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setResponse('');
      window.speechSynthesis.cancel();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleAIResponse = async (text: string) => {
    setIsLoading(true);
    try {
      const aiText = await generateStudyContent(text, "You are a helpful voice-based study assistant. Keep your responses concise and conversational, suitable for being read aloud.");
      setResponse(aiText || "");
      speak(aiText || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gold to-edu-blue bg-clip-text text-transparent">
          AI Voice Assistant
        </h2>
        <p className="text-white/40 text-lg">Talk to EduPilot for hands-free learning.</p>
      </div>

      <div className="relative">
        {/* Animated Rings */}
        {(isListening || isSpeaking || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-gold/20 animate-ping"></div>
            <div className="absolute w-64 h-64 rounded-full border-2 border-edu-blue/10 animate-ping [animation-delay:0.5s]"></div>
          </div>
        )}

        <button 
          onClick={toggleListening}
          className={cn(
            "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 shadow-2xl",
            isListening 
              ? "bg-red-500 text-white scale-110 shadow-red-500/20" 
              : "bg-gradient-to-br from-gold to-gold-light text-black hover:scale-105"
          )}
        >
          {isListening ? <MicOff size={48} /> : <Mic size={48} />}
        </button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl min-h-[200px] flex flex-col">
          <div className="flex items-center gap-2 text-white/40 mb-4 uppercase text-xs font-bold tracking-widest">
            <User size={14} />
            You said
          </div>
          <p className="text-xl font-medium leading-relaxed">
            {transcript || (isListening ? "Listening..." : "Click the mic to start speaking...")}
          </p>
        </div>

        <div className="glass p-8 rounded-3xl min-h-[200px] flex flex-col border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gold uppercase text-xs font-bold tracking-widest">
              <Bot size={14} />
              EduPilot
            </div>
            {isSpeaking && (
              <button 
                onClick={stopSpeaking}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Square size={16} fill="currentColor" />
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="flex items-center gap-3 text-white/40">
              <Loader2 size={20} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <p className="text-xl font-medium leading-relaxed text-white/90">
              {response || "I'm ready to help. Ask me anything about your studies."}
            </p>
          )}
          {response && !isSpeaking && !isLoading && (
            <button 
              onClick={() => speak(response)}
              className="mt-auto self-end p-2 bg-white/5 rounded-lg text-white/40 hover:text-gold transition-colors"
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6 text-white/20 text-sm font-medium">
        <span className="flex items-center gap-2"><Sparkles size={14} /> Real-time Processing</span>
        <span className="flex items-center gap-2"><Volume2 size={14} /> Natural Voice Synthesis</span>
      </div>
    </div>
  );
};
