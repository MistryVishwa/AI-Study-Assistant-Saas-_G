import React, { useState } from 'react';
import { Mail, Lock, Loader2, Phone } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onForgotPassword: (email: string) => void;
  onGoogleSignIn: () => void;
  onPhoneSignIn: () => void;
  signIn: (email: string, password: string) => Promise<any>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  onSwitchToRegister, 
  onForgotPassword,
  onGoogleSignIn,
  onPhoneSignIn,
  signIn 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Password</label>
            <button 
              type="button"
              onClick={() => onForgotPassword(email)}
              className="text-[10px] text-white/40 hover:text-gold transition-colors uppercase tracking-widest font-bold"
            >
              Forgot?
            </button>
          </div>
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

        {error && <p className="text-red-400 text-xs font-medium text-center">{error}</p>}

        <button 
          type="submit"
          disabled={loading}
          className="w-full btn-gold py-3 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : 'Login'}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-edu-black px-2 text-white/20">OR</span></div>
      </div>

      <div className="space-y-3">
        <button 
          type="button"
          onClick={onPhoneSignIn}
          className="w-full glass py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-medium"
        >
          <Phone size={18} className="text-white/40" />
          Continue with Phone
        </button>

        <button 
          type="button"
          onClick={onGoogleSignIn}
          className="w-full glass py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-medium"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <button 
          type="button"
          onClick={onSwitchToRegister}
          className="text-xs text-white/40 hover:text-gold transition-colors flex items-center justify-center gap-1 mx-auto"
        >
          Don't have an account? <span className="text-gold font-bold">Register</span>
        </button>
      </div>
    </div>
  );
};
