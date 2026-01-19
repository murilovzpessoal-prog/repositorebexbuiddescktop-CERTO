
import React, { useState } from 'react';
import { 
  Play, 
  ChevronLeft as ChevronLeftIcon,
  LayoutGrid,
  Clock,
  PlayCircle,
  Settings,
  Code,
  Layers,
  TrendingUp,
  Sparkles,
  Command,
  Zap
} from 'lucide-react';
import ModuleLessons from './ModuleLessons';

interface ModuleCard {
  id: number;
  title: string;
  duration: string;
  lessonsCount: number;
  image: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
}

const MODULES: ModuleCard[] = [
  {
    id: 1,
    title: 'FUNDAMENTOS E ECOSSISTEMA',
    description: 'A base soberana para construir softwares de alta performance.',
    duration: '45 min',
    lessonsCount: 12,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', 
    icon: <Settings size={24} strokeWidth={1.5} />,
    active: true
  },
  {
    id: 2,
    title: 'ENGENHARIA DE SOFTWARE',
    description: 'Protocolos de desenvolvimento moderno com IA integrada.',
    duration: '1h 20 min',
    lessonsCount: 8,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', 
    icon: <Code size={24} strokeWidth={1.5} />
  },
  {
    id: 3,
    title: 'PORTFÓLIO E MODELOS PRONTOS',
    description: 'Acelere sua entrega com estruturas validadas.',
    duration: '2h 10 min',
    lessonsCount: 15,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
    icon: <Layers size={24} strokeWidth={1.5} />
  },
  {
    id: 4,
    title: 'PROSPECÇÃO, VENDAS E ESCALA',
    description: 'Transforme código em faturamento exponencial.',
    duration: '3h',
    lessonsCount: 20,
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop', 
    icon: <TrendingUp size={24} strokeWidth={1.5} />
  }
];

