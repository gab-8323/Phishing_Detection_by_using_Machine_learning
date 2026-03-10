
import React, { useState, useCallback } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  }, [onLogin]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-md p-10 rounded-2xl border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,242,255,0.2)]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-orbitron text-2xl font-black text-cyan-400 cyber-text-glow uppercase tracking-widest">Authorize</h2>
          <button onClick={onClose} className="text-cyan-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">Access Key (Email)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-cyan-400/40 p-4 rounded text-white focus:outline-none focus:border-cyan-400 transition-all font-mono"
              placeholder="operator@phishguard.sys"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">Cryptographic Pass</label>
            <input 
              type="password" 
              required
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full bg-black/40 border border-cyan-400/40 p-4 rounded text-white focus:outline-none focus:border-cyan-400 transition-all font-mono"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-orbitron font-black py-4 rounded transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] uppercase tracking-[0.4em] mt-4"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Encrypted Handshake Protocol v2.4</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
