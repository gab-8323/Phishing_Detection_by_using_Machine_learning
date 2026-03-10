
import React, { useState } from 'react';
import { ScanResult, RiskLevel } from '../types.ts';

interface ResultDashboardProps {
  result: ScanResult;
  onReset: () => void;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, onReset }) => {
  const isSafe = result.riskLevel === RiskLevel.LOW;
  const isDanger = result.riskLevel === RiskLevel.HIGH || result.riskLevel === RiskLevel.CRITICAL;
  
  const riskScore = result.riskScore;
  const displayPercentage = isSafe ? 100 - riskScore : riskScore;
  const confidence = (riskScore > 85 || riskScore < 15) ? 'MAXIMUM_CONFIDENCE' : 'STANDARD_LOGIC';

  const handleExport = () => {
    window.print();
  };

  return (
    <div className={"w-full flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 pb-10 px-4 " + (isDanger ? 'danger-dashboard' : '')}>
      <div className="flex flex-col items-center mb-4 md:mb-8 text-center relative w-full">
        {/* Glow behind the main result */}
        <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square opacity-20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none " + (isSafe ? 'bg-brand' : 'bg-red-700 animate-pulse')}></div>

        <div className="relative mb-4 md:mb-8">
          <div className={"relative font-orbitron text-[3.5rem] md:text-[6rem] lg:text-[8rem] font-black leading-none flex items-center justify-center transition-all duration-1000 " + (
            isSafe ? 'text-brand cyber-text-glow' : 'text-red-500 danger-text-glow scale-105'
          )}>
            {Math.floor(displayPercentage)}
            <span className="text-xl md:text-2xl lg:text-3xl font-mono opacity-20 ml-2 md:ml-3">{isSafe ? '%' : '!'}</span>
          </div>
          {isDanger && (
            <div className="absolute -top-4 md:-top-8 left-1/2 -translate-x-1/2 px-4 md:px-10 py-1.5 md:py-3 bg-red-600 text-white font-orbitron font-black text-xs md:text-xl uppercase tracking-[0.6em] md:tracking-[1em] shadow-[0_0_40px_rgba(255,0,0,0.6)] animate-bounce italic">
              THREAT
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-3 md:gap-5 relative z-10">
          <div className={"px-5 md:px-10 py-2 md:py-4 rounded-lg md:rounded-xl text-black font-orbitron font-black text-sm md:text-xl uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all " + (
            isSafe ? 'bg-brand shadow-[0_0_60px_rgba(0,242,255,0.4)]' : 'bg-red-600 shadow-[0_0_80px_rgba(255,0,60,0.5)] animate-pulse'
          )}>
            {isSafe ? 'SECURE' : 'BREACH'}
          </div>
          
          <div className="flex flex-col items-center bg-black/40 px-4 md:px-8 py-2 md:py-4 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-md">
            <span className={"font-mono text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] mb-1 " + (isSafe ? 'text-brand/60' : 'text-red-500/60')}>CERTAINTY_INDEX</span>
            <div className="font-orbitron text-xs md:text-lg font-black text-white tracking-[0.1em] md:tracking-[0.3em] uppercase">
              {confidence}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-4 md:space-y-6">
        <div className={"glass-card rounded-xl md:rounded-2xl p-4 md:p-8 border-2 relative " + (isSafe ? 'border-brand/30' : 'border-red-500 bg-red-950/20')}>
          <h3 className={"font-orbitron text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-4 md:mb-8 text-center " + (isSafe ? 'text-brand/50' : 'text-red-500')}>VERDICT</h3>
          <p className={"text-white text-base md:text-xl lg:text-2xl font-black font-mono leading-tight uppercase italic text-center tracking-tighter " + (isDanger ? 'animate-pulse' : '')}>
            "{result.verdict}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          <div className={"glass-card p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 md:border-l-[6px] " + (isSafe ? 'border-brand/30 bg-brand/5' : 'border-red-500 bg-red-950/30')}>
            <h3 className={"font-orbitron text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 border-b pb-3 " + (isSafe ? 'text-brand/60 border-brand/20' : 'text-red-500 border-red-500/40')}>THREAT_VECTORS</h3>
            <div className="space-y-3">
              {result.threats.map((t, i) => (
                <div key={i} className={"flex items-center gap-3 p-3 rounded-lg border " + (isSafe ? 'bg-black/40 border-brand/10' : 'bg-red-500/20 border-red-500/40')}>
                  <div className={"w-1.5 h-1.5 md:w-2 md:h-2 rounded-full " + (isSafe ? 'bg-brand' : 'bg-red-500 animate-ping')}></div>
                  <span className={"text-[10px] md:text-[11px] font-black uppercase tracking-widest " + (isSafe ? 'text-white/80' : 'text-red-400')}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={"glass-card p-4 md:p-6 rounded-xl md:rounded-2xl border-r-4 md:border-r-[6px] " + (isSafe ? 'border-brand/30 bg-brand/5' : 'border-red-500 bg-red-950/30')}>
            <h3 className={"font-orbitron text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 border-b pb-3 " + (isSafe ? 'text-brand/60 border-brand/20' : 'text-red-500 border-red-500/40')}>MITIGATION_STACK</h3>
            <div className="space-y-5">
              {result.recommendations.map((r, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={"font-orbitron font-black text-lg md:text-xl " + (isSafe ? 'text-brand/40' : 'text-red-500/40')}>0{i+1}</span>
                  <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest leading-relaxed text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {result.groundingSources && result.groundingSources.length > 0 && (
          <div className="w-full glass-card rounded-2xl md:rounded-[3rem] p-6 md:p-10 border border-brand/10 bg-brand/5">
             <h3 className="font-orbitron text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-6 text-white/30">INTEL_NODES</h3>
             <div className="flex flex-wrap gap-3">
                {result.groundingSources.map((source, idx) => (
                  <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all bg-black/60 border border-brand/30 text-brand hover:border-brand hover:scale-105 flex items-center gap-2">
                    {source.title}
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="3" /></svg>
                  </a>
                ))}
             </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mt-6 md:mt-10 flex flex-col md:flex-row gap-3 md:gap-5">
        <button onClick={handleExport} className="flex-1 border border-white/10 bg-white/5 font-orbitron font-black py-3 md:py-4 rounded-lg uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/30 hover:bg-white/10 transition-all">
          GENERATE_DOSSIER
        </button>
        <button onClick={onReset} className={"flex-[2] text-black font-orbitron font-black py-3 md:py-4 rounded-lg uppercase tracking-[0.5em] text-base md:text-lg transition-all shadow-lg hover:scale-[1.02] " + (
          isSafe ? 'bg-brand' : 'bg-red-600 animate-pulse'
        )}>
          REBOOT
        </button>
      </div>
    </div>
  );
};

export default ResultDashboard;
