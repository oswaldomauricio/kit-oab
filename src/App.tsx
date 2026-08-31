import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Zap, FileText, ChevronDown, X, Target, Layout, Check, 
  ArrowRight, MousePointerClick, Users, BookOpen, Clock, Lock
} from "lucide-react";

// 1. CONFIGURAÇÃO DE CHECKOUT E UTMs
const CHECKOUT_URL_BASE = "COLE_AQUI_O_LINK_DA_CAKTO";

const useCheckoutUrl = () => {
  const [finalUrl, setFinalUrl] = useState(CHECKOUT_URL_BASE);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const urlObj = new URL(CHECKOUT_URL_BASE);
        const params = new URLSearchParams(window.location.search);
        
        // Preservar UTMs e parâmetros de rastreio
        const trackParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'src'];
        trackParams.forEach(param => {
          if (params.has(param)) urlObj.searchParams.set(param, params.get(param)!);
        });
        
        setFinalUrl(urlObj.toString());
      } catch (error) {
        console.warn("Invalid CHECKOUT_URL_BASE. Using fallback.");
      }
    }
  }, []);

  const handleTrack = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  return { finalUrl, handleTrack };
};

// 2. COMPONENTES DE UI REUTILIZÁVEIS
const SectionTag = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <span className={`font-mono text-[11px] tracking-[0.2em] px-4 py-1.5 rounded-full border ${
    dark ? 'border-white/20 text-white/70' : 'border-primary/30 text-primary'
  } uppercase mb-8 inline-block w-fit`}>
    {text}
  </span>
);

const NeumorphicCard: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean; size?: "sm" | "md" }> = ({ children, className = "", hover = true, size = "md" }) => (
  <div className={`bg-bg ${size === 'sm' ? 'rounded-3xl shadow-neumorphic-sm p-5' : 'rounded-[32px] shadow-neumorphic p-8'} border border-white/60 transition-all duration-300 ${
    hover ? 'hover:-translate-y-2' : ''
  } ${className}`}>
    {children}
  </div>
);

