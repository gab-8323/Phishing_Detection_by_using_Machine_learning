
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const PhishAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Neural Assistant Online. State your query, operator.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef<GeminiService | null>(null);

  useEffect(() => {
    geminiRef.current = new GeminiService();

    const handleToggle = () => setIsOpen(true);
    window.addEventListener('toggle-phish-assistant', handleToggle);
    return () => window.removeEventListener('toggle-phish-assistant', handleToggle);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || !geminiRef.current) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const reply = await geminiRef.current.chatWithAssistant(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'ERROR: Neural link disrupted.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex flex-col items-end">
      {isOpen && (
        <div className="glass-card w-[350px] md:w-[450px] h-[550px] mb-6 flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 duration-500 border-2 border-brand/40">
          <div className="p-6 border-b border-brand/20 bg-brand/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
              <span className="font-orbitron font-black text-xs text-brand uppercase tracking-widest">Neural_Assistant_V4</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 no-scrollbar bg-black/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl font-mono text-[11px] font-black uppercase tracking-tight border ${
                  m.role === 'user' ? 'bg-brand/10 border-brand/30 text-brand' : 'bg-white/5 border-white/10 text-white/80'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl animate-pulse">
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-brand/20 bg-black/60">
            <div className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="STATE_QUERY..."
                className="flex-grow bg-transparent border-b border-white/10 font-mono text-xs uppercase tracking-widest focus:border-brand outline-none pb-2"
              />
              <button onClick={handleSend} className="text-brand hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:scale-110 active:scale-95 transition-all relative group"
      >
        <div className="absolute inset-0 rounded-full border-2 border-brand animate-ping opacity-20"></div>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      </button>
    </div>
  );
};

export default PhishAssistant;
