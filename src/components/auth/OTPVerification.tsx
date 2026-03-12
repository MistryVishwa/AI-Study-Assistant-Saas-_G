import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onBack: () => void;
  onResend: () => Promise<void>;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  email, 
  onVerify, 
  onBack,
  onResend 
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }
    if (timer === 0) {
      setError('OTP expired. Request new code.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onVerify(otp);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    try {
      await onResend();
      setTimer(300);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white">Verify Email</h2>
        <p className="text-white/40 text-sm">
          We've sent a 6-digit code to <br />
          <span className="text-white/80 font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input 
            required 
            type="text" 
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 text-center text-3xl font-bold tracking-[0.5em] focus:border-gold/50 outline-none transition-all placeholder:text-white/5" 
          />
          <div className="flex justify-between items-center px-1">
            <span className={timer < 60 ? "text-red-400 text-xs font-medium" : "text-white/20 text-xs"}>
              Expires in: {formatTime(timer)}
            </span>
            <button 
              type="button"
              onClick={handleResend}
              disabled={resending || timer > 240}
              className="text-xs text-gold font-bold hover:underline disabled:opacity-30 flex items-center gap-1"
            >
              {resending ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
              Resend Code
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-xs font-medium text-center">{error}</p>}

        <button 
          type="submit"
          disabled={loading || timer === 0}
          className="w-full btn-gold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : 'Verify & Continue'}
        </button>

        <button 
          type="button"
          onClick={onBack}
          className="text-xs text-white/40 hover:text-gold transition-colors flex items-center justify-center gap-1 mx-auto"
        >
          <ArrowLeft size={12} /> Back to registration
        </button>
      </form>
    </div>
  );
};
