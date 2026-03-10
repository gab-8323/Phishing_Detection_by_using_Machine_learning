
import React from 'react';

const AboutToolPage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl px-6 py-32 flex flex-col lg:flex-row items-center gap-16 md:gap-32 mx-auto page-transition overflow-hidden">
      {/* 3D Neural Shield Visualization */}
      <div className="lg:w-1/2 flex justify-center relative perspective-[1200px]">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full animate-pulse"></div>
        
        {/* Main 3D Stage */}
        <div className="relative w-full max-w-[500px] aspect-square transform-style-3d rotate-x-[20deg] rotate-z-[-10deg]">
          
          {/* Rotating Outer Rings */}
          <div className="absolute inset-0 border-2 border-brand/20 rounded-full animate-[spin_10s_linear_infinite] transform-style-3d">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-brand rounded-full shadow-[0_0_20px_#00f2ff]"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-brand rounded-full shadow-[0_0_20px_#00f2ff]"></div>
          </div>
          
          <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] transform-style-3d">
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-white/20 rounded-full"></div>
          </div>

          {/* Central Neural Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 transform-style-3d">
             <div className="absolute inset-0 bg-brand/10 backdrop-blur-xl rounded-full border-2 border-brand/40 shadow-[0_0_80px_rgba(0,242,255,0.4)] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-t from-brand/20 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 text-brand animate-pulse drop-shadow-[0_0_10px_#00f2ff]">
                      <path fill="currentColor" d="M50 10L15 25V50C15 72.1 30.1 91.5 50 96.5C69.9 91.5 85 72.1 85 50V25L50 10ZM50 86.2C35.7 82 25 67.1 25 50V31.5L50 20.8L75 31.5V50C75 67.1 64.3 82 50 86.2Z"/>
                   </svg>
                </div>
             </div>

             {[...Array(6)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute w-12 h-6 glass-card rounded-lg border border-brand/30 flex items-center justify-center text-[6px] font-black text-brand tracking-widest animate-float-3d"
                 style={{
                   top: '50%',
                   left: '50%',
                   transform: `rotateY(${i * 60}deg) translateZ(180px) rotateX(${i * 20}deg)`,
                   animationDelay: `${i * 0.8}s`
                 }}
               >
                 NODE_{i}
               </div>
             ))}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent rotate-45 opacity-20 blur-sm animate-[scan_4s_ease-in-out_infinite]"></div>
          
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-red-500 rounded-sm animate-[passThrough_3s_infinite] blur-[2px]"></div>
          <div className="absolute top-[20%] right-0 w-3 h-3 bg-brand rounded-sm animate-[passThroughSafe_4s_infinite] delay-1000"></div>
        </div>

        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-brand/20 rounded-tl-[3rem]"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-brand/20 rounded-br-[3rem]"></div>
      </div>

      <div className="lg:w-1/2 flex flex-col text-center lg:text-left gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4 justify-center lg:justify-start">
             <div className="w-12 h-[2px] bg-brand/40"></div>
             <span className="font-mono text-brand text-[12px] font-black tracking-[0.8em] uppercase">SYSTEM_PHILOSOPHY</span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
            Smart Detection <br/>
            <span className="text-brand cyber-text-glow">Modern Defense</span>
          </h2>
        </div>
        
        <div className="space-y-8 glass-card p-8 md:p-12 rounded-[3rem] border-white/5 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <p className="font-mono text-[14px] md:text-lg text-white/90 leading-relaxed uppercase tracking-tight border-l-4 border-brand pl-8">
            Phishing Detection acts as a neural filter for your digital workspace. By combining real-time global intelligence with behavioral analysis, we isolate threats before they reach your data.
          </p>
          
          <p className="font-mono text-[13px] md:text-base text-white/40 leading-relaxed uppercase tracking-tight pl-8">
            Our platform doesn't just block links; it deconstructs them. From analyzing homograph character patterns to verifying visual branding authenticity, Phishing Detection provides a comprehensive safety score for every interaction.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 flex flex-col gap-2 group hover:border-brand transition-all">
               <span className="text-brand font-black font-orbitron text-2xl group-hover:scale-110 transition-transform">99.9%</span>
               <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Threat_Intercept</span>
            </div>
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 flex flex-col gap-2 group hover:border-brand transition-all">
               <span className="text-brand font-black font-orbitron text-2xl group-hover:scale-110 transition-transform">0.08s</span>
               <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Neural_Latence</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
          <button className="px-10 py-5 bg-brand text-black font-orbitron font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl shadow-[0_0_40px_rgba(0,242,255,0.4)] hover:bg-white hover:scale-105 transition-all">
            Secure_My_Node
          </button>
          <button className="px-10 py-5 border-2 border-white/10 text-white/50 font-orbitron font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:border-brand hover:text-brand transition-all">
            Technical_Spec
          </button>
        </div>
      </div>
      
      <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        
        @keyframes scan {
          0%, 100% { transform: translate(-50%, -50%) rotate(45deg) translateY(-200px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translate(-50%, -50%) rotate(45deg) translateY(200px); }
        }

        @keyframes passThrough {
          0% { transform: translateY(-300px) rotate(0deg); opacity: 0; background-color: #ff003c; }
          20% { opacity: 1; }
          50% { transform: translateY(0) scale(1.5); background-color: #ff003c; filter: blur(4px); }
          51% { background-color: transparent; }
          100% { transform: translateY(300px) scale(0.5); opacity: 0; }
        }

        @keyframes passThroughSafe {
          0% { transform: translateY(-400px) translateX(200px) rotate(45deg); opacity: 0; }
          20% { opacity: 1; }
          50% { transform: translateY(0) translateX(0) scale(1.2); }
          80% { opacity: 1; }
          100% { transform: translateY(400px) translateX(-200px) scale(0.8); opacity: 0; }
        }

        @keyframes float-3d {
          0%, 100% { margin-top: -10px; }
          50% { margin-top: 10px; }
        }
      `}</style>
    </div>
  );
};

export default AboutToolPage;
