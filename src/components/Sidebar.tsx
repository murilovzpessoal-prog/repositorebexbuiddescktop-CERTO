import React from 'react';
import { User as UserIcon, Zap } from 'lucide-react';
import { NexbuildLogo } from './ui';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (id: string) => void;
  onLogout: () => void;
  userName?: string;
  userRole?: string;
  userPhoto?: string;
  academyProgress?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  setActiveTab,
  onLogout,
  userName = "Usuário",
  userRole = "Membro",
  userPhoto = "",
  academyProgress = 0
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral' },
    { id: 'materializar_sas', label: 'Materializar SAS' },
    { id: 'projects', label: 'Meus Projetos' },
    { id: 'lp', label: 'Landing Page' },
    { id: 'prospector', label: 'Prospector' },
    { id: 'copywriter', label: 'Copywriter IA' },
    { id: 'contracts', label: 'Contratos' },
    { id: 'academy', label: 'Academy' },
    { id: 'team', label: 'Equipe' },
    { id: 'help', label: 'Ajuda' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#020203] flex flex-col transition-all duration-500 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-[40px_0_100px_rgba(0,0,0,0.5)]`}>
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#A855F7]/10 to-transparent z-20" />

      <div className="pt-16 pb-12 px-12 relative">
        <NexbuildLogo onClick={() => setActiveTab('dashboard')} />
        <div className="mt-8 relative flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] relative z-10" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500 via-purple-500/20 to-transparent opacity-40 ml-[-2px]" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-12 py-4 space-y-1 no-scrollbar relative z-10 scroll-smooth">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center py-3.5 transition-all duration-300 group relative ${isActive ? 'text-white' : 'text-gray-600 hover:text-white/70'
                }`}
            >
              <span className={`text-[13px] tracking-tight transition-all duration-300 antialiased ${isActive ? "font-black" : "font-medium"
                }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -left-12 w-[2px] h-4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Persistence Visibility: Progress Hub */}
      <div className="px-12 py-6 border-t border-white/[0.02] bg-white/[0.01]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={10} className="text-purple-500" />
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Protocolo Academy</span>
          </div>
          <span className="text-[10px] font-black text-white italic">{academyProgress}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${academyProgress}%` }} />
        </div>
      </div>

      <div className="p-12 mt-auto border-t border-white/[0.02]">
        <div className="space-y-8">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab('settings')}>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-purple-500/40 transition-colors">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={18} className="text-gray-700" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[12px] font-black text-white uppercase tracking-tight antialiased truncate max-w-[100px]">{userName || "Usuário"}</span>
                <span className="text-[8px] font-black text-white/20 border border-white/10 px-1.5 py-0.5 rounded tracking-widest uppercase shrink-0">Pro</span>
              </div>
              <span className="text-[10px] text-gray-700 font-bold tracking-tight uppercase antialiased opacity-60 truncate">{userRole || "Acesso Master"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.03]">
            <button
              onClick={() => setActiveTab('settings')}
              className={`text-left text-[9px] font-black uppercase tracking-[0.3em] transition-all italic antialiased ${activeTab === 'settings' ? 'text-white' : 'text-gray-700 hover:text-white/60'
                }`}
            >
              Configurações
            </button>
            <button
              onClick={onLogout}
              className="text-left text-[9px] font-black text-red-950/30 hover:text-red-600/60 uppercase tracking-[0.3em] transition-all italic antialiased"
            >
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;