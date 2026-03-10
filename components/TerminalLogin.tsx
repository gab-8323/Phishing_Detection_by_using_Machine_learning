
import React, { useState, useEffect } from 'react';

interface TerminalLoginProps {
  onAuthenticated: () => void;
}

const TerminalLogin: React.FC<TerminalLoginProps> = ({ onAuthenticated }) => {
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<'booting' | 'login' | 'authorizing'>('booting');
  const [input, setInput] = useState('');

  const LOGS = [
    "> INITIALIZING SYSTEM BOOT...",
    "> LOADING KERNEL_MODULES...",
    "> ESTABLISHING NEURAL_LINK...",
    "> ENCRYPTING DATA_CHANNELS...",
    "> HANDSHAKE PROTOCOL: V4.1",
    "> STATUS: SYSTEM_READY"
  ];

  useEffect(() => {
    if (phase === 'booting') {
      let i = 0;
      const interval = setInterval(() => {
        setBootLogs(prev => [...prev, LOGS[i]]);
        i++;
        if (i === LOGS.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('login'), 800);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('authorizing');
    setTimeout(() => onAuthenticated(), 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg glass-card p-10 border-brand/40 shadow-[0_0_100px_rgba(0,242,255,0.1)]">
        <div className="mb-8 flex justify-between items-center">
          <span className="font-orbitron text-[10px] text-brand/60 uppercase tracking-[0.5em]">Auth_Node_01</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand/30"></div>
          </div>
        </div>

        <div className="font-mono text-[11px] mb-10 space-y-2 text-brand/80 h-32">
          {bootLogs.map((log, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-left-4 duration-300">{log}</div>
          ))}
          {phase === 'authorizing' && (
             <div className="text-white animate-pulse mt-4">{" >> "}AUTHORIZING_ACCESS_TOKEN...</div>
          )}
        </div>

        {phase === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6 animate-in zoom-in-95 duration-500">
            <div>
              <label className="block text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-3">Operator_ID</label>
              <input 
                autoFocus
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="USER_ALPHA_9"
                className="w-full bg-brand/5 border border-brand/20 p-4 font-mono text-sm text-brand outline-none focus:border-brand shadow-inner"
              />
            </div>
            <button className="w-full bg-brand text-black font-orbitron font-black py-4 uppercase tracking-[0.6em] text-xs hover:bg-white transition-all shadow-lg active:scale-95">
              Initialize_Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TerminalLogin;
