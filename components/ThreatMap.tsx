
import React from 'react';

const ThreatMap: React.FC = () => {
  // Simulated hotspots
  const hotspots = [
    { x: 25, y: 35, label: "NA_EAST", status: "HIGH" },
    { x: 45, y: 40, label: "EU_WEST", status: "CRITICAL" },
    { x: 75, y: 45, label: "APAC_NODE", status: "MEDIUM" },
    { x: 35, y: 70, label: "LATAM_SEC", status: "LOW" },
    { x: 60, y: 30, label: "RU_CENTRAL", status: "CRITICAL" }
  ];

  return (
    <div className="w-full h-[400px] relative glass-card p-6 overflow-hidden border-brand/10">
      <div className="absolute top-4 left-6 z-10">
        <h4 className="font-orbitron text-[10px] text-brand font-black uppercase tracking-[0.4em]">Global_Threat_Matrix</h4>
        <p className="text-[8px] text-white/20 uppercase tracking-widest mt-1">Real-time Node Visualization</p>
      </div>

      <div className="absolute top-4 right-6 z-10 flex gap-4">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
           <span className="text-[8px] font-black text-white/40 uppercase">Critical</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
           <span className="text-[8px] font-black text-white/40 uppercase">Normal</span>
        </div>
      </div>

      {/* Simplified World Map SVG Background */}
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
        <path d="M10,30 Q30,10 50,30 T90,30 M15,60 Q35,40 55,60 T95,60 M20,85 Q40,65 60,85 T100,85" stroke="#00f2ff" fill="none" strokeWidth="0.5"/>
      </svg>

      {/* Pulsing Hotspots */}
      {hotspots.map((spot, i) => (
        <div 
          key={i} 
          className="absolute group" 
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          <div className={`relative w-3 h-3 rounded-full flex items-center justify-center transition-all cursor-crosshair`}>
            <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${spot.status === 'CRITICAL' ? 'bg-red-500' : 'bg-brand'}`}></div>
            <div className={`w-2 h-2 rounded-full z-10 ${spot.status === 'CRITICAL' ? 'bg-red-500' : 'bg-brand shadow-[0_0_10px_rgba(0,242,255,1)]'}`}></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/90 border border-brand/40 px-3 py-1.5 rounded hidden group-hover:block whitespace-nowrap z-50">
               <div className="text-[8px] font-black text-brand uppercase mb-1">{spot.label}</div>
               <div className="text-[7px] font-mono text-white/50 uppercase">Alert_Level: {spot.status}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Crosshair Overlay */}
      <div className="absolute inset-0 border border-brand/5 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand/5"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brand/5"></div>
      </div>
    </div>
  );
};

export default ThreatMap;