const CTAButton = ({ children, className = "", variant = "main" }: { children: React.ReactNode; className?: string; variant?: "main" | "header" | "mobile" }) => {
  const { finalUrl, handleTrack } = useCheckoutUrl();
  
  const styles = {
    main: "bg-primary hover:bg-primary-vibrant text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-black shadow-btn w-full md:w-fit text-center",
    header: "bg-primary hover:bg-primary-vibrant text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg whitespace-nowrap",
    mobile: "bg-primary text-white px-6 py-4 rounded-xl text-base font-black shadow-lg w-full text-center"
  };

  return (
    <a 
      href={finalUrl} 
      onClick={handleTrack}
      className={`font-inter font-black flex items-center justify-center gap-2 transition-all active:scale-95 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
};

// 3. COMPONENTE PRINCIPAL
export default function App() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const samples = [
    { id: "SLOT.01", title: "Caderno principal", desc: "500 questões objetivas para treinar a 1ª fase da OAB.", img: "/images/capa-kit-oab.png" },
    { id: "SLOT.02", title: "Direito Internacional", desc: "Questões organizadas em um formato limpo e confortável.", img: "/images/amostra-direito-internacional.png" },
    { id: "SLOT.03", title: "Direito Empresarial", desc: "Exercícios objetivos para testar a aplicação prática.", img: "/images/amostra-direito-empresarial-01.png" },
    { id: "SLOT.04", title: "Material por disciplina", desc: "Páginas organizadas para facilitar o treino.", img: "/images/amostra-direito-empresarial-02.png" },
  ];

  const faqs = [
    { q: "O que eu recebo ao comprar?", a: "Você recebe o caderno com 500 questões objetivas, os materiais de revisão, os simulados, o cronograma de estudos e o gabarito para conferência." },
    { q: "O material é físico?", a: "Não. O Kit OAB é um produto 100% digital. Você poderá acessar o material pelo celular, computador ou tablet." },
    { q: "Serve para a segunda fase?", a: "O foco deste material é a preparação para a 1ª fase da OAB, com questões objetivas e treino de desempenho." },
    { q: "As questões possuem gabarito?", a: "Sim. O material inclui gabarito para que você confira seus resultados e identifique as disciplinas que precisam de atenção." },
    { q: "Consigo estudar pelo celular?", a: "Sim. O material digital pode ser visualizado no celular, tablet ou computador." },
    { q: "Como eu recebo o acesso?", a: "Após a confirmação do pagamento, você receberá as instruções para acessar o material digital por e-mail." },
    { q: "O kit garante que eu vou passar?", a: "Nenhum material pode garantir aprovação. O objetivo do kit é oferecer volume de treino e ferramentas para melhorar a sua preparação." },
    { q: "E se eu não gostar?", a: "Você terá 7 dias para conhecer o material e poderá solicitar o reembolso dentro desse prazo." },
  ];

  return (
    <div className="bg-bg text-text min-h-screen font-jakarta selection:bg-primary selection:text-white">
      
      {/* 6. BARRA SUPERIOR ANIME */}
      <div className="bg-primary-deep py-2.5 overflow-hidden border-b border-white/5">
        <div className="flex whitespace-nowrap animate-marquee-fast md:animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-mono text-[10px] text-white/80 uppercase tracking-widest">
              <span>Acesso Imediato</span> <span className="text-primary">•</span>
              <span>Material Digital</span> <span className="text-primary">•</span>
              <span>500 Questões</span> <span className="text-primary">•</span>
              <span>7 Dias de Garantia</span> <span className="text-primary">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. CABEÇALHO */}
      <header className="sticky top-0 z-[100] bg-white/20 backdrop-blur-sm border-b border-white/40 px-6 lg:px-10 py-5">
        <div className="max-w-[1180px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <BookOpen className="text-white w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="font-inter font-black text-lg md:text-2xl tracking-tighter uppercase">Kit OAB</span>
          </div>
          <CTAButton variant="header"><span className="hidden sm:inline">R$ 19 · </span>COMPRAR<span className="hidden sm:inline"> AGORA</span> →</CTAButton>
        </div>
      </header>

      {/* 8. HERO */}
      <section className="pt-10 md:pt-20 pb-20 md:pb-32 px-6">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <SectionTag text="1ª FASE OAB · ACESSO IMEDIATO" />
            <h1 className="font-inter font-black text-5xl md:text-[68px] leading-[0.9] tracking-tighter mb-8">
              <span className="text-primary">500 questões</span> objetivas pra OAB, organizadas pra você chegar <span className="text-primary">mais preparado.</span>
            </h1>
            <p className="text-text-sec text-xl mb-10 max-w-xl mx-auto lg:mx-0">
              Um caderno completo para a 1ª fase. Você resolve, confere o gabarito e transforma estudo em prática. Acesso imediato.
            </p>
            <div className="space-y-6 flex flex-col items-center lg:items-start">
              <CTAButton className="w-full md:w-auto px-12">QUERO TREINAR COM 500 QUESTÕES →</CTAButton>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 font-mono text-[11px] text-text-sec uppercase tracking-wider">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> 7 dias de garantia</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Acesso imediato</span>
                <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Material digital</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="bg-bg w-full rounded-[48px] p-6 shadow-neumorphic border border-white/60 relative flex flex-col items-center overflow-hidden">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-primary-deep text-white font-mono text-[9px] px-4 py-1 rounded-full">
                KIT.01 · 500/500
              </div>
              <div className="absolute top-20 right-8 z-20 bg-primary text-white font-inter font-black text-[10px] px-3 py-1 rounded shadow-xl -rotate-6">
                1ª FASE · QUESTÕES
              </div>
              <img 
                src="/images/mockup-kit-oab.png" 
                alt="Kit OAB Mockup" 
                className="w-full h-auto rounded-[32px] transition-transform duration-1000 group-hover:scale-105 mt-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x800/E9EDF2/E10600?text=Mockup+Kit+OAB";
                }}
              />
            </div>
            
            <div className="absolute -bottom-6 right-0 md:-right-6 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-30 px-6 py-3 border-4 border-bg hover:scale-105 transition-transform rotate-3">
              <span className="text-[10px] font-bold leading-none mb-1">+ 2 BÔNUS</span>
              <span className="text-[8px] font-mono leading-none tracking-widest opacity-80">SIMULADO + CRONOGRAMA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BARRA DE NÚMEROS */}
      <section className="bg-primary-dark py-20 px-6">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { n: "500", t: "Questões Objetivas" },
            { n: "01", t: "Caderno Completo" },
            { n: "1ª", t: "Fase da OAB" },
            { n: "07", t: "Dias de Garantia" }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="font-mono text-6xl md:text-7xl text-white font-bold mb-3 transition-transform group-hover:scale-110 duration-500">
                {item.n}
              </div>
              <div className="text-white/60 font-mono text-xs uppercase tracking-widest">{item.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ENTREGÁVEIS (MOD.01) */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-[1180px] mx-auto text-center mb-20">
          <SectionTag text="MOD.01" />
          <h2 className="text-4xl md:text-6xl font-inter font-black tracking-tighter mb-6">Um kit, quatro ferramentas.</h2>
          <p className="text-text-sec text-lg max-w-2xl mx-auto">Treinar, revisar, medir e organizar. Tudo em um único acesso.</p>
        </div>
        
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { tag: "NÚCLEO", title: "500 questões", text: "O coração do material. Grande volume para treinar a lógica da prova.", list: ["Por disciplina", "Com gabarito", "Treino diário"] },
            { tag: "APOIO", title: "Resumos diretos", text: "Revisões rápidas dos conceitos essenciais antes de cada treino.", list: ["Objetivo", "Sem excessos", "Consulta rápida"] },
            { tag: "SIMULADOS", title: "Treine real", text: "Testar conhecimentos, controlar o tempo e descobrir falhas.", list: ["Tempo real", "Desempenho", "Pontos fracos"] },
            { tag: "PLANO", title: "Cronograma", text: "Um plano simples para distribuir revisão e questões na rotina.", list: ["Etapas claras", "Adaptável", "Organizado"] }
          ].map((card, i) => (
            <NeumorphicCard key={i} className="flex flex-col h-full" size="sm">
              <span className="text-primary font-mono text-[10px] tracking-widest mb-4 block uppercase">{card.tag}</span>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-text-sec text-sm leading-relaxed mb-8 flex-grow">{card.text}</p>
              <div className="space-y-3 pt-6 border-t border-black/5 mt-auto">
                {card.list.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                    <Check className="w-4 h-4 text-primary shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          ))}
        </div>
        <div className="text-center flex justify-center">
          <CTAButton>QUERO RECEBER O KIT COMPLETO →</CTAButton>
        </div>
      </section>

      {/* 11. TRÊS PILARES (MOD.02) */}
      <section className="py-20 md:py-32 px-6 bg-white/40">
        <div className="max-w-[1180px] mx-auto text-center mb-24">
          <SectionTag text="MOD.02" />
          <h2 className="text-4xl md:text-5xl font-inter font-black tracking-tighter max-w-4xl mx-auto mb-6">
            Na 1ª fase, acumular teoria não basta. Você precisa transformar conteúdo em acerto.
          </h2>
        </div>
        <div className="max-w-[1180px] mx-auto relative grid md:grid-cols-3 gap-12">
          {/* Linha decorativa desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-primary/20 -z-10"></div>
          
          {[
            { p: "01", t: "Ritmo de treino", d: "Resolver questões ajuda a reconhecer padrões e interpretar enunciados com segurança." },
            { p: "02", t: "Nível real", d: "Os simulados mostram exatamente quais disciplinas estão custando seus pontos." },
            { p: "03", t: "Revisão cirúrgica", d: "Direcione seu estudo para as matérias em que você apresenta mais dificuldade." }
          ].map((pilar, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-bg shadow-neumorphic rounded-full flex items-center justify-center border-4 border-white/80 mb-8 transition-transform hover:scale-110">
                <div className="w-5 h-5 bg-primary rounded-full animate-pulse shadow-[0_0_20px_rgba(225,6,0,0.5)]"></div>
              </div>
              <SectionTag text={`PILAR.${pilar.p}`} />
              <h4 className="text-xl font-bold mb-4">{pilar.t}</h4>
              <p className="text-text-sec text-sm leading-relaxed max-w-xs">{pilar.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. AMOSTRAS (MOD.03) */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-[1180px] mx-auto mb-16 text-center lg:text-left">
          <SectionTag text="MOD.03 · MATERIAL" />
          <h2 className="text-4xl md:text-6xl font-inter font-black tracking-tighter mb-6">Você vê o material antes.</h2>
          <p className="text-text-sec text-lg">Sem capas bonitas escondendo conteúdo genérico.</p>
        </div>
        <div className="max-w-[1180px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {samples.map((item, i) => (
            <div key={i} className="group cursor-zoom-in" onClick={() => setSelectedImg(item.img)}>
              <div className="bg-bg shadow-neumorphic-sm p-5 rounded-3xl border border-white/60 mb-6 overflow-hidden">
                <img 
                  src={item.img} alt={item.title} 
                  className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-110" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/300x420/E9EDF2/E10600?text=${item.title.replace(/ /g, '+')}`;
                  }}
                />
              </div>
              <div className="px-1 mt-4">
                <div className="font-mono text-[9px] text-text-sec uppercase tracking-widest mb-1">{item.id}</div>
                <h5 className="font-inter font-black text-lg mb-1">{item.title}</h5>
                <p className="text-text-sec text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. PÚBLICO (MOD.04) */}
      <section className="py-20 md:py-32 px-6 bg-white/20">
        <div className="max-w-[1180px] mx-auto text-center mb-20">
          <SectionTag text="MOD.04 · PARA QUEM" />
          <h2 className="text-4xl md:text-5xl font-inter font-black tracking-tighter mb-6">Feito pra quem precisa chegar preparado.</h2>
        </div>
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { id: "01", t: "Primeira tentativa", d: "Para quem precisa entender o formato das questões e quer construir confiança." },
            { id: "02", t: "Nova tentativa", d: "Para quem já conhece a prova, mas precisa corrigir erros que custam pontos." },
            { id: "03", t: "Rotina corrida", d: "Para quem trabalha, estuda e precisa de um material direto e fácil de encaixar." }
          ].map((perfil, i) => (
            <NeumorphicCard key={i} className="h-full" size="sm">
              <SectionTag text={`PERFIL.${perfil.id}`} />
              <h4 className="text-2xl font-inter font-black mb-4">{perfil.t}</h4>
              <p className="text-text-sec text-base leading-relaxed">{perfil.d}</p>
            </NeumorphicCard>
          ))}
        </div>
      </section>

      {/* 14. OFERTA (MOD.05) */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-16">
            <SectionTag text="MOD.05 · OFERTA" />
            <h2 className="text-5xl md:text-7xl font-inter font-black tracking-tighter mb-6">Apenas R$ 19.</h2>
            <p className="text-text-sec text-xl">Pagamento único. Sem mensalidade.</p>
          </div>
          
          <div className="bg-bg shadow-neumorphic border-[8px] md:border-[16px] border-white/80 rounded-[32px] md:rounded-[48px] p-6 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-primary/5 rounded-full -mr-16 -mt-16 md:-mr-24 md:-mt-24"></div>
            
            <div className="flex flex-col items-center">
              <SectionTag text="KIT COMPLETO" />
              <h3 className="text-3xl md:text-4xl font-inter font-black text-center mb-10 md:mb-12">500 Questões OAB + materiais</h3>
              
              <div className="grid sm:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-12 mb-12 md:mb-16 w-full max-w-2xl">
                {[
                  "Caderno 500 questões", "Resumos diretos", "Simulados de prova", 
                  "Cronograma de estudos", "Gabarito completo", "7 dias de garantia"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold tracking-tight">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="text-center mb-12">
                <div className="font-mono text-xs text-text-sec tracking-[0.3em] mb-2">HOJE POR</div>
                <div className="text-8xl md:text-9xl font-inter font-black text-primary tracking-tighter mb-2">R$ 19</div>
                <div className="font-mono text-[10px] text-text-sec uppercase tracking-widest">Pagamento único via PIX ou Cartão</div>
              </div>

              <CTAButton className="w-full py-6 text-xl">QUERO O KIT COMPLETO POR R$ 19 →</CTAButton>
              
              <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-40 grayscale">
                <Lock className="w-5 h-5" />
                <Zap className="w-5 h-5" />
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. GARANTIA */}
      <section className="py-24 md:py-40 px-6 bg-primary-deep relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-inter font-black text-white/[0.03] pointer-events-none select-none">
          7
        </div>
        <div className="max-w-[1180px] mx-auto text-center relative z-10 flex flex-col items-center">
          <SectionTag text="GARANTIA TOTAL" dark />
          <h2 className="text-4xl md:text-6xl font-inter font-black text-white tracking-tighter mb-8">7 dias para conhecer tudo.</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
            Acesse o kit, confira o conteúdo e decida com tranquilidade. Se não for adequado para você, devolvemos seu investimento integralmente.
          </p>
          <div className="bg-white/5 border border-white/10 backdrop-blur-md px-8 py-4 rounded-2xl flex items-center gap-8 font-mono text-[11px] text-white/80 uppercase tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Compra Protegida</span>
            <span className="hidden sm:block text-white/20">|</span>
            <span className="flex items-center gap-2"><Layout className="w-4 h-4 text-primary" /> Selo 7 Dias</span>
          </div>
        </div>
      </section>

      {/* 16. FAQ (MOD.06) */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-20">
            <SectionTag text="MOD.06 · DÚVIDAS" />
            <h2 className="text-4xl md:text-5xl font-inter font-black tracking-tighter">Perguntas frequentes.</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="group">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-bg shadow-neumorphic border border-white/60 p-7 rounded-[24px] flex justify-between items-center transition-all group-hover:-translate-y-1"
                >
                  <span className="font-bold text-lg text-text pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 text-primary ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="p-8 bg-white/40 rounded-[24px] text-text-sec text-base leading-relaxed border border-white/20">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. CHAMADA FINAL */}
      <section className="py-24 md:py-20 md:py-32 px-6 bg-white/40 border-t border-black/5">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="bg-bg shadow-neumorphic p-4 md:p-6 rounded-[32px] md:rounded-[48px] border border-white/60">
              <img 
                src="/images/mockup-kit-oab.png" 
                alt="OAB Kit" 
                className="w-full h-auto rounded-[32px]" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/500x600/E9EDF2/E10600?text=Mockup+Kit+OAB";
                }}
              />
            </div>
          </div>
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <SectionTag text="ÚLTIMA CHAMADA" />
            <h2 className="text-4xl md:text-5xl font-inter font-black tracking-tighter mb-10 leading-tight">
              Questões pra treinar. Simulados pra medir. Resumos pra revisar.
            </h2>
            <div className="mb-10 text-center lg:text-left">
              <div className="font-mono text-2xl font-bold text-primary mb-2">R$ 19 · PAGAMENTO ÚNICO</div>
              <p className="text-text-sec font-mono text-[10px] uppercase tracking-widest">Acesso imediato • Material Digital • 7 Dias Garantia</p>
            </div>
            <CTAButton className="w-full lg:w-auto px-16 py-6 text-xl">QUERO COMEÇAR AGORA →</CTAButton>
          </div>
        </div>
      </section>

      {/* 18. RODAPÉ */}
      <footer className="py-12 px-6 border-t border-black/5 bg-bg">
        <div className="max-w-[1180px] mx-auto flex flex-col items-center">
          <div className="font-inter font-black text-2xl tracking-tighter mb-2 uppercase">Kit OAB</div>
          <p className="text-text-sec text-sm mb-12">Material digital para preparação da 1ª fase.</p>
          
          <div className="flex flex-wrap justify-center gap-10 text-[9px] font-mono tracking-widest mb-10 opacity-60 uppercase">
            <a href="#" className="hover:text-primary transition-colors">Termos de uso</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Suporte</a>
          </div>
          
          <div className="max-w-3xl mx-auto text-center text-[9px] font-mono text-text-sec/60 uppercase leading-loose tracking-widest">
            © 2024 KIT OAB · MATERIAL INDEPENDENTE. NÃO POSSUI VÍNCULO OFICIAL COM A ORDEM DOS ADVOGADOS DO BRASIL.
          </div>
        </div>
      </footer>

      {/* 19. CTA FIXO MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 z-[200] animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border border-white flex items-center justify-between gap-4">
          <div className="pl-2">
            <div className="text-[9px] font-mono text-text-sec/80 uppercase tracking-tighter">KIT COMPLETO</div>
            <div className="text-2xl font-inter font-black text-primary leading-none">R$ 19</div>
          </div>
          <CTAButton variant="mobile">COMPRAR AGORA</CTAButton>
        </div>
      </div>

      {/* MODAL DE IMAGEM */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[300] bg-primary-deep/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <X className="w-10 h-10" />
          </button>
          <div className="max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImg} alt="Preview" 
              className="object-contain max-h-[85vh] rounded-2xl shadow-2xl" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/900x1200/E9EDF2/E10600?text=Amostra`;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
