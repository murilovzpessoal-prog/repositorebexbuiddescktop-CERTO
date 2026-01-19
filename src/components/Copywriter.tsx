import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  MessageSquare,
  Smartphone,
  ChevronDown,
  Instagram,
  Linkedin,
  Mail,
  Send,
  Phone,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Plus,
  MoreVertical,
  Clock,
  User,
  Target,
  Sparkles,
  Command,
  Terminal,
  Paperclip,
  Smile,
  Mic,
  Camera as CameraIcon,
  Image as ImageIcon,
  Heart,
  Trash2,
  ArrowRightLeft,
  X,
  LayoutGrid,
  Type as FontIcon,
  Palette,
  Settings,
  Rocket,
  Edit3,
  Cpu,
  Bookmark,
  Share2,
  ShieldCheck,
  Check
} from 'lucide-react';
import CopyResult from './CopyResult';
import { supabase } from '../lib/supabase';
import { generateProfessionalCopy, generateFollowUpCopy } from '../lib/intelligence';

interface Lead {
  id: string;
  businessName: string;
  ownerName: string;
  initials: string;
  avatarBg: string;
  channel: 'whatsapp' | 'instagram' | 'linkedin' | 'email';
  status: 'prospecção' | 'qualificação' | 'negociação' | 'fechado';
  lastInter: string;
  lastMessage: string;
  hasMessage?: boolean;
}

interface CopywriterProps {
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
}

