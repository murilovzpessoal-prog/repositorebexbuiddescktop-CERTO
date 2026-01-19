
import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  Building2, 
  Camera, 
  Lock, 
  Save, 
  ShieldCheck,
  Circle
} from 'lucide-react';
import { UserData } from '../App';

interface SettingsProps {
  user: UserData;
  onUpdateUser: (data: UserData) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [localUser, setLocalUser] = useState<UserData>(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLocalUser(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setLocalUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    onUpdateUser(localUser);
    alert('Configurações salvas com sucesso e sincronizadas com o sistema!');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Input de arquivo invisível */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/webp" 
        className="hidden" 
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[32px] font-bold text-white tracking-tighter leading-tight">
            Meu Perfil
          </h2>
          <p className="text-slate-400 mt-1 font-medium">
            Gerencie suas informações pessoais e credenciais de acesso.
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.1)]">
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full blur-[4px] opacity-70" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Conta Ativa</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Personal Info Card */}
        <div className="col-span-12 lg:col-span-8 bg-[#0F0F12] border border-[#1E1E22] rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/5 blur-[100px] pointer-events-none" />

          {/* Profile Header section */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <div className="w-28 h-28 rounded-full border-2 border-[#7C3AED] p-1 shadow-[0_0_20px_rgba(124,58,237,0.2)] bg-black overflow-hidden flex items-center justify-center">
                {localUser.photo ? (
                  <img 
                    src={localUser.photo} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <User size={48} className="text-gray-800" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Camera size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-[#7C3AED] w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#0F0F12] shadow-lg group-hover:scale-110 transition-transform">
                <Camera size={14} className="text-white" />
              </div>
            </div>

            <div className="text-center sm:text-left space-y-3">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{localUser.name || "Nome não definido"}</h3>
                <p className="text-[#94A3B8] font-medium">{localUser.role || "Cargo"} {localUser.company ? `at ${localUser.company}` : ""}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg text-[10px] font-black text-[#7C3AED] uppercase tracking-wider">Plano Pro</span>
                <span className="px-3 py-1 bg-[#1E1E22] border border-[#2D2D33] rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-wider">Member Since 2025</span>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-[#1E1E22] pb-4">
              <User size={18} className="text-[#7C3AED]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">Informações Pessoais</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} />
                  Nome Completo
                </label>
                <input 
                  type="text" 
                  value={localUser.name}
                  placeholder="Seu nome completo"
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} />
                  Email Corporativo
                </label>
                <input 
                  type="email" 
                  value={localUser.email}
                  placeholder="exemplo@email.com"
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Building2 size={12} />
                  Empresa
                </label>
                <input 
                  type="text" 
                  value={localUser.company}
                  placeholder="Nome da sua empresa"
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase size={12} />
                  Cargo
                </label>
                <input 
                  type="text" 
                  value={localUser.role}
                  placeholder="Seu cargo operacional"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button 
                onClick={handleSaveChanges}
                className="flex items-center gap-2.5 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Save size={18} />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="col-span-12 lg:col-span-4 bg-[#0F0F12] border border-[#1E1E22] rounded-[32px] p-8 md:p-10 shadow-2xl">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <Lock size={20} />
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">Segurança & Senha</h4>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed font-medium">
              Para sua segurança, escolha uma senha forte com no mínimo 8 caracteres, incluindo números e símbolos.
            </p>

            <div className="space-y-5">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Senha Atual</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nova Senha</label>
                <input 
                  type="password" 
                  placeholder="Nova senha segura"
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  placeholder="Repita a nova senha"
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
            </div>

            <button className="w-full py-3.5 rounded-xl border border-[#2D2D33] text-white font-bold hover:bg-white/5 transition-all active:scale-[0.98] mt-4">
              Atualizar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
