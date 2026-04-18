'use client';
import React, { useState, useEffect } from 'react';
import {
  Zap,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  Home,
  Briefcase,
  Sprout,
  TrendingUp,
  LucideIcon // Importação necessária para tipagem
} from 'lucide-react';

// --- INTERFACES DE TIPAGEM ---

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// --- COMPONENTES AUXILIARES ---

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

// Componente de Cartão de Serviço (CORRIGIDO)
const ServiceCard = ({ icon: Icon, title, description, category }: ServiceCardProps) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
    <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
      <Icon className="text-amber-600 group-hover:text-white" size={28} />
    </div>
    <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">{category}</span>
    <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">{title}</h3>
    <p className="text-slate-600 mb-6">{description}</p>
    <button className="flex items-center text-blue-900 font-bold group-hover:gap-2 transition-all">
      Saber mais <ArrowRight size={18} className="ml-1" />
    </button>
  </div>
);

// Componente de Acordião para FAQ (CORRIGIDO)
const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-semibold text-slate-800 text-lg"
      >
        {question}
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <p className="mt-3 text-slate-600 leading-relaxed">{answer}</p>}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Estados para a Calculadora
  const [contaMensal, setContaMensal] = useState(650);
  const [consumoKwh, setConsumoKwh] = useState(550);
  const [tipoRede, setTipoRede] = useState('bifasico');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LÓGICA DE CÁLCULO
  const taxas = { bifasico: 50, trifasico: 100 };
  const taxaKwh = taxas[tipoRede as keyof typeof taxas] || 50;
  const precoKwh = consumoKwh > 0 ? (contaMensal / consumoKwh) : 0;
  const economiaMensal = Math.max(0, (consumoKwh - taxaKwh) * precoKwh);
  const economiaAnual = economiaMensal * 12;
  const economia25Anos = economiaAnual * 25 * 1.5;
  const kwpNecessario = (consumoKwh / (4.5 * 30 * 0.80));
  const estimativaPaineis = Math.ceil(kwpNecessario / 0.55);
  const investimentoEstimado = kwpNecessario * 2906.2;
  const paybackAnos = economiaMensal > 0 ? (investimentoEstimado / economiaMensal / 12).toFixed(1) : "0";

  const whatsappLink = `https://wa.me/553798762495?text=Olá! Fiz uma simulação profissional no site.%0A- Conta: R$${contaMensal}%0A- Consumo: ${consumoKwh}kWh%0A- Rede: ${tipoRede}%0A- Economia Anual: R$${economiaAnual.toFixed(2)}%0AGostaria de um orçamento detalhado!`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-200">

      {/* Botão WhatsApp Flutuante */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#22C55E] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
          Orçamento Grátis
        </span>
      </a>

      {/* Header */}
      <header className={`fixed w-full top-0 left-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-blue-900/10 backdrop-blur-sm py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="logo-Alianca-semfundo.png"
              alt="Aliança Solar"
              className={`h-10 md:h-25 object-contain transition-all duration-300 ${!scrolled ? 'brightness-0 invert' : ''}`}
            />
          </div>

          <nav className={`hidden md:flex gap-8 font-bold ${scrolled ? 'text-slate-700' : 'text-white'}`}>
            <a href="#home" className="hover:text-amber-500 transition-colors">Início</a>
            <a href="#simulador" className="hover:text-amber-500 transition-colors">Simulador</a>
            <a href="#servicos" className="hover:text-amber-500 transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-amber-500 transition-colors">Sobre</a>
          </nav>

          <div className="hidden md:block">
            <a href={whatsappLink} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:shadow-lg">
              Simular Economia
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} className={scrolled ? 'text-blue-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 w-full h-screen bg-white z-[110] p-10 flex flex-col items-center gap-8 md:hidden text-center">
            <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            <nav className="flex flex-col items-center gap-6 text-2xl font-bold text-blue-900 mt-16">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#simulador" onClick={() => setIsMenuOpen(false)}>Simulador</a>
              <a href="#servicos" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href={whatsappLink} className="bg-[#22C55E] text-white px-8 py-4 rounded-full flex items-center gap-2">
                <MessageCircle /> WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1509391366360-fe5bb62935b2?auto=format&fit=crop&q=80&w=2000"
            alt="Painéis Solares"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-6 border border-amber-500/30">
              <Zap size={18} />
              <span className="font-bold text-sm uppercase tracking-widest">Energia Inteligente</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Energia Solar é o melhor <span className="text-amber-500">investimento</span> hoje.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
              Pare de apenas pagar contas. Comece a gerar riqueza com o sol e proteja-se dos aumentos das tarifas de energia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappLink} className="bg-[#22C55E] hover:bg-[#1eb054] text-white px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all hover:-translate-y-1">
                <MessageCircle /> Simular no WhatsApp
              </a>
              <a href="#simulador" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all">
                Usar Calculadora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Simulador */}
      <section id="simulador" className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-4">Simulador Solar Inteligente</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Veja o retorno financeiro real do seu investimento em energia limpa.</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-16">
                <div className="space-y-12">
                  <div>
                    <label className="text-slate-800 font-bold block mb-4 flex items-center gap-2">Tipo de Conexão</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['bifasico', 'trifasico'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTipoRede(type)}
                          className={`py-3 rounded-xl text-xs font-bold uppercase transition-all border-2 ${tipoRede === type
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-amber-500'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-slate-700 font-bold text-lg">Valor da Fatura (Mês)</label>
                      <span className="text-3xl font-black text-amber-500">R$ {contaMensal.toLocaleString()}</span>
                    </div>
                    <input
                      type="range" min="150" max="15000" step="50"
                      value={contaMensal}
                      onChange={(e) => setContaMensal(Number(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-slate-700 font-bold text-lg">Consumo Mensal</label>
                      <span className="text-3xl font-black text-blue-900">{consumoKwh} kWh</span>
                    </div>
                    <input
                      type="range" min="100" max="8000" step="10"
                      value={consumoKwh}
                      onChange={(e) => setConsumoKwh(Number(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 p-8 lg:p-16 text-white relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-12 opacity-5"><TrendingUp size={400} /></div>
                <h3 className="text-sm font-black text-amber-400 mb-8 uppercase tracking-[0.2em] relative z-10">Projeção de Retorno</h3>

                <div className="space-y-10 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-blue-300 text-sm font-bold mb-1">Economia/Ano</p>
                      <p className="text-3xl font-black">R$ {economiaAnual.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                      <p className="text-blue-300 text-sm font-bold mb-1">Economia (25 anos)</p>
                      <p className="text-3xl font-black text-amber-500">R$ {economia25Anos.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-blue-300 text-sm font-bold mb-1">Se Paga (Tempo Estimado)</p>
                      <p className="text-2xl font-bold">{paybackAnos} Anos</p>
                    </div>
                    <div>
                      <p className="text-blue-300 text-sm font-bold mb-1">Painéis Necessários</p>
                      <p className="text-2xl font-bold">{estimativaPaineis} Unidades</p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-blue-200 text-sm font-medium mb-1">Investimento Médio do Sistema</p>
                    <p className="text-3xl font-black">R$ {investimentoEstimado.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
                  </div>

                  <a href={whatsappLink} className="w-full bg-[#22C55E] hover:bg-[#1eb054] text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all">
                    <MessageCircle size={24} /> Receber Orçamento PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={Home}
            category="Residencial"
            title="Conforto para sua casa"
            description="Ligue o ar-condicionado sem medo. Valorize o seu imóvel e garanta economia por mais de 25 anos."
          />
          <ServiceCard
            icon={Briefcase}
            category="Comercial"
            title="Lucratividade empresarial"
            description="Transforme um custo fixo num investimento. Melhore o seu fluxo de caixa e marketing verde."
          />
          <ServiceCard
            icon={Sprout}
            category="Agronegócio"
            title="Potência para o campo"
            description="Autonomia energética para irrigação e galpões. Produza mais com menos custos."
          />
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="instalacao-profissional.png" className="rounded-3xl shadow-2xl" alt="Instalação Profissional" />
              <div className="absolute -bottom-8 -right-8 bg-amber-500 p-8 rounded-2xl text-white shadow-xl hidden lg:block text-center">
                <p className="text-4xl font-black">100%</p>
                <p className="font-bold opacity-80 uppercase text-xs">Engenharia Própria</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-blue-900 mb-6">Por que escolher a Aliança Solar?</h2>
              <div className="space-y-6">
                {[
                  { title: "Equipamentos Premium", desc: "Trabalhamos apenas com marcas Tier 1 mundiais." },
                  { title: "Monitoramento por App", desc: "Acompanhe sua produção em tempo real no seu telemóvel." },
                  { title: "Garantia Estendida", desc: "Suporte técnico dedicado e garantias de até 25 anos." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit"><CheckCircle className="text-blue-900" size={20} /></div>
                    <div><h4 className="font-bold text-slate-900">{item.title}</h4><p className="text-slate-600 text-sm">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 container mx-auto px-6 max-w-4xl relative z-10">
        <h2 className="text-4xl font-black text-blue-900 text-center mb-12">Dúvidas Frequentes</h2>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <FAQItem question="Quanto tempo dura um sistema solar?" answer="Os painéis solares têm vida útil superior a 25 anos." />
          <FAQItem question="O que acontece em dias de chuva?" answer="A produção continua em menor escala. À noite, usa-se a rede elétrica compensando com o excesso gerado no dia." />
          <FAQItem question="É possível financiar?" answer="Sim, temos parcerias bancárias com taxas exclusivas para energia solar." />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <img
            src="logo-Alianca-semfundo.png"
            alt="Aliança Solar"
            className="h-30 mx-auto mb-10 object-contain brightness-0 invert"
          />
          <div className="flex justify-center gap-6 mb-12">
            <a href="https://www.instagram.com/alliancasolar/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
              <LinkedinIcon />
            </a>
          </div>
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Codenu. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}