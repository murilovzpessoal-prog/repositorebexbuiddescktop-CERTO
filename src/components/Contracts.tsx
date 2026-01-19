
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Trash2, 
  Calendar
} from 'lucide-react';
import ContractBuilder from './ContractBuilder';

export interface Contract {
  id: string;
  client: string;
  project: string;
  status: 'ASSINADO' | 'PENDENTE' | 'RASCUNHO';
  date: string;
  value: string;
  // Variáveis extras para persistência total no builder
  providerName?: string;
  providerCnpj?: string;
  providerAddress?: string;
  clientCnpj?: string;
  clientAddress?: string;
}

interface ContractsProps {
  contracts: Contract[];
  onUpdateContracts: (contracts: Contract[]) => void;
}

const Contracts: React.FC<ContractsProps> = ({ contracts, onUpdateContracts }) => {
  const [view, setView] = useState<'list' | 'builder'>('list');
  const [search, setSearch] = useState('');
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const handleOpenBuilder = (contract?: Contract) => {
    if (contract) {
      setEditingContract(contract);
    } else {
      setEditingContract(null);
    }
    setView('builder');
  };

  const handleSaveContract = (newContractData: any) => {
    const isUpdate = !!editingContract;
    
    const contractEntry: Contract = {
      id: isUpdate ? editingContract!.id : Date.now().toString(),
      client: newContractData.clientName || 'Cliente Indefinido',
      project: newContractData.contractObject || 'Projeto Indefinido',
      status: newContractData.status || 'PENDENTE',
      date: isUpdate ? editingContract!.date : new Date().toLocaleDateString('pt-BR'),
      value: newContractData.value || '0',
      // Mantendo dados brutos para reeditação perfeita
      providerName: newContractData.providerName,
      providerCnpj: newContractData.providerCnpj,
      providerAddress: newContractData.providerAddress,
      clientCnpj: newContractData.clientCnpj,
      clientAddress: newContractData.clientAddress
    };

    if (isUpdate) {
      onUpdateContracts(contracts.map(c => c.id === contractEntry.id ? contractEntry : c));
    } else {
      onUpdateContracts([contractEntry, ...contracts]);
    }
    
    setEditingContract(null);
    setView('list');
  };

  const getStatusStyle = (status: Contract['status']) => {
    switch (status) {
      case 'ASSINADO': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'PENDENTE': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'RASCUNHO': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (view === 'builder') {
    return <ContractBuilder initialData={editingContract} onBack={() => setView('list')} onComplete={handleSaveContract} />;
  }

  // LÓGICA DE MÉTRICAS CORRIGIDA: Apenas 'ASSINADO' conta para Faturamento e Ativos
  const totalRevenue = contracts
    .filter(c => c.status === 'ASSINADO')
    .reduce((acc, curr) => acc + parseFloat(curr.value.replace(/\./g, '').replace(',', '.') || '0'), 0);
  
  const activeContracts = contracts.filter(c => c.status === 'ASSINADO').length;
  const pendingContracts = contracts.filter(c => c.status === 'PENDENTE').length;

  const filtered = contracts.filter(c => 
    c.client.toLowerCase().includes(search.toLowerCase()) || 
    c.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-[40px] font-black text-white tracking-tighter leading-none italic uppercase">Gestão de Contratos</h2>
          <p className="text-slate-400 font-medium">Crie, assine e organize seus documentos legais.</p>
        </div>
        <button onClick={() => handleOpenBuilder()} className="flex items-center gap-3 bg-gradient-to-r from-[#7C3AED] to-[#502bb6] text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all uppercase text-xs tracking-[0.2em] active:scale-95 shadow-xl">
          <Plus size={18} />Novo Contrato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F0F12] border border-white/5 rounded-[24px] p-8 flex items-center justify-between shadow-xl relative overflow-hidden group">
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Faturamento Contratado</p>
            <h4 className="text-3xl font-black text-white tracking-tight">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-white relative z-10">
            <DollarSign size={24} />
          </div>
        </div>
        <div className="bg-[#0F0F12] border border-white/5 rounded-[24px] p-8 flex items-center justify-between shadow-xl relative overflow-hidden group">
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Ativos</p>
            <h4 className="text-3xl font-black text-white tracking-tight">{activeContracts}</h4>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] relative z-10">
            <Briefcase size={24} />
          </div>
        </div>
        <div className="bg-[#0F0F12] border border-white/5 rounded-[24px] p-8 flex items-center justify-between shadow-xl relative overflow-hidden group">
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Pendentes</p>
            <h4 className="text-3xl font-black text-white tracking-tight">{pendingContracts}</h4>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 relative z-10">
            <Clock size={24} />
          </div>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por cliente, projeto ou status..." 
          className="w-full bg-[#0F0F12] border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-all font-medium" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        <button onClick={() => handleOpenBuilder()} className="group flex flex-col items-center justify-center space-y-4 rounded-[32px] border-2 border-dashed border-white/10 bg-transparent hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all duration-300 min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-[#16161A] border border-white/5 flex items-center justify-center text-gray-600 group-hover:text-[#7C3AED] group-hover:scale-110 transition-all shadow-xl">
            <Plus size={32} />
          </div>
          <span className="text-[10px] font-black text-gray-600 group-hover:text-white uppercase tracking-[0.2em] transition-colors">Criar Novo Contrato</span>
        </button>

        {filtered.map((contract) => (
          <div 
            key={contract.id} 
            onClick={() => handleOpenBuilder(contract)}
            className="group bg-[#0F0F12] border border-white/5 rounded-[32px] p-8 flex flex-col space-y-8 hover:border-[#7C3AED]/40 transition-all duration-300 shadow-2xl relative overflow-hidden cursor-pointer"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#7C3AED] transition-colors">
                <FileText size={24} />
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(contract.status)}`}>{contract.status}</div>
                <button onClick={(e) => { e.stopPropagation(); onUpdateContracts(contracts.filter(c => c.id !== contract.id)); }} className="text-gray-700 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2 relative z-10">
              <h3 className="text-xl font-bold text-white tracking-tight leading-none">{contract.client}</h3>
              <p className="text-xs text-gray-500 font-medium">{contract.project}</p>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{contract.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-black text-white">R$ {contract.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracts;
