/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { AITutor } from './pages/AITutor';
import { AINotes } from './pages/AINotes';
import { LectureLibrary } from './pages/LectureLibrary';
import { Flashcards } from './pages/Flashcards';
import { Quizzes } from './pages/Quizzes';
import { StudyPlanner } from './pages/StudyPlanner';
import { VoiceAssistant } from './pages/VoiceAssistant';
import { Marketplace } from './pages/Marketplace';
import { Blog } from './pages/Blog';
import { Profile } from './pages/Profile';
import { ExtraTools } from './pages/ExtraTools';
import { Support } from './pages/Support';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LogIn, Sparkles } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-edu-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto"></div>
          <p className="text-gold font-bold animate-pulse">Initializing EduPilot...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-edu-black flex items-center justify-center p-6">
        <div className="max-w-md w-full glass p-12 rounded-[40px] text-center space-y-8 border-gold/20">
          <div className="w-20 h-20 bg-gold/10 text-gold rounded-3xl flex items-center justify-center mx-auto rotate-12">
            <Sparkles size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              EduPilot
            </h1>
            <p className="text-white/40">Your AI-Powered Study Companion</p>
          </div>
          <button 
            onClick={signIn}
            className="w-full btn-gold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg"
          >
            <LogIn size={20} />
            Continue with Google
          </button>
          <p className="text-xs text-white/20">
            By continuing, you agree to EduPilot's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <LectureLibrary />;
      case 'notes':
        return <AINotes />;
      case 'tutor':
        return <AITutor />;
      case 'voice':
        return <VoiceAssistant />;
      case 'planner':
        return <StudyPlanner />;
      case 'flashcards':
        return <Flashcards />;
      case 'quizzes':
        return <Quizzes />;
      case 'marketplace':
        return <Marketplace />;
      case 'blog':
        return <Blog />;
      case 'profile':
        return <Profile />;
      case 'tools':
        return <ExtraTools />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-edu-black">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
