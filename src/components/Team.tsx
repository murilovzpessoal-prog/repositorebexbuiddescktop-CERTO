import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  X,
  Check,
  Trash2,
  ShieldCheck,
  Sparkles,
  Zap,
  ChevronRight,
  Edit3,
  Ticket,
  Link as LinkIcon,
  Copy,
  ArrowLeft,
  DollarSign,
  Gift,
  BarChart3,
  UserCheck2,
  Users2,
  Activity,
  Star,
  Shield,
  ArrowRight,
  Share2,
  Command,
  MousePointer2,
  FileCode,
  Network,
  Cpu,
  Key,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { TeamMember } from '../App';

interface PromoPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
  isLifetime: boolean;
  buttonText: string;
}

const PROMO_PLANS: PromoPlan[] = [
  {
    id: 'p1',
    title: "PLANO MENSAL",
    description: "A porta de entrada ideal para quem busca resultados imediatos e flexibilidade total.",
    price: "147",
    features: [
      "Gerador de SaaS Premium",
      "Suporte exclusivo",
      "Prospecção Inteligente",
      "Aulas exclusivas"
    ],
    isPopular: false,
    isLifetime: false,
    buttonText: "Gerar Link"
  },
  {
    id: 'p2',
    title: "PLANO VITALÍCIO",
    description: "A escolha definitiva. Um único investimento para garantir sua presença eterna na elite.",
    price: "297",
    features: [
      "Gerador de SaaS Premium",
      "Suporte exclusivo",
      "Prospecção Inteligente",
      "Aulas exclusivas",
      "Acesso vitalício"
    ],
    isPopular: true,
    isLifetime: true,
    buttonText: "Gerar Link"
  }
];

