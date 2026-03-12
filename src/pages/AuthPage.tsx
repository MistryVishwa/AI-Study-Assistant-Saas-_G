import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Sparkles, Mail, Lock, UserPlus, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else if (mode === 'signup') {
        await signUp(email, password);
        setSuccess('Check your email for the verification link!');
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('Password reset link sent to your email!');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-edu-black flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[40px] text-center space-y-8 border-gold/20">
        <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mx-auto rotate-12">
          <Sparkles size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
            {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Join EduPilot' : 'Reset Password'}
          </h1>
          <p className="text-white/40 text-sm">
            {mode === 'signin' ? 'Your AI-Powered Study Companion' : mode === 'signup' ? 'Start your learning journey today' : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {success ? (
          <div className="space-y-6 py-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-400/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <p className="text-white/80 font-medium">{success}</p>
            <button 
              onClick={() => setMode('signin')}
              className="text-gold font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all" 
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all" 
                  />
                </div>
              </div>
            )}

            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : mode === 'signin' ? <LogIn size={20} /> : mode === 'signup' ? <UserPlus size={20} /> : 'Send Link'}
              {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
            </button>

            {mode === 'signin' && (
              <div className="flex items-center justify-between px-1">
                <button 
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-xs text-white/40 hover:text-gold transition-colors"
                >
                  Forgot Password?
                </button>
                <button 
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-xs text-gold font-bold hover:underline"
                >
                  Create Account
                </button>
              </div>
            )}

            {mode !== 'signin' && (
              <button 
                type="button"
                onClick={() => setMode('signin')}
                className="text-xs text-white/40 hover:text-gold transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <ArrowLeft size={12} /> Back to Sign In
              </button>
            )}

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-edu-black px-2 text-white/20">Or continue with</span></div>
            </div>

            <button 
              type="button"
              onClick={async () => {
                try {
                  setError(null);
                  await signInWithGoogle();
                } catch (err: any) {
                  setError(err.message || 'Failed to connect with Google');
                }
              }}
              className="w-full glass py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-medium"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
          </form>
        )}

        <p className="text-[10px] text-white/20">
          By continuing, you agree to EduPilot's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
