import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Calendar, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  Award, 
  Rocket, 
  Trophy,
  Target,
  Sparkles,
  Command,
  Download,
  Info,
  Clock,
  X
} from 'lucide-react';
import { ChallengeDayProgress } from '../App';

interface Challenge8DProps {
  completedDays: ChallengeDayProgress[];
  onUpdateProgress: (days: ChallengeDayProgress[]) => void;
}

interface DayDetails {
  id: number;
  title: string;
  description: string;
  task: string;
  icon: React.ReactNode;
}

const CHALLENGE_DAYS: DayDetails[] = [
  { id: 1, title: 'Crie seu primeiro aplicativo', description: 'Crie seu primeiro aplicativo usando um modelo pronto.', task: 'Crie seu primeiro aplicativo usando um modelo pronto. Escolha uma hamburgueria como exemplo e gere o aplicativo completo com apenas um comando.', icon: <Rocket size={20} /> },
  { id: 2, title: 'Crie um contrato simples', description: 'Use a aba de contratos para criar um contrato básico.', task: 'Use a aba de contratos para criar um contrato básico de prestação de serviço. Preencha os dados e salve o contrato.', icon: <Target size={20} /> },
  { id: 3, title: 'Gere uma mensagem de vendas', description: 'Use a IA Copywriter para criar uma mensagem de vendas.', task: 'Use a IA Copywriter para criar uma mensagem de vendas para WhatsApp preenchendo as informações necessárias.', icon: <Sparkles size={20} /> },
  { id: 4, title: 'Crie um aplicativo do zero', description: 'Crie um aplicativo sem usar modelos prontos.', task: 'Crie um aplicativo sem usar modelos prontos, utilizando a opção “Criar do zero”.', icon: <Zap size={20} /> },
  { id: 5, title: 'Salve um lead no sistema', description: 'Salve um contato como lead no sistema.', task: 'Salve um contato como lead e veja como o sistema organiza automaticamente.', icon: <Command size={20} /> },
  { id: 6, title: 'Avance um lead na negociação', description: 'Mova um lead entre as etapas do funil.', task: 'Mova um lead entre as etapas de prospecção, qualificação e negociação.', icon: <ShieldCheck size={20} /> },
  { id: 7, title: 'Ative um contrato', description: 'Abra um contrato e marque ele como aprovado.', task: 'Abra um contrato criado e marque ele como aprovado para ativar no sistema.', icon: <Trophy size={20} /> },
  { id: 8, title: 'Finalize o desafio', description: 'Revise tudo e desbloqueie seu certificado.', task: 'Revise tudo o que foi criado e finalize o desafio para desbloquear o certificado digital.', icon: <Award size={20} /> },
];

