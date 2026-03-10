
import React from 'react';

const FeaturesPage: React.FC = () => {
  const features = [
    { title: "URL Neural Audit", desc: "Analysis of URL structure via Gemini 3.0.", icon: "🔗" },
    { title: "Visual Brand Sync", desc: "Vision-based comparison of UI elements.", icon: "🖼️" },
    { title: "Grounding Engine", desc: "Real-time global threat verification.", icon: "🌍" },
    { title: "SocEng Filter", desc: "Linguistic analysis of phishing messages.", icon: "💬" }
  ];

  return (
    <div className="w-full max-w-6xl px-6 mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="font-orbitron text-4xl font-black text-brand cyber-text-glow mb-4">Core Protocols</h2>
        <p className="font-mono text-white/20 text-[10px] uppercase tracking-widest">System_v4.2</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {features.map((f, i) => (
          <div key={i} className="glass-card p-8 flex flex-col items-center text-center hover:border-brand transition-all">
            <div className="text-4xl mb-6">{f.icon}</div>
            <h3 className="font-orbitron text-sm font-black text-white mb-3 uppercase tracking-wider">{f.title}</h3>
            <p className="text-white/40 font-mono text-[10px] uppercase leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
