import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Database,
  Activity,
  Globe,
  PenTool,
  Search,
  FileText,
  LayoutTemplate,
  Zap,
  Box,
  TrendingUp,
  Clock,
  MoreHorizontal,
  ChevronRight,
  User,
  Layout,
  MousePointer2
} from 'lucide-react';
import { ToolCardData } from '../types';
import { UserActivity } from '../App';
import { supabase } from '../lib/supabase';

interface DashboardProps {
  projectsCount?: number;
  activities?: UserActivity[];
  onTabChange?: (id: string) => void;
}

const TOOLS: ToolCardData[] = [
  {
    title: 'Prospector',
    subtitle: 'Busca Inteligente',
    icon: <Search size={22} />,
    iconBg: 'bg-blue-500/10 text-blue-400'
  },
  {
    title: 'Copywriter AI',
    subtitle: 'Sempre Coerente',
    icon: <PenTool size={22} />,
    iconBg: 'bg-purple-500/10 text-purple-400'
  },
  {
    title: 'Contratos',
    subtitle: 'Jurídico Automático',
    icon: <FileText size={22} />,
    iconBg: 'bg-cyan-500/10 text-cyan-400'
  },
  {
    title: 'Landing Pages',
    subtitle: 'Conversão em Hub',
    icon: <LayoutTemplate size={22} />,
    iconBg: 'bg-indigo-500/10 text-indigo-400'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ projectsCount = 0, activities = [], onTabChange }) => {
  const [strategicContext, setStrategicContext] = useState<any>(null);

  useEffect(() => {
    fetchStrategicContext();
  }, []);

  const fetchStrategicContext = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_intelligence_context')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) setStrategicContext(data);
      }
    } catch (error) {
      console.error('Error fetching context:', error);
    }
  };

  const getActivityIcon = (type: UserActivity['type']) => {
    switch (type) {
      case 'project': return <Layout size={12} className="text-blue-400" />;
      case 'lead': return <MousePointer2 size={12} className="text-purple-400" />;
      case 'contract': return <FileText size={12} className="text-cyan-400" />;
      case 'profile': return <User size={12} className="text-emerald-400" />;
      default: return <Zap size={12} className="text-gray-400" />;
    }
  };

  const handleToolClick = (title: string) => {
    if (!onTabChange) return;
    switch (title) {
      case 'Prospector': onTabChange('prospector'); break;
      case 'Copywriter AI': onTabChange('copywriter'); break;
      case 'Contratos': onTabChange('contracts'); break;
      case 'Landing Pages': onTabChange('lp'); break;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">

      {/* Top Row: Hero + Active Projects */}
      <div className="grid grid-cols-12 gap-6">

        {/* Main Featured Card - Materializar Saas */}
        <div className="col-span-12 lg:col-span-8 relative group overflow-hidden rounded-[32px] bg-[#0F0F12] border border-white/5 p-10 flex flex-col justify-between min-h-[440px] shadow-2xl transition-all duration-500 hover:border-purple-500/30">

          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.1),transparent_50%)]" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Zap size={12} className="text-yellow-400" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IA Architect 4.0</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-6xl font-black text-white tracking-tighter leading-none italic pr-8">
                Materializar <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 pr-2">Saas</span>
              </h3>
              <p className="text-lg text-[#94A3B8] max-w-lg leading-relaxed font-medium">
                Transforme sua ideia de aplicativo em um prompt de desenvolvimento detalhado, pronto para ser implementado por uma IA.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-auto">
            <button
              onClick={() => onTabChange?.('materializar_sas')}
              className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-purple-500/20 active:scale-95 group/btn"
            >
              <span>Iniciar Projeto</span>
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>

            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F0F12] bg-[#1A1A20] flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#0F0F12] bg-[#1A1A20] flex items-center justify-center text-[10px] font-bold text-gray-500">
                +12
              </div>
            </div>
          </div>
        </div>

        {/* Database Stats Card (Column 4) */}
        <div className="col-span-12 lg:col-span-4 rounded-[32px] bg-[#0F0F12] border border-white/5 p-10 flex flex-col relative overflow-hidden shadow-2xl group transition-all duration-500 hover:border-blue-500/30">

          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-all duration-700" />

          <div className="flex items-center justify-between mb-10 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/5 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5">
              <Database size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 mb-1">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none">Live Sync</span>
              </div>
              <button className="text-gray-600 hover:text-white transition-colors p-1">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-1 relative z-10">
            <div className="relative">
              <svg className="absolute -bottom-2 left-0 w-full h-24 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0 40 L0 30 Q 10 20, 20 25 T 40 15 T 60 22 T 80 5 T 100 12 L 100 40 Z" fill="url(#blue_grad_fixed)" />
                <defs>
                  <linearGradient id="blue_grad_fixed" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
              <h4 className="text-[96px] font-black text-white leading-none tracking-tighter italic">{projectsCount}</h4>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                <TrendingUp size={12} />
                <span>+0%</span>
              </div>
              <p className="text-[#94A3B8] text-[11px] font-black uppercase tracking-[0.2em]">Projetos Ativos</p>
            </div>
          </div>

          <div className="mt-auto space-y-5 pt-8 border-t border-white/5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white tracking-tight">Cloud Storage</span>
              <span className="text-xl font-black text-blue-500">0<span className="text-xs ml-0.5">%</span></span>
            </div>
            <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }} />
            </div>
            <div className="flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-widest">
              <span>0 GB USADOS</span>
              <span>20 GB TOTAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Tools & Ultra-Compact Recent Activity */}
      <div className="grid grid-cols-12 gap-6 pb-12">

        {/* Growth Engine Grid (Column 8) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-purple-500" />
              <h4 className="text-[11px] font-black tracking-[0.25em] text-gray-500 uppercase">Growth Engine</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map((tool, idx) => (
              <div
                key={idx}
                onClick={() => handleToolClick(tool.title)}
                className="group bg-[#0F0F12] border border-white/5 p-6 rounded-[24px] hover:bg-[#16161D] hover:border-white/10 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner ${tool.iconBg}`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-white font-bold text-lg leading-tight tracking-tight">{tool.title}</h5>
                    <p className="text-sm text-[#94A3B8] font-medium truncate">{tool.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra-Compact Integrated Recent Activity (Column 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="bg-[#0F0F12] border border-white/5 rounded-[32px] p-6 shadow-2xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity size={16} className="text-emerald-500" />
                <h4 className="text-[10px] font-black tracking-[0.25em] text-gray-500 uppercase">Atividade</h4>
              </div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
              {activities.length === 0 ? (
                <div className="flex items-center justify-center h-full text-[10px] font-bold text-gray-700 uppercase tracking-widest italic">
                  Nenhuma atividade recente
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((act) => (
                    <div key={act.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3 group/item hover:bg-white/[0.04] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                        {getActivityIcon(act.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-white tracking-tight truncate uppercase italic">{act.label}</p>
                        <p className="text-[9px] text-gray-500 font-medium truncate">{act.description}</p>
                      </div>
                      <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] transition-colors group">
              Ver Logs
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;