interface CoursePlayerProps {
  onBack: () => void;
  progress: number;
  onUpdateProgress: (val: number) => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ onBack, progress, onUpdateProgress }) => {
  const [selectedModule, setSelectedModule] = useState<ModuleCard | null>(null);

  if (selectedModule) {
    return (
      <ModuleLessons 
        moduleTitle={selectedModule.title} 
        moduleDescription={selectedModule.description}
        moduleNumber={selectedModule.id}
        onBack={() => setSelectedModule(null)}
        globalProgress={progress}
        onUpdateProgress={onUpdateProgress}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-['Inter'] selection:bg-[#7C3AED]/30 pb-32">
      <div className="px-10 py-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group px-5 py-2.5 bg-white/[0.04] rounded-2xl border border-white/10 shadow-2xl"
          >
            <ChevronLeftIcon size={18} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Voltar_Academy</span>
          </button>
          
          <div className="flex items-center gap-4">
             <div className="w-px h-6 bg-white/10" />
             <div className="flex items-center gap-3">
               <Command size={14} className="text-purple-500" />
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] italic">Área de Membros_Elite</span>
             </div>
          </div>
        </div>
      </div>

      <div className="relative px-10 mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="relative rounded-[56px] overflow-hidden bg-[#0A0A0C] border border-white/20 min-h-[560px] shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] group">
          <img 
            src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-110 transition-transform duration-[10000ms] ease-out pointer-events-none grayscale-[0.2] group-hover:grayscale-0 contrast-125 brightness-110"
            alt="Academy Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.15),transparent_50%)]" />
          
          <div className="relative p-20 h-full flex flex-col justify-center space-y-10 max-w-5xl z-10">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-purple-500/20 border border-purple-500/30 rounded-2xl shadow-[0_0_25px_rgba(124,58,237,0.2)] backdrop-blur-md">
                <Sparkles size={14} className="text-purple-300 animate-pulse" />
                <span className="text-[10px] font-black text-purple-300 uppercase tracking-[0.4em] italic">Formação_Soberana</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] italic">Protocol_v4.2</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-[68px] md:text-[86px] font-black leading-[0.85] tracking-tighter text-white italic uppercase drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                NEXBUILD <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-100 to-white pr-4">ACADEMY</span>
              </h1>
              <p className="text-gray-300 text-2xl font-medium leading-relaxed max-w-3xl italic opacity-90 drop-shadow-lg">
                O único lugar onde a engenharia de software encontra o futuro da Inteligência Artificial em tempo real.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <button className="flex items-center gap-5 bg-white text-black px-14 py-6 rounded-[28px] font-black text-[13px] uppercase tracking-[0.4em] italic shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all w-fit group/btn">
                <Play size={20} fill="black" strokeWidth={3} className="transition-transform group-hover/btn:scale-110" />
                Continuar_Acesso
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 space-y-12 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-10">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 flex items-center justify-center text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                <LayoutGrid size={24} strokeWidth={2.5} />
             </div>
             <div className="space-y-1">
                <h3 className="text-4xl font-black text-white tracking-tighter italic uppercase font-['Montserrat']">Módulos_Operacionais</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">Sincronize sua mente com a arquitetura elite</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {MODULES.map((module) => (
            <div 
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className={`group relative aspect-[10/14] rounded-[52px] overflow-hidden border-2 transition-all duration-1000 cursor-pointer shadow-[0_60px_110px_-20px_rgba(0,0,0,1)] ${
                module.active 
                ? 'border-purple-500/80 ring-[1px] ring-white/30 scale-[1.02] shadow-[0_40px_80px_rgba(124,58,237,0.2)]' 
                : 'border-white/20 hover:border-purple-500/60 hover:scale-[1.01]'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden bg-black">
                <img 
                  src={module.image} 
                  className="w-full h-full object-cover object-center transition-all duration-[4000ms] group-hover:scale-110 opacity-80 brightness-[0.55] group-hover:brightness-[0.75] contrast-110" 
                  alt={module.title} 
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,43,226,0.25),transparent_85%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="absolute inset-3 border border-white/10 rounded-[42px] pointer-events-none group-hover:border-purple-500/40 transition-all duration-700" />

              <div className="absolute top-10 right-10 z-30">
                <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center shadow-2xl backdrop-blur-3xl transition-all duration-700 group-hover:rotate-12 border ${
                  module.active ? 'bg-purple-600 border-white/40 text-white shadow-purple-500/40' : 'bg-white/10 border-white/20 text-purple-300 group-hover:bg-purple-600 group-hover:text-white'
                }`}>
                  {module.icon}
                </div>
              </div>

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                <div className="flex flex-col items-center space-y-3 w-full max-w-[90%] mx-auto">
                  <h4 className="text-[13px] lg:text-[14px] font-light text-white tracking-[0.25em] leading-[1.3] group-hover:text-purple-200 transition-all duration-700 uppercase italic drop-shadow-[0_4px_12px_rgba(0,0,0,1)] w-full font-['Montserrat'] antialiased [text-wrap:balance]">
                    {module.title}
                  </h4>
                  <div className="flex items-center justify-center gap-4 opacity-70 group-hover:opacity-100 transition-all duration-1000">
                    <div className="w-6 h-[1px] bg-white/30" />
                    <p className="text-[9px] font-medium text-white/80 uppercase tracking-[0.4em] font-sans drop-shadow-md">Módulo 0{module.id}</p>
                    <div className="w-6 h-[1px] bg-white/30" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-10 bottom-10 z-20">
                <div className="w-full flex items-center bg-black/60 backdrop-blur-3xl border border-white/20 px-8 py-4 rounded-[26px] shadow-2xl group-hover:border-purple-500/60 transition-all duration-500">
                  <div className="flex-1 flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                    <Clock size={16} className="text-purple-300 group-hover:text-purple-200" />
                    <span className="text-[10px] font-black tabular-nums tracking-[0.2em]">{module.duration}</span>
                  </div>
                  <div className="w-px h-5 bg-white/20" />
                  <div className="flex-1 flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors justify-end">
                    <PlayCircle size={16} className="text-purple-300 group-hover:text-purple-200" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">{module.lessonsCount} SESSIONS</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.15] to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[2200ms] ease-in-out z-10" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 pt-24 opacity-30">
        <Zap size={14} className="text-purple-400 animate-pulse" />
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[1em] italic font-mono">Nexbuild_Elite_Academy_Sync</span>
      </div>
    </div>
  );
};

export default CoursePlayer;
