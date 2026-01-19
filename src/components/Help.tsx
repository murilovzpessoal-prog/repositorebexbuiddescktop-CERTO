import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  ChevronRight,
  ChevronDown,
  Search,
  MessageSquare,
  Zap,
  ShieldCheck
} from 'lucide-react';

interface Question {
  id: number;
  title: string;
  answer: string;
}

const QUESTIONS: Question[] = [
  { 
    id: 1, 
    title: 'O que é a Nexbuild?', 
    answer: 'A Nexbuild é um ecossistema soberano de engenharia e materialização de softwares. Nossa plataforma utiliza Inteligência Artificial de ponta para transformar ideias de negócios em estruturas técnicas prontas para o mercado, acelerando o desenvolvimento de aplicações SaaS e produtos digitais.' 
  },
  { 
    id: 2, 
    title: 'Para quem a Nexbuild é indicada?', 
    answer: 'É indicada para founders, engenheiros de software, agências e empreendedores que desejam construir produtos digitais de alta performance sem as barreiras tradicionais do desenvolvimento lento. Se você busca escala, velocidade e design premium, a Nexbuild é o seu ambiente ideal.' 
  },
  { 
    id: 3, 
    title: 'A Nexbuild é um software ou uma plataforma SaaS?', 
    answer: 'A Nexbuild é uma plataforma SaaS (Software as a Service) que fornece um conjunto de ferramentas inteligentes para que você possa criar, gerenciar e evoluir seus próprios softwares e landing pages.' 
  },
  { 
    id: 4, 
    title: 'O que significa “materializar um SaaS” dentro da Nexbuild?', 
    answer: 'Materializar significa tirar a ideia do campo abstrato e transformá-la em realidade técnica. Através do nosso motor de IA, geramos o "DNA" do seu projeto (Prompts Estruturados) que contém toda a lógica, design system e arquitetura necessários para que engines de execução criem o código final.' 
  },
  { 
    id: 5, 
    title: 'Qual a diferença entre começar com um modelo pronto e criar um projeto do zero?', 
    answer: 'Os "Modelos Elite" são esqueletos validados por especialistas para nichos específicos (como Delivery ou Imobiliárias), ideais para quem busca velocidade máxima. "Criar do Zero" utiliza nosso Wizard guiado para forjar uma arquitetura exclusiva e personalizada para ideias inovadoras.' 
  },
  { 
    id: 6, 
    title: 'Posso usar um modelo e depois personalizar completamente?', 
    answer: 'Com certeza. Os modelos servem como uma base sólida de alta performance. Após selecionar um modelo, você passa por etapas de personalização onde pode alterar a proposta de valor, as cores, a tipografia e as funcionalidades centrais.' 
  },
  { 
    id: 7, 
    title: 'Preciso ter conhecimento técnico ou saber programar para usar a Nexbuild?', 
    answer: 'Não. A Nexbuild foi desenhada para ser o tradutor entre sua visão de negócios e a execução técnica. Nossa interface e o Wizard de Materialização guiam você por todo o processo lógico, eliminando a necessidade de escrever código manualmente.' 
  },
  { 
    id: 8, 
    title: 'O que é um Prompt Message dentro da Nexbuild?', 
    answer: 'O Prompt Message é um documento técnico ultra-especificado gerado pela nossa IA. Ele não é apenas um texto comum, mas uma arquitetura de software completa descrita em uma linguagem otimizada para ser interpretada por motores de desenvolvimento como Lovable, Bolt ou v0.' 
  },
  { 
    id: 9, 
    title: 'O que devo fazer após gerar um Prompt Message?', 
    answer: 'Basta copiar o Prompt gerado e utilizá-lo na plataforma de destino (como a Lovable). Lá, a IA de execução lerá nossas diretrizes de arquitetura e construirá a interface e as funcionalidades exatamente como planejado no estúdio Nexbuild.' 
  },
  { 
    id: 10, 
    title: 'Como utilizar o Prompt Message para criar ou evoluir meu projeto?', 
    answer: 'Para criar, cole o prompt inicial em uma engine vazia. Para evoluir, utilize a seção "Meus Projetos" na Nexbuild, solicite uma atualização específica (como "Adicionar Login") e a plataforma gerará um novo prompt de incremento para você aplicar ao projeto existente.' 
  },
  { 
    id: 11, 
    title: 'Posso editar ou reutilizar um Prompt Message depois?', 
    answer: 'Sim. Todos os seus projetos ficam salvos na sua conta. Você pode acessar o histórico, ver os parâmetros utilizados e gerar novas versões dos prompts sempre que necessário.' 
  },
  { 
    id: 12, 
    title: 'A Nexbuild permite criar diferentes tipos de projetos?', 
    answer: 'Sim. Você pode materializar desde Landing Pages de alta conversão até Dashboards complexos, sistemas de gestão (CRM), E-commerces e plataformas de serviços por assinatura.' 
  },
  { 
    id: 13, 
    title: 'Onde encontro suporte caso tenha dúvidas técnicas?', 
    answer: 'Oferecemos suporte direto via Chat ao Vivo (clicando no card correspondente nesta página) para assinantes Pro, além de suporte via E-mail para questões de conta e faturamento.' 
  },
  { 
    id: 14, 
    title: 'A Nexbuild é indicada para iniciantes?', 
    answer: 'Sim. O fluxo de trabalho é intuitivo e remove a complexidade da infraestrutura de software. O sistema guia o iniciante desde a definição do nicho até a geração do material de lançamento.' 
  },
  { 
    id: 15, 
    title: 'Posso escalar um projeto criado na Nexbuild futuramente?', 
    answer: 'Sim. Como os prompts gerados seguem padrões de arquitetura modernos (Clean Code e UI Componentizada), o código final é escalável, permitindo que você adicione desenvolvedores humanos ou infraestruturas de nuvem robustas conforme seu negócio cresce.' 
  },
];