const PricingCard: React.FC<{
  plan: PromoPlan;
  onGenerate: (p: PromoPlan) => void;
}> = ({ plan, onGenerate }) => {
  return (
    <div className={`relative flex flex-col p-12 rounded-[2.5rem] transition-all duration-700 hover:translate-y-[-8px] group overflow-hidden h-full ${plan.isPopular
        ? 'bg-[#0F0F12]/80 border border-purple-500/20 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.7)]'
        : 'bg-[#0F0F12]/40 border border-white/5 backdrop-blur-xl'
      }`}>
      {/* Glossy Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {plan.isPopular && (
        <div className="absolute -right-14 top-8 rotate-45 bg-purple-600 text-white text-[9px] font-black px-16 py-1.5 shadow-2xl z-20 tracking-widest uppercase italic">
          PREMIUM
        </div>
      )}

      <div className="relative z-10 mb-10">
        <div className="flex items-center gap-2.5 mb-6">
          <div className={`w-2 h-2 rounded-full ${plan.isPopular ? 'bg-purple-500' : 'bg-zinc-700'}`} />
          <h3 className="text-[11px] uppercase tracking-[0.35em] font-black text-zinc-500 italic font-mono">{plan.title}</h3>
        </div>

        <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-medium max-w-[280px] italic">
          {plan.description}
        </p>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-zinc-600">R$</span>
          <span className="text-7xl font-bold text-white tracking-tighter leading-none">
            {plan.price}
          </span>
          <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] italic ml-1">
            {plan.isLifetime ? 'ACESSO ÚNICO' : '/ POR MÊS'}
          </span>
        </div>
      </div>

      <div className="relative z-10 space-y-5 mb-14 flex-1">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${plan.isPopular ? 'border-purple-500/30 bg-purple-500/5' : 'border-zinc-800 bg-zinc-900/30'
              }`}>
              <Check className={`w-3 h-3 ${plan.isPopular ? 'text-purple-400' : 'text-zinc-700'}`} />
            </div>
            <span className="text-[14px] font-bold tracking-tight italic">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onGenerate(plan)}
        className={`relative z-10 w-full py-6 rounded-2xl font-black transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden group/btn shadow-2xl ${plan.isPopular
            ? 'bg-white text-black hover:bg-white/90'
            : 'bg-[#16161A] border border-white/5 text-white hover:bg-[#1E1E24] hover:border-white/10'
          }`}
      >
        <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.25em] text-[11px] italic">
          {plan.buttonText}
          <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform ${plan.isPopular ? 'text-black' : 'text-white'}`} />
        </span>

        {/* Reflection sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </button>
    </div>
  );
};

interface TeamProps {
  members: TeamMember[];
  onUpdateMembers: (newTeam: TeamMember[]) => void;
}

const Team: React.FC<TeamProps> = ({ members, onUpdateMembers }) => {
  const [view, setView] = useState<'list' | 'promos'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [generatedLink, setGeneratedLink] = useState<{ planId: string; url: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const blurEmail = (email: string) => {
    if (!email.includes('@')) return email;
    const [user, domain] = email.split('@');
    if (user.length <= 3) return `***@${domain}`;
    return `${user.substring(0, 3)}****@${domain}`;
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Ativo'
    };
    onUpdateMembers([...members, newMember]);
    setFormData({ name: '', email: '', role: '' });
    setIsAddModalOpen(false);
  };

  const handleGenerateLink = (plan: PromoPlan) => {
    let url = '';
    // Lógica personalizada baseada no ID do plano
    if (plan.id === 'p1') {
      url = 'https://pay.cakto.com.br/hnktu4g';
    } else if (plan.id === 'p2') {
      url = 'https://pay.cakto.com.br/3ekn3j2_729847';
    } else {
      const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
      url = `https://nexbuild.ai/invite/${randomHash}?plan=${plan.id}`;
    }

    setGeneratedLink({ planId: plan.id, url });

    // Auto-scroll suave para o resultado, garantindo que o topo da página permaneça visível
    setTimeout(() => {
      const el = document.getElementById('link-result');
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink.url);
    setIsCopied(false);
    setTimeout(() => setIsCopied(true), 10);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const removeMember = (id: string) => {
    onUpdateMembers(members.filter(m => m.id !== id));
    setSelectedMember(null);
  };

  const labelStyle = "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block";
  const inputStyle = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-800";

  // --- VIEW: LINKS PROMOCIONAIS ---
  if (view === 'promos') {
    return (
      <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-700 pb-40 max-w-6xl mx-auto w-full px-4 relative overflow-visible">

        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-70">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-purple-900/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[60%] bg-blue-900/10 blur-[180px] rounded-full" />
        </div>

        {/* 1. TOP BAR */}
        <div className="flex items-center justify-between pt-10 mb-16 border-b border-white/5 pb-8">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-3 text-[11px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.4em] transition-all group italic font-mono"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            // VOLTAR_TERMINAL
          </button>

          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md">
            <Zap size={12} className="text-purple-500 fill-purple-500" />
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest italic">Acesso Master Ativo</span>
          </div>
        </div>

        {/* 2. REORGANIZED HERO SECTION (HIGHLIGHTING PROMO LINKS) */}
        <div className="flex flex-col items-start space-y-6 mb-20">
          <div className="space-y-4 w-full">
            <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic uppercase font-['Montserrat'] antialiased">
                Links Promocionais
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-purple-500/40" />
              <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.6em] italic font-mono animate-pulse">
                Convites com acesso promocional_
              </p>
            </div>
          </div>

          <p className="text-slate-500 text-lg md:text-xl font-medium italic opacity-60 max-w-2xl leading-relaxed mt-6">
            Gere um link com valor reduzido para convidar amigos, parceiros ou familiares para usar o software.
          </p>
        </div>

        {/* 3. PROTOCOLO DE OPERAÇÃO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto w-full">
          {[
            { step: "01", icon: <MousePointer2 size={16} />, title: "Selecione", desc: "Escolha o plano ideal abaixo." },
            { step: "02", icon: <FileCode size={16} />, title: "Gere o Link", desc: "Crie o convite personalizado agora" },
            { step: "03", icon: <Share2 size={16} />, title: "Compartilhe", desc: "Envie para quem deseja convidar." },
            { step: "04", icon: <Zap size={16} />, title: "Acesso Ativo", desc: "O convite ativa instantaneamente." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-5 hover:border-purple-500/20 transition-all group text-center md:text-left relative">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest font-mono italic">Protocol_{item.step}</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm uppercase italic tracking-tight">{item.title}</h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed italic">{item.desc}</p>
              </div>
              {idx < 3 && <ChevronRight className="absolute -right-3 top-1/2 -translate-y-1/2 text-white/5 hidden md:block" size={24} />}
            </div>
          ))}
        </div>

        {/* 4. THE PRICING CARDS */}
        <main className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch w-full relative z-10">
          {PROMO_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onGenerate={handleGenerateLink} />
          ))}
        </main>

        {/* 5. SOPHISTICATED LINK RESULT */}
        {generatedLink && (
          <div id="link-result" className="animate-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto w-full z-20 mt-16">
            <div className="bg-[#0A0A0C]/90 backdrop-blur-2xl border border-purple-500/30 rounded-[2.5rem] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <Key size={22} strokeWidth={2} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-[11px] uppercase tracking-[0.35em] font-black text-zinc-500 italic font-mono">CREDENTIAL</h3>
                  <p className="text-zinc-500 text-sm font-medium italic opacity-85">Token de acesso materializado com sucesso.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/50 border border-white/5 rounded-2xl pl-6 pr-2 py-2 w-full md:w-auto hover:border-purple-500/30 transition-all shadow-inner">
                <span className="text-[11px] md:text-[13px] font-mono text-purple-400/80 truncate max-w-[160px] md:max-w-[260px] tracking-tight">{generatedLink.url}</span>
                <button
                  onClick={handleCopyLink}
                  className="shrink-0 flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em] bg-purple-600 px-6 py-3.5 rounded-xl hover:bg-purple-500 transition-all shadow-lg active:scale-95 italic group/copy"
                >
                  {isCopied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={3} className="group-hover/copy:rotate-12 transition-transform" />}
                  <span>{isCopied ? 'Sincronizado' : 'Copiar Token'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. AUTHORITY FOOTER */}
        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 pb-20 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050507] bg-zinc-800 shadow-2xl overflow-hidden group hover:z-30 transition-all">
                  <img src={`https://i.pravatar.cc/100?img=${i + 42}`} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="avatar" />
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-xs font-bold italic tracking-tight">
              Protocolo validado por mais de <span className="text-white underline decoration-purple-500/50">1.200 membros</span> ativos_
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-zinc-600">
              <Shield size={16} className="text-purple-500/40" />
              <span className="text-[9px] font-black uppercase tracking-widest italic">Criptografia Ativa</span>
            </div>
            <div className="h-6 w-[1px] bg-white/5" />
            <div className="flex gap-8 grayscale opacity-40 contrast-150">
              <span className="text-[10px] font-black tracking-tighter text-white font-mono uppercase">Visa</span>
              <span className="text-[10px] font-black tracking-tighter text-white font-mono uppercase">Pix</span>
              <span className="text-[10px] font-black tracking-tighter text-white font-mono uppercase">Apple_Pay</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // --- VIEW: LISTA DE EQUIPE ---
  return (
    <div className="flex-1 flex flex-col space-y-12 animate-in fade-in duration-700 pb-32 max-w-6xl mx-auto w-full px-4">

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-12 border-b border-white/5 pb-24 pt-10 overflow-visible">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/5 blur-[100px] -z-10 pointer-events-none" />

        <div className="space-y-10 flex-1">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg w-fit">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#A855F7]" />
            <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest italic">PAINEL DA EQUIPE</span>
          </div>
          <div className="space-y-4">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none italic uppercase">
                Equipe
              </h2>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-purple-500/30 rounded-full blur-[1px]" />
            </div>
            <p className="text-slate-500 text-lg font-medium italic opacity-60 max-w-xl leading-relaxed">
              Gerencie, acompanhe e expanda sua equipe dentro do software.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 lg:pt-16">
          <button
            onClick={() => setView('promos')}
            className="flex items-center gap-2.5 bg-white/[0.03] border border-white/10 text-gray-300 px-6 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all italic shadow-xl group"
          >
            <Ticket size={16} className="group-hover:rotate-12 transition-transform text-emerald-500" />
            <span>Links Promocionais</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-4 bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all italic group"
          >
            <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
            <span>Adicionar membro</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Users2 size={20} />, label: "Total de Membros", val: members.length, color: "text-blue-400", bg: "bg-blue-500/5" },
          { icon: <UserCheck2 size={20} />, label: "Membros Ativos", val: members.filter(m => m.status === 'Ativo').length, color: "text-emerald-400", bg: "bg-emerald-500/5" },
          { icon: <Gift size={20} />, label: "Links Ativos", val: "03", color: "text-purple-400", bg: "bg-purple-500/5" },
          { icon: <BarChart3 size={20} />, label: "Crescimento Equipe", val: "+24%", color: "text-indigo-400", bg: "bg-indigo-500/5" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col space-y-4 hover:border-white/10 transition-all group">
            <div className={`w-10 h-10 rounded-xl ${item.bg} border border-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div>
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{item.label}</h4>
              <p className="text-white text-2xl font-black italic tracking-tight">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between px-6 py-2">
          <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] font-mono italic">Base_Colaboradores_Sincronizada</h3>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-emerald-500" />
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Real-time update</span>
          </div>
        </div>

        {members.map((member, mIdx) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="group flex flex-col lg:flex-row lg:items-center justify-between bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 md:p-8 hover:border-purple-500/30 transition-all duration-500 cursor-pointer shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-6 flex-1 min-w-0 relative z-10">
              <div className="w-16 h-16 rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-purple-500/40 group-hover:scale-105 transition-all shrink-0 overflow-hidden shadow-2xl">
                {member.avatar ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-2xl font-black uppercase text-white/20">{member.name[0]}</span>}
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-12 flex-1 min-w-0">
                <div className="min-w-[220px]">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-bold text-xl tracking-tight uppercase truncate">{member.name}</h4>
                    <div className={`px-2 py-0.5 rounded-md border text-[8px] font-black uppercase tracking-widest ${member.status === 'Ativo' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                      {member.status}
                    </div>
                  </div>
                  <p className="text-gray-600 font-mono text-xs tracking-wider group-hover:text-gray-400 transition-colors mt-1">
                    {blurEmail(member.email)}
                  </p>
                </div>

                <div className="hidden xl:flex flex-col gap-2 w-48 ml-auto mr-12">
                  <div className="flex items-center justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    <span>Participação</span>
                    <span className="text-purple-400 italic">{(80 + (mIdx * 3)) % 100}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 shadow-[0_0_10px_#A855F7] transition-all duration-1000"
                      style={{ width: `${(80 + (mIdx * 3)) % 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10 shrink-0 mt-6 lg:mt-0 pl-22 lg:pl-0 relative z-10">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1">Função_Operacional</span>
                <span className="text-[11px] font-black text-white/50 uppercase italic tracking-tighter group-hover:text-white transition-colors">{member.role}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-700 hover:text-white hover:border-white/20 transition-all">
                  <Edit3 size={16} />
                </button>
                <ChevronRight size={20} className="text-gray-800 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-white/5 rounded-[48px] opacity-40 group hover:opacity-100 hover:border-white/10 transition-all cursor-pointer" onClick={() => setIsAddModalOpen(true)}>
            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-700 group-hover:scale-110 transition-transform">
              <Users2 size={42} strokeWidth={1} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-500 italic">Sua_Equipe_Está_Vazia</p>
            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">Protocolo Adicionar Membro</button>
          </div>
        )}
      </div>

      {/* --- ADD MEMBER MODAL RESTORED --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#0A0A0C] border border-white/10 rounded-[32px] w-full max-w-lg p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">Adicionar Membro</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-6">
              <div className="space-y-1">
                <label className={labelStyle}>Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do colaborador"
                  className={inputStyle}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>E-mail Profissional</label>
                <input
                  type="email"
                  required
                  placeholder="colaborador@email.com"
                  className={inputStyle}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>Função Operacional</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Designer, Desenvolvedor"
                  className={inputStyle}
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-5 rounded-[20px] bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <Zap size={16} fill="black" />
                  Materializar Membro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Visual Sync */}
      <div className="flex items-center justify-center gap-10 pt-20 opacity-30 pb-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-[1em] italic font-mono">Nexbuild_Talent_OS_v5.2</span>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex items-center gap-3">
          <Zap size={14} className="text-purple-400 animate-pulse" />
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-[1em] italic font-mono">Secure_Team_Sync</span>
        </div>
      </div>
    </div>
  );
};

export default Team;