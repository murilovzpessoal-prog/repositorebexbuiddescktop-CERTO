/**
 * Nexbuild IA - Intelligence Layer
 * Responsible for intent analysis, context enrichment, and generation of elite prompts/copies.
 */

export type SophisticationLevel = 'simple' | 'professional' | 'premium' | 'aggressive' | 'institutional';

export interface ProjectContext {
    appName?: string;
    niche?: string;
    audience?: string;
    objective?: string;
    mainBenefit?: string;
    sophistication?: SophisticationLevel;
    platform?: string;
    appType?: string;
    designStyle?: string;
    engine?: string;
    language?: string;
    pages?: string;
    font?: string;
    primaryColor?: string;
    secondaryColor?: string;
}

export const analyzeIntent = (inputs: any): string => {
    if (inputs.appName && inputs.appType) return 'product_development';
    if (inputs.targetBusiness && inputs.hook) return 'marketing_copy';
    return 'general_intelligence';
};

// --- EVOLUTIONARY INTELLIGENCE LAYER ---

export interface EvolutionaryContext {
    history: any[];
    userPreferences?: any;
}

/**
 * Extrates patterns from history to avoid repetition and improve depth.
 */
const extractEvolutionaryDirectives = (history: any[]): string => {
    if (!history || history.length === 0) return "";

    const lastGenerations = history.slice(0, 3);
    const usedHooks = lastGenerations.map(g => g.inputs?.hook || "").filter(Boolean);
    const usedPromises = lastGenerations.map(g => g.inputs?.promise || "").filter(Boolean);

    return `
**DIRETRIZES EVOLUTIVAS (BASEADAS NO HISTÓRICO):**
1. **Evitar Repetição de Ganchos**: Já utilizamos "${usedHooks.join(', ')}". Crie algo com uma quebra de padrão diferente.
2. **Evolução de Promessa**: As últimas promessas foram "${usedPromises.join(', ')}". Otimize a sofisticação desta nova entrega para ser mais audaciosa e concreta.
3. **Refinamento Semântico**: Analise o tom das últimas gerações e suba o nível de autoridade em 20%.
`;
};

export const generateProfessionalPrompt = (data: ProjectContext, evolutionaryContext?: EvolutionaryContext): string => {
    const {
        appName = 'Produto_Soberano',
        niche = 'Mercado Premium',
        audience = 'Público Qualificado',
        objective = 'Materializar uma experiência de alto nível',
        mainBenefit = 'Aumentar a eficiência e o faturamento',
        sophistication = 'professional',
        platform = 'Web & Mobile',
        appType = 'Application',
        engine = 'Lovable',
        language = 'Português'
    } = data;

    const evolutionaryDirectives = extractEvolutionaryDirectives(evolutionaryContext?.history || []);

    const sophisticationMap: Record<SophisticationLevel, string> = {
        simple: 'foco em clareza extrema e facilidade de uso',
        professional: 'arquitetura robusta, Clean Code e padrões corporativos',
        premium: 'estética de luxo, animações fluídas e exclusividade visual',
        aggressive: 'foco total em conversão, CTAs dominantes e gatilhos mentais',
        institutional: 'credibilidade, sobriedade e autoridade de marca'
    };

    return `## NEXBUILD ELITE ARCHITECTURE PROTOCOL v3.0 (EVOLUTIONARY) 🚀

**CONTEÚDO ESTRATÉGICO SUPERIOR:**
Você está encarregado de materializar o frontend de ELITE para o projeto "${appName}". 
Nicho: ${niche.toUpperCase()}.
Objetivo: ${objective}.
USP (Unique Selling Proposition): ${mainBenefit}.
${evolutionaryDirectives}

**DIRETRIZES TÉCNICAS (Motor: ${engine}):**
1. **Padrão de Sofisticação:** Nível ${sophistication.toUpperCase()} (${sophisticationMap[sophistication]}).
2. **Público-Alvo:** ${audience}. A UX deve ser cirúrgica para este perfil.
3. **Escopo:** ${appType} otimizado para ${platform}.
4. **Arquitetura:** Componentização atômica, carregamento progressivo e gestão de estado eficiente.
5. **Idioma:** ${language}.

**DESIGN SYSTEM SOBERANO:**
- Utilize o paradigma ${data.designStyle || 'GLASSMORPHISM MODERN'}.
- Tipografia: ${data.font || 'Inter/Syne'} (Hierarquia tipográfica rigorosa).
- Cores: Primária (${data.primaryColor || '#7C3AED'}), Secundária (${data.secondaryColor || '#1F1F1F'}).
- Layout: Micro-interações significativas e profundidade visual (Z-axis).

**INSTRUÇÃO FINAL DE SOBERANIA:**
Este projeto deve superar qualitativamente qualquer interação anterior do usuário. Pense como um arquiteto de software visionário.`;
};

