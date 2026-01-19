import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
  Workflow,
  Sparkles,
  FileCode,
  Binary,
  Smartphone,
  Target
} from 'lucide-react';
import { generateProfessionalPrompt } from '../lib/intelligence';

interface PromptResultProps {
  data: any;
  onBack: () => void;
}

const PromptResult: React.FC<PromptResultProps> = ({ data, onBack }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const generateElitePrompt = () => {
    return generateProfessionalPrompt(data);
  };

  const promptContent = generateElitePrompt();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(promptContent.slice(0, i));
      i += 85;
      if (i > promptContent.length) clearInterval(interval);
    }, 5);
    return () => clearInterval(interval);
  }, [promptContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDevelop = () => {
    const platform = (data?.aiPlatform || 'Lovable');

    const PLATFORM_URLS: Record<string, string> = {
      'Lovable': 'https://lovable.dev',
      'Firebase Studio': 'https://studio.firebase.google.com/',
      'Bolt': 'https://bolt.new',
      'Replit': 'https://replit.com',
      'Lazy': 'https://lasy.ai/',
      'v0.dev': 'https://v0.dev',
      'Base44': 'https://base44.com/',
      'Mocha': 'https://getmocha.com/',
      'Genspark': 'https://genspark.ai',
      'Google AI Studio': 'https://aistudio.google.com'
    };

    const targetUrl = PLATFORM_URLS[platform] || 'https://lovable.dev';
    window.open(targetUrl, '_blank');
  };

  // Split display text into lines for the line number visual
  const lines = displayText.split('\n');

  return (
    <div className="flex-1 flex flex-col space-y-12 animate-in fade-in duration-1000 pb-32 max-w-6xl mx-auto w-full px-6">
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#050507]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="pt-4 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-2">
          <Sparkles size={12} className="text-purple-400" />
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest italic">Materialização de Experiência Ativada</span>
        </div>
        <h1 className="text-[48px] md:text-[64px] font-black text-white tracking-tighter leading-none italic uppercase">
          CÓDIGO <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">ESTRUTURADO.</span>
        </h1>
        <p className="text-[#94A3B8] text-lg font-medium max-w-2xl mx-auto opacity-70">
          O DNA técnico do seu produto foi forjado com foco absoluto na experiência do cliente final.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Smartphone size={20} />, color: "text-purple-400", bg: "bg-purple-500/5", label: "Paradigma", val: "Experience-First" },
          { icon: <ShieldCheck size={20} />, color: "text-emerald-400", bg: "bg-emerald-500/5", label: "Validação", val: "Pronto para Escala" },
          { icon: <Target size={20} />, color: "text-blue-400", bg: "bg-blue-500/5", label: "Objetivo", val: "Conversão Direta" },
          { icon: <Binary size={20} />, color: "text-indigo-400", bg: "bg-indigo-500/5", label: "Arquitetura", val: "Clean Code Elite" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col space-y-4 hover:border-white/10 transition-all group shadow-xl">
            <div className={`w-10 h-10 rounded-xl ${item.bg} border border-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div>
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</h4>
              <p className="text-white text-[14px] font-bold">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- COMPACT RECTANGULAR WINDOW WITH LINE NUMBERS --- */}
      <div className="relative group max-w-5xl mx-auto w-full">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[1.5rem] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

        <div className="relative bg-[#141417] border border-white/10 rounded-[1.2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
          {/* Title Bar (macOS Style) */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#1A1A1E]">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2 w-20">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>

            {/* Filename */}
            <div className="flex items-center gap-2">
              <FileCode size={14} className="text-purple-400 opacity-60" />
              <span className="text-[11px] font-medium text-gray-400 tracking-tight font-mono">Nexbuild prompt v1.md</span>
            </div>

            {/* Copy Action Right */}
            <div className="w-20 flex justify-end">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-white transition-all rounded-lg hover:bg-white/5 group/copybtn"
              >
                {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="group-hover/copybtn:scale-110 transition-transform" />}
              </button>
            </div>
          </div>

          {/* Prompt Content Area with Line Numbers */}
          <div className="flex min-h-[350px] max-h-[580px] overflow-y-auto no-scrollbar scroll-smooth bg-[#0D0D0F]">
            {/* Line Numbers Column */}
            <div className="w-12 pt-8 md:pt-10 flex flex-col items-center border-r border-white/5 select-none opacity-20 font-mono text-[13px] text-white">
              {lines.map((_, i) => (
                <div key={i} className="h-[1.6em]">{i + 1}</div>
              ))}
            </div>

            {/* Code Body */}
            <div className="flex-1 p-8 md:p-10 pt-8 md:pt-10">
              <pre
                className="text-white text-base md:text-[16px] font-medium leading-[1.6] whitespace-pre-wrap selection:bg-purple-500/40 opacity-90"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace" }}
              >
                {displayText}
                <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse align-middle" />
              </pre>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 border-t border-white/5 bg-black/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <Info size={16} />
              <p className="text-[11px] font-medium italic opacity-60">Engine configurada para materializar o front-end principal do produto.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] hover:bg-white/10 transition-all active:scale-95"
              >
                {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-gray-400" />}
                <span>Copiar Prompt</span>
              </button>

              <button
                onClick={handleDevelop}
                className="w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-black px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 group"
              >
                <Zap size={16} fill="currentColor" className="group-hover:animate-pulse" />
                <span>Iniciar Materialização</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-8 pt-10">
        <div className="bg-white/[0.02] border border-white/10 px-8 py-6 rounded-3xl max-w-3xl flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Workflow size={24} />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed text-left italic">
            "A inteligência estratégica deste código garante que a IA ignore sistemas internos inúteis e foque 100% no que gera faturamento: a interface que o cliente utiliza."
          </p>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-3 text-gray-600 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.4em] group italic"
        >
          <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
          Retornar ao Estúdio
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default PromptResult;