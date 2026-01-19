import React, { useState, useEffect, useRef } from 'react';
import createGlobe, { COBEOptions } from "cobe";
import {
  Search,
  Star,
  Link as LinkIcon,
  TrendingUp,
  Building2,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Target,
  ShieldCheck,
  Instagram,
  Phone,
  Mail,
  Globe as GlobeIcon,
  ChevronLeft
} from 'lucide-react';
import { LocationMap } from './LocationMap';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { searchLeads, PlaceLead } from '../lib/google-places';

// --- Globe Component Implementation ---
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 12000, // Otimizado de 16000 para performance imediata
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [124 / 255, 58 / 255, 237 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const phiRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: width * 2 || 800, // Fallback para evitar erro de inicialização
      height: width * 2 || 800,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + r;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Timeout mínimo para garantir que o primeiro frame foi processado
    const readyTimer = setTimeout(() => setIsReady(true), 100);

    return () => {
      globe.destroy();
      clearTimeout(readyTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [r]);

  return (
    <div className={`relative mx-auto aspect-square w-full ${className}`}>
      <canvas
        className={`size-full transition-opacity duration-700 ease-in-out cursor-grab ${isReady ? 'opacity-100' : 'opacity-0'}`}
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}

const Prospector: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'search' | 'results'>('welcome');
  const [strategy, setStrategy] = useState<'all' | 'nosite'>('nosite');
  const [rating, setRating] = useState(0.0);
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [channel, setChannel] = useState('any');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<PlaceLead[]>([]);

  const handleSearch = async () => {
    if (!niche || !location) return;

    setIsSearching(true);
    try {
      // Real API Search
      const leads = await searchLeads(niche, location);
      setResults(leads);

      // Save to Supabase (Async)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        supabase.from('generation_history').insert({
          user_id: user.id,
          type: 'prospector_search',
          inputs: { niche, location, strategy, rating, channel },
          generated_content: `Busca realizada para ${niche} em ${location}. ${leads.length} leads encontrados.`,
          metadata: { strategy, rating, channel, leadCount: leads.length }
        }).then();
      }

      setView('results');
    } catch (error: any) {
      console.error('Error during lead search:', error);
      alert(error.message || 'Erro ao buscar leads. Verifique sua chave de API do Google ou tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  if (view === 'welcome') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-[95vh] flex flex-col items-center justify-center bg-[#020205] overflow-hidden p-6"
      >

        {/* ATMOSPHERE LAYER */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.1),transparent_70%)]" />
        </div>

        {/* HUD PERIPHERALS */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-20">
            <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.5em]">System_Integrity_Check</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className="w-1.5 h-0.5 bg-emerald-500/50" />)}
            </div>
          </div>
          <div className="absolute top-10 right-10 text-right flex flex-col gap-1 opacity-20">
            <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.5em]">Lead_Discovery_Flux</span>
            <span className="text-[10px] font-bold text-white tracking-widest italic">482_found/min</span>
          </div>

          {/* Side Cards */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-8 hidden xl:block">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[32px] w-64 space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Target size={16} />
                </div>
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Alvos de Mercado</h4>
              </div>
              <div className="space-y-3">
                {['Hamburguerias', 'Dentistas', 'Advogados'].map((n, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-default">
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors italic">{n}</span>
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                      <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-8 hidden xl:block">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[32px] w-64 space-y-5"
            >
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Lead Score AI</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 italic">Qualidade Global</span>
                  <span className="text-[10px] font-black text-white italic">94.8%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- CENTRAL HUB --- */}
        <div className="relative z-20 w-full max-w-[1200px] flex flex-col items-center gap-12">

          <div className="text-center space-y-6 w-full flex flex-col items-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_12px_#A855F7] animate-pulse" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] italic">Intelligence_System_Prospector</span>
            </motion.div>

            <div className="space-y-4 w-full flex flex-col items-center">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="w-full text-[48px] md:text-[84px] font-black text-white tracking-tighter leading-none italic uppercase antialiased text-center flex items-center justify-center"
              >
                BUSCAR <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 ml-4 pr-1 md:pr-4 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">CLIENTES.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed italic text-center"
              >
                Sincronize com o globo. Identifique oportunidades de alto ticket com inteligência geográfica e análise de presença digital nativa.
              </motion.p>
            </div>
          </div>

          {/* Interactive Core: Globe & Action */}
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mx-auto">
            <div className="absolute inset-[-8%] border border-white/[0.03] rounded-full animate-pulse pointer-events-none" />

            <div className="relative w-full h-full flex items-center justify-center group/globe">
              <Globe className="opacity-95 grayscale-[0.2] group-hover/globe:grayscale-0 transition-all duration-[2000ms] scale-[1.3]" />

              <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                <button
                  onClick={() => setView('search')}
                  className="pointer-events-auto group relative px-14 py-6 bg-white/10 backdrop-blur-[40px] text-white rounded-[28px] font-black text-[13px] uppercase tracking-[0.5em] italic shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all duration-700 overflow-hidden flex items-center justify-center gap-5 border border-white/25"
                >
                  <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase">Iniciar Busca</span>
                  <ChevronRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-12 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[32px] px-12 py-5 shadow-2xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Global_Index</span>
              <span className="text-[12px] font-bold text-white italic">4.8k</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Scan_Accuracy</span>
              <span className="text-[12px] font-bold text-emerald-400 italic">99.8%</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Active_Node</span>
              <span className="text-[12px] font-bold text-white italic">GLB-04</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (view === 'results') {
    return (
      <div className="relative min-h-screen bg-[#020205] text-[#94A3B8] p-8 md:p-12 animate-in fade-in duration-700 overflow-x-hidden flex flex-col items-center pb-60">
        <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1600px] flex items-center mb-10 relative z-10">
          <button
            onClick={() => setView('search')}
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.3em] font-mono italic group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            RETORNAR_PROSPECTOR
          </button>
        </div>

        <div className="w-full max-w-[1600px] mb-16 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#A855F7]" />
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest italic font-mono">SCAN_RESULTS: {results.length} LEADS_ENCONTRADOS</span>
          </div>
          <h2 className="text-[48px] md:text-[64px] font-black text-white tracking-tighter leading-none italic uppercase">
            Resultados <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 pr-4 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">da Busca</span>
          </h2>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-700">
              <Search size={40} />
            </div>
            <p className="text-gray-500 font-bold tracking-widest uppercase italic text-xs">Nenhum lead encontrado para os critérios selecionados.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 items-start relative z-10"
          >
            {results.map((res, idx) => (
              <LocationMap
                key={idx}
                {...res}
                className="w-full"
              />
            ))}
          </motion.div>
        )}

        <div className="mt-40 opacity-20 flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-[1em] italic font-mono">Nexbuild_Elite_Search_Complete</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020205] text-[#94A3B8] p-8 animate-in fade-in duration-700 overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full max-w-[850px] flex items-center mb-8 relative z-10">
        <button
          onClick={() => setView('welcome')}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>
      </div>

      {/* Main Search Dashboard Card */}
      <div className="w-full max-w-[850px] relative z-10 mx-auto">
        <div className="bg-[#0F0F12]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] space-y-12">

          {/* Header */}
          <div className="space-y-1">
            <p className="text-[9px] font-black text-purple-500 uppercase tracking-[0.4em] italic">NEXBUILD INTELLIGENCE</p>
            <div className="flex items-center gap-4">
              <h2 className="text-[42px] font-black text-white tracking-tighter leading-none">Buscar Leads</h2>
              <div className="flex items-center gap-2 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">AI Online</span>
              </div>
            </div>
          </div>

          {/* Primary Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Nicho</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ex: Hamburgueria"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-lg font-bold text-white placeholder-gray-800 focus:outline-none focus:border-purple-500/50 transition-all"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-500 group-focus-within:w-full transition-all duration-700" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Localização</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ex: São Paulo, SP"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-lg font-bold text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 group-focus-within:w-full transition-all duration-700" />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          {/* Criteria & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Critérios de busca</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500">Mínimo de Estrelas</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-black text-purple-400">{rating.toFixed(1)}+</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={8} className={i <= Math.floor(rating) ? 'text-purple-400 fill-purple-400' : 'text-gray-800'} />)}
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0" max="5" step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none accent-purple-500 cursor-pointer"
                />
                <p className="text-[9px] text-gray-600 font-medium leading-relaxed italic">
                  Empresas com notas mais baixas costumam estar mais abertas a melhorias.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest invisible md:visible">_</h4>
              <div className="space-y-4">
                <span className="text-[11px] font-bold text-gray-500 block">Máximo de avaliações</span>
                <div className="relative">
                  <select className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white appearance-none focus:outline-none focus:border-purple-500/50 transition-all">
                    <option>Qualquer</option>
                    <option>Menos de 10</option>
                    <option>Entre 10 e 50</option>
                    <option>Mais de 50</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                </div>
                <p className="text-[9px] text-gray-600 font-medium leading-relaxed italic">
                  Empresas com menos avaliações tendem a ser mais acessíveis para contato.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          {/* Mode & Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Modo de busca</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setStrategy('all')}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${strategy === 'all'
                    ? 'bg-purple-500/10 border-purple-500/40'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${strategy === 'all' ? 'text-purple-400 bg-purple-400/10' : 'text-gray-600 bg-white/5'}`}>
                    <GlobeIcon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white tracking-tight">Todas as empresas</p>
                    <p className="text-[9px] text-gray-500 font-medium mt-0.5 italic">Busca em toda a base disponível.</p>
                  </div>
                </button>

                <button
                  onClick={() => setStrategy('nosite')}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${strategy === 'nosite'
                    ? 'bg-purple-500/10 border-purple-500/40'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className="absolute top-3 right-3 px-1.5 py-0.5 bg-purple-500 text-white text-[7px] font-black rounded tracking-widest">Recomendado</div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${strategy === 'nosite' ? 'text-purple-400 bg-purple-400/10' : 'text-gray-600 bg-white/5'}`}>
                    <LinkIcon size={20} className="rotate-45" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white tracking-tight">Empresas sem site</p>
                    <p className="text-[9px] text-gray-500 font-medium mt-0.5 italic">Filtra leads com mayor potencial.</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Canal disponível</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setChannel('instagram')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${channel === 'instagram' ? 'bg-purple-500/10 border-purple-500/40 text-white' : 'bg-white/[0.01] border-white/5 text-gray-600 hover:text-gray-400'}`}
                >
                  <Instagram size={14} />
                  <span className="text-[10px] font-bold">Instagram</span>
                </button>
                <button
                  onClick={() => setChannel('phone')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${channel === 'phone' ? 'bg-purple-500/10 border-purple-500/40 text-white' : 'bg-white/[0.01] border-white/5 text-gray-600 hover:text-gray-400'}`}
                >
                  <Phone size={14} />
                  <span className="text-[10px] font-bold">Telefone</span>
                </button>
                <button
                  onClick={() => setChannel('email')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${channel === 'email' ? 'bg-purple-500/10 border-purple-500/40 text-white' : 'bg-white/[0.01] border-white/5 text-gray-600 hover:text-gray-400'}`}
                >
                  <Mail size={14} />
                  <span className="text-[10px] font-bold">E-mail</span>
                </button>
                <button
                  onClick={() => setChannel('any')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${channel === 'any' ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/[0.01] border-white/5 text-gray-600 hover:text-gray-400'}`}
                >
                  <GlobeIcon size={14} />
                  <span className="text-[10px] font-bold">Qualquer</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <button
              onClick={handleSearch}
              disabled={isSearching || !niche || !location}
              className={`group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[24px] font-black text-[12px] uppercase tracking-[0.4em] italic shadow-[0_15px_40px_-8px_rgba(124,58,237,0.5)] hover:scale-105 active:scale-95 transition-all duration-700 overflow-hidden flex items-center justify-center gap-4 border border-white/20 ${isSearching ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sincronizando...</span>
                </>
              ) : (
                <>
                  <Search size={18} strokeWidth={3} />
                  <span>Buscar Leads</span>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-10 h-10 rounded-full bg-[#0F0F12] border border-white/10 flex items-center justify-center text-gray-600 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-md">
          <TrendingUp size={18} className="rotate-[-45deg]" />
        </div>
      </div>
    </div>
  );
};

export default Prospector;