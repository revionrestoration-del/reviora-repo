import React, { useState } from 'react';
import { ShieldCheck, User as UserIcon, Lock, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const cleanUsername = username.trim();

    // Verify exact required credentials: username: admin, password: Reviora@2026//
    if (cleanUsername === 'admin' && password === 'Reviora@2026//') {
      try {
        // Also ensure Firebase auth session exists if possible in background
        try {
          await signInWithEmailAndPassword(auth, 'admin@reviora.restoration', 'Reviora@2026//');
        } catch {
          try {
            await createUserWithEmailAndPassword(auth, 'admin@reviora.restoration', 'Reviora@2026//');
          } catch {
            // Ignore background Firebase creation error; local admin authorization is granted
          }
        }
      } catch {
        // Handled
      }

      localStorage.setItem('reviora_admin_session', 'true');
      localStorage.setItem('reviora_admin_username', 'admin');
      setIsSubmitting(false);
      onSuccess();
      return;
    }

    // Invalid credentials
    setTimeout(() => {
      setIsSubmitting(false);
      setError('Invalid username or password. Access denied.');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#071B38] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE7F3] shadow-xl relative text-left">
        {/* Back to Site Button */}
        <button
          onClick={onCancel}
          className="text-xs text-[#75849A] hover:text-[#071B38] flex items-center gap-1 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-block p-1">
            <img
              src="/assets/aistudio/Reviora_Logo__Dark__82b47f73.png"
              alt="REVIORA RESTORATION"
              className="h-9 w-auto object-contain mx-auto"
            />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#071B38] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>Admin Control Panel</span>
          </div>
          <p className="text-xs text-[#75849A]">
            Authorized administration access only.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Direct Username & Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75849A]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#DCE7F3] bg-[#F4F7FB] text-sm text-[#071B38] placeholder:text-[#75849A] focus:outline-none focus:ring-2 focus:ring-[#071B38]"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75849A]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#DCE7F3] bg-[#F4F7FB] text-sm text-[#071B38] placeholder:text-[#75849A] focus:outline-none focus:ring-2 focus:ring-[#071B38]"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#071B38] hover:bg-[#102B50] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