const Help: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-1 flex flex-col items-center min-h-screen py-12 px-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-4">
          <ShieldCheck size={12} className="text-purple-400" />
          <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest italic">Nexbuild_Support_Protocol</span>
        </div>
        <h2 className="text-[48px] font-black text-white tracking-tighter leading-none italic uppercase">
          Central de <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 pr-2">Ajuda</span>
        </h2>
        <p className="text-slate-500 text-lg font-medium italic opacity-80 max-w-xl mx-auto">
          Sincronize sua mente com o funcionamento da plataforma e acelere sua materialização.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
        <div className="group bg-[#0D0D0F] border border-white/5 rounded-[32px] p-10 flex flex-col items-center text-center space-y-6 hover:border-[#7C3AED]/40 transition-all cursor-pointer shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[40px] pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform shadow-xl">
            <HelpCircle size={32} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white tracking-tight uppercase italic">Abrir um ticket</h4>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
              Nossa equipe de suporte responderá em até 24 horas
            </p>
          </div>
        </div>

        <a 
          href="https://www.contate.me/nexbuild" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-[#0D0D0F] border border-white/5 rounded-[32px] p-10 flex flex-col items-center text-center space-y-6 hover:border-emerald-500/40 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[40px] pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-xl">
            <MessageCircle size={32} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white tracking-tight uppercase italic">Suporte via WhatsApp</h4>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
              Fale diretamente com nossa equipe pelo WhatsApp para suporte rápido e orientado
            </p>
          </div>
        </a>

        <div className="group bg-[#0D0D0F] border border-white/5 rounded-[32px] p-10 flex flex-col items-center text-center space-y-6 hover:border-[#A855F7]/40 transition-all cursor-pointer shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-[40px] pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] border border-[#A855F7]/20 group-hover:scale-110 transition-transform shadow-xl">
            <Mail size={32} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white tracking-tight uppercase italic">E-mail Operacional</h4>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
              Tickets para casos complexos.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Questions List - Accordion Style */}
      <div className="w-full max-w-5xl bg-[#0D0D0F] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl mb-32">
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-4">
             <MessageSquare size={20} className="text-purple-500" />
             <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Perguntas Frequentes_</h3>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Base Atualizada</span>
          </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="group">
              <button 
                onClick={() => toggleQuestion(q.id)}
                className="w-full flex items-center justify-between p-8 hover:bg-white/[0.02] transition-all text-left"
              >
                <span className={`text-base font-bold tracking-tight transition-colors ${expandedId === q.id ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'}`}>
                  {q.title}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all ${expandedId === q.id ? 'bg-purple-600 text-white rotate-180' : 'text-gray-600 group-hover:text-white'}`}>
                  {expandedId === q.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
              </button>
              
              {expandedId === q.id && (
                <div className="px-8 pb-10 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[24px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-600/40" />
                    <p className="text-slate-400 text-base leading-relaxed font-medium italic">
                      {q.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Sync Footer */}
      <div className="flex items-center justify-center gap-8 pb-16 opacity-30">
        <Zap size={14} className="text-purple-400 animate-pulse" />
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-[1.2em] italic font-mono">Nexbuild_Intelligence_Sync_Terminal</span>
      </div>
    </div>
  );
};

export default Help;