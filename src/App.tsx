import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck, Zap, FileText, ChevronDown, X, Target, Layout, Check,
  ArrowRight, MousePointerClick, Users, BookOpen, Clock, Lock,
  ChevronLeft, ChevronRight
} from "lucide-react";

// 1. CONFIGURAÇÃO DE CHECKOUT E UTMs
const CHECKOUT_URL_BASE = "https://pay.hotmart.com/X107415504B?bid=1788286126811";

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
  <span className={`font-mono text-[11px] tracking-[0.2em] px-4 py-1.5 rounded-full border ${dark ? 'border-white/20 text-white/70' : 'border-primary/30 text-primary'
    } uppercase mb-8 inline-block w-fit`}>
    {text}
  </span>
);

const NeumorphicCard: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean; size?: "sm" | "md" }> = ({ children, className = "", hover = true, size = "md" }) => (
  <div className={`bg-bg ${size === 'sm' ? 'rounded-3xl shadow-neumorphic-sm p-5' : 'rounded-[32px] shadow-neumorphic p-8'} border border-white/60 transition-all duration-300 ${hover ? 'hover:-translate-y-2' : ''
    } ${className}`}>
    {children}
  </div>
);

const CTAButton = ({
  children,
  className = "",
  variant = "main",
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "main" | "header" | "mobile";
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const { finalUrl, handleTrack } = useCheckoutUrl();

  const styles = {
    main: "bg-primary hover:bg-primary-vibrant text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-black shadow-btn w-full md:w-fit text-center cursor-pointer",
    header: "bg-primary hover:bg-primary-vibrant text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg whitespace-nowrap cursor-pointer",
    mobile: "bg-primary text-white px-6 py-4 rounded-xl text-base font-black shadow-lg w-full text-center cursor-pointer"
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
      return;
    }
    handleTrack();
    setTimeout(() => {
      window.location.href = finalUrl;
    }, 300);
  };

  return (
    <a
      href={onClick ? "#" : finalUrl}
      onClick={handleClick}
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
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { finalUrl, handleTrack } = useCheckoutUrl();

  const openUpsellModal = () => setIsUpsellOpen(true);
  const closeUpsellModal = () => setIsUpsellOpen(false);

  const handleAccept29 = () => {
    setIsUpsellOpen(false);
    alert("Você selecionou o Pacote Completo (R$ 29,99)! O link de checkout será configurado em breve.");
  };

  const handleDecline19 = () => {
    setIsUpsellOpen(false);
    handleTrack();
    setTimeout(() => {
      window.location.href = finalUrl;
    }, 300);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const samples = [
    { id: "SLOT.01", title: "Caderno principal", desc: "500 questões objetivas para treinar a 1ª fase da OAB.", img: "/images/capa-kit-oab.png" },
    { id: "SLOT.02", title: "Direito Penal e Constitucional", desc: "Questões organizadas em um formato limpo e confortável.", img: "/images/direito-penal-e-constitucional.png" },
    { id: "SLOT.03", title: "Direito Empresarial e Administrativo", desc: "Exercícios objetivos para testar a aplicação prática.", img: "/images/direito-empresarial-e-administrativo.jpg" },
    { id: "SLOT.04", title: "Material por disciplina", desc: "Páginas organizadas para facilitar o treino.", img: "/images/material-por-disciplina.jpg" },
  ];

  const pageSamples = [
    { id: "PÁG.01", title: "Direito Civil", desc: "Questões 23 e 24 com gabarito e organização cirúrgica.", img: "/images/pagina-direito-civil.jpg" },
    { id: "PÁG.02", title: "Direito Penal", desc: "Questões 3 e 4 formatadas para leitura rápida.", img: "/images/pagina-direito-penal.jpg" },
    { id: "PÁG.03", title: "Direito do Consumidor", desc: "Questões 15 e 16 focadas nos tópicos essenciais.", img: "/images/pagina-direito-consumidor.jpg" },
    { id: "PÁG.04", title: "Direito Empresarial", desc: "Questões 13 e 14 com layout limpo e intuitivo.", img: "/images/pagina-direito-empresarial.jpg" },
    { id: "PÁG.05", title: "Direito Internacional", desc: "Questões 39 e 40 com padrão da banca FGV.", img: "/images/pagina-direito-internacional.jpg" },
    { id: "PÁG.06", title: "Visão Geral do Kit", desc: "Estrutura completa das 500 questões por disciplina.", img: "/images/pagina-visão-geral.jpg" },
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
          <CTAButton variant="header" onClick={openUpsellModal}><span className="hidden sm:inline">R$ 19 · </span>COMPRAR<span className="hidden sm:inline"> AGORA</span> →</CTAButton>
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
              <CTAButton className="w-full md:w-auto px-12" onClick={openUpsellModal}>QUERO TREINAR COM 500 QUESTÕES →</CTAButton>
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
          {[
            { p: "01", t: "Ritmo de treino", d: "Resolver questões ajuda a reconhecer padrões e interpretar enunciados com segurança.", img: "/images/capa-kit-oab.png" },
            { p: "02", t: "Nível real", d: "Os simulados mostram exatamente quais disciplinas estão custando seus pontos.", img: "/images/simulado.png" },
            { p: "03", t: "Revisão cirúrgica", d: "Direcione seu estudo para as matérias em que você apresenta mais dificuldade.", img: "/images/cronograma.png" }
          ].map((pilar, i) => (
            <div key={i} className="text-center flex flex-col items-center group">
              <div className="w-full max-w-[280px] bg-bg shadow-neumorphic rounded-3xl border border-white/60 p-4 mb-8 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src={pilar.img}
                  alt={pilar.t}
                  className="w-full h-[200px] object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/280x200/E9EDF2/E10600?text=${pilar.t.replace(/ /g, '+')}`;
                  }}
                />
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

        {/* Carrossel de Páginas Reais do Produto */}
        <div className="max-w-[1180px] mx-auto mt-20 pt-16 border-t border-black/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-primary font-mono text-[10px] tracking-widest block uppercase mb-2">PÁGINAS REAIS DO MATERIAL</span>
              <h3 className="text-2xl md:text-4xl font-inter font-black tracking-tighter">Veja as questões por dentro</h3>
              <p className="text-text-sec text-sm mt-1">Clique na imagem para ampliar e conferir a qualidade do conteúdo.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-12 h-12 rounded-2xl bg-bg shadow-neumorphic flex items-center justify-center text-text hover:text-primary transition-all active:scale-95 border border-white/60 cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-12 h-12 rounded-2xl bg-bg shadow-neumorphic flex items-center justify-center text-text hover:text-primary transition-all active:scale-95 border border-white/60 cursor-pointer"
                aria-label="Próximo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 pt-2 px-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pageSamples.map((item, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] group cursor-zoom-in"
                onClick={() => setSelectedImg(item.img)}
              >
                <div className="bg-bg shadow-neumorphic-sm p-4 rounded-3xl border border-white/60 mb-4 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[380px] object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/300x420/E9EDF2/E10600?text=${item.title.replace(/ /g, '+')}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center pointer-events-none">
                    <span className="bg-primary text-white font-mono text-[10px] px-3 py-1.5 rounded-full shadow-lg font-bold uppercase tracking-wider">Ampliar</span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="font-mono text-[9px] text-text-sec uppercase tracking-widest mb-1">{item.id}</div>
                  <h5 className="font-inter font-black text-base mb-1">{item.title}</h5>
                  <p className="text-text-sec text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
      <section className="py-20 md:py-32 px-6" id="planos">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-16">
            <SectionTag text="MOD.05 · OFERTA" />
            <h2 className="text-4xl md:text-6xl font-inter font-black tracking-tighter mb-6">Escolha o plano ideal para a sua aprovação.</h2>
            <p className="text-text-sec text-xl max-w-2xl mx-auto">Pagamento único. Sem mensalidade. Acesso vitalício.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-[1080px] mx-auto">
            {/* PLANO BÁSICO - R$ 19 */}
            <div className="bg-bg shadow-neumorphic border border-white/80 rounded-[36px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-text/5 text-text font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full border border-black/5">
                    PACOTE BÁSICO
                  </span>
                </div>

                <h3 className="text-3xl font-inter font-black mb-2">Apostila 500 Questões</h3>
                <p className="text-text-sec text-sm leading-relaxed mb-6">Ideal para quem precisa apenas do caderno de exercícios focado.</p>

                <div className="bg-white/40 p-6 rounded-2xl border border-white/60 mb-8">
                  <div className="text-xs font-mono text-text-sec uppercase tracking-widest mb-1 font-bold">Investimento único</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-inter font-black text-text tracking-tight">R$ 19</span>
                    <span className="text-xs font-mono text-text-sec uppercase tracking-wider font-bold">à vista</span>
                  </div>
                </div>

                {/* Conteúdo Incluso */}
                <div className="space-y-4 mb-8">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-text-sec font-bold mb-2">O QUE ESTÁ INCLUSO:</div>
                  <div className="flex items-start gap-3 text-sm font-semibold">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Apostila digital com 500 questões objetivas</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-text-sec/50 line-through">
                    <X className="w-5 h-5 text-text-sec/40 shrink-0 mt-0.5" />
                    <span>+ 250 questões de simulado</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-text-sec/50 line-through">
                    <X className="w-5 h-5 text-text-sec/40 shrink-0 mt-0.5" />
                    <span>Cronograma completo de estudos</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-text-sec/50 line-through">
                    <X className="w-5 h-5 text-text-sec/40 shrink-0 mt-0.5" />
                    <span>Guia de estudos prático</span>
                  </div>
                </div>

                {/* Vantagens dos 2 planos */}
                <div className="pt-6 border-t border-black/5 space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-text-sec uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-text-sec uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-primary shrink-0" />
                    <span>Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-text-sec uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>Atualização de conteúdo</span>
                  </div>
                </div>
              </div>

              <CTAButton className="w-full py-5 text-lg rounded-2xl" onClick={openUpsellModal}>
                QUERO O PLANO BÁSICO POR R$ 19 →
              </CTAButton>
            </div>

            {/* PLANO COMPLETO - R$ 29,99 */}
            <div className="bg-bg shadow-neumorphic border-4 border-primary rounded-[36px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 bg-primary text-white font-mono text-[9px] uppercase tracking-[0.2em] font-black px-5 py-2 rounded-bl-2xl shadow-lg">
                ★ RECOMENDADO • MAIS COMPLETO
              </div>

              <div>
                <div className="flex justify-between items-center mb-6 mt-2">
                  <span className="bg-primary/10 text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full border border-primary/20">
                    PACOTE COMPLETO
                  </span>
                </div>

                <h3 className="text-3xl font-inter font-black mb-2">Kit Preparatório Completo</h3>
                <p className="text-text-sec text-sm leading-relaxed mb-6">Estrutura completa com material de treino, simulados, plano e guia.</p>

                <div className="bg-primary-deep text-white p-6 rounded-2xl mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                  <div className="text-xs font-mono text-white/70 uppercase tracking-widest mb-1 font-bold">Investimento único</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-inter font-black text-white tracking-tight">R$ 29,99</span>
                    <span className="text-xs font-mono text-white/70 uppercase tracking-wider font-bold">à vista</span>
                  </div>
                </div>

                {/* Conteúdo Incluso */}
                <div className="space-y-4 mb-8">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-primary font-bold mb-2">TUDO O QUE VOCÊ RECEBE:</div>
                  <div className="flex items-start gap-3 text-sm font-semibold">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Apostila digital com 500 questões objetivas</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-text">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-black">+ 250 questões de simulado</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-text">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Cronograma completo de estudos</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-text">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Guia de estudos prático</span>
                  </div>
                </div>

                {/* Vantagens dos 2 planos */}
                <div className="pt-6 border-t border-black/5 space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-text-sec uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-text-sec uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-primary shrink-0" />
                    <span>Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-text-sec uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>Atualização de conteúdo</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAccept29}
                className="bg-primary hover:bg-primary-vibrant text-white w-full py-5 text-lg rounded-2xl font-inter font-black shadow-btn transition-all active:scale-95 text-center cursor-pointer"
              >
                QUERO O PACOTE COMPLETO POR R$ 29,99 →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 15. GARANTIA */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-bg shadow-neumorphic rounded-[32px] border border-white/60 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Badge 7 dias */}
            <div className="shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-bg shadow-neumorphic rounded-full border-4 border-white/80 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-inter font-black text-primary-deep leading-none">7</span>
                <span className="font-mono text-[8px] text-text-sec uppercase tracking-[0.15em] leading-tight mt-1">dias</span>
                <span className="font-mono text-[7px] text-text-sec uppercase tracking-[0.15em] leading-tight">garantia total</span>
              </div>
            </div>
            {/* Text */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-primary-deep rounded-full"></div>
                <span className="font-mono text-[10px] text-text-sec uppercase tracking-[0.2em] font-bold">Risco zero</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-inter font-black tracking-tight mb-3">7 dias de garantia incondicional.</h3>
              <p className="text-text-sec text-sm md:text-base leading-relaxed">
                Abriu, não era pra você? Pede o reembolso em até 7 dias e a gente devolve 100% do valor. Sem burocracia, sem perguntinha, sem formulário gigante.
              </p>
            </div>
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
            <CTAButton className="w-full lg:w-auto px-16 py-6 text-xl" onClick={openUpsellModal}>QUERO COMEÇAR AGORA →</CTAButton>
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

      {/* POPUP MODAL DE UPSELL (OFERTA R$ 29,99) */}
      {isUpsellOpen && (
        <div className="fixed inset-0 z-[400] bg-primary-deep/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div
            className="bg-bg shadow-2xl rounded-[32px] border-4 border-white/90 p-6 md:p-10 max-w-[540px] w-full relative overflow-hidden text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar modal */}
            <button
              onClick={closeUpsellModal}
              className="absolute top-5 right-5 text-text-sec/60 hover:text-text p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full border border-primary/20 mb-6">
              <span>🚀 OFERTA ESPECIAL DE UPGRADE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-inter font-black tracking-tight mb-3">
              Leve o Pacote Completo por apenas <span className="text-primary">R$ 29,99</span>!
            </h3>

            <p className="text-text-sec text-sm sm:text-base leading-relaxed mb-6">
              Por apenas <strong className="text-text font-bold">+ R$ 10,99</strong> (menos que um café!), você destrava a preparação completa:
            </p>

            {/* Lista de Recursos extras */}
            <div className="bg-white/50 p-5 rounded-2xl border border-white/80 space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3 text-sm font-semibold text-text">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span>Apostila digital com 500 questões objetivas</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span>+ 250 questões de simulado</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span>Cronograma completo de estudos</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span>Guia de estudos prático</span>
              </div>
            </div>

            {/* Badges de garantia */}
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono text-text-sec uppercase tracking-wider mb-8">
              <span className="flex items-center gap-1.5 font-bold"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> Garantia de 7 dias</span>
              <span className="flex items-center gap-1.5 font-bold"><Zap className="w-3.5 h-3.5 text-primary" /> Acesso imediato</span>
              <span className="flex items-center gap-1.5 font-bold"><FileText className="w-3.5 h-3.5 text-primary" /> Atualização</span>
            </div>

            {/* Ações do Modal */}
            <div className="space-y-3">
              <button
                onClick={handleAccept29}
                className="bg-primary hover:bg-primary-vibrant text-white w-full py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-inter font-black shadow-btn transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center gap-2"
              >
                SIM! QUERO O PACOTE COMPLETO POR R$ 29,99 →
              </button>

              <button
                onClick={handleDecline19}
                className="text-text-sec hover:text-text text-xs sm:text-sm font-bold underline decoration-text-sec/30 underline-offset-4 w-full py-2 transition-colors cursor-pointer"
              >
                Não, obrigado. Quero apenas o Plano Básico de R$ 19
              </button>
            </div>
          </div>
        </div>
      )}

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
