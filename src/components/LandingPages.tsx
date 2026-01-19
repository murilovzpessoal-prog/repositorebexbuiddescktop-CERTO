import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  Type,
  Layout,
  Palette,
  Smartphone,
  MousePointer2,
  Wifi,
  Battery,
  Users,
  Briefcase,
  ShieldCheck,
  Target,
  Type as FontIcon,
  Zap,
  Layers,
  Sparkles,
  Command,
  Pipette,
  Check,
  Flag,
  Globe2,
  Cpu as CpuIcon,
  MessageSquare,
  Settings,
  Heart,
  Monitor
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateProfessionalPrompt } from '../lib/intelligence';

interface LPTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  badge?: string;
  image: string;
}

const LP_TEMPLATES: LPTemplate[] = [
  {
    id: 'lp-001',
    title: 'LP produto digital',
    description: 'Arquitetura de alta conversão para lançamentos de infoprodutos, softwares e soluções digitais.',
    category: 'PRODUTO DIGITAL',
    badge: 'CONVERSÃO_MAX',
    image: 'https://i.imgur.com/tSOLjOr.png'
  },
  {
    id: 'lp-002',
    title: 'LP Serviço/Mentoria',
    description: 'Protocolo de autoridade absoluta para mentores e experts que desejam dominar o mercado digital.',
    category: 'MENTORIA',
    badge: 'ESTRATÉGICO',
    image: 'https://i.imgur.com/HoSBPlk.png'
  },
  {
    id: 'lp-003',
    title: 'LP Produto Físico',
    description: 'Design focado em demonstrar características de produtos tangíveis.',
    category: 'E-COMMERCE',
    badge: 'RETAIL_PRO',
    image: 'https://i.imgur.com/v4GAbPt.jpeg'
  },
  {
    id: 'lp-004',
    title: 'e-commerce completo',
    description: 'Plataforma robusta para vendas online com foco em catálogo de produtos e conversão direta.',
    category: 'SERVIÇOS',
    badge: 'VENDAS_ATIVO',
    image: 'https://i.imgur.com/0gBCAL1.jpeg'
  },
  {
    id: 'lp-005',
    title: 'Portfólio e Serviços',
    description: 'Layout elegante para profissionais liberais e agências demonstrarem seu trabalho e captarem novos clientes.',
    category: 'VAREJO LOCAL',
    badge: 'AUTORIDADE',
    image: 'https://i.imgur.com/qCpRdCA.jpeg'
  },
  {
    id: 'lp-006',
    title: 'Site Institucional',
    description: 'Presença digital sólida para empresas que buscam credibilidade, clareza e conexão com o público.',
    category: 'PÁGINA DE VENDAS',
    badge: 'CREDIBILIDADE',
    image: 'https://i.imgur.com/eWLbrr0.jpeg'
  }
];

const CATEGORIES = ['TODOS', 'PRODUTO DIGITAL', 'MENTORIA', 'SERVIÇOS', 'E-COMMERCE', 'VAREJO LOCAL', 'PÁGINA DE VENDAS'];

const paletteGradients = {
  'purple-blue': 'from-purple-600 to-blue-600',
  'cobalt-cyan': 'from-blue-700 to-cyan-400',
  'electric-purple': 'from-purple-500 to-fuchsia-500',
  'deep-night': 'from-slate-900 via-purple-900 to-slate-900'
};

const backgroundOptions = {
  'dark-default': 'bg-[#020205]',
  'deep-blue': 'bg-[#050A1F]',
  'graphite': 'bg-[#121212]',
  'midnight': 'bg-[#000000]'
};

