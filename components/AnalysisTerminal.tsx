
import React, { useState, useEffect, useMemo } from 'react';

interface AnalysisTerminalProps {
  model: string;
  type: string;
}

const AnalysisTerminal: React.FC<AnalysisTerminalProps> = ({ model, type }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    entropy: 0.12,
    latency: 24,
    packets: 0,
    bitrate: '45.2MB/s'
  });

  const dynamicLogs = useMemo(() => {
    const base = [
      `SYSTEM_CALL: INITIALIZING_AUDIT [MODEL: ${model}]...`,
      `ATTACHING_KERNEL_DEB_MODULES [VECTOR: ${type.toUpperCase()}]...`,
      "HANDSHAKE: SOC_NODE_ALPHA_READY",
    ];

    const typeSpecific = type === 'url' ? [
      "EXTRACTING_16_URL_BASED_FEATURES...",
      "AUDITING_DOMAIN_ENTROPY...",
      "CROSS_REF: MALICIOUS_DOMAIN_DB...",
    ] : type === 'email' ? [
      "SCANNING_EMAIL_HEADERS...",
      "AUDITING_SOCIAL_ENGINEERING_MARKERS...",
      "EXTRACTING_EMBEDDED_LINK_VECTORS...",
    ] : [
      "CAPTURING_VISUAL_UI_SNAPSHOT...",
      "OCR_TEXT_EXTRACTION_INIT...",
      "VERIFYING_VISUAL_ASSET_HASH...",
    ];

    const modelSpecific = model.includes('RANDOM_FOREST') ? [
      "BUILDING_100_DECISION_TREES...",
      "AGGREGATING_ENSEMBLE_VOTES...",
      "CALCULATING_GINI_IMPURITY...",
    ] : model.includes('SVM') ? [
      "MAPPING_FEATURES_TO_HIGH_DIM_SPACE...",
      "CALCULATING_HYPERPLANE_MARGINS...",
      "SOLVING_QUADRATIC_OPTIMIZATION...",
    ] : [
      "EVALUATING_ROOT_NODE_ENTROPY...",
      "SPLITTING_DECISION_BRANCHES...",
      "PRUNING_LEAF_NODES...",
    ];

    return [
      ...base,
      ...typeSpecific,
      ...modelSpecific,
      "CALCULATING_THREAT_PROBABILITY...",
      "NEURAL_VERDICT_FINALIZING..."
    ];
  }, [model, type]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogs(prev => {
        if (prev.length >= dynamicLogs.length) return prev;
        return [...prev, dynamicLogs[prev.length]];
      });
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const inc = Math.random() * 6;
        return prev < 98 ? prev + inc : 99;
      });
      setMetrics({
        entropy: Number((Math.random() * 0.9).toFixed(4)),
        latency: Math.floor(Math.random() * 60) + 10,
        packets: Math.floor(Math.random() * 80000),
        bitrate: (Math.random() * 100).toFixed(1) + 'MB/s'
      });
    }, 120);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const hexData = useMemo(() => {
    const chars = '0123456789ABCDEF';
    return Array.from({ length: 600 }).map(() => chars[Math.floor(Math.random() * 16)]).join('');
  }, []);

  const progressBarWidth = Math.floor(progress) + "%";

  return (
    <div className="w-full flex flex-col items-center relative py-6 md:py-12 mx-auto overflow-x-hidden">
      {/* Background Matrix Effect - Scaled for visibility without overflow */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden h-full flex flex-col items-center justify-center">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="font-mono text-[6px] md:text-[8px] text-brand whitespace-nowrap leading-none mb-1 opacity-20 select-none">
            {hexData.substring(0, 120)}
          </div>
        ))}
      </div>

      <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-8 md:gap-16 px-4">
        {/* Header Status */}
        <div className="flex flex-col items-center text-center gap-3 md:gap-6">
          <div className="flex items-center gap-4 md:gap-10 justify-center">
            <div className="w-2 h-2 md:w-5 md:h-5 rounded-full bg-brand animate-ping shadow-[0_0_20px_#00f2ff]"></div>
            <h2 className="font-orbitron text-brand text-2xl md:text-5xl font-black tracking-[0.3em] md:tracking-[1em] uppercase cyber-text-glow">AUDITING</h2>
          </div>
          <div className="font-mono text-[9px] md:text-[12px] text-brand/50 uppercase tracking-[0.4em] md:tracking-[1em] font-black border-y-2 border-brand/20 py-2 md:py-4 px-8 md:px-24 bg-black/40">
            NEURAL_SYNC: ACTIVE
          </div>
        </div>

        {/* Central Visualization Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 w-full">
          
          {/* Left Data Panel (Hidden on small mobile, compact on tablet) */}
          <div className="hidden sm:flex flex-row lg:flex-col gap-6 lg:gap-12 lg:text-right w-full lg:w-64 justify-center">
            <div className="border-r-[6px] lg:border-r-[12px] border-brand/40 pr-4 lg:pr-10 py-4 lg:py-8 glass-card rounded-l-2xl lg:rounded-l-[2rem] flex-1">
              <div className="text-[10px] md:text-[12px] text-brand font-black uppercase mb-1 md:mb-2 tracking-widest">ENCRYPTION</div>
              <div className="text-xl md:text-3xl font-orbitron font-black text-brand tracking-widest cyber-text-glow">AES_256</div>
            </div>
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 pr-0 lg:pr-10 items-center lg:items-end justify-center">
               <div className="text-center lg:text-right">
                 <div className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.4em] mb-1">ENTROPY</div>
                 <div className="text-lg md:text-2xl font-mono font-black text-brand/90">{metrics.entropy}</div>
               </div>
               <div className="text-center lg:text-right">
                 <div className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.4em] mb-1">LATENCY</div>
                 <div className="text-lg md:text-2xl font-mono font-black text-brand/90">{metrics.latency}ms</div>
               </div>
            </div>
          </div>

          {/* Core Animation - Responsive Sizing */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 rounded-full border-2 md:border-4 border-brand/10"></div>
            {/* Animated Outer Ring - Adjusted offset to prevent screen bleed */}
            <div className="absolute inset-[-8px] sm:inset-[-12px] lg:inset-[-16px] rounded-full border-t-[3px] md:border-t-[6px] border-l-[1px] md:border-l-[3px] border-brand animate-[spin_2s_linear_infinite] shadow-[0_0_40px_rgba(0,242,255,0.3)]"></div>
            {/* Animated Inner Ring */}
            <div className="absolute inset-4 sm:inset-6 lg:inset-8 rounded-full border-b-[2px] md:border-b-[4px] border-brand/40 animate-[spin_4s_linear_infinite_reverse]"></div>
            <div className="text-brand font-orbitron font-black text-lg sm:text-2xl lg:text-4xl tracking-[0.3em] md:tracking-[0.8em] animate-pulse">AUDIT</div>
          </div>

          {/* Right Data Panel / Progress */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-64">
             <div className="border-l-[6px] lg:border-l-[12px] border-brand pl-6 lg:pl-10 py-6 lg:py-12 glass-card rounded-r-2xl lg:rounded-r-[4rem] shadow-xl w-full text-center lg:text-left bg-black/60">
                <div className="text-[10px] md:text-[14px] text-brand font-black uppercase tracking-[0.3em] lg:tracking-[0.6em] mb-2 md:mb-4">THREAT_LOAD</div>
                <div className="text-5xl sm:text-7xl lg:text-9xl font-orbitron font-black text-white leading-none cyber-text-glow flex items-start justify-center lg:justify-start">
                  {Math.floor(progress)}
                  <span className="text-xl sm:text-2xl lg:text-3xl text-brand mt-2 lg:mt-6 ml-1 md:ml-3 font-mono">%</span>
                </div>
             </div>
          </div>
        </div>

        {/* Detailed Logs Panel */}
        <div className="w-full max-w-4xl glass-card rounded-2xl md:rounded-[3rem] p-6 md:p-12 border border-brand/40 shadow-2xl relative overflow-hidden mx-auto bg-black/90">
          {/* Progress Bar Top Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-white/5">
            <div className="h-full bg-brand shadow-[0_0_20px_#00f2ff] transition-all duration-300" style={{ width: progressBarWidth }}></div>
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 md:mb-8 border-b border-brand/20 pb-4 md:pb-6 font-mono text-[8px] md:text-[11px] text-brand font-black uppercase tracking-[0.2em] md:tracking-[0.5em] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ff003c]"></div>
              <span>NEURAL_LINK: ACTIVE</span>
            </div>
            <div className="flex gap-6 md:gap-10 text-brand/60">
              <span>PKTS: {metrics.packets}</span>
              <span>RATE: {metrics.bitrate}</span>
            </div>
          </div>

          {/* Live Log Stream */}
          <div className="space-y-3 md:space-y-4 font-mono text-[9px] md:text-[13px] h-[120px] md:h-[200px] overflow-y-auto no-scrollbar scroll-smooth">
            {logs.map((log, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-brand opacity-0 animate-[fadeIn_0.5s_ease_forwards]">
                <span className="text-brand/30 shrink-0 tabular-nums">[{new Date().toLocaleTimeString()}]</span>
                <span className="font-black uppercase tracking-tight leading-tight">&gt; {log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisTerminal;
