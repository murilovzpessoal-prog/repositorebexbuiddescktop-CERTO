import React, { useState, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Sparkles,
  Wifi,
  Battery,
  Target,
  Users,
  Activity,
  Cpu,
  Type,
  Layout,
  Palette,
  Check,
  Plus,
  Type as FontIcon,
  Eye,
  Flag,
  Smartphone,
  Globe,
  Rocket,
  ShieldCheck,
  Terminal,
  Layers,
  Briefcase,
  Pipette,
  Heart,
  Settings,
  Monitor,
  MessageSquare,
  Globe2,
  Cpu as CpuIcon,
  MousePointer2,
  Box,
  Code2,
  Database,
  Cloud,
  Layers as LayersIcon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateProfessionalPrompt } from '../lib/intelligence';

interface AppWizardProps {
  onBack: () => void;
  onComplete: (data: any) => void;
}

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

const AppWizard: React.FC<AppWizardProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    appName: '',
    objective: '',
    audience: 'Clientes',
    colorPalette: 'purple-blue',
    customPrimaryColor: '#7C3AED',
    useCustomPrimary: false,
    backgroundColor: 'dark-default',
    customBgColor: '#020205',
    useCustomBg: false,
    font: 'Inter',
    designStyle: 'Arredondado',
    appType: 'Painel de Controle',
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
          type: 'app',
          inputs: formData,
          generated_content: elitePrompt,
          metadata: { appName: formData.appName }
        });

        // Update user intelligence context
        // Upsert based on user_id (using project's main niche/audience)
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

      onComplete({ ...formData, elitePrompt });
    } catch (error) {
      console.error('Error finalizing wizard:', error);
      onComplete(formData);
    } finally {
      setIsGenerating(false);
    }
  };

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

  const totalSteps = 7;
  const labelStyle = "text-[10px] font-black text-purple-400 tracking-[0.15em] font-['Montserrat'] flex items-center gap-3 uppercase antialiased";
  const helperStyle = "text-[11px] text-gray-500 font-medium italic mt-1 leading-relaxed";
  const inputStyle = "w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white text-lg font-black italic tracking-tight focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/5";

  return (
    <div className="absolute inset-0 z-[100] bg-[#020205] flex overflow-hidden selection:bg-purple-500/30 font-['Inter'] animate-in fade-in duration-500">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-10%] w-[1200px] h-[1200px] bg-purple-600/5 blur-[250px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 blur-[200px] rounded-full" />
      </div>

      {isGenerating && (
        <div className="fixed inset-0 z-[300] bg-[#020205]/98 backdrop-blur-[40px] flex flex-col items-center justify-center p-8 animate-in fade-in duration-700">
          <div className="w-64 h-64 relative mb-12">
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket size={64} className="text-purple-500 animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white tracking-[0.8em] uppercase italic">Criando Seu App</h3>
          <div className="w-[400px] h-1 bg-white/5 rounded-full mt-12 overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Mockup Container */}
      <div className="hidden lg:flex lg:w-[45%] items-center justify-center relative p-12 perspective-[3000px] overflow-visible border-r border-white/5 bg-black/20">
        <div className="relative z-10 animate-in zoom-in-95 duration-1000 rotate-y-[-16deg] lg:translate-x-8 transition-transform ease-out">
          <div className="bg-gradient-to-b from-[#222226] via-[#08080A] to-[#222226] rounded-[70px] p-[12px] shadow-[80px_130px_200px_-30px_rgba(0,0,0,0.95)] relative ring-1 ring-white/10">
            <div className="w-[380px] h-[780px] bg-[#010102] rounded-[58px] overflow-hidden flex flex-col relative border border-black shadow-inner">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-[100] border border-white/10" />
              <div className="px-10 pt-12 pb-4 flex justify-between items-center z-50">
                <span className="text-[12px] font-black text-white tracking-tighter">9:41</span>
                <div className="flex items-center gap-2 text-white/50"><Wifi size={14} /><Battery size={16} /></div>
              </div>
              <div className="flex-1 p-8 space-y-10" style={{ backgroundColor: formData.useCustomBg ? formData.customBgColor : undefined }}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">VISUALIZAÇÃO</p>
                    <h4 className="text-white font-black text-3xl tracking-tighter italic truncate max-w-[200px]">{formData.appName || 'Meu App'}</h4>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40"><Users size={20} /></div>
                </div>
                <div
                  className={`rounded-[40px] p-10 space-y-8 shadow-2xl transition-all duration-1000 relative overflow-hidden ${!formData.useCustomPrimary ? `bg-gradient-to-br ${paletteGradients[formData.colorPalette as keyof typeof paletteGradients]}` : ''}`}
                  style={{ backgroundColor: formData.useCustomPrimary ? formData.customPrimaryColor : undefined }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20"><Zap size={28} fill="currentColor" /></div>
                  <div className="space-y-2">
                    <h5 className="text-white font-black text-xl tracking-tight italic">Ideia Principal</h5>
                    <p className="text-white/80 text-[11px] font-bold leading-relaxed">{formData.objective || 'Diga o que seu app vai fazer...'}</p>
                  </div>
                  <button className="w-full py-5 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.3em]">ENTRAR NO APP</button>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
                    <Target size={20} className="text-cyan-400 opacity-60" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{formData.audience}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
                    <Activity size={20} className="text-purple-400 opacity-60" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{formData.designStyle}</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto h-24 bg-black/60 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-10 pb-4">
                <Users size={20} className="text-white/20" /><div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl -translate-y-2"><Plus size={28} strokeWidth={3} /></div><Activity size={20} className="text-white/20" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 left-16 right-16 h-12 bg-black/80 blur-[100px] rounded-full scale-x-125 opacity-70 -z-10" />
        </div>
      </div>

      <div className="flex-1 flex flex-col py-12 px-16 relative z-10 overflow-hidden bg-[radial-gradient(circle_at_0%_50%,rgba(124,58,237,0.02),transparent_50%)]">

        <div className="w-full max-w-2xl mx-auto flex flex-col h-full space-y-12">

          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-4 text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] hover:text-white transition-all group italic">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> VOLTAR AO INÍCIO
            </button>
            <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] italic">
              PASSO {currentStep} DE {totalSteps}
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
              {currentStep === 1 && 'Dê um nome e defina o que seu aplicativo vai fazer de mais importante.'}
              {currentStep === 2 && 'Escolha as cores e o formato das letras que mais combinam com você.'}
              {currentStep === 3 && 'Diga onde as pessoas vão abrir seu app e qual o seu ramo de atuação.'}
              {currentStep === 4 && 'Como esse app ajuda as pessoas no dia a dia? Quais botões ele deve ter?'}
              {currentStep === 5 && 'Adicione outros recursos que você acha importante para seu projeto.'}
              {currentStep === 6 && 'Escolha os detalhes finais de cores e acabamentos do seu aplicativo.'}
              {currentStep === 7 && 'Escolha a programadora que vai materializar sua ideia agora.'}
            </p>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2 no-scrollbar">

            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-purple-500/30 transition-all">
                  <label className={labelStyle}><Type size={14} /> 01 Nome do Aplicativo</label>
                  <p className={helperStyle}>Pense em um nome fácil de lembrar. Ex: Agenda Fácil, Meu Treino.</p>
                  <input type="text" placeholder="Ex: Pizzaria do Zé" value={formData.appName} onChange={(e) => updateField('appName', e.target.value)} className={inputStyle} />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-purple-500/30 transition-all">
                  <label className={labelStyle}><Flag size={14} /> 02 O que o app vai fazer?</label>
                  <p className={helperStyle}>Pense na principal tarefa que ele ajuda no dia a dia. Ex: Marcar horários.</p>
                  <input type="text" placeholder="Ex: Organizar pedidos automaticamente" value={formData.objective} onChange={(e) => updateField('objective', e.target.value)} className={inputStyle} />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-purple-500/30 transition-all">
                  <label className={labelStyle}><Users size={14} /> 03 Quem vai usar?</label>
                  <p className={helperStyle}>Escolha o grupo de pessoas que mais vai mexer no aplicativo.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Clientes', 'Empresas', 'Eu mesmo'].map(opt => (
                      <button key={opt} onClick={() => updateField('audience', opt)} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.audience === opt ? 'bg-white text-black border-white shadow-2xl' : 'bg-white/5 border border-white/5 text-gray-600 hover:text-white hover:bg-white/5'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-cyan-500/30 transition-all">
                  <label className={labelStyle}><Palette size={14} /> 04 Qual cor você mais gosta?</label>
                  <p className={helperStyle}>Essa será a cor principal que vai dar vida ao seu aplicativo.</p>
                  <div className="flex items-center gap-4">
                    <div className="relative group/picker">
                      <button
                        onClick={() => primaryColorInputRef.current?.click()}
                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all hover:scale-110 ${formData.useCustomPrimary ? 'border-white ring-2 ring-white/20 shadow-2xl scale-110' : 'border-white/10 opacity-60'}`}
                        style={{ backgroundColor: formData.useCustomPrimary ? formData.customPrimaryColor : '#000' }}
                      >
                        <Pipette size={20} className={formData.useCustomPrimary ? 'text-white drop-shadow-md' : 'text-gray-500'} />
                      </button>
                      <input
                        ref={primaryColorInputRef}
                        type="color"
                        value={formData.customPrimaryColor}
                        onChange={(e) => {
                          updateField('customPrimaryColor', e.target.value);
                          updateField('useCustomPrimary', true);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer pointer-events-none"
                      />
                    </div>
                    <div className="w-px h-8 bg-white/10 mx-1" />
                    {Object.keys(paletteGradients).map(k => (
                      <button
                        key={k}
                        onClick={() => {
                          updateField('colorPalette', k);
                          updateField('useCustomPrimary', false);
                        }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${paletteGradients[k as keyof typeof paletteGradients]} relative flex items-center justify-center transition-all hover:scale-110 ${!formData.useCustomPrimary && formData.colorPalette === k ? 'ring-4 ring-white shadow-2xl scale-110' : 'opacity-40 grayscale-[0.3]'}`}
                      >
                        {!formData.useCustomPrimary && formData.colorPalette === k && <Check size={24} className="text-white" strokeWidth={4} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-cyan-500/30 transition-all">
                  <label className={labelStyle}><Palette size={14} /> 05 Prefere fundo claro ou escuro?</label>
                  <p className={helperStyle}>Escolha como quer que as telas do app apareçam por trás.</p>
                  <div className="flex items-center gap-4">
                    <div className="relative group/picker">
                      <button
                        onClick={() => bgColorInputRef.current?.click()}
                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all hover:scale-110 ${formData.useCustomBg ? 'border-white ring-2 ring-white/20 shadow-2xl scale-110' : 'border-white/10 opacity-60'}`}
                        style={{ backgroundColor: formData.useCustomBg ? formData.customBgColor : '#000' }}
                      >
                        <Pipette size={20} className={formData.useCustomBg ? 'text-white drop-shadow-md' : 'text-gray-500'} />
                      </button>
                      <input
                        ref={bgColorInputRef}
                        type="color"
                        value={formData.customBgColor}
                        onChange={(e) => {
                          updateField('customBgColor', e.target.value);
                          updateField('useCustomBg', true);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer pointer-events-none"
                      />
                    </div>
                    <div className="w-px h-8 bg-white/10 mx-1" />
                    {Object.keys(backgroundOptions).map(k => (
                      <button
                        key={k}
                        onClick={() => {
                          updateField('backgroundColor', k);
                          updateField('useCustomBg', false);
                        }}
                        className={`w-14 h-14 rounded-2xl ${backgroundOptions[k as keyof typeof backgroundOptions]} border border-white/10 relative flex items-center justify-center transition-all hover:scale-110 ${!formData.useCustomBg && formData.backgroundColor === k ? 'ring-4 ring-white shadow-2xl scale-110' : 'opacity-40 grayscale-[0.3]'}`}
                      >
                        {!formData.useCustomBg && formData.backgroundColor === k && <Check size={24} className="text-white" strokeWidth={4} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-cyan-500/30 transition-all">
                  <label className={labelStyle}><FontIcon size={14} /> 06 Qual estilo de letra você gosta?</label>
                  <p className={helperStyle}>Escolha o formato que for mais fácil para ler.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Clássica', 'Simples', 'Moderna'].map(f => (
                      <button key={f} onClick={() => updateField('font', f)} className={`py-4 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${formData.font === f ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-blue-500/30 transition-all">
                  <label className={labelStyle}><Layout size={14} /> 07 Como as informações vão aparecer?</label>
                  <p className={helperStyle}>Escolha se o app parece uma loja, um mural ou uma lista.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Painel', 'Loja', 'Mural'].map(t => (
                      <button key={t} onClick={() => updateField('appType', t)} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.appType === t ? 'bg-white text-black border-white' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-blue-500/30 transition-all">
                  <label className={labelStyle}><Smartphone size={14} /> 08 Onde as pessoas vão abrir o app?</label>
                  <p className={helperStyle}>Escolha se é para ver no celular ou no computador.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Celular', 'Web', 'Ambos'].map(p => (
                      <button key={p} onClick={() => updateField('platform', p)} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.platform === p ? 'bg-white text-black border-white' : 'bg-white/5 border border-white/5 text-gray-600'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-blue-500/30 transition-all">
                  <label className={labelStyle}><Briefcase size={14} /> 09 Qual o seu ramo ou profissão?</label>
                  <p className={helperStyle}>Ex: Salão, Restaurante, Academia, Loja de Roupas.</p>
                  <input type="text" placeholder="Ex: Barbearia do Zé" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={inputStyle} />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-emerald-500/30 transition-all">
                  <label className={labelStyle}><Heart size={14} /> 10 Como o app vai ajudar no dia a dia?</label>
                  <p className={helperStyle}>Diga qual facilidade ele traz. Ex: Parar de anotar pedidos no papel.</p>
                  <input type="text" placeholder="Ex: Atender os clientes muito mais rápido" value={formData.mainBenefit} onChange={(e) => updateField('mainBenefit', e.target.value)} className={inputStyle} />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-emerald-500/30 transition-all">
                  <label className={labelStyle}><Users size={14} /> 11 Quem vai mexer no app todo dia?</label>
                  <p className={helperStyle}>Liste quem terá acesso ao aplicativo diariamente.</p>
                  <input type="text" placeholder="Ex: Eu, meus funcionários e meus clientes" value={formData.dailyUsers} onChange={(e) => updateField('dailyUsers', e.target.value)} className={inputStyle} />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-emerald-500/30 transition-all">
                  <label className={labelStyle}><Layers size={14} /> 12 Quais botões você quer no menu?</label>
                  <p className={helperStyle}>Liste as telas que você imagina. Ex: Início, Perfil, Pedidos.</p>
                  <input type="text" placeholder="Ex: Início, Meus Pedidos, Cadastro, Sair" value={formData.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputStyle} />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-orange-500/30 transition-all">
                  <label className={labelStyle}><Settings size={14} /> 13 Alguma outra função especial?</label>
                  <p className={helperStyle}>Tem algo a mais que você lembrou agora? Ex: Mandar fotos.</p>
                  <input type="text" placeholder="Ex: Tirar fotos dos recibos e salvar" value={formData.additionalFeatures} onChange={(e) => updateField('additionalFeatures', e.target.value)} className={inputStyle} />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-orange-500/30 transition-all">
                  <label className={labelStyle}><Monitor size={14} /> 14 Funções extras que você deseja?</label>
                  <p className={helperStyle}>Selecione as opções que você acha interessante ter no app.</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Avisos no Celular', 'Usar sem Internet', 'Conversar com IA', 'Pagamento por Cartão'].map(f => (
                      <button
                        key={f}
                        onClick={() => toggleFeature(f)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${formData.complementaryFeatures.includes(f) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-white'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-orange-500/30 transition-all">
                  <label className={labelStyle}><MessageSquare size={14} /> 15 Mais algum detalhe importante?</label>
                  <p className={helperStyle}>Use esse espaço para qualquer informação extra sobre sua ideia.</p>
                  <input type="text" placeholder="Ex: O aplicativo precisa ser muito simples de usar" value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} className={inputStyle} />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-pink-500/30 transition-all">
                  <label className={labelStyle}><Palette size={14} /> 16 Qual será a cor dos botões?</label>
                  <p className={helperStyle}>Escolha uma segunda cor para dar destaque ao seu aplicativo.</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => secondaryColorInputRef.current?.click()}
                      className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-xl"
                      style={{ backgroundColor: formData.secondaryColor }}
                    >
                      <Pipette size={20} className="text-white drop-shadow-md" />
                    </button>
                    <input ref={secondaryColorInputRef} type="color" value={formData.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} className="hidden" />
                    <span className="text-white font-mono text-xs font-black uppercase">{formData.secondaryColor}</span>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-pink-500/30 transition-all">
                  <label className={labelStyle}><Type size={14} /> 17 De que cor você quer as letras?</label>
                  <p className={helperStyle}>Escolha uma cor que seja bem fácil de ler no seu fundo.</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => textColorInputRef.current?.click()}
                      className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-xl"
                      style={{ backgroundColor: formData.textColor }}
                    >
                      <Pipette size={20} className="text-black drop-shadow-md" />
                    </button>
                    <input ref={textColorInputRef} type="color" value={formData.textColor} onChange={(e) => updateField('textColor', e.target.value)} className="hidden" />
                    <span className="text-white font-mono text-xs font-black uppercase">{formData.textColor}</span>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4 group hover:border-pink-500/30 transition-all">
                  <label className={labelStyle}><Smartphone size={14} /> 18 Como você quer o formato do app?</label>
                  <p className={helperStyle}>Diga se prefere algo com bordas redondas ou mais retas.</p>
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
                  <label className={labelStyle}><Globe2 size={14} /> 19 Qual será o idioma do aplicativo?</label>
                  <p className={helperStyle}>Toda a escrita do app será feita nessa língua.</p>
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
                  <label className={labelStyle}><FontIcon size={14} /> 20 Escolha o tipo de letra final</label>
                  <p className={helperStyle}>A letra que mais te agrada para a versão final.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Simples', 'Clara', 'Moderna', 'Elegante', 'Básica'].map(f => (
                      <button key={f} onClick={() => updateField('font', f)} className={`py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${formData.font === f ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white/5 border border-white/10 text-gray-600 hover:text-white'}`}>{f}</button>
                    ))}
                  </div>
                </div>

                {/* REDESIGNED PLATFORM SELECTOR */}
                <div className="bg-[#0D0D11]/60 border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-indigo-500/30 transition-all">
                  <div className="space-y-1">
                    <label className={labelStyle}><CpuIcon size={14} /> Qual programadora você deseja usar?</label>
                    <p className={helperStyle}>Selecione a plataforma de IA que você planeja usar. Isso otimizará o prompt para o melhor resultado.</p>
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

          <div className="pt-10 flex items-center justify-between border-t border-white/5 shrink-0">
            {currentStep > 1 ? (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors">
                <ChevronLeft size={16} /> VOLTAR
              </button>
            ) : <div className="flex items-center gap-3 opacity-30"><ShieldCheck size={16} className="text-emerald-500" /><span className="text-[9px] font-black text-white uppercase tracking-widest">Protocolo Pronto</span></div>}

            <button
              onClick={() => currentStep === totalSteps ? handleFinalize() : setCurrentStep(currentStep + 1)}
              disabled={currentStep === 1 && !formData.appName}
              className={`flex items-center gap-14 px-16 py-6 rounded-[32px] font-black text-[12px] uppercase tracking-[0.5em] transition-all duration-700 italic group relative overflow-hidden ${currentStep === 1 && !formData.appName
                ? 'bg-white/5 text-gray-800 cursor-not-allowed border border-white/5'
                : 'bg-white text-black hover:scale-105 active:scale-95 shadow-[0_30px_60px_-10px_rgba(255,255,255,0.2)]'
                }`}
            >
              <span>{currentStep === totalSteps ? 'CRIAR MEU APLICATIVO' : 'PRÓXIMO PASSO'}</span>
              <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-3000 { perspective: 3000px; }
        .rotate-y-[-16deg] { transform: rotateY(-16deg) rotateX(2deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default AppWizard;