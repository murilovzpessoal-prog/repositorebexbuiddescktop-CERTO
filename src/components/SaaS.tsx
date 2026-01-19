
import React from 'react';
import { 
  ArrowRight, 
  Database, 
  Code2, 
  Cpu, 
  CheckCircle2,
  ChevronRight,
  Workflow,
  Sparkles,
  Layers,
  Zap,
  Box,
  Layout,
  Globe
} from 'lucide-react';

interface SaaSProps {
  onOpenCatalog: () => void;
  onOpenWizard: () => void;
  onGenerateUpdate?: (data: any) => void;
}

const SaaS: React.FC<SaaSProps> = ({ onOpenCatalog, onOpenWizard }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 pb-24 animate-in fade-in duration-1000 overflow-visible">
      
      {/* Background Cinematic Atmosphere */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Floating Decorative Glass Widgets - Slightly Scaled Down */}
      <div className="absolute top-28 left-[12%] w-40 h-28 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl rotate-[-12deg] p-3 hidden xl:block animate-bounce" style={{ animationDuration: '6s' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1 w-full bg-white/10 rounded-full" />
          <div className="h-1 w-3/4 bg-white/10 rounded-full" />
          <div className="h-1 w-1/2 bg-purple-500/30 rounded-full" />
        </div>
      </div>

      <div className="absolute top-44 right-[10%] w-48 h-32 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl rotate-[8deg] p-5 hidden xl:block animate-pulse" style={{ animationDuration: '8s' }}>
        <div className="flex items-center justify-between mb-3">
          <Database size={14} className="text-blue-400" />
          <div className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[7px] font-black tracking-widest uppercase">Sync</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-white/5 rounded-lg" />
          <div className="h-8 bg-white/5 rounded-lg" />
          <div className="h-8 bg-white/5 rounded-lg" />
          <div className="h-8 bg-[#7C3AED]/20 rounded-lg border border-[#7C3AED]/30" />
        </div>
      </div>

      {/* Hero Content - Moved Up by reducing top margins */}
      <div className="text-center space-y-6 relative z-10 max-w-5xl mx-auto px-6 mb-12">
        <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-[#0A0A0C] border border-white/10 shadow-2xl backdrop-blur-md">
          <Sparkles size={12} className="text-purple-400" />
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Engine de Materialização 4.0</span>
          <div className="w-px h-3 bg-white/10 mx-1" />
          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Online</span>
        </div>

        <h1 className="text-[54px] md:text-[84px] font-black text-white tracking-tighter leading-[0.9] italic">
          Mergulhe na <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 pr-4">
            Nova Era Saas.
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed opacity-60">
          Não apenas imagine. Construa a estrutura de dados, o design system e a lógica operacional em um único processo acelerado por IA.
        </p>
      </div>

      {/* Main Action Grid - Compacted Card Heights */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 px-6">
        
        {/* Card 1: Catálogo */}
        <div 
          onClick={onOpenCatalog}
          className="group relative bg-[#070709] border border-white/[0.05] rounded-[40px] p-10 overflow-hidden hover:border-purple-500/40 transition-all duration-700 cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[460px]"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 blur-[80px] pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700" />
          
          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] shadow-xl group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-500">
              <Layers size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Catálogo de Modelos</h2>
              <p className="text-gray-400 text-sm font-medium max-w-[280px] leading-relaxed">
                Utilize estruturas validadas por especialistas para acelerar sua entrada no mercado.
              </p>
            </div>
          </div>

          {/* Visual Mockup Area */}
          <div className="relative mt-4 h-40 flex items-end justify-center">
             <div className="absolute bottom-0 w-full h-28 bg-white/[0.02] border border-white/5 rounded-t-[28px] translate-y-4 group-hover:translate-y-0 transition-all duration-700 flex p-5 gap-3 overflow-hidden">
                {[1,2,3].map(i => (
                  <div key={i} className="flex-1 bg-[#111116] rounded-lg border border-white/5 p-3 space-y-2">
                    <div className="w-full h-1 bg-white/10 rounded-full" />
                    <div className="w-2/3 h-1 bg-white/10 rounded-full" />
                    <div className="w-1/2 h-1 bg-purple-500/20 rounded-full" />
                  </div>
                ))}
             </div>
             <button className="absolute -top-6 right-2 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 z-20">
               <ChevronRight size={24} strokeWidth={3} />
             </button>
          </div>
        </div>

        {/* Card 2: Criar do Zero */}
        <div 
          onClick={onOpenWizard}
          className="group relative bg-[#070709] border border-white/[0.05] rounded-[40px] p-10 overflow-hidden hover:border-blue-500/40 transition-all duration-700 cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[460px]"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[80px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700" />

          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 shadow-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Cpu size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Criar do Zero</h2>
              <p className="text-gray-400 text-sm font-medium max-w-[280px] leading-relaxed">
                Nossa IA interpreta sua ideia e forja o prompt técnico perfeito para o seu motor favorito.
              </p>
            </div>
          </div>

          {/* Prompt Terminal Visual */}
          <div className="relative mt-4 h-40 bg-[#020203] border border-white/5 rounded-t-[28px] p-6 group-hover:border-blue-500/30 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
             <div className="flex items-center gap-1.5 mb-3">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-blue-500/70 uppercase tracking-widest font-mono">IA Processando...</span>
             </div>
             <div className="space-y-2 font-mono">
                <p className="text-blue-400/40 text-[9px]"> &gt; Analisando nicho: Fintech</p>
                <p className="text-blue-400/60 text-[9px]"> &gt; Definindo Arquitetura: Clean Code</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-blue-400 text-[9px]"> &gt; Gerando UI Premium</p>
                  <div className="w-1 h-2.5 bg-blue-500 animate-pulse" />
                </div>
             </div>
             
             <button className="absolute -top-6 right-2 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 z-20">
               <ChevronRight size={24} strokeWidth={3} />
             </button>
          </div>
        </div>

      </div>

      {/* Tech Integrated Bar - Slightly tightned */}
      <div className="mt-20 w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">Powered by Elite Engines</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center gap-2 font-bold text-lg text-white">
                <Zap size={20} className="text-yellow-400" /> Lovable
             </div>
             <div className="flex items-center gap-2 font-bold text-lg text-white">
                <Box size={20} className="text-blue-400" /> Bolt.new
             </div>
             <div className="flex items-center gap-2 font-bold text-lg text-white">
                <Layout size={20} className="text-purple-400" /> v0.dev
             </div>
             <div className="flex items-center gap-2 font-bold text-lg text-white">
                <Globe size={20} className="text-emerald-400" /> Nexbuild
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaaS;