const aiPlatforms = [
  { name: 'Lovable', icon: <img src="https://i.imgur.com/PxfYsF9.png" className="w-8 h-8 object-contain" alt="Lovable" /> },
  { name: 'Firebase Studio', icon: <img src="https://i.imgur.com/RE508zq.png" className="w-8 h-8 object-contain" alt="Firebase" /> },
  { name: 'Bolt', icon: <img src="https://i.imgur.com/OaUJU6z.png" className="w-8 h-8 object-contain" alt="Bolt" /> },
  { name: 'Replit', icon: <img src="https://i.imgur.com/3O5T3M3.png" className="w-8 h-8 object-contain" alt="Replit" /> },
  { name: 'Lazy', icon: <img src="https://i.imgur.com/joD5jjT.jpeg" className="w-8 h-8 object-contain rounded-lg" alt="Lazy IA" /> },
  { name: 'v0.dev', icon: <img src="https://i.imgur.com/YTqlKyY.png" className="w-8 h-8 object-contain" alt="v0.dev" /> },
  { name: 'Base44', icon: <img src="https://i.imgur.com/SYmOdYx.png" className="w-8 h-8 object-contain" alt="Base44" /> },
  { name: 'Mocha', icon: <img src="https://i.imgur.com/6wSFsc3.png" className="w-8 h-8 object-contain" alt="Mocha" /> },
  { name: 'Genspark', icon: <img src="https://i.imgur.com/pdyTLEm.jpeg" className="w-8 h-8 object-contain rounded-lg" alt="Genspark" /> },
  { name: 'Google AI Studio', icon: <img src="https://i.imgur.com/l16u0h9.png" className="w-8 h-8 object-contain" alt="Google AI Studio" /> }
];

