
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Download, 
  FileText, 
  Clock, 
  Maximize2,
  ChevronRight,
  MonitorPlay,
  Share2,
  Bookmark,
  Settings,
  Zap
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
}

interface Material {
  id: number;
  title: string;
  type: 'PDF' | 'DOC' | 'ZIP';
  size: string;
}

interface ModuleLessonsProps {
  moduleTitle: string;
  moduleDescription: string;
  moduleNumber: number;
  onBack: () => void;
  globalProgress: number;
  onUpdateProgress: (val: number) => void;
}

const LESSONS: Lesson[] = [
  { id: 1, title: 'Introdução ao Ecossistema Nexbuild', duration: '12:45', isCompleted: true, videoUrl: '#' },
  { id: 2, title: 'Configurando o Ambiente de Desenvolvimento', duration: '24:10', isCompleted: true, videoUrl: '#' },
  { id: 3, title: 'Arquitetura de Softwares Soberanos', duration: '18:30', isCompleted: false, videoUrl: '#' },
  { id: 4, title: 'Integração Nativa com Gemini API', duration: '45:12', isCompleted: false, videoUrl: '#' },
  { id: 5, title: 'Design System e Componentes Elite', duration: '32:20', isCompleted: false, videoUrl: '#' },
  { id: 6, title: 'Deploy e Escalabilidade em Nuvem', duration: '21:05', isCompleted: false, videoUrl: '#' },
];

const MATERIALS: Material[] = [
  { id: 1, title: 'Guia de Arquitetura.pdf', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Assets_Componentes_v4.zip', type: 'ZIP', size: '142 MB' },
];

const ModuleLessons: React.FC<ModuleLessonsProps> = ({ 
  moduleTitle, 
  moduleDescription, 
  moduleNumber, 
  onBack, 
  globalProgress, 
  onUpdateProgress 
}) => {
  const [currentLesson, setCurrentLesson] = useState(LESSONS[2]);

  const handleFinishLesson = () => {
    // Increment global progress by 5% each lesson (or based on real count)
    onUpdateProgress(globalProgress + 5);
    alert('Sessão concluída! Seu progresso foi sincronizado com o terminal.');
  };

  return (
    <div className="flex flex-col h-screen bg-[#050507] overflow-hidden animate-in fade-in duration-700 font-['Inter']">
      
      <header className="h-20 border-b border-white/5 bg-[#08080A]/80 backdrop-blur-xl px-10 flex items-center justify-between shrink-0 relative z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-purple-500 uppercase tracking-[0.3em] italic">Módulo 0{moduleNumber}</span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <h1 className="text-base font-bold text-white tracking-tight uppercase italic">{moduleTitle}</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global: {globalProgress}%</span>
           </div>
           <div className="w-px h-6 bg-white/10" />
           <Settings size={18} className="text-gray-600 cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        <aside className="w-[380px] border-r border-white/5 bg-[#08080A]/40 flex flex-col shrink-0">
          <div className="p-8 border-b border-white/5">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] italic mb-2">Playlist do Módulo</h4>
            <p className="text-xs text-slate-400 font-medium opacity-60">Siga a trilha estratégica de evolução.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full group flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                  currentLesson.id === lesson.id 
                  ? 'bg-purple-600/10 border-purple-500/40' 
                  : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  currentLesson.id === lesson.id 
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg' 
                  : lesson.isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                    : 'bg-white/5 border-white/10 text-gray-700 group-hover:text-gray-300'
                }`}>
                  {lesson.isCompleted ? <CheckCircle2 size={16} /> : <Play size={14} fill={currentLesson.id === lesson.id ? 'currentColor' : 'none'} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h5 className={`text-[13px] font-bold tracking-tight truncate ${currentLesson.id === lesson.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                    {lesson.title}
                  </h5>
                  <div className="flex items-center gap-3 mt-1 opacity-60">
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest">
                       <Clock size={10} /> {lesson.duration}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-8 bg-black/40 border-t border-white/5">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Progresso Global</span>
                <span className="text-[10px] font-black text-white italic">{globalProgress}% Concluído</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 transition-all duration-700" style={{ width: `${globalProgress}%` }} />
             </div>
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto bg-[#050507] p-10 lg:p-14 space-y-12 no-scrollbar relative">
          
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/[0.02] blur-[150px] rounded-full pointer-events-none" />

          <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-1000">
            <div className="aspect-video w-full bg-black rounded-[40px] border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-2xl group-hover:bg-purple-600 group-hover:border-purple-500 duration-500">
                    <Play size={40} fill="currentColor" strokeWidth={3} className="ml-2" />
                 </div>
              </div>

              <div className="absolute bottom-10 inset-x-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                 <div className="flex items-center gap-6">
                    <MonitorPlay size={20} className="text-white/70 hover:text-white cursor-pointer" />
                    <div className="w-px h-4 bg-white/20" />
                    <span className="text-xs font-bold text-white tracking-widest font-mono">00:00 / {currentLesson.duration}</span>
                 </div>
                 <div className="flex items-center gap-6">
                    <Maximize2 size={20} className="text-white/70 hover:text-white cursor-pointer" />
                 </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <MonitorPlay size={16} />
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">{currentLesson.title}</h2>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed font-medium italic opacity-70">
                   Nesta sessão de engenharia, mergulhamos nas fundações técnicas e na visão estratégica que compõem o ecossistema {moduleTitle}.
                </p>
              </div>

              <div className="flex items-center gap-4">
                 <button className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white hover:border-white/10 transition-all">
                    <Share2 size={20} />
                 </button>
                 <button className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white hover:border-white/10 transition-all">
                    <Bookmark size={20} />
                 </button>
                 <button 
                  onClick={handleFinishLesson}
                  className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] italic hover:scale-105 transition-all shadow-xl"
                 >
                    Finalizar Aula
                    <CheckCircle2 size={16} />
                 </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/5 pt-12">
             <div className="lg:col-span-8 space-y-8">
                <div className="flex items-center gap-4">
                   <FileText size={20} className="text-purple-500" />
                   <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic">Material de Apoio_Elite</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {MATERIALS.map(mat => (
                     <div key={mat.id} className="bg-[#0F0F12] border border-white/5 p-6 rounded-[28px] flex items-center justify-between group hover:border-purple-500/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-5">
                           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-purple-400 transition-colors">
                              <Download size={24} />
                           </div>
                           <div className="space-y-1">
                              <h5 className="text-[13px] font-bold text-white tracking-tight">{mat.title}</h5>
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{mat.type} • {mat.size}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#0F0F12] border border-white/5 rounded-[36px] p-10 flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[50px] pointer-events-none" />
                   
                   <div className="w-16 h-16 rounded-[24px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-xl group-hover:scale-110 transition-transform">
                      <ChevronRight size={32} />
                   </div>
                   
                   <div className="space-y-3">
                      <h4 className="text-xl font-black text-white tracking-tighter uppercase italic">Próxima_Aula</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-relaxed italic">Seguindo: Configurando o Ambiente de Desenvolvimento</p>
                   </div>

                   <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.4em] italic hover:bg-white hover:text-black transition-all">
                      Iniciar Sessão_
                   </button>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-center gap-8 pt-16 opacity-30">
            <Zap size={14} className="text-purple-400 animate-pulse" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[1.2em] italic font-mono">Nexbuild_Course_Sync_Terminal</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ModuleLessons;
