import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Zap,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Info,
  Sparkles,
  ChevronLeft,
  Activity,
  Target,
  Cpu
} from 'lucide-react';

interface CopyResultProps {
  data: any;
  onBack: () => void;
  renderPhone: (previewMode: boolean, message?: string) => React.ReactNode;
  generatedContent?: string;
}

const CopyResult: React.FC<CopyResultProps> = ({ data, onBack, renderPhone, generatedContent }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const generatedCopy = generatedContent || `Olá, ${data.targetPerson}! 👋

${data.hook}

Percebi que ${data.pain}. Isso é um gargalo comum em empresas do segmento de ${data.marketSegment || 'serviços'}, mas que pode ser resolvido com tecnologia.

Imagine se você tivesse um ${data.solution} que garantisse ${data.promise}. 

Faria sentido para a ${data.targetBusiness} implementarmos esse protocolo de automação agora? Podemos agendar um rápido diagnóstico de 10 minutos amanhã?

Atenciosamente,
${data.userName}`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(generatedCopy.slice(0, i));
      i += 20;
      if (i > generatedCopy.length) clearInterval(interval);
    }, 5);
    return () => clearInterval(interval);
  }, [generatedCopy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col space-y-10 animate-in fade-in duration-1000 pb-32 max-w-[1400px] mx-auto w-full px-6 relative z-20">

      {/* 🏛️ BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
      </div>

      {/* CABEÇALHO */}
      <div className="pt-4 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-2">
          <Sparkles size={12} className="text-purple-400" />
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Materialização de Abordagem</span>
        </div>
        <h1 className="text-[48px] md:text-[64px] font-black text-white tracking-tighter leading-none italic uppercase">
          Copy <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">Materializada.</span>
        </h1>
        <p className="text-[#94A3B8] text-lg font-medium max-w-2xl mx-auto opacity-70 italic">
          Sua abordagem estratégica foi forjada com precisão para conversão máxima.
        </p>
      </div>

      {/* BLOCO DE STATUS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col space-y-4">
          <Activity size={20} className="text-purple-400" />
          <div>
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</h4>
            <p className="text-white text-[14px] font-bold">Materializado_OK</p>
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col space-y-4">
          <Target size={20} className="text-emerald-400" />
          <div>
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Alvo</h4>
            <p className="text-white text-[14px] font-bold truncate">{data.targetBusiness}</p>
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col space-y-4">
          <Cpu size={20} className="text-blue-400" />
          <div>
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Engine</h4>
            <p className="text-white text-[14px] font-bold">IA_Elite_Copy_v4</p>
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col space-y-4">
          <ShieldCheck size={20} className="text-indigo-400" />
          <div>
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Validação</h4>
            <p className="text-white text-[14px] font-bold">100% Persuasivo</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* ÁREA DA COPY */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[32px] blur-md opacity-50" />
            <div className="relative bg-[#0A0A0C] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Script Estratégico</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest"
                >
                  {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copiado' : 'Copiar Copy'}</span>
                </button>
              </div>

              <div className="p-10 md:p-14 min-h-[400px]">
                <pre className="text-white text-base md:text-lg font-medium leading-relaxed whitespace-pre-wrap font-sans opacity-90">
                  {displayText}
                  <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse align-middle" />
                </pre>
              </div>

              <div className="p-8 border-t border-white/5 bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500">
                  <Info size={16} />
                  <p className="text-[11px] font-medium italic">Protocolo de abordagem pronto para envio imediato.</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all group"
                >
                  <Zap size={18} fill="currentColor" />
                  <span>Copiar & Enviar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW MOBILE */}
        <div className="col-span-12 lg:col-span-5 flex justify-center perspective-[2000px]">
          <div className="sticky top-10">
            <div className="bg-[#1A1A1E] rounded-[64px] p-[10px] shadow-[60px_100px_150px_-30px_rgba(0,0,0,0.9)] relative ring-1 ring-white/10 rotate-y-[-12deg]">
              <div className="w-[320px] h-[650px] bg-[#010102] rounded-[54px] overflow-hidden flex flex-col relative border border-black shadow-inner ring-1 ring-white/5">
                {renderPhone(false, displayText)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.4em] group"
        >
          <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
          Voltar para Nova Sessão
        </button>
      </div>

    </div>
  );
};

export default CopyResult;