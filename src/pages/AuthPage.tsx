import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowLeft, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { LoginForm } from '../components/auth/LoginForm';
import { OTPVerification } from '../components/auth/OTPVerification';

export const AuthPage: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'otp' | 'phone' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { signIn, signUp, signInWithGoogle, resetPassword, verifyOTP, sendOTP } = useAuth();

  const handleRegisterSuccess = (targetEmail: string) => {
    setEmail(targetEmail);
    setView('otp');
  };

  const handleOTPVerify = async (otp: string) => {
    await verifyOTP(email, otp, 'signup');
    // Success will trigger AuthContext change and App.tsx will handle redirect
  };

  const handleForgotPassword = async (targetEmail: string) => {
    if (!targetEmail) {
      setError('Please enter your email first');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(targetEmail);
      setSuccess('Password reset link sent to your email!');
      setView('forgot');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-edu-black flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[40px] text-center space-y-8 border-gold/20 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-edu-blue/10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mx-auto rotate-12 mb-6">
            <Sparkles size={32} />
          </div>
          
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              {view === 'login' ? 'Welcome Back' : 
               view === 'register' ? 'Join EduPilot' : 
               view === 'otp' ? 'Verification' :
               view === 'phone' ? 'Phone Login' : 'Reset Password'}
            </h1>
            <p className="text-white/40 text-sm">
              {view === 'login' ? 'Your AI-Powered Study Companion' : 
               view === 'register' ? 'Start your learning journey today' : 
               view === 'otp' ? 'Check your inbox for the code' :
               view === 'phone' ? 'Enter your mobile number' : 'Check your email for instructions'}
            </p>
          </div>

          {view === 'login' && (
            <LoginForm 
              signIn={signIn}
              onSuccess={() => {}} // AuthContext handles state
              onSwitchToRegister={() => setView('register')}
              onForgotPassword={handleForgotPassword}
              onGoogleSignIn={signInWithGoogle}
              onPhoneSignIn={() => setView('phone')}
            />
          )}

          {view === 'register' && (
            <RegisterForm 
              signUp={signUp}
              onSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setView('login')}
              onGoogleSignIn={signInWithGoogle}
            />
          )}

          {view === 'otp' && (
            <OTPVerification 
              email={email}
              onVerify={handleOTPVerify}
              onBack={() => setView('register')}
              onResend={() => sendOTP(email)}
            />
          )}

          {view === 'phone' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all" 
                    />
                  </div>
                </div>
                <button 
                  className="w-full btn-gold py-3 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold"
                  onClick={() => alert('Phone login logic placeholder')}
                >
                  Send OTP
                </button>
              </div>
              <button 
                onClick={() => setView('login')}
                className="text-xs text-white/40 hover:text-gold transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <ArrowLeft size={12} /> Back to Login
              </button>
            </div>
          )}

          {view === 'forgot' && (
            <div className="space-y-6 py-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-400/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-white/80 font-medium">{success}</p>
              <button 
                onClick={() => setView('login')}
                className="text-gold font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft size={16} /> Back to Login
              </button>
            </div>
          )}

          <p className="text-[10px] text-white/20 mt-8">
            By continuing, you agree to EduPilot's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
