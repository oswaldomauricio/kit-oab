import React from "react";
import {
  Download, FileText, BookOpen, CheckCircle, ArrowLeft,
  ExternalLink, ShieldCheck, Sparkles, Printer, Clock,
  Eye, Check, ListChecks, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// ──────────────────────────────────────────────
// COMPONENTES DE UI REUTILIZÁVEIS
// ──────────────────────────────────────────────
const SectionTag = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <span className={`font-mono text-[11px] tracking-[0.2em] px-4 py-1.5 rounded-full border ${dark ? 'border-white/20 text-white/70' : 'border-primary/30 text-primary'
    } uppercase mb-6 inline-block w-fit`}>
    {text}
  </span>
);

const NeumorphicCard: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean; size?: "sm" | "md" }> = ({ children, className = "", hover = true, size = "md" }) => (
  <div className={`bg-bg ${size === 'sm' ? 'rounded-3xl shadow-neumorphic-sm p-5' : 'rounded-[32px] shadow-neumorphic p-8'} border border-white/60 transition-all duration-300 ${hover ? 'hover:-translate-y-2' : ''
    } ${className}`}>
    {children}
  </div>
);

export default function ApostilaPage() {
  const pdfUrl = "/images/QUESTOES OAB - 1 FASE.pdf";
  const pdfFileName = "QUESTOES OAB - 1 FASE.pdf";

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white font-inter">

      {/* HEADER / BARRA DE NAVEGAÇÃO */}
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-black/5 py-4 px-6">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary text-white font-black flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
                OAB
              </div>
              <div>
                <span className="font-black text-xl tracking-tighter uppercase block leading-none">KIT OAB</span>
                <span className="text-[10px] font-mono text-text-sec uppercase tracking-widest block">1ª Fase</span>
              </div>
            </Link>
          </div>

          {/* MENUS E LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
            <Link to="/simulado-1" className="text-text-sec hover:text-primary transition-colors flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-primary" /> Simulado Online
            </Link>
            <span className="text-primary font-black px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
              Apostila PDF
            </span>
          </nav>

          {/* BOTÃO HEADER */}
          <a
            href={pdfUrl}
            download={pdfFileName}
            className="bg-primary hover:bg-primary-vibrant text-white px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
          >
            <Download className="w-4 h-4" /> Baixar PDF
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto text-center">
          <SectionTag text="MATERIAL DE ESTUDO · OAB 1ª FASE" />

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight max-w-4xl mx-auto">
            Apostila Completa de Questões <span className="text-primary">1ª Fase OAB</span>
          </h1>

          <p className="text-lg md:text-xl text-text-sec max-w-2xl mx-auto mb-10 leading-relaxed">
            Faça o download da apostila oficial em PDF. Coletânea completa com questões objetivas, enunciados e gabaritos para acelerar sua aprovação.
          </p>

          {/* BADGES / SPECS */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs font-mono font-bold uppercase tracking-wider text-text-sec">
            <span className="bg-white/60 border border-black/5 px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" /> Formato: PDF Imprimível
            </span>
            <span className="bg-white/60 border border-black/5 px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> Tamanho: ~57 MB
            </span>
            <span className="bg-white/60 border border-black/5 px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" /> Acesso Imediato
            </span>
          </div>

          {/* BOTOES DE AÇÃO HERO */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <a
              href={pdfUrl}
              download={pdfFileName}
              className="w-full sm:w-auto bg-primary hover:bg-primary-vibrant text-white font-inter font-black text-lg md:text-xl px-10 py-5 rounded-2xl shadow-btn flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer uppercase tracking-wide"
            >
              <Download className="w-6 h-6 animate-bounce" /> Baixar Apostila PDF
            </a>

            <Link
              to="/simulado-1"
              className="w-full sm:w-auto bg-white hover:bg-white/80 text-text font-inter font-bold text-base px-8 py-5 rounded-2xl border border-black/10 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ListChecks className="w-5 h-5 text-primary" /> Fazer Simulado Online
            </Link>
          </div>

          <p className="text-xs text-text-sec/70 font-mono mt-4">
            Download direto do arquivo original em alta resolução. Sem necessidade de cadastro.
          </p>
        </div>
      </section>

      {/* PREVIEW E DETALHES DO MATERIAL */}
      <section className="py-12 px-6 border-t border-black/5 bg-white/40">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-12 gap-10 items-stretch">

          {/* VISUALIZADOR DA APOSTILA / MOCKUP */}
          <div className="lg:col-span-7 flex flex-col">
            <NeumorphicCard hover={false} className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-mono text-xs text-text-sec ml-2 truncate font-bold">
                    QUESTOES OAB - 1 FASE.pdf
                  </span>
                </div>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Abrir numa nova aba
                </a>
              </div>

              {/* PDF PREVIEW FRAME */}
              <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-gray-100 flex-1 min-h-[480px]">
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  className="w-full h-full min-h-[480px]"
                >
                  <div className="flex flex-col items-center justify-center p-12 text-center h-full bg-white">
                    <BookOpen className="w-16 h-16 text-primary mb-4 opacity-80" />
                    <h3 className="font-black text-xl mb-2">Apostila de Questões OAB</h3>
                    <p className="text-text-sec text-sm max-w-md mb-6">
                      Seu navegador não suporta visualização direta de PDF na página. Clique no botão abaixo para baixar ou abrir no seu leitor de preferência.
                    </p>
                    <a
                      href={pdfUrl}
                      download={pdfFileName}
                      className="bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" /> Baixar PDF (~57MB)
                    </a>
                  </div>
                </object>
              </div>
            </NeumorphicCard>
          </div>

          {/* FICHA TÉCNICA E RECURSOS */}
          <div className="lg:col-span-5 flex flex-col">
            <NeumorphicCard hover={false} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-primary/20">
                    FICHA TÉCNICA
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight mb-4">
                  Tudo o que você precisa em um único arquivo PDF
                </h3>

                <p className="text-text-sec text-sm leading-relaxed mb-6">
                  Material completo e organizado para quem prefere estudar offline, imprimir blocos de questões ou carregar no tablet/celular.
                </p>

                {/* CHECKLIST DE VANTAGENS */}
                <div className="space-y-4 mb-8">
                  {[
                    "Enunciados completos de provas oficiais da OAB",
                    "Gabaritos para conferência de respostas",
                    "Formatado para leitura fácil em telas e impressão",
                    "Questões das principais disciplinas cobradas no Exame",
                    "Arquivo PDF original sem bloqueios ou senhas"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold text-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD DOWNLOAD RÁPIDO */}
              <div className="pt-6 border-t border-black/5 bg-white/50 p-6 rounded-2xl border border-white/60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-mono text-text-sec uppercase tracking-wider">Tamanho do Arquivo</div>
                    <div className="font-black text-lg">57.0 MB</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-sec uppercase tracking-wider">Licença</div>
                  </div>
                </div>

                <a
                  href={pdfUrl}
                  download={pdfFileName}
                  className="w-full bg-primary hover:bg-primary-vibrant text-white font-black py-4 rounded-xl shadow-btn flex items-center justify-center gap-2 transition-all active:scale-95 text-center cursor-pointer text-base uppercase tracking-wider"
                >
                  <Download className="w-5 h-5" /> Download do Arquivo PDF
                </a>
              </div>
            </NeumorphicCard>
          </div>

        </div>
      </section>

      {/* GRID DE RECURSOS E DESTAQUES */}
      <section className="py-20 px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-16">
            <SectionTag text="COMO APROVEITAR AO MÁXIMO" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Recursos pensados para o seu rendimento
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <NeumorphicCard className="flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-inner">
                  <Printer className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-3">Pronto para Impressão</h3>
                <p className="text-text-sec text-sm leading-relaxed">
                  Baixe e imprima as páginas de questões para simular o ambiente real de prova riscando as alternativas com caneta.
                </p>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-inner">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-3">Estudo Offline</h3>
                <p className="text-text-sec text-sm leading-relaxed">
                  Guarde o arquivo no seu celular, iPad, Kindle ou notebook e resolva questões a qualquer hora, mesmo sem internet.
                </p>
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* CHAMADA FINAL DE DOWNLOAD */}
      <section className="py-20 px-6 bg-white/40 border-t border-black/5">
        <div className="max-w-[900px] mx-auto text-center">
          <NeumorphicCard hover={false} className="p-10 md:p-14">
            <SectionTag text="BAIXAR AGORA" />

            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
              Pronto para começar seus estudos?
            </h2>

            <p className="text-text-sec text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Clique no botão abaixo para baixar a apostila completa em PDF e dar mais um passo rumo à sua carteira da OAB.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={pdfUrl}
                download={pdfFileName}
                className="bg-primary hover:bg-primary-vibrant text-white font-black text-lg px-10 py-5 rounded-2xl shadow-btn flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <Download className="w-6 h-6" /> Baixar Apostila PDF (57MB)
              </a>

              <Link
                to="/"
                className="bg-white hover:bg-white/80 text-text font-bold text-base px-8 py-5 rounded-2xl border border-black/10 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Conhecer o Kit OAB Completo
              </Link>
            </div>
          </NeumorphicCard>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="py-12 px-6 border-t border-black/5 bg-bg">
        <div className="max-w-[1180px] mx-auto flex flex-col items-center">
          <div className="font-inter font-black text-2xl tracking-tighter mb-2 uppercase">Kit OAB</div>
          <p className="text-text-sec text-sm mb-8">Apostila & Material de Preparação para a 1ª Fase.</p>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold mb-8">
            <Link to="/simulado-1" className="hover:text-primary transition-colors">Simulado Interativo</Link>
            <Link to="/apostila" className="text-primary font-black">Apostila PDF</Link>
          </div>

          <div className="max-w-3xl mx-auto text-center text-[9px] font-mono text-text-sec/60 uppercase leading-loose tracking-widest">
            © 2024 KIT OAB · MATERIAL INDEPENDENTE. NÃO POSSUI VÍNCULO OFICIAL COM A ORDEM DOS ADVOGADOS DO BRASIL.
          </div>
        </div>
      </footer>

    </div>
  );
}
