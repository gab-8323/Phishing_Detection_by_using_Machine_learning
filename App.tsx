
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ScannerUI from './components/ScannerUI.tsx';
import ResultDashboard from './components/ResultDashboard.tsx';
import FeaturesPage from './components/FeaturesPage.tsx';
import AcademyPage from './components/AcademyPage.tsx';
import ToolkitPage from './components/ToolkitPage.tsx';
import AnalysisTerminal from './components/AnalysisTerminal.tsx';
import GlobalBackground from './components/GlobalBackground.tsx';
import IntelligencePage from './components/IntelligencePage.tsx';
import PhishAssistant from './components/PhishAssistant.tsx';
import ProtocolsPage from './components/ProtocolsPage.tsx';
import TerminalLogin from './components/TerminalLogin.tsx';
import FAQPage from './components/FAQPage.tsx';
import AboutToolPage from './components/AboutToolPage.tsx';
import NeuralCursor from './components/NeuralCursor.tsx';
import { ScanResult, ScanHistory, ScanType, RiskLevel } from './types.ts';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanContext, setScanContext] = useState<{ model: string, type: ScanType } | null>(null);
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [time, setTime] = useState(new Date());
  const [showImpact, setShowImpact] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const intelRef = useRef<HTMLDivElement>(null);
  const academyRef = useRef<HTMLDivElement>(null);
  const toolkitRef = useRef<HTMLDivElement>(null);
  const protocolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeInt = setInterval(() => setTime(new Date()), 1000);
    const saved = localStorage.getItem('phishing_detection_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    return () => clearInterval(timeInt);
  }, []);

  const handleScanStart = useCallback((model: string, type: ScanType) => {
    setIsScanning(true);
    setScanContext({ model, type });
    setCurrentResult(null);
    setShowImpact(false);
  }, []);

  const handleScanResult = useCallback((result: ScanResult, target: string, type: ScanType) => {
    const newEntry: ScanHistory = { 
      id: "LOG_" + Date.now(), 
      type: type, 
      target: target, 
      timestamp: Date.now(), 
      result: result 
    };
    
    setHistory(prev => [newEntry, ...prev].slice(0, 10));
    setCurrentResult(result);
    setIsScanning(false);

    if (result.riskLevel === RiskLevel.HIGH || result.riskLevel === RiskLevel.CRITICAL) {
      setShowImpact(true);
      setTimeout(() => setShowImpact(false), 2000); 
    }
  }, []);

  const navigateTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isDanger = currentResult?.riskLevel === RiskLevel.HIGH || currentResult?.riskLevel === RiskLevel.CRITICAL;
  const isSafe = currentResult?.riskLevel === RiskLevel.LOW;

  if (!authenticated) {
    return <TerminalLogin onAuthenticated={() => setAuthenticated(true)} />;
  }

  const containerBase = "w-full min-h-screen flex flex-col items-center relative transition-all duration-1000";
  const bgClass = isDanger ? "bg-red-950/10" : "bg-transparent";
  const shakeClass = showImpact ? "animate-shake overflow-hidden" : "";

  return (
    <div className={containerBase + " " + bgClass + " " + shakeClass}>
      <NeuralCursor isDanger={isDanger || isScanning} />
      
      {showImpact && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-white animate-impact-flash"></div>
          <div className="relative z-10 flex flex-col items-center text-center px-4">
             <div className="flex items-center gap-10 bg-red-600 px-12 py-6 rounded-sm border-y-4 border-white shadow-[0_0_80px_#ff003c] animate-pulse">
                <div className="text-white text-4xl md:text-7xl font-orbitron font-black uppercase tracking-[0.2em] italic">
                   THREAT_INTERCEPTED
                </div>
             </div>
          </div>
        </div>
      )}

      <GlobalBackground isDanger={isDanger || isScanning} isSafe={isSafe} />
      
      <header className={"fixed top-0 left-0 right-0 z-[250] px-4 md:px-12 py-3 flex items-center justify-between border-b backdrop-blur-md transition-all duration-700 " + (isDanger ? 'border-red-500/40 bg-red-950/40' : 'border-brand/20 bg-black/30')}>
        <div className="flex items-center gap-2 md:gap-6 cursor-pointer group shrink-0" onClick={() => { setCurrentResult(null); navigateTo(heroRef); }}>
          <div className={"p-1.5 md:p-3 border-2 rounded-xl transition-all group-hover:scale-110 " + (isDanger ? 'border-red-500 text-red-500' : 'border-brand text-brand')}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="md:w-8 md:h-8">
               <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
               {!isDanger && <path d="M9 12l2 2 4-4" />}
               {isDanger && <path d="M12 8v4M12 16h.01" />}
             </svg>
          </div>
          <div className="flex flex-col">
            <h1 className={"font-orbitron font-black text-[11px] md:text-2xl tracking-[0.1em] transition-colors uppercase whitespace-nowrap " + (isDanger ? 'text-red-500' : 'text-white')}>PHISHING_DETECTION</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={"text-[6px] md:text-[9px] font-black uppercase opacity-80 " + (isDanger ? 'text-red-400' : 'text-brand')}>NEURAL_ENGINE_ONLINE</span>
              <div className={"w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse " + (isDanger ? 'bg-red-500' : 'bg-brand')}></div>
            </div>
          </div>
        </div>
        
        <nav className="hidden xl:flex items-center gap-10 font-orbitron text-[10px] font-black tracking-[0.4em] uppercase">
          {[
            { name: 'Registry', ref: intelRef }, 
            { name: 'Protocols', ref: protocolsRef },
            { name: 'Academy', ref: academyRef }, 
            { name: 'Toolkit', ref: toolkitRef }
          ].map((item) => (
            <button key={item.name} onClick={() => { setCurrentResult(null); navigateTo(item.ref); }} className={"transition-all relative group py-2 " + (isDanger ? 'text-red-500/60 hover:text-red-400' : 'text-white/60 hover:text-brand')}>
              {item.name}
              <span className={"absolute bottom-0 left-0 w-0 h-[2px] transition-all group-hover:w-full " + (isDanger ? 'bg-red-500' : 'bg-brand')}></span>
            </button>
          ))}
          <div className={"px-6 py-2 border-2 rounded-2xl transition-all " + (isDanger ? 'bg-red-500/10 border-red-500/40' : 'bg-brand/10 border-brand/20')}>
            <span className={"font-mono text-[11px] tabular-nums font-black " + (isDanger ? 'text-red-500' : 'text-brand')}>{time.toLocaleTimeString()}</span>
          </div>
        </nav>
      </header>

      <main className="w-full flex flex-col items-center z-10 pt-20 md:pt-28 space-y-16 md:space-y-32 pb-40">
        {(isScanning || currentResult) && (
          <div className={"fixed inset-0 z-[110] backdrop-blur-[30px] overflow-y-auto flex flex-col items-center pt-48 md:pt-72 pb-24 px-4 md:px-8 transition-all duration-1000 " + (isDanger ? 'bg-red-950/70' : 'bg-black/50')}>
            <div className="w-full max-w-7xl flex flex-col items-center mx-auto relative">
              {isScanning ? (
                <AnalysisTerminal 
                  model={scanContext?.model || 'NEURAL_CORE'} 
                  type={scanContext?.type || 'url'} 
                />
              ) : (
                <ResultDashboard result={currentResult!} onReset={() => setCurrentResult(null)} />
              )}
            </div>
          </div>
        )}

        <section ref={heroRef} className="w-full max-w-7xl min-h-[55vh] md:min-h-[65vh] flex flex-col items-center justify-center px-4 md:px-8 text-center mx-auto">
          <div className="mb-3 md:mb-7 relative">
             <div className="absolute inset-0 blur-3xl bg-brand/30 rounded-full scale-150 animate-pulse"></div>
             <span className={"relative font-mono text-[9px] md:text-[13px] tracking-[0.6em] md:tracking-[1em] uppercase font-black transition-colors " + (isDanger ? 'text-red-500' : 'text-brand')}>
               SYSTEM_VERIFIED_V4.3
             </span>
          </div>
          
          <h2 
            className={"font-orbitron font-black mb-4 md:mb-6 tracking-tighter uppercase transition-all duration-1000 leading-[0.85] select-none text-center px-4 flex flex-col items-center " + (isDanger ? 'danger-text-glow text-red-500' : 'text-white cyber-text-glow')}
            style={{ fontSize: 'clamp(1.8rem, 7vw, 6rem)' }}
          >
            <span className="whitespace-nowrap">PHISHING</span>
            <span className={"whitespace-nowrap " + (isDanger ? 'text-red-600' : 'text-brand')}>DETECTION</span>
          </h2>
          
          <p className={"font-mono text-[8px] sm:text-[10px] md:text-sm tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] uppercase font-black mb-8 md:mb-14 max-w-5xl transition-colors px-4 " + (isDanger ? 'text-red-400/80' : 'text-brand')}>
            NEURAL_DEFENSE_LABS | ADVANCED_CYBER_INTERCEPTOR
          </p>
          
          <div className={"w-full max-w-5xl glass-card p-4 sm:p-8 md:p-12 relative transition-all duration-1000 mx-auto " + (isDanger ? 'border-red-500 shadow-[0_0_60px_rgba(255,0,0,0.3)]' : 'border-brand/40 shadow-[0_0_60px_rgba(0,242,255,0.2)]')}>
            <ScannerUI onResult={handleScanResult} onStart={handleScanStart} />
          </div>
        </section>

        <div className="w-full flex flex-col items-center gap-16 md:gap-40 mx-auto">
          <FeaturesPage />
          <section ref={intelRef} className="w-full py-16 md:py-32 flex flex-col items-center bg-black/5 border-y border-white/5 mx-auto backdrop-blur-[10px]">
             <IntelligencePage />
          </section>
          <AboutToolPage />
          <section ref={protocolsRef} className="w-full flex flex-col items-center mx-auto px-4 md:px-10">
             <ProtocolsPage />
          </section>
          <section ref={academyRef} className="w-full flex flex-col items-center mx-auto px-4 md:px-10">
             <AcademyPage />
          </section>
          <section ref={toolkitRef} className="w-full flex flex-col items-center mx-auto px-4 md:px-10">
             <ToolkitPage />
          </section>
          <FAQPage />
        </div>
      </main>

      <footer className="w-full py-8 md:py-16 border-t border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center gap-6 mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-8">
          <div className={"text-[9px] md:text-[12px] font-black uppercase tracking-[0.6em] md:tracking-[1em] " + (isDanger ? 'text-red-500/60' : 'text-brand/60')}>PHISHING_DETECTION_SOC</div>
          <div className="text-[8px] md:text-[11px] font-mono font-black text-white/30 uppercase tracking-[0.4em] md:tracking-[0.6em]">© {new Date().getFullYear()} NEURAL_DEFENSE_LABS</div>
        </div>
      </footer>

      <PhishAssistant />
    </div>
  );
};

export default App;