const Copywriter: React.FC<CopywriterProps> = ({ leads, onUpdateLeads }) => {
  const [view, setView] = useState<'new' | 'leads' | 'result'>('new');
  const [activeFollowUp, setActiveFollowUp] = useState<Lead | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isEditingScript, setIsEditingScript] = useState(false);
  const [scriptContent, setScriptContent] = useState('');
  const scriptTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [form, setForm] = useState({
    userName: '',
    targetBusiness: '',
    targetPerson: '',
    marketSegment: '',
    customSegment: '',
    channel: 'whatsapp' as Lead['channel'],
    hook: '',
    pain: '',
    solution: '',
    promise: ''
  });

  const channels = [
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={18} /> },
    { id: 'instagram', label: 'Instagram', icon: <Instagram size={18} /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={18} /> },
    { id: 'email', label: 'Email', icon: <Mail size={18} /> }
  ];

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMaterialize = async () => {
    setIsGenerating(true);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
      }
    }, 40);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Fetch history for evolutionary context
      const { data: history } = user ? await supabase
        .from('generation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5) : { data: [] };

      const generatedContent = generateProfessionalCopy(form, { history: history || [] });

      setForm(prev => ({ ...prev, generatedContent } as any));

      if (user) {
        await supabase.from('generation_history').insert({
          user_id: user.id,
          type: 'copy',
          inputs: form,
          generated_content: generatedContent,
          metadata: { channel: form.channel }
        });
      }

      const newLead: Lead = {
        id: Date.now().toString(),
        businessName: form.targetBusiness || 'Nova Empresa',
        ownerName: form.targetPerson || 'Responsável',
        initials: (form.targetPerson || 'N')[0].toUpperCase(),
        avatarBg: 'bg-purple-500/20 text-purple-400',
        channel: form.channel,
        status: 'prospecção',
        lastInter: 'Agora',
        lastMessage: `Abordagem de ${form.solution || 'Serviço'}`
      };

      onUpdateLeads([newLead, ...leads]);
      setIsGenerating(false);
      setView('result');
    } catch (error) {
      console.error('Error materializing copy:', error);
      setIsGenerating(false);
    }
  };

  const handleOpenFollowUp = (lead: Lead) => {
    setIsGenerating(true);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveFollowUp(lead);
          const generatedContent = generateFollowUpCopy(lead);
          setScriptContent(generatedContent);
          setIsEditingScript(false);
          setIsGenerating(false);
        }, 300);
      }
    }, 30);
  };

  const toggleEditScript = () => {
    const nextEditingState = !isEditingScript;
    setIsEditingScript(nextEditingState);
    if (nextEditingState) {
      setTimeout(() => {
        if (scriptTextareaRef.current) {
          scriptTextareaRef.current.focus();
        }
      }, 50);
    }
  };

  const moveLead = (id: string, newStatus: Lead['status']) => {
    onUpdateLeads(leads.map(l => l.id === id ? { ...l, status: newStatus, lastInter: 'Agora' } : l));
  };

  const deleteLead = (id: string) => {
    onUpdateLeads(leads.filter(l => l.id !== id));
  };

  const labelStyle = "text-[10px] font-mono font-medium text-slate-400/80 tracking-[0.2em] uppercase antialiased mb-3 block";
  const inputStyle = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-7 py-5 text-white text-[15px] font-medium tracking-tight focus:outline-none focus:border-purple-500/30 transition-all shadow-inner placeholder:text-slate-800";

  const getFollowUpText = (lead: Lead) => {
    switch (lead.status) {
      case 'prospecção': return 'Diagnóstico IA';
      case 'qualificação': return 'Argumentos de Fechamento';
      case 'negociação': return 'Ajustar Proposta';
      case 'fechado': return 'Protocolo Onboarding';
      default: return 'Materializar Ação';
    }
  };

  const renderPhoneContent = (previewMode = true, customLead?: Lead, customMessage?: string) => {
    const activeData = previewMode ? {
      person: form.targetPerson || 'Responsável',
      business: form.targetBusiness || 'Empresa',
      author: form.userName || 'Estrategista',
      channel: form.channel
    } : {
      person: customLead?.ownerName || form.targetPerson || 'Lead',
      business: customLead?.businessName || form.targetBusiness || 'Empresa',
      author: form.userName || 'Growth Expert',
      channel: customLead?.channel || form.channel
    };

    const fullMessage = customMessage || (view === 'result' ?
      `Olá, ${activeData.person}! ${form.hook} Percebi que ${form.pain}. Imagine se você tivesse um ${form.solution} que garantisse ${form.promise}? Podemos avançar?` :
      `Olá, ${activeData.person}! Iniciando protocolo de abordagem estratégica...`);

    switch (activeData.channel) {
      case 'whatsapp':
        return (
          <div className="flex flex-col h-full bg-[#0b141a] animate-in fade-in duration-300 relative">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }} />
            <div className="bg-[#075e54] pt-12 pb-4 px-6 flex items-center gap-3 shadow-2xl relative z-10 font-sans">
              <ChevronLeft size={20} className="text-white/70" />
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/10 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${activeData.person}&background=random&color=fff`} className="w-full h-full object-cover" alt="avatar" />
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="text-[14px] font-bold text-white truncate">{activeData.person}</h6>
                <p className="text-[9px] text-white/60 font-medium uppercase tracking-widest">online</p>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <Phone size={16} />
                <MoreVertical size={16} />
              </div>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar relative z-10">
              <div className="bg-[#056162] text-[#e9edef] p-3 rounded-xl rounded-tl-none max-w-[85%] text-xs shadow-md animate-in slide-in-from-left-2 font-sans leading-relaxed ml-2">
                {fullMessage}
                <div className="flex justify-end mt-1 items-center gap-1">
                  <span className="text-[9px] font-black text-white/40">12:30</span>
                  <Check size={10} className="text-blue-400" />
                </div>
              </div>
            </div>
            <div className="p-2 bg-[#1f2c33] flex items-center gap-3 mb-6 mx-3 rounded-full border border-white/5 relative z-10">
              <Smile size={20} className="text-gray-400 ml-2" />
              <div className="flex-1 text-[11px] text-gray-500 font-medium truncate">Mensagem</div>
              <Paperclip size={20} className="text-gray-400" />
              <CameraIcon size={20} className="text-gray-400 mr-1" />
              <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg shrink-0">
                <Mic size={18} />
              </div>
            </div>
          </div>
        );
      case 'instagram':
        return (
          <div className="flex flex-col h-full bg-black animate-in fade-in duration-300">
            <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4 bg-black/80 backdrop-blur-md">
              <ChevronLeft size={24} className="text-white" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                    <img src={`https://ui-avatars.com/api/?name=${activeData.person}&background=random`} className="w-full h-full object-cover" alt="avatar" />
                  </div>
                </div>
                <span className="text-[14px] font-bold text-white truncate">{activeData.person}</span>
              </div>
              <div className="flex gap-4"><Phone size={20} className="text-white" /><ImageIcon size={20} className="text-white" /></div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-end space-y-4">
              <div className="bg-[#262626] text-white p-4 rounded-[22px] max-w-[85%] text-sm self-start animate-in slide-in-from-left-4 font-sans border border-white/5">
                {fullMessage}
              </div>
              <div className="text-[10px] text-gray-500 ml-2">Visto agora há pouco</div>
            </div>
            <div className="p-3 flex items-center gap-4 border-t border-white/5 mb-6 mx-3 rounded-full bg-white/[0.05]">
              <div className="w-10 h-10 rounded-full bg-[#3797f0] flex items-center justify-center text-white shadow-lg"><CameraIcon size={20} /></div>
              <div className="flex-1 text-xs text-gray-400 font-medium">Escreva uma mensagem...</div>
              <Mic size={20} className="text-white" />
              <ImageIcon size={20} className="text-white" />
              <Heart size={20} className="text-white mr-2" />
            </div>
          </div>
        );
      case 'linkedin':
        return (
          <div className="flex flex-col h-full bg-[#f4f2ee] animate-in fade-in duration-300 text-black">
            <div className="bg-white pt-12 pb-4 px-6 flex items-center gap-4 shadow-sm border-b border-gray-200">
              <ChevronLeft size={24} className="text-gray-600" />
              <div className="w-10 h-10 bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center border border-gray-100">
                <img src={`https://ui-avatars.com/api/?name=${activeData.person}&background=0a66c2&color=fff`} className="w-full h-full object-cover" alt="avatar" />
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="text-[14px] font-bold text-black truncate">{activeData.person}</h6>
                <p className="text-[10px] text-gray-500 font-medium truncate">Founder @ {activeData.business}</p>
              </div>
              <MoreVertical size={20} className="text-gray-600" />
            </div>
            <div className="flex-1 p-6 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-white shadow-md">
                  <img src={`https://ui-avatars.com/api/?name=${activeData.person}&background=0a66c2&color=fff`} className="w-full h-full object-cover" alt="avatar" />
                </div>
                <h4 className="font-bold text-black">{activeData.person}</h4>
                <p className="text-xs text-gray-500">O {activeData.person} é uma conexão de 1º grau</p>
              </div>
              <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm text-[13px] leading-relaxed relative font-sans">
                <div className="absolute -top-3 left-6 px-2 bg-[#f4f2ee] text-[9px] text-gray-400 font-bold uppercase tracking-widest">Sincronizado</div>
                {fullMessage}
              </div>
            </div>
            <div className="bg-white p-4 border-t border-gray-200 mb-6 flex items-center gap-4 shadow-2xl">
              <Plus size={24} className="text-gray-500" />
              <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-xs text-gray-400 font-medium border border-gray-200">Escreva uma mensagem...</div>
              <div className="flex items-center gap-4 text-[#0a66c2]">
                <ImageIcon size={20} />
                <Send size={20} />
              </div>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="flex flex-col h-full bg-[#f8f9fa] animate-in fade-in duration-300 text-black">
            <div className="bg-white pt-12 pb-4 px-6 flex items-center gap-6 border-b border-gray-200 shadow-sm">
              <ChevronLeft size={24} className="text-gray-600" />
              <div className="flex gap-6 ml-auto items-center">
                <Bookmark size={20} className="text-gray-600" />
                <Trash2 size={20} className="text-gray-600" />
                <Mail size={20} className="text-gray-600" />
                <MoreVertical size={20} className="text-gray-600" />
              </div>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
              <h3 className="text-xl font-bold text-black tracking-tight border-b border-gray-100 pb-4">Assunto: Proposta Estratégica - {activeData.business}</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ea4335] flex items-center justify-center text-white font-bold text-lg">{activeData.person[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold truncate">{activeData.person} <span className="font-normal text-gray-400">&lt;contato@{activeData.business.toLowerCase().replace(/ /g, '')}.com&gt;</span></p>
                  <p className="text-[11px] text-gray-400 italic">para mim</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">14:55</span>
              </div>
              <div className="text-[14px] leading-relaxed text-gray-700 whitespace-pre-wrap font-sans bg-white p-6 rounded-2xl border border-gray-100 shadow-sm italic">
                {fullMessage}
              </div>
            </div>
            <div className="mt-auto p-4 bg-white border-t border-gray-100 flex gap-3 mb-6 mx-4 rounded-xl shadow-lg">
              <button className="flex-1 border border-gray-200 rounded-full flex items-center justify-center py-2.5 text-xs font-bold text-gray-600 gap-2 hover:bg-gray-50"><ArrowRightLeft size={14} /> Responder</button>
              <button className="flex-1 border border-gray-200 rounded-full flex items-center justify-center py-2.5 text-xs font-bold text-gray-600 gap-2 hover:bg-gray-50"><ChevronRight size={14} /> Encaminhar</button>
            </div>
          </div>
        );
      default: return <div className="flex items-center justify-center h-full text-xs text-gray-600 italic">Interface em sincronização...</div>;
    }
  };

  const renderKanbanColumn = (title: string, status: Lead['status'], color: string) => {
    const columnLeads = leads.filter(l => l.status === status);
    const nextStatusMap: Record<Lead['status'], Lead['status']> = {
      'prospecção': 'qualificação',
      'qualificação': 'negociação',
      'negociação': 'fechado',
      'fechado': 'fechado'
    };

    return (
      <div className="flex-1 min-w-0 flex flex-col space-y-6">
        <div className={`flex items-center justify-between p-4 bg-[#0F0F12]/80 backdrop-blur-xl border-b-2 ${color} rounded-t-[32px] border-x border-t border-white/5`}>
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] font-mono italic truncate">{title}</h4>
            <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-black text-gray-500 shrink-0">{columnLeads.length}</span>
          </div>
          <Target size={12} className="text-gray-700 shrink-0" />
        </div>

        <div className="space-y-4 flex-1 pb-10">
          {columnLeads.length === 0 ? (
            <div className="border border-dashed border-white/5 rounded-3xl h-40 flex items-center justify-center text-[10px] font-bold text-gray-800 uppercase tracking-widest italic">
              Nenhum lead nesta fase
            </div>
          ) : columnLeads.map(lead => (
            <div key={lead.id} className="bg-[#0F0F12]/60 backdrop-blur-md border border-white/5 rounded-[28px] p-5 space-y-5 hover:border-purple-500/40 transition-all group relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl ${lead.avatarBg} flex items-center justify-center font-bold text-base border border-white/5 shadow-xl shrink-0`}>
                    {lead.initials}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h5 className="text-[13px] font-black text-white italic truncate leading-none">{lead.businessName}</h5>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest truncate">{lead.ownerName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <button
                  onClick={() => handleOpenFollowUp(lead)}
                  className="w-full py-3 rounded-xl font-black text-[8px] uppercase tracking-[0.15em] bg-white/5 border border-white/10 text-white hover:bg-purple-600 hover:border-purple-500 transition-all flex items-center justify-center gap-2 italic"
                >
                  <Cpu size={12} className="animate-pulse" />
                  {getFollowUpText(lead)}
                </button>

                {status !== 'fechado' && (
                  <button
                    onClick={() => moveLead(lead.id, nextStatusMap[status])}
                    className="w-full py-2.5 rounded-xl font-black text-[8px] uppercase tracking-[0.15em] bg-white text-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Próxima Fase <ArrowRightLeft size={10} />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 relative z-10 opacity-30 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Clock size={10} />
                  <span className="text-[8px] font-black uppercase tracking-widest">{lead.lastInter}</span>
                </div>
                <button onClick={() => deleteLead(lead.id)} className="text-gray-700 hover:text-red-500 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center animate-in fade-in duration-1000 overflow-hidden font-['Inter']">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/[0.04] blur-[150px] rounded-full" />
      </div>

      {isGenerating && (
        <div className="fixed inset-0 z-[600] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8 animate-in fade-in duration-700">
          <div className="w-64 h-64 relative mb-12">
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center"><Rocket size={64} className="text-purple-500 animate-bounce" /></div>
          </div>
          <h3 className="text-2xl font-black text-white tracking-[0.8em] uppercase italic">Forjando Copy Elite</h3>
          <div className="w-[400px] h-1 bg-white/5 rounded-full mt-12 overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <div className="relative w-full max-w-[1400px] pt-6 px-6 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-full">
          <Command size={10} className="text-purple-500" />
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-mono">CRM_SOVEREIGN_v4.2</span>
        </div>
      </div>

      {activeFollowUp && (
        <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-xl flex items-center justify-center p-10 animate-in fade-in duration-300 overflow-y-auto">
          <div className="w-full max-w-7xl grid grid-cols-12 gap-16 items-center md:ml-[320px]">
            <div className="col-span-12 lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <button onClick={() => setActiveFollowUp(null)} className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"><ChevronLeft size={14} /> Voltar ao CRM</button>
                <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase">Análise de <span className="text-purple-500">Continuidade_</span></h2>
                <p className="text-slate-400 text-lg font-medium italic">IA forjando resposta para {activeFollowUp.ownerName} ({activeFollowUp.businessName}) no vetor {activeFollowUp.channel.toUpperCase()}.</p>
              </div>

              <div className="bg-[#0A0A0C] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest italic font-mono">Protocolo_{getFollowUpText(activeFollowUp).replace(' ', '_')}</span>
                  <div className="flex gap-4">
                    <button onClick={() => toggleEditScript()} className="text-[10px] font-black text-gray-500 uppercase hover:text-white flex items-center gap-2 transition-colors"><Edit3 size={14} /> {isEditingScript ? 'Finalizar Edição' : 'Editar Copy'}</button>
                    <button onClick={() => navigator.clipboard.writeText(scriptContent)} className="text-[10px] font-black text-purple-500 uppercase hover:text-purple-400 flex items-center gap-2 transition-colors"><Zap size={14} fill="currentColor" /> Copiar & Sincronizar</button>
                  </div>
                </div>
                <div className="p-10 min-h-[240px]">
                  {isEditingScript ? (
                    <textarea ref={scriptTextareaRef} className="w-full bg-transparent border-none focus:ring-0 text-white text-xl font-medium leading-relaxed italic h-60 resize-none no-scrollbar" value={scriptContent} onChange={(e) => setScriptContent(e.target.value)} />
                  ) : (
                    <p className="text-white text-xl font-medium leading-relaxed italic">{scriptContent}</p>
                  )}
                </div>
                <div className="p-6 bg-black/40 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Script Seguro e Validado</span>
                  </div>
                  <button onClick={() => setActiveFollowUp(null)} className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">Fechar Análise</button>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 flex justify-end perspective-[2000px] lg:pr-10">
              <div className="bg-[#1A1A1E] rounded-[64px] p-[10px] shadow-[60px_100px_150px_-30px_rgba(0,0,0,0.9)] relative ring-1 ring-white/10 rotate-y-[-12deg]">
                <div className="w-[320px] h-[650px] bg-[#010102] rounded-[54px] overflow-hidden flex flex-col relative border border-black shadow-inner ring-1 ring-white/5">
                  {renderPhoneContent(false, activeFollowUp, scriptContent)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view !== 'result' && (
        <div className="flex flex-col items-center pt-8 pb-10 w-full relative z-20 text-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl">
              <Sparkles size={12} className="text-purple-400" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] italic">Intelligence System & CRM</span>
            </div>

            <h2 className="text-[48px] md:text-[72px] font-black text-white tracking-tighter leading-[0.85] italic uppercase antialiased">
              {view === 'new' ? <>IA <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">Copywriter</span></> : <>Funil <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">Comercial</span></>}
            </h2>

            <p className="text-[#94A3B8] font-medium text-lg tracking-tight opacity-40 italic max-w-xl mx-auto">
              {view === 'new' ? 'Gere abordagens de alta conversão with precisão cirúrgica.' : 'Gerencie o ciclo de vida dos seus leads e escale seu fechamento.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={() => setView('new')} className={`group relative flex items-center gap-4 px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] transition-all border shadow-2xl ${view === 'new' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_20px_40px_rgba(124,58,237,0.3)] scale-105' : 'bg-white/[0.02] border-white/5 text-gray-600 hover:text-white hover:bg-white/5'}`}><Zap size={16} fill={view === 'new' ? "currentColor" : "none"} /><span>Nova Conversa</span></button>
            <button onClick={() => setView('leads')} className={`group relative flex items-center gap-4 px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] transition-all border shadow-2xl ${view === 'leads' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_20px_40px_rgba(124,58,237,0.3)] scale-105' : 'bg-white/[0.02] border-white/5 text-gray-600 hover:text-white hover:bg-white/5'}`}><Smartphone size={16} /><span>Meus Leads ({leads.length})</span></button>
          </div>
        </div>
      )}

      {view === 'new' ? (
        <div className="grid grid-cols-12 gap-12 max-w-[1500px] w-full px-10 pb-32 animate-in slide-in-from-bottom-6 duration-700">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <Terminal size={14} className="text-purple-400" /><span className="text-[10px] font-black text-purple-400 uppercase tracking-widest italic font-mono">TERMINAL_F01_ABORDAGEM</span>
            </div>

            <div className="bg-[#0A0A0C]/80 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8"><div className="w-1 h-6 bg-purple-600/80 rounded-full shadow-[0_0_12px_rgba(147,51,234,0.4)]" /><h3 className="text-xl font-semibold text-white/95 tracking-tight">Identidade Operacional</h3></div>
              <div className="space-y-8">
                <div className="space-y-2"><label className={labelStyle}>01 Seu Nome / Empresa Autora</label><input type="text" placeholder="Ex: João da Nexbuild" className={inputStyle} value={form.userName} onChange={(e) => updateField('userName', e.target.value)} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2"><label className={labelStyle}>02 Empresa do Alvo</label><input type="text" placeholder="Ex: Barbearia do Zé" className={inputStyle} value={form.targetBusiness} onChange={(e) => updateField('targetBusiness', e.target.value)} /></div>
                  <div className="space-y-2"><label className={labelStyle}>03 Nome do Tomador</label><input type="text" placeholder="Ex: José" className={inputStyle} value={form.targetPerson} onChange={(e) => updateField('targetPerson', e.target.value)} /></div>
                </div>
                <div className="space-y-6 pt-4">
                  <label className={labelStyle}>05 Vetor de Distribuição</label>
                  <div className="grid grid-cols-4 gap-4">
                    {channels.map((c) => (
                      <button key={c.id} onClick={() => updateField('channel', c.id as Lead['channel'])} className={`flex flex-col items-center justify-center py-6 rounded-3xl border transition-all space-y-3 ${form.channel === c.id ? 'bg-purple-600 border-purple-500 text-white shadow-xl scale-105' : 'bg-white/[0.02] border-white/5 text-gray-700 hover:border-white/10 hover:text-white'}`}>
                        <div className="transition-transform group-hover:scale-110">{c.icon}</div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0C]/80 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8"><div className="w-1 h-6 bg-purple-600/80 rounded-full shadow-[0_0_12px_rgba(147,51,234,0.4)]" /><h3 className="text-xl font-semibold text-white/95 tracking-tight">Análise de Dor & Solução</h3></div>
              <div className="space-y-10">
                <div className="space-y-2"><label className={labelStyle}>06 O Gancho</label><textarea placeholder="O que você notou na empresa?" className={`${inputStyle} min-h-[140px] resize-none leading-relaxed text-sm`} value={form.hook} onChange={(e) => updateField('hook', e.target.value)} /></div>
                <div className="space-y-2"><label className={labelStyle}>07 A Dor</label><textarea placeholder="Qual problema detectado?" className={`${inputStyle} min-h-[140px] resize-none leading-relaxed text-sm`} value={form.pain} onChange={(e) => updateField('pain', e.target.value)} /></div>
              </div>
              <div className="pt-10"><button onClick={handleMaterialize} disabled={isGenerating} className="w-full bg-white text-black py-6 rounded-[32px] font-black text-sm uppercase tracking-[0.4em] shadow-[0_30px_60px_-10px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-700 italic group relative overflow-hidden disabled:opacity-50"><div className="relative z-10 flex items-center justify-center gap-5"><Zap size={20} fill="black" strokeWidth={2.5} className={isGenerating ? 'animate-spin' : 'animate-pulse'} /><span>{isGenerating ? 'Processando_Protocolo...' : 'Materializar_Copy_Elite'}</span></div><div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" /></button></div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex justify-center perspective-[3000px] overflow-visible">
            <div className="sticky top-20">
              <div className="bg-[#1A1A1E] rounded-[74px] p-[12px] shadow-[100px_150px_200px_-50px_rgba(0,0,0,0.95)] relative ring-1 ring-white/10 group">
                <div className="w-[320px] h-[680px] bg-[#010102] rounded-[62px] overflow-hidden flex flex-col relative border border-black shadow-inner ring-1 ring-white/5">
                  {renderPhoneContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : view === 'leads' ? (
        <div className="w-full px-4 md:px-10 pb-40 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="max-w-full mx-auto overflow-hidden">
            <div className="flex gap-4 w-full">
              {renderKanbanColumn('Prospecção_Inicial', 'prospecção', 'border-indigo-500')}
              {renderKanbanColumn('Qualificação_Sync', 'qualificação', 'border-purple-500')}
              {renderKanbanColumn('Modo_Negociação', 'negociação', 'border-purple-500')}
              {renderKanbanColumn('Protocolo_Fechado', 'fechado', 'border-emerald-500')}
            </div>
          </div>
        </div>
      ) : (
        <CopyResult
          data={form}
          onBack={() => setView('new')}
          renderPhone={(previewMode, message) => renderPhoneContent(previewMode, undefined, message)}
          generatedContent={(form as any).generatedContent}
        />
      )}
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default Copywriter;