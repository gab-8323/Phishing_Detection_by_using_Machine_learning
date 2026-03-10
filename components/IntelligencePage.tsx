
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ThreatMap from './ThreatMap.tsx';
import { GeminiService } from '../services/geminiService.ts';

const CHART_DATA = [
  { name: '00:00', threats: 420 },
  { name: '04:00', threats: 380 },
  { name: '08:00', threats: 850 },
  { name: '12:00', threats: 1100 },
  { name: '16:00', threats: 1450 },
  { name: '20:00', threats: 920 },
  { name: '23:59', threats: 550 },
];

const IntelligencePage: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState(0);
  const [liveReports, setLiveReports] = useState<any[]>([]);
  const [summary, setSummary] = useState("Awaiting secure handshake with threat intelligence nodes...");
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const geminiRef = useRef<GeminiService | null>(null);

  useEffect(() => {
    geminiRef.current = new GeminiService();
    fetchIntel();
  }, []);

  useEffect(() => {
    if (liveReports.length > 0) {
      const int = setInterval(() => setActiveFeed(p => (p + 1) % liveReports.length), 4000);
      return () => clearInterval(int);
    }
  }, [liveReports]);

  const fetchIntel = async () => {
    if (!geminiRef.current) return;
    setIsLoading(true);
    const data = await geminiRef.current.getLiveThreatIntel();
    if (data.reports && data.reports.length > 0) {
      setLiveReports(data.reports);
      setSummary(data.summary);
      // Store grounding sources as required by guidelines for googleSearch
      setGroundingSources(data.groundingSources || []);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col items-center mx-auto px-6">
      <div className="text-center mb-24 w-full">
        <div className="inline-flex items-center gap-3 bg-brand/5 border border-brand/20 px-6 py-2 rounded-full mb-6">
          <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#00f2ff] ${isLoading ? 'bg-yellow-500 animate-bounce' : 'bg-brand animate-pulse'}`}></div>
          <span className="font-orbitron text-[9px] text-brand font-black tracking-[0.4em] uppercase">
            {isLoading ? 'SYNCING_NODES...' : 'GLOBAL_COMMAND_CENTER_READY'}
          </span>
        </div>
        <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white cyber-text-glow mb-6 tracking-wider leading-none">NEURAL INTELLIGENCE</h2>
        <div className="max-w-3xl mx-auto border-y border-brand/10 py-6 px-4">
           <p className="font-mono text-brand/80 text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] leading-relaxed">
             {summary}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mb-16">
        <div className="w-full">
          <ThreatMap />
        </div>
        
        <div className="glass-card p-8 flex flex-col w-full h-full min-h-[400px]">
          <div className="flex justify-between items-center mb-10 border-b border-brand/10 pb-4">
            <span className="font-mono text-[9px] text-brand uppercase font-black tracking-widest">Incident_Frequency_24H</span>
            <span className="text-[9px] text-white/20 uppercase font-black">Sync_Rate: 0.12ms</span>
          </div>
          <div className="flex-grow">
            {/* Fix: height prop must be a number or a valid percentage string */}
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 242, 255, 0.05)" vertical={false}/>
                <XAxis dataKey="name" stroke="rgba(0, 242, 255, 0.2)" fontSize={9} tickLine={false} axisLine={false}/>
                <YAxis stroke="rgba(0, 242, 255, 0.2)" fontSize={9} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ backgroundColor: '#010606', border: '1px solid rgba(0, 242, 255, 0.2)', color: '#00f2ff', fontSize: '10px' }}/>
                <Area type="monotone" dataKey="threats" stroke="#00f2ff" strokeWidth={2} fill="url(#glow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="text-[10px] font-orbitron font-black text-brand mb-8 tracking-[0.5em] uppercase border-b border-brand/20 pb-2">LIVE_THREAT_FEEDS_NODES</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass-card p-6 h-32 border-white/5 opacity-20 animate-pulse"></div>
            ))
          ) : (
            liveReports.map((f, i) => (
              <div 
                key={i} 
                className={`glass-card p-6 flex flex-col border-l-2 transition-all duration-700 min-h-[140px] ${
                  i === activeFeed ? 'border-brand bg-brand/5 shadow-[0_0_20px_rgba(0,242,255,0.1)]' : 'border-white/5 opacity-40'
                }`}
              >
                <div className="text-[8px] font-black text-brand/60 uppercase mb-2 tracking-widest">{f.node}</div>
                <div className="text-white font-orbitron font-black text-[11px] mb-2 uppercase tracking-tight leading-tight">{f.type}</div>
                <div className="text-[9px] font-mono font-bold text-white/30 uppercase mt-auto">{f.action}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mandatory: List website URLs from groundingChunks when using googleSearch */}
      {groundingSources.length > 0 && (
        <div className="w-full mt-16 px-6">
          <div className="text-[10px] font-orbitron font-black text-brand mb-6 tracking-[0.5em] uppercase border-b border-brand/20 pb-2 text-center">INTEL_VERIFICATION_SOURCES</div>
          <div className="flex flex-wrap justify-center gap-4">
            {groundingSources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-black/40 border border-brand/20 rounded-lg text-[9px] font-black text-brand hover:border-brand transition-all flex items-center gap-2"
              >
                {source.title}
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="3" /></svg>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 mt-16">
        <button 
          onClick={fetchIntel}
          disabled={isLoading}
          className={`px-12 py-5 border-2 rounded-2xl transition-all font-orbitron font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-4 group ${
            isLoading 
              ? 'border-brand/10 text-brand/20 cursor-wait' 
              : 'border-brand/30 hover:border-brand hover:bg-brand/10 text-brand active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.1)]'
          }`}
        >
          <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{isLoading ? 'SYNCING_INTEL...' : 'RE-SYNC_NEURAL_NODES'}</span>
        </button>
        <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest animate-pulse">
          {isLoading ? 'ESTABLISHING_ENCRYPTED_HANDSHAKE' : 'NODES_IDLE_READY_FOR_SYNC'}
        </div>
      </div>
    </div>
  );
};

export default IntelligencePage;
