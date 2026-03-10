
import React, { useState } from 'react';

const ToolkitPage: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      name: "Tactical Containment",
      tag: "EMERGENCY_TIER",
      priority: "CRITICAL",
      desc: "Actions to take if you've already interacted with a suspicious link.",
      features: [
        "Disconnect Network Immediately",
        "Change Root Passwords via 2FA",
        "Clear Browser Cache/Sessions",
        "Scan Host System for Payloads"
      ],
      color: "border-red-500",
      accent: "text-red-500",
      bg: "bg-red-500/5",
      details: "Immediate action is required to stop data exfiltration. Disconnecting from the internet stops C2 (Command & Control) callbacks."
    },
    {
      name: "Defense Fortification",
      tag: "PROACTIVE_TIER",
      priority: "HIGH",
      desc: "Essential security layers to prevent identity theft and credential leaks.",
      features: [
        "Deploy MFA (Hardware Keys)",
        "Use Encrypted Password Managers",
        "Enable DNS-level Filtering",
        "Verify Identity via PGP/Sign"
      ],
      color: "border-cyan-400",
      accent: "text-cyan-400",
      bg: "bg-cyan-400/5",
      highlight: true,
      details: "Moving beyond passwords is the single most effective way to stop phishing. Hardware keys (Yubikey) provide 100% protection against MFA relay."
    },
    {
      name: "Intelligence Reporting",
      tag: "ANALYTIC_TIER",
      priority: "OPERATIONAL",
      desc: "Contribute to global safety by reporting malicious nodes.",
      features: [
        "Submit to Google Safe Browsing",
        "Report to APWG Database",
        "Contact CISA Cyber Center",
        "Alert Internal IT/DPO Nodes"
      ],
      color: "border-purple-500",
      accent: "text-purple-500",
      bg: "bg-purple-500/5",
      details: "Reporting malicious domains helps the global community by getting the sites taken down and blacklisted in browsers within minutes."
    }
  ];

  return (
    <div className="w-full max-w-[1100px] page-transition">
      {selectedTool && (
        <div className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
           <div className="glass-card w-full max-w-2xl p-12 border-brand/40 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-start mb-8">
                 <h4 className="font-orbitron text-2xl font-black text-brand uppercase tracking-widest">Tactical_Report: {selectedTool}</h4>
                 <button onClick={() => setSelectedTool(null)} className="text-white/40 hover:text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              <p className="text-white font-mono text-sm leading-loose mb-10 uppercase tracking-tight">
                 {tools.find(t => t.name === selectedTool)?.details}
              </p>
              <div className="p-6 bg-brand/5 border border-brand/20 rounded-2xl">
                 <div className="text-brand font-black text-[10px] uppercase tracking-widest mb-4">Recommended_Steps:</div>
                 <div className="space-y-3">
                    {tools.find(t => t.name === selectedTool)?.features.map((f, i) => (
                      <div key={i} className="flex gap-4 items-center font-mono text-[10px] text-white/60">
                         <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                         {f}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h2 className="orbitron text-4xl font-black text-brand cyber-text-glow uppercase tracking-widest mb-4">Response Toolkit</h2>
        <p className="font-mono text-brand/40 text-[11px] font-black uppercase tracking-[0.5em]">Incident Handling & Cyber Hygiene Protocols</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((t, i) => (
          <div key={i} className={`glass-card p-10 rounded-[2.5rem] border-t-4 ${t.color} ${t.bg} flex flex-col relative overflow-hidden group hover:scale-[1.03] transition-all duration-500 shadow-2xl`}>
            {t.highlight && (
              <div className="absolute top-0 right-0 bg-brand text-black text-[9px] font-black px-6 py-1.5 uppercase tracking-widest rotate-45 translate-x-6 translate-y-3 shadow-lg">
                Recommended
              </div>
            )}
            
            <div className="mb-8">
               <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.accent} mb-2`}>{t.tag}</div>
               <h3 className="orbitron text-xl font-black text-white uppercase tracking-tight leading-none">{t.name}</h3>
            </div>

            <div className="mb-8 flex items-center gap-3">
               <span className={`text-[9px] font-black px-3 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-widest ${t.accent}`}>Priority: {t.priority}</span>
            </div>
            
            <p className="text-white/40 text-[11px] font-bold leading-relaxed mb-10 uppercase tracking-tighter">
              {t.desc}
            </p>

            <div className="space-y-4 mb-12 flex-grow">
              {t.features.map((f, fi) => (
                <div key={fi} className="flex items-start gap-4 text-[10px] font-black text-white/70 uppercase tracking-widest font-mono group-hover:text-white transition-colors">
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full ${t.accent.replace('text', 'bg')} shadow-[0_0_8px_currentColor]`}></div>
                  <span className="leading-tight">{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedTool(t.name)}
              className={`w-full py-4 orbitron font-black text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-300 ${
              t.highlight 
                ? 'bg-brand text-black shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:bg-white hover:scale-95' 
                : 'border-2 border-white/10 text-white/40 hover:border-brand hover:text-brand hover:bg-brand/5'
            }`}>
              Learn Protocol
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 glass-card rounded-[3rem] border-brand/10 flex flex-col md:flex-row items-center gap-10">
         <div className="w-20 h-20 rounded-2xl bg-brand/10 flex items-center justify-center flex-shrink-0 text-brand shadow-[0_0_30px_var(--brand-glow)]">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
         </div>
         <div>
            <h4 className="font-orbitron text-xl font-black text-brand uppercase tracking-widest mb-2">Need immediate help?</h4>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-widest max-w-2xl leading-relaxed">
               Our neural engine is active 24/7. Use the terminal above to scan suspicious nodes. For identity theft cases, contact your local law enforcement cyber-crimes division immediately.
            </p>
         </div>
         <div className="ml-auto flex flex-col items-end gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-brand animate-ping"></div>
              <div className="text-[10px] font-mono font-bold uppercase text-brand tracking-widest">Active_Support</div>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-phish-assistant'))}
              className="px-6 py-2 border border-brand/40 text-brand font-orbitron font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-brand hover:text-black transition-all"
            >
              Consult Neural Assistant
            </button>
         </div>
      </div>
    </div>
  );
};

export default ToolkitPage;
