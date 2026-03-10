
import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: "How does the Phishing Detection engine work?",
    answer: "Our system utilizes an advanced Autonomous Neural Engine to perform deep-level forensic audits. It combines real-time grounding with visual comparison algorithms and linguistic analysis (SocEng Filter) to identify malicious patterns that traditional filters miss."
  },
  {
    question: "How to identify URL phishing?",
    answer: "Look for 'Typosquatting' (e.g., g00gle.com instead of google.com), suspicious top-level domains (.xyz, .biz), or unusual subdomains. Phishing Detection automatically checks these factors against a global registry of known malicious endpoints."
  },
  {
    question: "How to check link safety with this platform?",
    answer: "Our link safety checker ensures you don't accidentally click on malicious links. It works by comparing links to a real-time database of known phishing websites and provides immediate alerts on URL status, redirects, and original destination markers."
  },
  {
    question: "What does a 'good URL' mean?",
    answer: "A 'good URL' has been verified against brand authenticity databases, possesses a valid SSL/TLS certificate with a reputable issuer, and shows no history of malicious redirects or phishing signatures in its source code."
  },
  {
    question: "What does a 'suspicious URL' mean?",
    answer: "A 'suspicious URL' exhibits high entropy in its naming, matches known phishing templates, uses urgency-based linguistic triggers, or is hosted on infrastructure frequently associated with cyber-crime clusters."
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl px-6 flex flex-col items-center mx-auto pb-32">
      <div className="text-center mb-16">
        <h2 className="font-orbitron text-4xl md:text-5xl font-black text-brand cyber-text-glow uppercase tracking-[0.2em] mb-4">Frequently Asked Questions</h2>
        <p className="font-mono text-white/30 text-[10px] md:text-[12px] uppercase tracking-widest font-black">Central_Knowledge_Base_V1.2</p>
      </div>

      <div className="w-full space-y-4">
        {FAQ_DATA.map((item, index) => (
          <div 
            key={index} 
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
              openIndex === index ? 'border-brand/60 bg-brand/5 shadow-[0_0_30px_rgba(0,242,255,0.1)]' : 'border-white/5 hover:border-white/10'
            }`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-6">
                <span className={`font-mono text-[10px] font-black transition-colors ${openIndex === index ? 'text-brand' : 'text-white/20'}`}>
                  FAQ_NODE_0{index + 1}
                </span>
                <span className={`font-orbitron text-sm md:text-base font-bold uppercase tracking-wide transition-colors ${openIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                  {item.question}
                </span>
              </div>
              <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand' : 'text-white/20'}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div className={`transition-all duration-500 overflow-hidden ${
              openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-8 pb-8 pt-2">
                <div className="h-[2px] w-12 bg-brand/20 mb-6"></div>
                <p className="font-mono text-[12px] md:text-[14px] text-white/60 leading-relaxed uppercase tracking-tight">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-8">
        <h3 className="font-orbitron text-2xl font-black text-white uppercase tracking-widest">Have more questions?</h3>
        <div className="flex flex-wrap justify-center gap-6">
           <button 
             onClick={() => window.dispatchEvent(new CustomEvent('toggle-phish-assistant'))}
             className="px-10 py-4 bg-brand text-black font-orbitron font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
           >
             Ask via Live Chat
           </button>
           <button className="px-10 py-4 border-2 border-white/10 text-white/40 font-orbitron font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:border-brand hover:text-brand transition-all">
             Contact Support
           </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
