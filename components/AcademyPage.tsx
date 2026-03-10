
import React, { useState } from 'react';

interface Course {
  type: string;
  target: string;
  complexity: string;
  desc: string;
  icon: string;
  link: string;
}

const AcademyPage: React.FC = () => {
  const [connectingId, setConnectingId] = useState<number | null>(null);

  const courses: Course[] = [
    {
      type: "SPEAR_PHISHING",
      target: "Highly Specific Individuals",
      complexity: "LEVEL_4",
      desc: "In-depth research on precision attacks using gathered personal intelligence to bypass standard filters. Analyze the psychology of targeted deceit.",
      icon: "🎯",
      link: "https://attack.mitre.org/techniques/T1566/002/"
    },
    {
      type: "WHALING_PROTOCOL",
      target: "Executive Leadership",
      complexity: "LEVEL_5",
      desc: "High-value targeting aimed at CEO/CFO level assets. Case studies on wire-transfer fraud and corporate governance bypass techniques.",
      icon: "🐋",
      link: "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks"
    },
    {
      type: "VISHING_VOICE",
      target: "Telephonic Exploitation",
      complexity: "LEVEL_3",
      desc: "Utilization of VoIP and AI voice cloning to impersonate trusted authorities. Research on the latest deepfake audio detection methods.",
      icon: "🎙️",
      link: "https://attack.mitre.org/techniques/T1566/004/"
    },
    {
      type: "TYPOSQUAT_URL",
      target: "Mass Distribution",
      complexity: "LEVEL_2",
      desc: "Comprehensive database on deceptive domains that mimic legitimate brands. Strategies for early detection and domain blacklisting.",
      icon: "⌨️",
      link: "https://attack.mitre.org/techniques/T1583/001/"
    },
    {
      type: "CREDENTIAL_HARVESTING",
      target: "Enterprise Users",
      complexity: "LEVEL_4",
      desc: "Technical analysis of fake login portals and OAuth permission misuse. Methods for identifying deceptive UI elements in real-time.",
      icon: "🔑",
      link: "https://www.phishtank.com/"
    },
    {
      type: "QUISHING_DYNAMICS",
      target: "Mobile Assets",
      complexity: "LEVEL_3",
      desc: "Research on malicious QR codes and their redirection vectors. Forensic tools for auditing physical-to-digital phishing bridges.",
      icon: "📱",
      link: "https://attack.mitre.org/techniques/T1566/"
    }
  ];

  const handleAccess = (course: Course, index: number) => {
    setConnectingId(index);
    setTimeout(() => {
      window.open(course.link, '_blank', 'noopener,noreferrer');
      setConnectingId(null);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl px-4 md:px-12 flex flex-col items-center">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="font-orbitron text-4xl md:text-6xl font-black text-brand cyber-text-glow uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6">Cyber Academy</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 md:w-20 bg-brand/30"></div>
          <p className="font-mono text-brand/40 text-[9px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em]">Theoretical_Frameworks_&_Taxonomy</p>
          <div className="h-[1px] w-8 md:w-20 bg-brand/30"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
        {courses.map((c, i) => (
          <div key={i} className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[4rem] border-2 border-white/5 group hover:border-brand/50 transition-all relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-32 h-32 bg-brand/5 -translate-x-16 -translate-y-16 group-hover:bg-brand/20 rounded-full transition-all"></div>
             
             <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                <div className="text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]">{c.icon}</div>
                <div className="text-right">
                   <div className="text-[10px] md:text-[12px] text-brand font-black uppercase tracking-widest cyber-text-glow">{c.complexity}</div>
                   <div className="text-[8px] md:text-[10px] text-white/20 font-black uppercase mt-1">Classification_Alpha</div>
                </div>
             </div>

             <h3 className="font-orbitron text-lg md:text-xl lg:text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-brand transition-colors cyber-text-glow break-words min-h-[3.5rem] flex items-center">{c.type}</h3>
             <div className="text-[8px] md:text-[9px] font-mono font-black text-white/40 uppercase mb-4 md:mb-6 border-b border-white/5 pb-4">Primary_Vector: {c.target}</div>
             
             <p className="text-white/60 text-[11px] md:text-[13px] font-bold leading-relaxed uppercase tracking-wider flex-grow mb-8">
                {c.desc}
             </p>

             <button 
                onClick={() => handleAccess(c, i)}
                className={`w-full py-3 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all flex items-center justify-center gap-4 text-center relative overflow-hidden ${
                  connectingId === i 
                  ? 'bg-brand text-black shadow-[0_0_30px_#00f2ff]' 
                  : 'bg-white/5 border-2 border-white/10 text-white/40 group-hover:text-brand group-hover:border-brand/60'
                }`}
             >
                {connectingId === i ? (
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></div>
                    <span>SYNCING...</span>
                  </div>
                ) : (
                  <>
                    <span>ACCESS_RESEARCH</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </>
                )}
             </button>
          </div>
        ))}
      </div>

      <div className="mt-24 glass-card p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] w-full border-2 border-brand/20 bg-gradient-to-br from-brand/10 to-transparent flex flex-col lg:flex-row items-center gap-12 md:gap-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="lg:w-2/3 relative z-10 text-center lg:text-left">
            <h4 className="font-orbitron text-2xl md:text-3xl font-black text-brand uppercase mb-6 tracking-widest cyber-text-glow">Attack Lifecycle Simulation</h4>
            <p className="text-white/50 text-[10px] md:text-[12px] font-bold uppercase tracking-widest leading-relaxed max-w-2xl">
               Our neural defense matrix doesn't just block; it learns. By simulating the "Reconnaissance" and "Weaponization" phases of the kill chain, Phishing Detection predicts potential typosquatting vectors before they are even registered in global databases.
            </p>
         </div>
         <div className="lg:w-1/3 flex justify-center relative z-10">
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
               <div className="absolute inset-0 border-[4px] md:border-[6px] border-brand/20 rounded-full border-t-brand animate-[spin_3s_linear_infinite] shadow-[0_0_30px_rgba(0,242,255,0.2)]"></div>
               <div className="absolute inset-8 md:inset-10 border-2 border-white/10 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
               <div className="font-orbitron text-brand font-black text-xl md:text-2xl tracking-tighter cyber-text-glow">MATRIX</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AcademyPage;