const Challenge8D: React.FC<Challenge8DProps> = ({ completedDays, onUpdateProgress }) => {
  const [view, setView] = useState<'intro' | 'dashboard'>('intro');
  const [selectedDay, setSelectedDay] = useState<DayDetails | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Atualiza o relógio interno a cada minuto para verificar desbloqueios em tempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const totalDays = CHALLENGE_DAYS.length;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);
  const isComplete = completedDays.length === totalDays;

  const toggleDayCompletion = (dayId: number) => {
    const alreadyCompleted = completedDays.find(p => p.day === dayId);
    
    if (alreadyCompleted) {
      // Regra: Não permitimos reabrir se violar a lógica de tempo sequencial futura, 
      // mas para simplificar, apenas removemos e o timestamp de desbloqueio do próximo será resetado.
      onUpdateProgress(completedDays.filter(p => p.day !== dayId));
    } else {
      // Adiciona nova conclusão com timestamp atual
      const newCompletion: ChallengeDayProgress = {
        day: dayId,
        completedAt: Date.now()
      };
      onUpdateProgress([...completedDays, newCompletion].sort((a, b) => a.day - b.day));
    }
  };

  const handleStart = () => {
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDayCompleted = (id: number) => completedDays.some(p => p.day === id);

  const getDayStatus = (dayId: number) => {
    const completed = isDayCompleted(dayId);
    if (completed) return { isLocked: false, isCompleted: true, isNext: false, timeRemaining: null };

    // Se é o dia 1 e não está completo, está sempre disponível.
    if (dayId === 1) return { isLocked: false, isCompleted: false, isNext: true, timeRemaining: null };

    // Para os demais dias, checamos o anterior
    const prevDay = completedDays.find(p => p.day === dayId - 1);
    if (!prevDay) return { isLocked: true, isCompleted: false, isNext: false, timeRemaining: null };

    // Checagem de 24h
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const timeSincePrev = currentTime - prevDay.completedAt;
    const isUnlocked = timeSincePrev >= TWENTY_FOUR_HOURS;

    if (isUnlocked) {
      return { isLocked: false, isCompleted: false, isNext: true, timeRemaining: null };
    } else {
      const remaining = TWENTY_FOUR_HOURS - timeSincePrev;
      return { isLocked: true, isCompleted: false, isNext: false, timeRemaining: remaining };
    }
  };

  const formatRemainingTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (view === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center animate-in fade-in duration-1000 bg-[#050507] overflow-hidden relative p-6">
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-purple-600/[0.04] blur-[150px] rounded-full" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.08),transparent_70%)]" />
        </div>

        <div className="max-w-4xl w-full space-y-12 text-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl mx-auto">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] italic">Protocolo_Elite_Oito_Dias</span>
            </div>
            
            <h1 className="text-[48px] md:text-[84px] font-black text-white tracking-tighter leading-none italic uppercase">
              DESAFIO <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">8D SaaS.</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic opacity-80">
              Transforme sua visão em execução real. Construa <span className="text-white">8 aplicações completas em 8 dias</span> e desbloqueie seu certificado de materialização soberana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {[
              { label: '8 Dias de Foco', desc: '1 Materialização por dia' },
              { label: 'Execução Real', desc: 'SaaS prontos para o mercado' },
              { label: 'Reconhecimento', desc: 'Certificado Digital Elite' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-3 backdrop-blur-sm">
                <h4 className="text-[11px] font-black text-purple-400 uppercase tracking-widest">{item.label}</h4>
                <p className="text-sm text-gray-500 font-bold italic">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-10">
            <button 
              onClick={handleStart}
              className="group relative px-16 py-7 bg-white text-black rounded-[28px] font-black text-[14px] uppercase tracking-[0.5em] italic shadow-[0_30px_60px_-10px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-700 overflow-hidden flex items-center justify-center gap-6 mx-auto"
            >
              <span>{completedDays.length > 0 ? 'Retomar Desafio' : 'Iniciar Desafio'}</span>
              <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto w-full space-y-12 animate-in fade-in duration-1000 pb-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-12">
        <div className="space-y-6">
          <button 
            onClick={() => setView('intro')}
            className="flex items-center gap-3 text-gray-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] font-mono italic group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Protocolo_Início
          </button>
          
          <div className="space-y-2">
            <h2 className="text-6xl font-black text-white tracking-tighter italic uppercase">Desafio <span className="text-purple-500">8D</span></h2>
            <p className="text-slate-500 text-lg font-medium italic">Seu progresso rumo à soberania técnica em 8 materializações reais.</p>
          </div>
        </div>

        <div className="w-full lg:w-[400px] space-y-5 bg-[#0F0F12] border border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[50px] pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Dia {completedDays.length} de {totalDays} Concluídos</span>
            </div>
            <span className="text-2xl font-black text-white italic">{progressPercent}%</span>
          </div>
          
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative z-10 p-[1px]">
             <div 
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_#A855F7]" 
              style={{ width: `${progressPercent}%` }}
             />
          </div>

          {isComplete && (
            <div className="flex items-center gap-3 text-emerald-400 pt-1 animate-in zoom-in-95 duration-500">
               <ShieldCheck size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Protocolo 100% Sincronizado</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHALLENGE_DAYS.map((day) => {
          const status = getDayStatus(day.id);
          const { isCompleted, isNext, isLocked, timeRemaining } = status;

          return (
            <div 
              key={day.id}
              onClick={() => !isLocked && setSelectedDay(day)}
              className={`group relative h-[320px] rounded-[48px] border transition-all duration-700 p-10 flex flex-col overflow-hidden cursor-pointer ${
                isCompleted 
                ? 'bg-emerald-500/[0.02] border-emerald-500/20' 
                : isNext 
                  ? 'bg-purple-600/[0.03] border-purple-500/40 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] scale-[1.02] ring-1 ring-white/10' 
                  : isLocked 
                    ? 'bg-white/[0.01] border-white/5 opacity-40 grayscale cursor-not-allowed'
                    : 'bg-white/[0.01] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between relative z-10 mb-6">
                <div className="space-y-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] font-mono ${isCompleted ? 'text-emerald-500' : isNext ? 'text-purple-400' : 'text-gray-600'}`}>DIA_0{day.id}</span>
                  <h3 className="text-xl font-black text-white tracking-tight leading-none italic uppercase">{day.title}</h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shrink-0 ${
                  isCompleted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-white/5 border-white/10 text-gray-700 group-hover:text-white'
                }`}>
                  {isCompleted ? <CheckCircle2 size={24} /> : isLocked ? <Lock size={20} /> : day.icon}
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-xs text-gray-500 font-medium leading-relaxed italic line-clamp-3">{day.description}</p>
                {isLocked && timeRemaining && (
                  <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-purple-400/60 uppercase tracking-widest bg-purple-500/5 px-3 py-1.5 rounded-lg border border-purple-500/10 w-fit">
                    <Clock size={12} className="animate-pulse" />
                    Libera em {formatRemainingTime(timeRemaining)}
                  </div>
                )}
              </div>

              <div className="mt-auto relative z-10 pt-4 flex items-center justify-between border-t border-white/5">
                <span className={`text-[9px] font-black uppercase tracking-widest ${isCompleted ? 'text-emerald-500' : isNext ? 'text-purple-400 animate-pulse' : 'text-gray-700'}`}>
                  {isCompleted ? 'CONCLUÍDO_SYNC' : isNext ? 'EM_ANDAMENTO' : 'BLOQUEADO'}
                </span>
                {!isLocked && <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isCompleted ? 'text-emerald-500' : 'text-gray-700'}`} />}
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]" />
            </div>
          );
        })}
      </div>

      <div className={`relative rounded-[56px] border p-12 lg:p-20 overflow-hidden transition-all duration-1000 ${
        isComplete 
        ? 'bg-[#0A0A0C] border-purple-500/40 shadow-[0_50px_100px_-20px_rgba(124,58,237,0.3)]' 
        : 'bg-white/[0.01] border-white/5'
      }`}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600 blur-[150px] rounded-full" />
           {isComplete && <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500 blur-[150px] rounded-full" />}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="space-y-8 text-center lg:text-left flex-1">
             <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-2xl">
                <Trophy size={16} className={isComplete ? 'text-yellow-400' : 'text-gray-600'} />
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] italic ${isComplete ? 'text-white' : 'text-gray-700'}`}>Recompensa Final</span>
             </div>
             <div className="space-y-4">
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase">Certificado <br /><span className={isComplete ? 'text-purple-500' : 'text-white/10'}>Digital Elite</span></h3>
                <p className="text-slate-500 text-lg font-medium italic max-w-xl mx-auto lg:mx-0">
                  {isComplete 
                    ? "Parabéns, Estrategista. Sua jornada de 8 dias foi concluída. Sua credencial soberana está disponível para download." 
                    : "Conclua as 8 materializações para autenticar seu domínio sobre o ecossistema Nexbuild."}
                </p>
             </div>
             
             {isComplete ? (
               <a 
                 href="https://www.contate.me/certificadonex"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-5 bg-white text-black px-12 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.4em] italic shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden relative w-fit"
               >
                  <Download size={20} strokeWidth={3} />
                  <span>Receber Certificado</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
               </a>
             ) : (
               <div className="flex items-center gap-3 text-gray-700">
                  <Lock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocolo Bloqueado ({completedDays.length}/8)</span>
               </div>
             )}
          </div>

          <div className="relative shrink-0 perspective-[2000px]">
             <div className={`w-[320px] h-[450px] md:w-[400px] md:h-[560px] rounded-[40px] border-4 border-white/5 bg-[#050507] shadow-2xl transition-all duration-1000 rotate-y-[-12deg] flex flex-col p-10 lg:p-14 text-center justify-between relative group overflow-hidden ${!isComplete && 'opacity-20 grayscale'}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_70%)] pointer-events-none z-0" />
                
                <div className="relative z-10 flex flex-col items-center gap-8">
                   <div className="w-20 h-20 rounded-full border-2 border-purple-500/30 flex items-center justify-center bg-purple-500/5 group-hover:scale-110 transition-transform">
                      <Award size={40} className="text-purple-500" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] italic">Certificado de Materialização</h4>
                      <p className="text-white font-serif text-3xl italic tracking-tight font-light border-y border-white/5 py-4">Certificado de Conclusão Oficial</p>
                   </div>
                </div>

                <div className="relative z-10 space-y-1">
                   <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-4" />
                   <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Digital Auth Code</p>
                   <p className="text-[10px] font-mono text-white/40">{Math.random().toString(36).substring(2, 12).toUpperCase()}</p>
                </div>
                
                {!isComplete && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[40px] z-20">
                     <Lock size={48} className="text-white/20" />
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {selectedDay && (
        <div className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-8 animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-[#0A0A0E] border border-white/10 rounded-[48px] p-10 lg:p-16 space-y-12 shadow-[0_50px_150px_-30px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-8 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isDayCompleted(selectedDay.id) ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-purple-600/10 border-purple-500/20 text-purple-400'}`}>
                       {selectedDay.icon}
                    </div>
                    <div>
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-mono">Protocolo_Dia_0{selectedDay.id}</span>
                       <h3 className="text-3xl font-black text-white tracking-tight italic uppercase">{selectedDay.title}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedDay(null)} className="text-gray-500 hover:text-white transition-colors ml-12 shrink-0">
                    <X size={24} />
                 </button>
              </div>

              <div className="space-y-10 relative z-10">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Target size={16} className="text-purple-500" />
                       <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Objetivo_Material</h4>
                    </div>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed italic">{selectedDay.description}</p>
                 </div>

                 <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 text-gray-500">
                       <span className="text-[10px] font-black uppercase tracking-widest">Instruções Técnicas</span>
                       <Info size={14} />
                    </div>
                    <p className="text-white text-[15px] font-medium leading-relaxed italic">{selectedDay.task}</p>
                 </div>
              </div>

              <div className="pt-6 relative z-10 flex gap-4">
                 <button 
                  onClick={() => { toggleDayCompletion(selectedDay.id); setSelectedDay(null); }}
                  className={`flex-1 py-5 rounded-[26px] font-black text-[12px] uppercase tracking-[0.4em] italic transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl ${
                    isDayCompleted(selectedDay.id)
                    ? 'bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'bg-white text-black hover:scale-[1.02] active:scale-95'
                  }`}
                 >
                    {isDayCompleted(selectedDay.id) ? (
                      <>Reabrir_Fase</>
                    ) : (
                      <>
                        <CheckCircle2 size={18} strokeWidth={3} />
                        Marcar como Concluído
                      </>
                    )}
                 </button>
                 <button onClick={() => setSelectedDay(null)} className="px-10 py-5 bg-white/5 border border-white/10 rounded-[26px] font-black text-[11px] text-gray-500 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all italic">Fechar</button>
              </div>
           </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-8 pt-12 opacity-30">
        <Zap size={14} className="text-purple-400 animate-pulse" />
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-[1.2em] italic font-mono">Nexbuild_8D_Challenge_Sync_Active</span>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .rotate-y-[-12deg] { transform: rotateY(-12deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default Challenge8D;