const LandingPages: React.FC<{ onGenerateUpdate: (data: any) => void }> = ({ onGenerateUpdate }) => {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [customizing, setCustomizing] = useState<LPTemplate | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    appName: '',
    objective: '',
    audience: 'Empreendedores',
    colorPalette: 'purple-blue',
    customPrimaryColor: '#7C3AED',
    useCustomPrimary: false,
    backgroundColor: 'dark-default',
    customBgColor: '#020205',
    useCustomBg: false,
    font: 'Inter',
    designStyle: 'Vidro Embaçado',
    appType: 'Landing Page Elite',
    platform: 'Celular e Web',
    niche: '',
    mainBenefit: '',
    dailyUsers: '',
    pages: '',
    additionalFeatures: '',
    complementaryFeatures: [] as string[],
    notes: '',
    secondaryColor: '#1F1F1F',
    textColor: '#FFFFFF',
    language: 'Português 🇧🇷',
    aiPlatform: 'Lovable'
  });

  const primaryColorInputRef = useRef<HTMLInputElement>(null);
  const bgColorInputRef = useRef<HTMLInputElement>(null);
  const secondaryColorInputRef = useRef<HTMLInputElement>(null);
  const textColorInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates = LP_TEMPLATES.filter(t =>
    activeFilter === 'TODOS' || t.category === activeFilter
  );

  const handleStartCustomization = (template: LPTemplate) => {
    setCustomizing(template);
    setFormData(prev => ({
      ...prev,
      appName: template.title,
      objective: template.description,
      niche: template.category,
      pages: 'Home, Checkout, Obrigado'
    }));
    setCurrentStep(1);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => {
      const current = prev.complementaryFeatures;
      if (current.includes(feature)) {
        return { ...prev, complementaryFeatures: current.filter(f => f !== feature) };
      }
      return { ...prev, complementaryFeatures: [...current, feature] };
    });
  };

  const handleFinalize = async () => {
    setIsGenerating(true);
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

      const elitePrompt = generateProfessionalPrompt(formData, { history: history || [] });

      if (user) {
        // Save to generation history
        await supabase.from('generation_history').insert({
          user_id: user.id,
          type: 'landing_page',
          inputs: formData,
          generated_content: elitePrompt,
          metadata: { appName: formData.appName, template: customizing?.title }
        });

        // Update user intelligence context
        const { data: existingContext } = await supabase
          .from('user_intelligence_context')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (existingContext) {
          await supabase.from('user_intelligence_context').update({
            business_name: formData.appName,
            niche: formData.niche,
            audience: formData.audience,
            main_objective: formData.objective,
            updated_at: new Date().toISOString()
          }).eq('user_id', user.id);
        } else {
          await supabase.from('user_intelligence_context').insert({
            user_id: user.id,
            business_name: formData.appName,
            niche: formData.niche,
            audience: formData.audience,
            main_objective: formData.objective
          });
        }
      }

      onGenerateUpdate({ ...formData, type: 'new', elitePrompt });
    } catch (error) {
      console.error('Error finalizing LP:', error);
      onGenerateUpdate({ ...formData, type: 'new' });
    } finally {
      setIsGenerating(false);
    }
  };

  const totalSteps = 7;
  const labelStyle = "text-[10px] font-black text-purple-400 tracking-[0.15em] font-['Montserrat'] flex items-center gap-3 uppercase antialiased";
  const helperStyle = "text-[11px] text-gray-500 font-medium italic mt-1 leading-relaxed";
  const inputStyle = "w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white text-lg font-black italic tracking-tight focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/5";

  if (customizing) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#050507] flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-500 font-['Inter']">
        {/* Elite Ambient Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-purple-600/5 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full" />
        </div>

        {/* LOADING OVERLAY */}
        {isGenerating && (
          <div className="fixed inset-0 z-[300] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8 animate-in fade-in duration-700">
            <div className="w-64 h-64 relative mb-12">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={64} className="text-purple-500 animate-bounce" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white tracking-[0.8em] uppercase italic">Materializando Estrutura</h3>
            <div className="w-[400px] h-1 bg-white/5 rounded-full mt-12 overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Device Preview Area */}
        <div className="w-full lg:w-[45%] h-full flex items-center justify-center relative p-12 perspective-[3000px] overflow-visible bg-black/40 border-r border-white/5">
          <div className="relative z-10 animate-in zoom-in-95 duration-1000 rotate-y-[-12deg] lg:translate-x-44 transition-transform ease-out">
            <div className="bg-[#1A1A1E] rounded-[74px] p-2 shadow-[0_100px_200px_rgba(0,0,0,0.8)] border border-white/10">
              <div className="w-[340px] sm:w-[380px] h-[720px] sm:h-[800px] bg-[#010102] rounded-[64px] overflow-hidden flex flex-col relative border border-black ring-1 ring-white/5">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-[100] border border-white/10" />
                <div className="flex-1 bg-[#010102] relative overflow-hidden group">
                  <img src={customizing.image} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="LP Preview" />
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />

                  <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-[8px] font-black text-white uppercase tracking-widest">LP_Ready</div>
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-white"><Zap size={16} fill="currentColor" /></div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-black text-2xl tracking-tighter italic uppercase">{formData.appName || customizing.title}</h4>
                      <p className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{formData.niche || customizing.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-16 left-16 right-16 h-12 bg-black/80 blur-[100px] rounded-full scale-x-125 opacity-70 -z-10" />
          </div>
        </div>

        {/* Configuration Pane */}
        <div className="flex-1 flex flex-col h-full bg-[#08080A]/98 backdrop-blur-3xl relative z-20">
          <div className="flex-1 overflow-y-auto px-12 lg:px-20 py-16 no-scrollbar">
            <div className="w-full max-w-xl mx-auto flex flex-col space-y-12">
              <div className="flex items-center justify-between">
                <button onClick={() => setCustomizing(null)} className="flex items-center gap-4 text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] hover:text-white transition-all group italic font-mono">
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> VOLTAR_CATÁLOGO
                </button>
                <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] italic">
                  FASE {currentStep} DE {totalSteps}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-[48px] font-black text-white tracking-tighter leading-[0.9] italic uppercase font-['Syne']">
                  {currentStep === 1 && <><span className="text-purple-500">Sua</span> Ideia</>}
                  {currentStep === 2 && <><span className="text-cyan-500">Cores</span> e Estilo</>}
                  {currentStep === 3 && <><span className="text-blue-500">Como</span> Funciona</>}
                  {currentStep === 4 && <><span className="text-emerald-500">Quem</span> vai Usar</>}
                  {currentStep === 5 && <><span className="text-orange-500">Funções</span> Extras</>}
                  {currentStep === 6 && <><span className="text-pink-500">Visual</span> Final</>}
                  {currentStep === 7 && <><span className="text-indigo-500">Criar</span> Agora</>}
                </h2>
                <p className="text-gray-500 text-sm font-medium tracking-tight opacity-60 max-w-md italic">
                  {currentStep === 1 && 'O sistema preencheu tudo automaticamente para você. Revise se quiser.'}
                  {currentStep === 2 && 'Personalize a paleta e a tipografia que mais combinam com a LP.'}
                  {currentStep === 3 && 'Ajuste onde sua LP será aberta e qual o setor de atuação.'}
                  {currentStep === 4 && 'Como essa LP ajuda na conversão? Quais seções ela deve conter?'}
                  {currentStep === 5 && 'Especifique os recursos que tornam sua LP indispensável.'}
                  {currentStep === 6 && 'Escolha os detalhes finais de acabamento e harmonia visual.'}
                  {currentStep === 7 && 'Selecione a programadora que vai materializar o projeto.'}
                </p>
              </div>

              <div className="flex-1 space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-purple-500/30 transition-all">
                      <label className={labelStyle}><Type size={14} /> 01 Headline / Nome</label>
                      <p className={helperStyle}>O título principal que aparece no topo da Landing Page.</p>
                      <input type="text" placeholder="Ex: Produto X - Sua solução elite" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-purple-500/30 transition-all">
                      <label className={labelStyle}><Flag size={14} /> 02 Proposta de Valor</label>
                      <p className={helperStyle}>O subtexto persuasivo que descreve o benefício central.</p>
                      <input type="text" placeholder="Ex: Aumente suas vendas com IA..." value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-purple-500/30 transition-all">
                      <label className={labelStyle}><Users size={14} /> 03 Público-Alvo</label>
                      <p className={helperStyle}>Escolha o grupo de pessoas que mais se beneficia dessa LP.</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['Clientes', 'Empreendedores', 'Membros'].map(opt => (
                          <button key={opt} onClick={() => updateField('audience', opt)} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.audience === opt ? 'bg-white text-black border-white shadow-2xl' : 'bg-white/5 border border-white/5 text-gray-600 hover:text-white hover:bg-white/5'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-cyan-500/30 transition-all">
                      <label className={labelStyle}><Palette size={14} /> 04 Espectro Dominante</label>
                      <div className="flex items-center gap-4">
                        <div className="relative group/picker">
                          <button onClick={() => primaryColorInputRef.current?.click()} className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all hover:scale-110 ${formData.useCustomPrimary ? 'border-white ring-2 ring-white/20 shadow-2xl scale-110' : 'border-white/10 opacity-60'}`} style={{ backgroundColor: formData.useCustomPrimary ? formData.customPrimaryColor : '#000' }}><Pipette size={20} className={formData.useCustomPrimary ? 'text-white drop-shadow-md' : 'text-gray-500'} /></button>
                          <input ref={primaryColorInputRef} type="color" value={formData.customPrimaryColor} onChange={(e) => { updateField('customPrimaryColor', e.target.value); updateField('useCustomPrimary', true); }} className="absolute inset-0 opacity-0 cursor-pointer pointer-events-none" />
                        </div>
                        <div className="w-px h-8 bg-white/10 mx-1" />
                        {Object.keys(paletteGradients).map(k => (
                          <button key={k} onClick={() => { updateField('colorPalette', k); updateField('useCustomPrimary', false); }} className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${paletteGradients[k as keyof typeof paletteGradients]} relative flex items-center justify-center transition-all hover:scale-110 ${!formData.useCustomPrimary && formData.colorPalette === k ? 'ring-4 ring-white shadow-2xl scale-110' : 'opacity-40 grayscale-[0.3]'}`}>{!formData.useCustomPrimary && formData.colorPalette === k && <Check size={24} className="text-white" strokeWidth={4} />}</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-cyan-500/30 transition-all">
                      <label className={labelStyle}><Palette size={14} /> 05 Matriz de Fundo</label>
                      <div className="flex items-center gap-4">
                        <div className="relative group/picker">
                          <button onClick={() => bgColorInputRef.current?.click()} className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all hover:scale-110 ${formData.useCustomBg ? 'border-white ring-2 ring-white/20 shadow-2xl scale-110' : 'border-white/10 opacity-60'}`} style={{ backgroundColor: formData.useCustomBg ? formData.customBgColor : '#000' }}><Pipette size={20} className={formData.useCustomBg ? 'text-white drop-shadow-md' : 'text-gray-500'} /></button>
                          <input ref={bgColorInputRef} type="color" value={formData.customBgColor} onChange={(e) => { updateField('customBgColor', e.target.value); updateField('useCustomBg', true); }} className="absolute inset-0 opacity-0 cursor-pointer pointer-events-none" />
                        </div>
                        <div className="w-px h-8 bg-white/10 mx-1" />
                        {Object.keys(backgroundOptions).map(k => (
                          <button key={k} onClick={() => { updateField('backgroundColor', k); updateField('useCustomBg', false); }} className={`w-14 h-14 rounded-2xl ${backgroundOptions[k as keyof typeof backgroundOptions]} border border-white/10 relative flex items-center justify-center transition-all hover:scale-110 ${!formData.useCustomBg && formData.backgroundColor === k ? 'ring-4 ring-white shadow-2xl scale-110' : 'opacity-40 grayscale-[0.3]'}`}>{!formData.useCustomBg && formData.backgroundColor === k && <Check size={24} className="text-white" strokeWidth={4} />}</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-cyan-500/30 transition-all">
                      <label className={labelStyle}><FontIcon size={14} /> 06 Estilo de Fonte</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Inter', 'Montserrat', 'Orbitron'].map(f => (
                          <button key={f} onClick={() => updateField('font', f)} className={`py-4 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${formData.font === f ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{f}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-blue-500/30 transition-all">
                      <label className={labelStyle}><Layout size={14} /> 07 Estrutura da Página</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Vendas', 'Lançamento', 'Institucional'].map(t => (
                          <button key={t} onClick={() => updateField('appType', t)} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.appType === t ? 'bg-white text-black border-white' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-blue-500/30 transition-all">
                      <label className={labelStyle}><Smartphone size={14} /> 08 Foco de Visualização</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Celular', 'Web', 'Ambos'].map(p => (
                          <button key={p} onClick={() => updateField('platform', p)} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.platform === p ? 'bg-white text-black border-white' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{p}</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-blue-500/30 transition-all">
                      <label className={labelStyle}><Briefcase size={14} /> 09 Setor / Nicho</label>
                      <input type="text" placeholder="Ex: Infoprodutos, Varejo, Consultoria" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-emerald-500/30 transition-all">
                      <label className={labelStyle}><Heart size={14} /> 10 Benefício Principal</label>
                      <input type="text" placeholder="Ex: Maior taxa de conversão do mercado" value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-emerald-500/30 transition-all">
                      <label className={labelStyle}><Users size={14} /> 11 Personas de Acesso</label>
                      <input type="text" placeholder="Ex: Prospectos vindos de anúncios pagos" value={formData.dailyUsers} onChange={(e) => updateField('dailyUsers', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-emerald-500/30 transition-all">
                      <label className={labelStyle}><Layers size={14} /> 12 Seções da Página</label>
                      <input type="text" placeholder="Ex: Hero, Benefícios, Depoimentos, FAQ" value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} />
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-orange-500/30 transition-all">
                      <label className={labelStyle}><Settings size={14} /> 13 Integrações Especiais</label>
                      <input type="text" placeholder="Ex: Checkouts, Pixel de Rastreio, CRM" value={formData.additionalFeatures} onChange={(e) => updateField('additionalFeatures', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-orange-500/30 transition-all">
                      <label className={labelStyle}><Monitor size={14} /> 14 Gatilhos de Conversão</label>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Escassez', 'Urgência', 'Prova Social', 'Garantia Blindada'].map(f => (
                          <button key={f} onClick={() => toggleFeature(f)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${formData.complementaryFeatures.includes(f) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-white'}`}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-orange-500/30 transition-all">
                      <label className={labelStyle}><MessageSquare size={14} /> 15 Detalhes Adicionais</label>
                      <input type="text" placeholder="Ex: Design deve ser limpo e minimalista" value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} className={inputStyle} />
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-pink-500/30 transition-all">
                      <label className={labelStyle}><Palette size={14} /> 16 Cor de Destaque (CTA)</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => secondaryColorInputRef.current?.click()} className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-xl" style={{ backgroundColor: formData.secondaryColor }}><Pipette size={20} className="text-white drop-shadow-md" /></button>
                        <input ref={secondaryColorInputRef} type="color" value={formData.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} className="hidden" />
                        <span className="text-white font-mono text-xs font-black uppercase">{formData.secondaryColor}</span>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-pink-500/30 transition-all">
                      <label className={labelStyle}><Type size={14} /> 17 Matriz do Texto</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => textColorInputRef.current?.click()} className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-xl" style={{ backgroundColor: formData.textColor }}><Pipette size={20} className="text-black drop-shadow-md" /></button>
                        <input ref={textColorInputRef} type="color" value={formData.textColor} onChange={(e) => updateField('textColor', e.target.value)} className="hidden" />
                        <span className="text-white font-mono text-xs font-black uppercase">{formData.textColor}</span>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-pink-500/30 transition-all">
                      <label className={labelStyle}><Smartphone size={14} /> 18 Formato Visual</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Bordas Redondas', 'Bordas Retas', 'Sombras Suaves', 'Vidro Embaçado'].map(s => (
                          <button key={s} onClick={() => updateField('designStyle', s)} className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${formData.designStyle === s ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{s}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 7 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-indigo-500/30 transition-all">
                      <label className={labelStyle}><Globe2 size={14} /> 19 Idioma Mandatório</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Português 🇧🇷', 'Inglês 🇺🇸', 'Espanhol 🇪🇸', 'Outro 🌐'].map(lang => (
                          <button
                            key={lang}
                            onClick={() => updateField('language', lang)}
                            className={`py-4 rounded-xl text-[10px] font-black uppercase border transition-all ${lang === 'Outro 🌐' ? formData.language.startsWith('Outro') : formData.language === lang
                              ? 'bg-white text-black border-white shadow-2xl'
                              : 'bg-white/5 border border-white/5 text-gray-600 hover:text-white'
                              }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      {formData.language.startsWith('Outro') && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          <input
                            type="text"
                            placeholder="Digite o idioma personalizado..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white text-[11px] focus:outline-none focus:border-purple-500/50 transition-all font-medium italic"
                            value={formData.language.replace('Outro 🌐', '').replace('Outro: ', '').trim()}
                            onChange={(e) => updateField('language', `Outro: ${e.target.value}`)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-indigo-500/30 transition-all">
                      <label className={labelStyle}><FontIcon size={14} /> 20 Tipografia Final</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Inter', 'Montserrat', 'Orbitron', 'Syne', 'Clássica'].map(f => (
                          <button key={f} onClick={() => updateField('font', f)} className={`py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${formData.font === f ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white/5 border border-white/10 text-gray-600 hover:text-white'}`}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#0D0D11]/60 border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-indigo-500/30 transition-all">
                      <div className="space-y-1">
                        <label className={labelStyle}><CpuIcon size={14} /> Engine de Execução</label>
                        <p className={helperStyle}>O prompt será otimizado para o motor selecionado.</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {aiPlatforms.map(platform => {
                          const isSelected = formData.aiPlatform === platform.name;
                          return (
                            <button
                              key={platform.name}
                              onClick={() => updateField('aiPlatform', platform.name)}
                              className={`relative p-5 rounded-2xl border transition-all text-center flex flex-col items-center justify-center gap-4 group/card ${isSelected
                                ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.02]'
                                : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/10 hover:bg-white/[0.03]'
                                }`}
                            >
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                                  <Check size={12} strokeWidth={4} />
                                </div>
                              )}
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover/card:scale-110 ${isSelected ? 'bg-white/5' : 'bg-white/[0.03]'}`}>
                                {platform.icon}
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-gray-500 group-hover/card:text-gray-300'}`}>
                                {platform.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-10 lg:px-20 py-12 bg-black/40 border-t border-white/5 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors italic font-mono"><ChevronLeft size={16} /> ANTERIOR</button>
            ) : <div className="flex items-center gap-3 opacity-20"><ShieldCheck size={16} className="text-purple-500" /><span className="text-[9px] font-black text-white uppercase tracking-widest font-mono">LP_Secure_Link</span></div>}

            <button onClick={() => currentStep === totalSteps ? handleFinalize() : setCurrentStep(currentStep + 1)} className="flex items-center gap-14 px-16 py-6 rounded-[32px] font-black text-[12px] uppercase tracking-[0.5em] bg-white text-black hover:scale-105 active:scale-95 shadow-[0_30px_60px_-10px_rgba(124,58,237,0.3)] transition-all duration-700 italic group relative overflow-hidden">
              <span>{currentStep === totalSteps ? 'MATERIALIZAR LP' : 'PRÓXIMO PASSO'}</span>
              <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-[1400px] mx-auto w-full px-6 min-h-screen">
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050505]">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-400/[0.04] blur-[120px] rounded-full" />
      </div>

      <div className="relative pt-6 w-full z-10 flex items-center justify-between">
        <button onClick={() => { }} className="flex items-center gap-4 text-gray-700 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.8em] group font-mono italic">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>ESTÚDIO</span>
        </button>
        <div className="flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-full">
          <Command size={10} className="text-purple-500" />
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-mono">LP_v5.0_ELITE</span>
        </div>
      </div>

      <div className="flex flex-col items-center pt-8 pb-10 w-full relative z-20">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl">
            <Sparkles size={12} className="text-purple-400" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] italic">Biblioteca de Conversão Elite</span>
          </div>
          <h2 className="text-[48px] md:text-[64px] font-black text-white tracking-tighter leading-[0.85] italic uppercase antialiased">
            Esqueletos de <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white pr-4">
              Alta Conversão
            </span>
          </h2>
          <p className="text-[#94A3B8] font-medium text-lg tracking-tight opacity-40 italic max-w-xl mx-auto">
            Selecione um esqueleto validado por performance e injete sua identidade para conversão máxima.
          </p>
        </div>
      </div>

      <div className="flex flex-col relative z-20 w-full">
        <div className="flex flex-wrap items-center justify-center gap-3 py-6 border-y border-white/[0.05] bg-white/[0.01]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-10 py-4 rounded-full text-[10px] font-black tracking-[0.3em] transition-all uppercase border ${activeFilter === cat
                ? 'bg-purple-600 border-purple-500 text-white shadow-[0_20px_40px_rgba(124,58,237,0.3)] scale-105'
                : 'bg-transparent text-gray-600 border-white/5 hover:border-white/20 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-12 pb-32">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleStartCustomization(template)}
              className="group relative bg-[#0F0F12] border border-white/[0.08] rounded-[48px] overflow-hidden hover:border-purple-500/40 transition-all duration-700 cursor-pointer shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] flex flex-col aspect-[4/5]"
            >
              <img src={template.image} alt={template.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[2000ms] group-hover:scale-105 opacity-40 group-hover:opacity-80 grayscale-[0.5] group-hover:grayscale-0" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-transparent p-12 flex flex-col justify-end">
                <div className="space-y-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] font-mono">{template.category}</span>
                    <h3 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase">{template.title}</h3>
                    <p className="text-gray-500 text-[13px] font-medium leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{template.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[10px] font-black text-purple-400 uppercase tracking-widest font-mono italic">{template.badge || 'ESTRUTURA'}</span>
                    </div>
                    <div className="w-14 h-14 rounded-3xl bg-white text-black flex items-center justify-center shadow-2xl transition-all group-hover:bg-purple-600 group-hover:text-white"><ArrowRight size={22} strokeWidth={3} /></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms]" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 pt-4 pb-24 opacity-20">
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <span className="text-[10px] font-black text-gray-600 uppercase tracking-[1em] italic font-mono">Nexbuild_Elite_LP_Ready</span>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-3000 { perspective: 3000px; }
        .rotate-y-[-12deg] { transform: rotateY(-12deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default LandingPages;