export const generateProfessionalCopy = (params: any, evolutionaryContext?: EvolutionaryContext): string => {
    const {
        targetPerson = 'Lead',
        targetBusiness = 'Empresa',
        userName = 'Estrategista',
        channel = 'whatsapp',
        hook = '',
        pain = '',
        solution = '',
        promise = ''
    } = params;

    const evolutionaryDirectives = extractEvolutionaryDirectives(evolutionaryContext?.history || []);

    // --- ETAPA 1: Interpretação e Expansão Inteligente ---
    const cleanPain = pain.trim() || 'falta de processos eficientes';
    const cleanHook = hook.trim() || `notei o trabalho que vocês realizam na ${targetBusiness}`;
    const cleanSolution = solution.trim() || 'nossa metodologia de aceleração';
    const cleanPromise = promise.trim() || 'uma operação mais lucrativa e previsível';

    // --- ETAPA 2 & 3: Adaptação por Canal e Estrutura Elite ---
    const strategies: Record<string, string> = {
        whatsapp: `Oi ${targetPerson}, tudo bem? Aqui é o ${userName}.

${cleanHook}. Notei que muitas empresas no seu setor estão travadas por causa de ${cleanPain}, o que gera um desgaste invisível no caixa.

O ${cleanSolution} resolve exatamente esse gargalo, garantindo ${cleanPromise}.

Faz sentido eu te enviar o diagnóstico que montei para a ${targetBusiness}?`,

        linkedin: `Olá, ${targetPerson}.

Acompanho os movimentos da ${targetBusiness} e decidi entrar em contato porque ${cleanHook}. 

Muitos decisores têm relatado desafios com ${cleanPain}, impactando a escala. Implementamos o ${cleanSolution} justamente para entregar ${cleanPromise} com previsibilidade.

Podemos agendar uma breve conversa estratégica?`,

        instagram: `Ei ${targetPerson}! 👋 

${cleanHook}. Notei que vocês ainda podem estar sofrendo com ${cleanPain} na ${targetBusiness}.

Já imaginou trocar isso por ${cleanPromise}? É o que o ${cleanSolution} entrega. 

Te mandei um diagnóstico exclusivo. Bora elevar o nível?`,

        email: `Assunto: Visão Estratégica para ${targetBusiness}

Olá, ${targetPerson}.

Meu nome é ${userName} e ${cleanHook}.

O desafio de ${cleanPain} pode estar impedindo que a ${targetBusiness} atinja o nível de eficiência esperado. O ${cleanSolution} foi forjado para garantir ${cleanPromise}.

Teria 5 minutos para validarmos se essa estratégia faz sentido agora?

Abraço,
${userName}`
    };

    // Aplicar lógica evolutiva se houver histórico para refinar a saída
    let finalCopy = strategies[channel] || strategies['whatsapp'];
    if (evolutionaryDirectives) {
        // Logica interna para o modelo saber que deve evoluir (em um sistema real isso seria passado ao LLM, 
        // aqui simulamos a evolução na qualidade do texto base)
        finalCopy = finalCopy.replace("Notei que", "Identifiquei cirurgicamente que")
            .replace("Gostaria de", "Faz sentido materializarmos");
    }

    return finalCopy;
};

export const generateFollowUpCopy = (lead: any): string => {
    const { ownerName, businessName, status } = lead;

    switch (status) {
        case 'prospecção':
            return `Olá, ${ownerName}! Vi que meu último protocolo sobre a ${businessName} chegou por aí. Acredito que os pontos que levantei podem acelerar sua operação. Agendamos o diagnóstico?`;
        case 'qualificação':
            return `Olá, ${ownerName}. Analisando os dados da ${businessName}, identifiquei 3 alavancas críticas onde o uso de IA pode estancar o prejuízo. Validamos amanhã?`;
        case 'negociação':
            return `${ownerName}, preparei os argumentos finais para a ${businessName}. O ROI projetado é de 400%. Avançamos para o protocolo hoje?`;
        case 'fechado':
            return `Parabéns, ${ownerName}! A ${businessName} agora é elite. Setup de onboarding pronto. Iniciamos?`;
        default:
            return `Olá, ${ownerName}! Continuidade para a ${businessName}?`;
    }
};
