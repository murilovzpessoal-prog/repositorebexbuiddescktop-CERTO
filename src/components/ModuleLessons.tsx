
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
  Zap,
  ExternalLink
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl?: string;
  externalLink?: string;
  type: 'video' | 'pdf' | 'spreadsheet';
}

interface Material {
  id: number;
  title: string;
  type: 'PDF' | 'DOC' | 'ZIP' | 'XLS';
  size: string;
  url: string;
}

const MODULE_DATA: Record<number, { lessons: Lesson[], materials: Material[] }> = {
  1: {
    lessons: [
      { id: 1, title: 'Masterclass: Início da Jornada - Faturar Apps', duration: '12:45', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/BJHU6lAHkW0', type: 'video' },
      { id: 2, title: 'Recurso: Protocolo Inicial de Engenharia (PDF)', duration: '05:00', isCompleted: false, externalLink: 'https://drive.google.com/file/d/1wFxhnEM-ntNAxO_RKYhCPJXDKm7nxMIy/view?usp=drive_link', type: 'pdf' },
      { id: 3, title: 'Recurso: Guia de Ecossistema Soberano (PDF)', duration: '08:20', isCompleted: false, externalLink: 'https://drive.google.com/file/d/1tvWqLFJF4Ygh5sff5on2EG234YWUU1-k/view?usp=drive_link', type: 'pdf' },
      { id: 4, title: 'Masterclass: Mercado de Prestação de Serviços', duration: '15:30', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/7Z7XeTAT6Bw', type: 'video' },
      { id: 5, title: 'Recurso: Planilha de Operação Estratégica', duration: '10:00', isCompleted: false, externalLink: 'https://docs.google.com/spreadsheets/d/1pqlRWiY6kN8ryPrkbC2nXFJVi4UYfMEi/edit?usp=drive_link', type: 'spreadsheet' },
      { id: 6, title: 'Recurso: Checkpoint de Execução IA (PDF)', duration: '12:15', isCompleted: false, externalLink: 'https://drive.google.com/file/d/1NMuqMFIryOBadX_1hk6IW11CZqPb1Ge6/view?usp=drive_link', type: 'pdf' },
      { id: 7, title: 'Masterclass: Hierarquia das Ferramentas', duration: '20:45', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/tIbW5oA6Nek', type: 'video' },
      { id: 8, title: 'Recurso: Roadmap de Escala e Resultados (PDF)', duration: '05:50', isCompleted: false, externalLink: 'https://drive.google.com/file/d/1Hj9Jpai-JeHzElOcpC0sstsfCjwfptwU/view?usp=drive_link', type: 'pdf' },
    ],
    materials: []
  },
  2: {
    lessons: [
      { id: 1, title: 'Masterclass: Criando um App funcional de tarefas na LOVABLE', duration: '15:20', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/CaipuWkHUL4', type: 'video' },
      { id: 2, title: 'Masterclass: Ensinando Back-end na prática com a Lovable Cloud', duration: '18:10', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/6vXg2cimcIU', type: 'video' },
      { id: 3, title: 'Masterclass: Back-end no Lovable com Supabase', duration: '12:45', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/_1D8aissJX0', type: 'video' },
      { id: 4, title: 'Masterclass: Explicando de forma simples o que é o Front-end e o Back-end', duration: '14:20', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/6cBf4l5sklI', type: 'video' },
      { id: 5, title: 'Masterclass: Criando um sistema para empresa com a Firebase Studio', duration: '20:30', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/Zd8t0YrHv5A', type: 'video' },
      { id: 6, title: 'Masterclass: Back-end na Firebase Studio com o Firestore', duration: '14:50', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/iWUJSajZDXQ', type: 'video' },
      { id: 7, title: 'Masterclass: Back-end na Firebase Studio com o Supabase', duration: '17:15', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/XDO1SIq6EqM', type: 'video' },
      { id: 8, title: 'Masterclass: Criando um dashboard organizador de dados para empresas', duration: '19:40', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/lh4NntIZgpE', type: 'video' },
      { id: 9, title: 'Masterclass: Back-end no Google AI Studio com LocalHost', duration: '13:20', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/M3ur0F9XiaU', type: 'video' },
      { id: 10, title: 'Masterclass: Back-end no Google AI Studio na prática com o Supabase', duration: '16:05', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/YolIjQA6blw', type: 'video' },
      { id: 11, title: 'Masterclass: Alternativas de Ferramentas de IA', duration: '22:30', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/e0KA_F9OROg', type: 'video' },
      { id: 12, title: 'Masterclass: Alternativas de Bancos de Dados', duration: '11:55', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/aPKHuwepyO8', type: 'video' },
    ],
    materials: []
  },
  3: {
    lessons: [
      { id: 1, title: 'Masterclass: Criando um portifólio profissional com a Nexbuild e Lovable', duration: '14:20', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/wNqbfXXWUqA', type: 'video' },
      { id: 2, title: 'Masterclass: Como não quebrar a sua estrutura de forma estratégica', duration: '18:15', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/EAYfxL2pRyA', type: 'video' },
      { id: 3, title: 'Recurso: Passos para alterações e atualizações (PDF)', duration: '05:00', isCompleted: false, externalLink: 'https://drive.google.com/file/d/1jip7s0G6n9yEneaEH2P4icGPb4oQ3Uhn/view?usp=drivesdk', type: 'pdf' },
    ],
    materials: []
  },
  4: {
    lessons: [
      { id: 1, title: 'Masterclass: Os passos e plataformas para faturar e acelerar o processo dos serviços', duration: '14:20', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/YLbO-vEwa1c', type: 'video' },
      { id: 2, title: 'Recurso: Templates de Prospecção e Insights (PDF)', duration: '05:00', isCompleted: false, externalLink: 'https://drive.google.com/file/d/14mHc9UmiXonW1v3eQWrBvWrTUZc_nn6X/view?usp=drivesdk', type: 'pdf' },
      { id: 3, title: 'Recurso: Segredos e Insights das Plataformas de Freelas (PDF)', duration: '08:45', isCompleted: false, externalLink: 'https://drive.google.com/file/d/1It123i8PVjrKOohIm3N3QZTS1X405N_g/view?usp=drivesdk', type: 'pdf' },
    ],
    materials: []
  }
};

interface ModuleLessonsProps {
  moduleTitle: string;
  moduleDescription: string;
  moduleNumber: number;
  onBack: () => void;
  globalProgress: number;
  onUpdateProgress: (val: number) => void;
}

const ModuleLessons: React.FC<ModuleLessonsProps> = ({
  moduleTitle,
  moduleDescription,
  moduleNumber,
  onBack,
  globalProgress,
  onUpdateProgress
}) => {
  const moduleData = MODULE_DATA[moduleNumber] || { lessons: [], materials: [] };
  const [currentLesson, setCurrentLesson] = useState(moduleData.lessons[0] || null);

  const goToNextLesson = () => {
    const currentIndex = moduleData.lessons.findIndex(l => l.id === currentLesson?.id);
    if (currentIndex !== -1 && currentIndex < moduleData.lessons.length - 1) {
      setCurrentLesson(moduleData.lessons[currentIndex + 1]);
    } else {
      alert('Você concluiu todas as sessões deste módulo!');
    }
  };

  const handleFinishLesson = () => {
    onUpdateProgress(globalProgress + 2);
    goToNextLesson();
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
            {moduleData.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full group flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${currentLesson?.id === lesson.id
                  ? 'bg-purple-600/10 border-purple-500/40'
                  : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${currentLesson?.id === lesson.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                  : lesson.isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                    : 'bg-white/5 border-white/10 text-gray-700 group-hover:text-gray-300'
                  }`}>
                  {lesson.isCompleted ? <CheckCircle2 size={16} /> : (
                    lesson.type === 'video' ? <Play size={14} fill={currentLesson?.id === lesson.id ? 'currentColor' : 'none'} /> : <FileText size={14} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h5 className={`text-[13px] font-bold tracking-tight truncate ${currentLesson?.id === lesson.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
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
              {currentLesson?.type === 'video' ? (
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-[#0A0A0C]">
                  <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-2xl">
                    {currentLesson?.type === 'spreadsheet' ? <Download size={40} /> : <FileText size={40} />}
                  </div>
                  <div className="text-center space-y-4 max-w-md px-6">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">{currentLesson?.title}</h3>
                    <p className="text-gray-500 font-medium italic">Este conteúdo é um material para download ou visualização externa.</p>
                  </div>
                  <a
                    href={currentLesson?.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white text-black px-10 py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] italic hover:scale-105 transition-all shadow-xl"
                  >
                    Abrir Material
                    <ExternalLink size={18} />
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    {currentLesson?.type === 'video' ? <MonitorPlay size={16} /> : <FileText size={16} />}
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">{currentLesson?.title}</h2>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed font-medium italic opacity-70">
                  Nesta sessão de engenharia, você terá acesso ao conteúdo estratégico: {currentLesson?.title}.
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

          {moduleData.materials.length > 0 && (
            <div className="border-t border-white/5 pt-12">
              <div className="flex items-center gap-4 mb-8">
                <FileText size={20} className="text-purple-500" />
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic">Material de Apoio_Elite</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {moduleData.materials.map(mat => (
                  <a
                    key={mat.id}
                    href={mat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0F0F12] border border-white/5 p-6 rounded-[28px] flex items-center justify-between group hover:border-purple-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-purple-400 transition-colors">
                        <Download size={24} />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-[13px] font-bold text-white tracking-tight">{mat.title}</h5>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{mat.type} • {mat.size}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/5 pt-12">
            <div className="bg-[#0F0F12] border border-white/5 rounded-[24px] px-8 py-6 flex flex-col sm:flex-row items-center justify-between shadow-2xl relative overflow-hidden group gap-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[50px] pointer-events-none" />

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-[16px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-xl group-hover:scale-110 transition-transform shrink-0">
                  <ChevronRight size={24} />
                </div>

                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-black text-white tracking-tighter uppercase italic leading-none">Próxima_Aula</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.1em] italic">Seguindo: {moduleData.lessons[moduleData.lessons.findIndex(l => l.id === currentLesson?.id) + 1]?.title || 'Final do Módulo'}</p>
                </div>
              </div>

              <button
                onClick={goToNextLesson}
                className="px-10 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-[0.4em] italic hover:bg-white hover:text-black transition-all shrink-0"
              >
                Iniciar Sessão_
              </button>
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
