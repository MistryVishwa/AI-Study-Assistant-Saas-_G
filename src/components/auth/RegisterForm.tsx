import React, { useState } from 'react';
import { Mail, Lock, User, Target, Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: (email: string) => void;
  onSwitchToLogin: () => void;
  onGoogleSignIn: () => void;
  signUp: (email: string, password: string, name: string, goal: string) => Promise<any>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  onSwitchToLogin, 
  onGoogleSignIn,
  signUp 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signUp(email, password, name, goal);
      onSuccess(email);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              required 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all" 
            />
          </div>
        </div>

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

        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Learning Goal</label>
          <div className="relative">
            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <select 
              required
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-gold/50 outline-none transition-all appearance-none text-white/80"
            >
              <option value="" disabled className="bg-edu-black">Select a goal</option>
              <option value="Academic Excellence" className="bg-edu-black">Academic Excellence</option>
              <option value="Skill Development" className="bg-edu-black">Skill Development</option>
              <option value="Career Advancement" className="bg-edu-black">Career Advancement</option>
              <option value="Personal Interest" className="bg-edu-black">Personal Interest</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-400 text-xs font-medium text-center">{error}</p>}

        <button 
          type="submit"
          disabled={loading}
          className="w-full btn-gold py-3 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : 'Register'}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-edu-black px-2 text-white/20">OR</span></div>
      </div>

      <div className="space-y-3">
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
          onClick={onSwitchToLogin}
          className="text-xs text-white/40 hover:text-gold transition-colors flex items-center justify-center gap-1 mx-auto"
        >
          Already have an account? <span className="text-gold font-bold">Log In</span>
        </button>
      </div>
    </div>
  );
};
