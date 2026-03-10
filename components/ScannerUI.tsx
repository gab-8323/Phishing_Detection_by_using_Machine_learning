
import React, { useState, useRef, useEffect } from 'react';
import { ScanType, ScanResult } from '../types.ts';
import { GeminiService } from '../services/geminiService.ts';

interface ScannerUIProps {
  onResult: (result: ScanResult, target: string, type: ScanType) => void;
  onStart: (model: string, type: ScanType) => void;
}

const ScannerUI: React.FC<ScannerUIProps> = ({ onResult, onStart }) => {
  const [activeTab, setActiveTab] = useState<ScanType>('url');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [deepScan, setDeepScan] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [selectedModel, setSelectedModel] = useState('RANDOM_FOREST (97.14% ACC)');
  const [showModelSelect, setShowModelSelect] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const geminiRef = useRef<GeminiService | null>(null);

  const ML_MODELS = [
    'RANDOM_FOREST (97.14% ACC)',
    'SUPPORT_VECTOR_MACHINE (SVM)',
    'DECISION_TREE_CLASSIFIER'
  ];

  useEffect(() => {
    geminiRef.current = new GeminiService();
  }, []);

  const handleScan = async () => {
    if (!geminiRef.current) return;
    if (activeTab !== 'screenshot' && !input.trim()) {
      setError("TARGET_MISSING");
      return;
    }
    
    setLoading(true);
    onStart(selectedModel, activeTab); 
    
    try {
      let result: ScanResult;
      const scanInput = `${input} [MODEL: ${selectedModel}]${deepScan ? " [MODE: HEURISTIC_DEEP_AUDIT]" : ""}`;

      if (activeTab === 'url') {
        result = await geminiRef.current.analyzeUrl(scanInput, selectedModel);
        onResult(result, input, 'url');
      } else if (activeTab === 'email') {
        result = await geminiRef.current.analyzeText(scanInput, selectedModel);
        onResult(result, input.substring(0, 40) + '...', 'email');
      } else if (activeTab === 'screenshot' && imagePreview) {
        const parts = imagePreview.split(',');
        const meta = parts[0];
        const base64 = parts[1];
        const mimeType = meta.split(':')[1].split(';')[0];
        result = await geminiRef.current.analyzeImage(base64, mimeType, selectedModel);
        onResult(result, 'Forensic_UI_Audit', 'screenshot');
      }
      setInput('');
      setImagePreview(null);
    } catch (err) {
      onResult({ 
        riskScore: 100, 
        riskLevel: "CRITICAL" as any, 
        verdict: "Neural Handshake Failure. System Intercepted.", 
        threats: ["NETWORK_LINK_TERMINATED", "KERNEL_PANIC"], 
        recommendations: ["Check Core Connectivity", "Re-initiate Neural Link"] 
      }, "FATAL_ERROR", activeTab);
    } finally {
      setLoading(false);
    }
  };

  const tabs: ScanType[] = ['url', 'email', 'screenshot'];

  return (
    <div className="w-full flex flex-col items-center px-2 md:px-0">
      <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-4 md:mb-8">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => { setActiveTab(tab); setError(null); }} 
            className={"px-4 md:px-8 py-2 md:py-3 text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] transition-all rounded-lg border-2 relative overflow-hidden group " + (
              activeTab === tab 
                ? 'bg-brand text-black border-brand shadow-[0_0_40px_rgba(0,242,255,0.7)]' 
                : 'text-white/40 border-white/10 hover:border-brand/60 hover:text-white'
            )}
          >
            {tab}
            {activeTab === tab && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3 md:gap-5">
        <div className={"flex flex-col md:flex-row items-stretch bg-black/90 rounded-2xl md:rounded-[2rem] overflow-hidden border-2 transition-all duration-700 " + (
          error ? 'border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]' : 'border-brand/40 focus-within:border-brand shadow-2xl'
        )}>
          <div className="flex-grow flex items-center px-4 md:px-8 py-3 md:py-5 relative">
            {activeTab === 'screenshot' ? (
              <div 
                onClick={() => !loading && fileInputRef.current?.click()} 
                className="w-full font-orbitron font-black text-[11px] md:text-[14px] text-brand cursor-pointer uppercase flex items-center justify-between group transition-all"
              >
                <span className="group-hover:tracking-[0.2em] transition-all">{imagePreview ? 'SNAPSHOT_LOADED' : 'ATTACH_VECTOR'}</span>
                <div className={"p-2 border-2 rounded-lg " + (imagePreview ? 'border-brand bg-brand text-black' : 'border-brand/40')}>
                   <svg className="w-4 h-4 md:w-6 md:h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center gap-4 md:gap-6">
                <span className="text-brand font-black animate-pulse text-lg md:text-2xl">&gt;</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setError(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  placeholder={activeTab === 'url' ? "ENDPOINT_URL..." : "DATA_PAYLOAD..."}
                  className="w-full bg-transparent text-base md:text-lg font-orbitron font-bold placeholder:text-white/10 text-white outline-none"
                  disabled={loading}
                />
              </div>
            )}
            
            {error && (
              <div className="absolute bottom-1 left-6 md:left-12 text-[8px] font-black text-red-500 uppercase tracking-widest animate-bounce">
                ERR: {error}
              </div>
            )}
          </div>
          
          <button
            onClick={handleScan}
            disabled={loading || (activeTab === 'screenshot' ? !imagePreview : !input)}
            className={"glitch-btn px-6 md:px-12 py-3 md:py-5 font-orbitron font-black text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] transition-all relative overflow-hidden flex items-center justify-center " + (
              loading 
                ? 'bg-black/60 text-brand border-brand/20 shadow-[0_0_20px_rgba(0,242,255,0.2)]' 
                : 'bg-brand text-black hover:bg-white active:scale-95'
            )}
          >
            {loading ? (
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 border-[3px] md:border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                <span className="animate-pulse cyber-text-glow">SYNCING</span>
              </div>
            ) : 'INIT'}
          </button>
        </div>

        <div className="relative w-full">
          <div 
            onClick={() => !loading && setShowModelSelect(!showModelSelect)}
            className={"w-full glass-card p-3 md:p-4 rounded-lg md:rounded-xl border border-brand/20 flex items-center justify-between cursor-pointer group transition-all " + (showModelSelect ? 'border-brand shadow-[0_0_20px_rgba(0,242,255,0.2)]' : 'hover:border-brand/40')}
          >
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[10px] font-black text-brand/40 uppercase tracking-[0.4em] mb-1">ACTIVE_ML_MODEL</span>
              <span className="font-orbitron text-xs md:text-base font-black text-white tracking-widest uppercase">{selectedModel}</span>
            </div>
            <div className={"transition-transform duration-300 " + (showModelSelect ? 'rotate-180 text-brand' : 'text-white/20')}>
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {showModelSelect && (
            <div className="absolute top-full left-0 right-0 mt-2 z-[50] glass-card border border-brand/40 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {ML_MODELS.map((model) => (
                <div 
                  key={model}
                  onClick={() => { setSelectedModel(model); setShowModelSelect(false); }}
                  className={"px-6 py-4 font-mono text-[10px] md:text-[12px] font-black uppercase tracking-widest cursor-pointer transition-all " + (
                    selectedModel === model ? 'bg-brand text-black' : 'text-white/60 hover:bg-brand/10 hover:text-brand'
                  )}
                >
                  {model}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 gap-4">
           <div className="flex items-center gap-10">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div 
                  onClick={() => setDeepScan(!deepScan)}
                  className={"w-12 h-6 md:w-16 md:h-8 rounded-full border-2 border-brand/40 relative transition-all " + (deepScan ? 'bg-brand/30 border-brand shadow-[0_0_15px_rgba(0,242,255,0.4)]' : 'bg-black/40')}
                >
                  <div className={"absolute top-1 w-4 h-4 rounded-full transition-all duration-300 " + (deepScan ? 'left-7 md:left-10 bg-brand shadow-[0_0_20px_#00f2ff]' : 'left-1 bg-white/20')}></div>
                </div>
                <div className="flex flex-col">
                  <span className={"font-mono text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] transition-colors " + (deepScan ? 'text-brand' : 'text-white/30')}>Heuristic_Audit</span>
                </div>
              </label>
           </div>
           
           <div className="flex items-center gap-4 text-[9px] md:text-[11px] font-mono text-white/40 uppercase tracking-[0.3em] md:tracking-[0.4em] font-black bg-brand/5 px-4 py-2 rounded-lg border border-brand/10">
              <div className={"w-2 h-2 md:w-3 md:h-3 rounded-full " + (loading ? 'bg-brand animate-ping shadow-[0_0_10px_#00f2ff]' : 'bg-brand/30')}></div>
              <span>SOC_LINK: ACTIVE</span>
           </div>
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => { setImagePreview(reader.result as string); setError(null); };
          reader.readAsDataURL(file);
        }
      }} className="hidden" accept="image/*" />
    </div>
  );
};

export default ScannerUI;
