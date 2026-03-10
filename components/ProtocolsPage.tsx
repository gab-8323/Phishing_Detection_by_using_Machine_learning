
import React, { useState } from 'react';

const ProtocolsPage: React.FC = () => {
  const [executing, setExecuting] = useState<string | null>(null);

  const protocols = [
    {
      id: "SIG-ALPHA",
      name: "Zero-Trust Neural Triage",
      steps: ["Enforce Hardware MFA", "Identity Origin Sync", "Sanitize URL Headers"],
      status: "ACTIVE",
      load: "LOW_LATENCY"
    },
    {
      id: "SIG-BETA",
      name: "Visual Forensic Audit",
      steps: ["CSS Mutation Check", "Logo Vector Hashing", "UI Overlay Scraper"],
      status: "NOMINAL",
      load: "HIGH_CPU"
    },
    {
      id: "SIG-OMEGA",
      name: "Tactical Sandbox Isolation",
      steps: ["Hard-Render Virtualized", "Cookie Shredding", "Header Packet Tunnel"],
      status: "IDLE_STANDBY",
      load: "ZERO_LOAD"
    }
  ];

  const handleExecute = (id: string) => {
    setExecuting(id);
    setTimeout(() => setExecuting(null), 3000);
  };

  return (
    <div className="w-full max-w-7xl space-y-20 mx-auto">
      <div className="text-center mb-24">
        <div className="inline-block px-8 py-2 border-x-4 border-brand/20 mb-8">
           <span className="font-mono text-[10px] text-brand/60 font-black uppercase tracking-[1em]">SYSTEM_PROCEDURES_V9.4</span>
        </div>
        <h2 className="font-orbitron text-6xl font-black text-brand cyber-text-glow uppercase tracking-[0.5em] mb-6">Security Protocols</h2>
        <div className="w-32 h-[3px] bg-brand mx-auto mb-4 shadow-[0_0_10px_#00f2ff]"></div>
      </div>

      <div className="space-y-10 w-full">
        {protocols.map((p) => (
          <div key={p.id} className={`glass-card p-12 rounded-[3rem] flex flex-col lg:flex-row gap-12 items-center hover:bg-brand/10 transition-all border-l-[10px] border-brand group relative overflow-hidden ${executing === p.id ? 'animate-pulse border-brand shadow-[0_0_60px_rgba(0,242,255,0.3)] scale-[1.02]' : 'hover:scale-[1.01]'}`}>
            {executing === p.id && (
               <div className="absolute inset-0 bg-brand/20 backdrop-blur-md z-10 flex flex-col items-center justify-center font-orbitron font-black text-brand tracking-[1.5em] animate-pulse">
                  <div className="mb-4">EXECUTING_THREAT_CONTAINMENT...</div>
                  <div className="w-64 h-2 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-brand animate-[loading_3s_ease_forwards]"></div>
                  </div>
               </div>
            )}
            
            <div className="lg:w-1/4 text-center lg:text-left border-r-2 border-white/10 pr-12">
              <div className="font-orbitron text-brand font-black text-5xl mb-4 cyber-text-glow italic">{p.id}</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand animate-ping"></div>
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">STATUS: <span className="text-brand">{p.status}</span></span>
                </div>
                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest ml-5">LOAD: {p.load}</span>
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="font-orbitron text-2xl font-black text-white mb-8 uppercase tracking-[0.2em]">{p.name}</h3>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {p.steps.map((step, si) => (
                  <span key={si} className="bg-black/60 border-2 border-brand/30 px-8 py-3 rounded-2xl text-[11px] font-black text-brand uppercase tracking-widest hover:border-brand hover:bg-brand hover:text-black transition-all cursor-crosshair">
                    {step}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 min-w-[200px]">
              <button 
                onClick={() => handleExecute(p.id)}
                disabled={executing !== null}
                className="glitch-btn px-10 py-5 bg-brand text-black text-[12px] font-orbitron font-black uppercase tracking-[0.4em] hover:bg-white transition-all rounded-2xl shadow-[0_0_30px_rgba(0,242,255,0.3)] active:scale-95 disabled:opacity-20"
              >
                {executing === p.id ? 'RUNNING...' : 'EXECUTE_CMD'}
              </button>
              <div className="text-[9px] font-mono text-white/30 uppercase text-center tracking-[0.5em] font-black italic">LEVEL_5_AUTH_REQUIRED</div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ProtocolsPage;
