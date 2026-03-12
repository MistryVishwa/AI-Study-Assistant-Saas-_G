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
import { AuthPage } from './pages/AuthPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function AppContent() {

  const [activeTab, setActiveTab] = useState('dashboard');

  const { user, loading } = useAuth();

  if (loading) {

    return (

      <div className="min-h-screen bg-edu-black flex items-center justify-center">

        <div className="text-center space-y-4">

          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto"></div>

          <p className="text-gold font-bold animate-pulse">
            Initializing EduPilot...
          </p>

        </div>

      </div>

    );

  }

  // Tabs that REQUIRE login
  const protectedTabs = [
    'library',
    'notes',
    'tutor',
    'voice',
    'planner',
    'flashcards',
    'quizzes',
    'profile'
  ];

  // If user not logged and trying protected tab → show auth
  if (!user && protectedTabs.includes(activeTab)) {

    return <AuthPage />;

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

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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

export default function App() {

  return (

    <ErrorBoundary>

      <AuthProvider>

        <AppContent />

      </AuthProvider>

    </ErrorBoundary>

  );

}