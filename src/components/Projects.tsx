import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Zap, 
  Clock, 
  Calendar
} from 'lucide-react';
import ProjectEdit from './ProjectEdit';
import { Project } from '../App';

interface ProjectsProps {
  projects: Project[];
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
  onGenerateUpdate: (data: any) => void;
}

const ProjectCard: React.FC<{ project: Project; onEdit: (p: Project) => void; onDelete: (id: string) => void }> = ({ project, onEdit, onDelete }) => {
  return (
    <div 
      onClick={() => onEdit(project)}
      className="group bg-[#0F0F12] border border-white/5 rounded-[24px] p-8 flex flex-col space-y-8 hover:border-[#7C3AED]/40 transition-all duration-300 shadow-xl cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between relative z-10">
        <h3 className="text-xl font-bold text-white tracking-tight">{project.name}</h3>
        <span className="px-2.5 py-1 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-md text-[9px] font-black text-[#A855F7] uppercase tracking-widest">
          {project.category}
        </span>
      </div>

      <div className="space-y-3.5 relative z-10">
        <div className="flex items-center gap-3 text-gray-500">
          <Zap size={14} className="text-[#A855F7]" />
          <p className="text-xs font-medium">PLATAFORMA: <span className="text-white ml-1">{project.platform}</span></p>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Clock size={14} />
          <p className="text-xs font-medium">ATUALIZADO: <span className="text-white ml-1">{project.updatedAt}</span></p>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Calendar size={14} />
          <p className="text-xs font-medium">CRIADO EM: <span className="text-white ml-1">{project.createdAt}</span></p>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-5 relative z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(project); }}
          className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          EDITAR
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
          className="text-[11px] font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest"
        >
          EXCLUIR
        </button>
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ projects, onDeleteProject, onNewProject, onGenerateUpdate }) => {
  const [search, setSearch] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  if (editingProject) {
    return <ProjectEdit 
      project={editingProject} 
      onBack={() => setEditingProject(null)} 
      onGenerate={onGenerateUpdate}
    />;
  }

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <h2 className="text-[40px] font-bold text-white tracking-tighter leading-none">Meus Projetos</h2>
          <p className="text-slate-400 font-medium max-w-xl">
            Selecione um projeto para carregar o prompt e solicitar uma atualização.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0F0F12] border border-white/5 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all w-64 font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#0F0F12] border border-white/5 rounded-full text-xs font-bold text-white hover:border-white/10 transition-all">
            <SlidersHorizontal size={14} className="text-gray-500" />
            Ordenar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        <button 
          onClick={onNewProject}
          className="group flex flex-col items-center justify-center space-y-4 rounded-[24px] border-2 border-dashed border-white/10 bg-transparent hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all duration-300 min-h-[300px]"
        >
          <div className="w-14 h-14 rounded-full bg-[#16161A] border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-[#7C3AED] group-hover:scale-110 transition-all">
            <Plus size={28} />
          </div>
          <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">Criar Novo Projeto</span>
        </button>

        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onEdit={(p) => setEditingProject(p)} 
            onDelete={onDeleteProject} 
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;