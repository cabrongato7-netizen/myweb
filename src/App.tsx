import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Film, 
  Zap, 
  ShieldCheck, 
  Headphones, 
  Smartphone, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Play, 
  ArrowRight, 
  Lock, 
  CreditCard, 
  X, 
  Menu, 
  Server, 
  HelpCircle, 
  Sparkles, 
  Radio, 
  Award,
  Clock,
  ExternalLink,
  MessageSquare,
  Flame,
  Star
} from 'lucide-react';

type Currency = 'USD' | 'GBP' | 'CAD';

interface Plan {
  id: string;
  name: string;
  duration: string;
  prices: { USD: number; GBP: number; CAD: number };
  badge?: string;
  popular?: boolean;
  savings?: string;
}

const PLANS: Plan[] = [
  {
    id: '1-month',
    name: 'Monthly Pass',
    duration: '1 Month',
    prices: { USD: 19.99, GBP: 15.99, CAD: 26.99 },
  },
  {
    id: '3-month',
    name: 'Quarterly Pass',
    duration: '3 Months',
    prices: { USD: 49.99, GBP: 39.99, CAD: 67.99 },
    savings: 'Save 15%'
  },
  {
    id: '12-month',
    name: 'Annual VIP Pass',
    duration: '12 Months',
    prices: { USD: 119.99, GBP: 94.99, CAD: 159.99 },
    badge: 'Best Value',
    popular: true,
    savings: 'Save 50%'
  }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'C$'
};

const FAQ_ITEMS = [
  {
    q: 'How do I receive my login credentials after subscribing?',
    a: 'Delivery is instantaneous. Once you contact us via WhatsApp or Telegram with your chosen plan, your username, password, M3U playlist link, and Xtream Codes API credentials will be delivered within 60 seconds.'
  },
  {
    q: 'Can I test the service before purchasing a full subscription?',
    a: 'Yes! Request our 24-hour trial pass via WhatsApp, Telegram, or Discord to test our 20,000+ live channels, sports packages, and 4K VOD library on your preferred device with zero obligation.'
  },
  {
    q: 'What devices and apps are compatible with IPTV Prime?',
    a: 'IPTV Prime works seamlessly on Amazon Firestick, Android TV, Apple TV, Smart TVs (Samsung, LG, Sony), iOS & Android smartphones/tablets, MAG boxes, Enigma2, and PCs/Macs using popular players like IPTV Smarters Pro, TiviMate, IBO Player, or VLC.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, PayPal, and select cryptocurrencies (Bitcoin, USDT). Message our support team to complete your secure payment.'
  },
  {
    q: 'What is your refund policy?',
    a: 'We stand by our 99.9% uptime and zero-buffering guarantee. If you experience persistent technical issues that our 24/7 support team cannot resolve within 7 days, we offer a hassle-free money-back guarantee.'
  },
  {
    q: 'Is IPTV legal to use in the USA, UK, and Canada?',
    a: 'IPTV Prime operates as an independent media delivery infrastructure provider. Users are solely responsible for ensuring that their use of the service complies with local broadcast regulations and copyright laws in their respective jurisdictions.'
  }
];

const CATEGORIES = [
  { name: 'Live Sports & PPV', count: '1,200+ Channels', icon: Radio },
  { name: 'USA Networks', count: '4,500+ Channels', icon: Globe },
  { name: 'UK & Ireland', count: '3,200+ Channels', icon: Tv },
  { name: 'Canada & International', count: '4,000+ Channels', icon: Globe },
  { name: 'Movies & VOD Library', count: '60,000+ Titles', icon: Film },
  { name: '24/7 Series & Boxsets', count: '800+ Shows', icon: Sparkles }
];

export default function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'subscribe' | 'trial'>('subscribe');
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[2]);

  // Channel Preview Modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [activeCategoryPreview, setActiveCategoryPreview] = useState(CATEGORIES[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (type: 'subscribe' | 'trial', plan: Plan = PLANS[2]) => {
    setModalType(type);
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const whatsappLink = `https://wa.me/447731454811?text=${encodeURIComponent(modalType === 'subscribe' ? `Hi, I want to subscribe to the ${selectedPlan.name} (${selectedPlan.duration}) on IPTV Prime.` : 'Hi, I would like to request a 24-hour free trial for IPTV Prime.')}`;
  const telegramLink = `https://t.me/+447731454811`;
  const discordLink = `https://discord.com/invite/QyNQRYwJj3`;

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F2EC] font-sans selection:bg-[#C9A96E] selection:text-[#121212]">
      
      {/* STICKY TOP NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#2D2D2D] py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-2 text-2xl font-serif font-bold tracking-wider text-[#F5F2EC]">
              IPTV<span className="text-[#C9A96E]">.</span>PRIME
            </a>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-widest bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] rounded-xs font-mono">
              🇺🇸 🇬🇧 🇨🇦 Official Server
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide text-[#F5F2EC]/80">
            <a href="#channels" className="hover:text-[#C9A96E] transition-colors">Channels</a>
            <a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Pricing</a>
            <a href="#how-it-works" className="hover:text-[#C9A96E] transition-colors">How It Works</a>
            <a href="#compatibility" className="hover:text-[#C9A96E] transition-colors">Devices</a>
            <a href="#faq" className="hover:text-[#C9A96E] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#C9A96E] transition-colors">Contact</a>
          </div>

          {/* Right Actions: Currency Selector & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center bg-[#1A1A1A] border border-[#2D2D2D] rounded-xs p-0.5">
              {(['USD', 'GBP', 'CAD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-mono transition-all ${currency === c ? 'bg-[#C9A96E] text-[#121212] font-bold' : 'text-[#F5F2EC]/70 hover:text-[#F5F2EC]'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={() => openModal('subscribe', PLANS[2])}
              className="bg-[#C9A96E] text-[#121212] px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] hover:border-[#C9A96E] border border-transparent transition-all shadow-lg flex items-center gap-2"
            >
              <Zap size={14} className="fill-[#121212]" />
              Start Subscription
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center bg-[#1A1A1A] border border-[#2D2D2D] rounded-xs p-0.5">
              {(['USD', 'GBP', 'CAD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-[11px] font-mono ${currency === c ? 'bg-[#C9A96E] text-[#121212] font-bold' : 'text-[#F5F2EC]/70'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F5F2EC] p-2 hover:text-[#C9A96E]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1A1A1A] border-b border-[#2D2D2D] px-6 py-6 flex flex-col gap-4 shadow-2xl animate-in fade-in duration-200">
            <a href="#channels" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E]">Channels</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E]">Pricing</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E]">How It Works</a>
            <a href="#compatibility" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E]">Devices</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E]">FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E]">Contact</a>
            <button
              onClick={() => { setMobileMenuOpen(false); openModal('subscribe', PLANS[2]); }}
              className="w-full bg-[#C9A96E] text-[#121212] py-3 text-sm font-bold tracking-widest uppercase rounded-[2px] mt-2 text-center"
            >
              Start Subscription
            </button>
          </div>
        )}
      </nav>

      {/* CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Cinematic Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic IPTV Streaming" 
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/85 to-[#121212]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#121212]/70 to-[#121212]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1A1A1A]/90 border border-[#2D2D2D] mb-8 shadow-xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-widest text-[#F5F2EC]/90 font-mono font-medium">
              🇺🇸 USA • 🇬🇧 UK • 🇨🇦 CANADA 4K SERVERS ONLINE
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-[#F5F2EC] mb-6 leading-[1.1]">
            Live TV. Sports. Movies. <br />
            <span className="text-[#C9A96E] italic font-normal">One ultimate subscription.</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#F5F2EC]/75 mb-10 leading-relaxed font-light">
            Stream 20,000+ live channels, 60,000+ VOD movies, and live 4K PPV sports events without buffering. Instant activation via WhatsApp & Telegram.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#pricing"
              className="w-full sm:w-auto bg-[#C9A96E] text-[#121212] px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] hover:border-[#C9A96E] border border-transparent transition-all shadow-2xl flex items-center justify-center gap-3 group"
            >
              View Plans & Pricing
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button
              onClick={() => openModal('trial')}
              className="w-full sm:w-auto bg-[#1A1A1A] text-[#F5F2EC] border border-[#2D2D2D] px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <Play size={15} className="fill-[#C9A96E] text-[#C9A96E]" />
              Start 24H Free Trial
            </button>
          </div>

          {/* Feature Ticker / Trust Bar */}
          <div className="mt-20 pt-10 border-t border-[#2D2D2D]/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center p-4 bg-[#1A1A1A]/40 border border-[#2D2D2D]/40 rounded-[2px]">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A96E]">20,000+</span>
              <span className="text-xs uppercase tracking-widest text-[#F5F2EC]/60 mt-1 font-mono">Live Channels</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#1A1A1A]/40 border border-[#2D2D2D]/40 rounded-[2px]">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A96E]">60,000+</span>
              <span className="text-xs uppercase tracking-widest text-[#F5F2EC]/60 mt-1 font-mono">VOD Movies & Series</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#1A1A1A]/40 border border-[#2D2D2D]/40 rounded-[2px]">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A96E]">4K / FHD</span>
              <span className="text-xs uppercase tracking-widest text-[#F5F2EC]/60 mt-1 font-mono">Ultra HD Quality</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#1A1A1A]/40 border border-[#2D2D2D]/40 rounded-[2px]">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A96E]">99.9%</span>
              <span className="text-xs uppercase tracking-widest text-[#F5F2EC]/60 mt-1 font-mono">Anti-Buffer Uptime</span>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST / COMPATIBILITY LOGO STRIP */}
      <div className="border-y border-[#2D2D2D] bg-[#1A1A1A]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-[#F5F2EC]/50 mb-6 font-mono">
            Compatible with all major streaming devices & media players
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            <span className="text-sm font-serif tracking-wider font-semibold text-[#F5F2EC]">AMAZON FIRESTICK</span>
            <span className="text-sm font-serif tracking-wider font-semibold text-[#F5F2EC]">SAMSUNG & LG SMART TV</span>
            <span className="text-sm font-serif tracking-wider font-semibold text-[#F5F2EC]">APPLE TV & IOS</span>
            <span className="text-sm font-serif tracking-wider font-semibold text-[#F5F2EC]">ANDROID TV & BOX</span>
            <span className="text-sm font-serif tracking-wider font-semibold text-[#F5F2EC]">TIVIMATE • SMARTERS PRO</span>
          </div>
        </div>
      </div>

      {/* CHANNEL & CATEGORY STRIP */}
      <section id="channels" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-mono mb-3 block">
            Endless Entertainment
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EC] mb-4">
            Curated Channels & Global Networks
          </h2>
          <p className="text-[#F5F2EC]/70 text-sm sm:text-base">
            From local news and regional sports in New York, London, and Toronto to international cinema. Explore what's included in your pass.
          </p>
        </div>

        {/* Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                onClick={() => {
                  setActiveCategoryPreview(cat);
                  setPreviewModalOpen(true);
                }}
                className="group p-6 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#C9A96E] transition-all cursor-pointer rounded-[2px] flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#121212] transition-colors rounded-[2px]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#F5F2EC] group-hover:text-[#C9A96E] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-mono text-[#F5F2EC]/50 mt-1">{cat.count}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-[#F5F2EC]/30 group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING TABLE SECTION */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#1A1A1A]/50 via-transparent to-transparent pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-mono mb-3 block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EC] mb-4">
            Choose Your Streaming Pass
          </h2>
          <p className="text-[#F5F2EC]/70 text-sm sm:text-base">
            All plans include full access to 20,000+ channels, 60,000+ VODs, 3 simultaneous screens, and free EPG updates. No hidden fees.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] p-1 mt-8 shadow-md">
            {(['USD', 'GBP', 'CAD'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${currency === c ? 'bg-[#C9A96E] text-[#121212] font-bold' : 'text-[#F5F2EC]/70 hover:text-[#F5F2EC]'}`}
              >
                {c} ({CURRENCY_SYMBOLS[c]})
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-stretch">
          {PLANS.map((plan) => {
            const price = plan.prices[currency];
            const symbol = CURRENCY_SYMBOLS[currency];

            return (
              <div 
                key={plan.id}
                className={`relative bg-[#1A1A1A] border flex flex-col justify-between transition-all rounded-[2px] ${plan.popular ? 'border-[#C9A96E] shadow-2xl lg:-translate-y-2 bg-gradient-to-b from-[#1A1A1A] to-[#222222]' : 'border-[#2D2D2D] hover:border-[#C9A96E]/50'}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-[#121212] px-4 py-1 text-[11px] font-bold uppercase tracking-widest rounded-[2px] shadow-md flex items-center gap-1.5">
                    <Star size={12} className="fill-[#121212]" />
                    {plan.badge}
                  </div>
                )}

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#F5F2EC]">{plan.name}</h3>
                      <p className="text-xs font-mono text-[#F5F2EC]/50 mt-1">{plan.duration} Access</p>
                    </div>
                    {plan.savings && (
                      <span className="px-2.5 py-1 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] text-xs font-mono rounded-[2px]">
                        {plan.savings}
                      </span>
                    )}
                  </div>

                  <div className="my-8 pb-6 border-b border-[#2D2D2D]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F2EC]">{symbol}{price.toFixed(2)}</span>
                      <span className="text-xs text-[#F5F2EC]/50 font-mono">/ {plan.duration.toLowerCase()}</span>
                    </div>
                    <p className="text-xs text-[#F5F2EC]/60 mt-2">Billed once. Instant delivery via WhatsApp or Telegram.</p>
                  </div>

                  <ul className="space-y-3.5 text-sm text-[#F5F2EC]/80 mb-8">
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span><strong>20,000+</strong> Live TV & Sports Channels</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span><strong>60,000+</strong> Movies & TV Series (VOD)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span>4K Ultra HD & 60fps Sports Streams</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span>Anti-Freeze Server Technology</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span><strong>3 Concurrent Connections</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span>7-Day Catchup & Replay TV</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-[#C9A96E] shrink-0" />
                      <span>Free EPG Guide & 24/7 VIP Support</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 pt-0">
                  <button
                    onClick={() => openModal('subscribe', plan)}
                    className={`w-full py-4 text-xs font-bold tracking-widest uppercase rounded-[2px] transition-all flex items-center justify-center gap-2 ${plan.popular ? 'bg-[#C9A96E] text-[#121212] hover:bg-[#D8B97E]' : 'bg-[#222222] text-[#F5F2EC] border border-[#2D2D2D] hover:bg-[#C9A96E] hover:text-[#121212] hover:border-[#C9A96E]'}`}
                  >
                    Subscribe Now
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Money Back Guarantee Banner */}
        <div className="mt-12 p-6 bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] rounded-[2px]">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-[#F5F2EC]">7-Day Money-Back Guarantee</h4>
              <p className="text-xs text-[#F5F2EC]/60 mt-0.5">We guarantee stable streams. If you aren't fully satisfied, our support team will assist or refund.</p>
            </div>
          </div>
          <button
            onClick={() => openModal('trial')}
            className="text-xs uppercase font-bold tracking-widest text-[#C9A96E] hover:underline shrink-0"
          >
            Want to test first? Get 24H Trial →
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2D2D2D]/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-mono mb-3 block">
            Simple 3-Step Setup
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EC] mb-4">
            How IPTV Prime Works
          </h2>
          <p className="text-[#F5F2EC]/70 text-sm sm:text-base">
            No complex satellite dishes or antenna installation. Get connected in less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] relative shadow-lg">
            <span className="text-4xl font-serif font-bold text-[#C9A96E]/20 absolute top-4 right-6">01</span>
            <div className="w-10 h-10 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] flex items-center justify-center font-serif font-bold text-lg mb-6 rounded-[2px]">
              1
            </div>
            <h3 className="text-xl font-serif font-bold text-[#F5F2EC] mb-3">Choose Your Pass</h3>
            <p className="text-sm text-[#F5F2EC]/70 leading-relaxed">
              Select a subscription duration that suits your needs. Contact us directly via WhatsApp or Telegram to activate.
            </p>
          </div>

          <div className="p-8 bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] relative shadow-lg">
            <span className="text-4xl font-serif font-bold text-[#C9A96E]/20 absolute top-4 right-6">02</span>
            <div className="w-10 h-10 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] flex items-center justify-center font-serif font-bold text-lg mb-6 rounded-[2px]">
              2
            </div>
            <h3 className="text-xl font-serif font-bold text-[#F5F2EC] mb-3">Instant Delivery</h3>
            <p className="text-sm text-[#F5F2EC]/70 leading-relaxed">
              Receive your M3U playlist URL, Xtream Codes API details, and easy step-by-step setup guides directly in your chat within 60 seconds.
            </p>
          </div>

          <div className="p-8 bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] relative shadow-lg">
            <span className="text-4xl font-serif font-bold text-[#C9A96E]/20 absolute top-4 right-6">03</span>
            <div className="w-10 h-10 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] flex items-center justify-center font-serif font-bold text-lg mb-6 rounded-[2px]">
              3
            </div>
            <h3 className="text-xl font-serif font-bold text-[#F5F2EC] mb-3">Start Streaming</h3>
            <p className="text-sm text-[#F5F2EC]/70 leading-relaxed">
              Input your details into any preferred IPTV app (TiviMate, IPTV Smarters, Firestick app) and enjoy pristine 4K television.
            </p>
          </div>
        </div>
      </section>

      {/* COMPATIBILITY / DEVICES */}
      <section id="compatibility" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2D2D2D]/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-mono mb-3 block">
              Universal Compatibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F2EC] mb-6">
              Stream on Any Device, Anywhere in USA, UK & Canada
            </h2>
            <p className="text-[#F5F2EC]/70 text-sm sm:text-base mb-8 leading-relaxed">
              Whether you use an Amazon Firestick on your living room TV, an Apple TV in the bedroom, or your tablet on the go, IPTV Prime is fully optimized for all standard IPTV protocols (M3U, Xtream Codes API, MAG).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Amazon Firestick', 'Smart TV (Samsung/LG)', 'Apple TV & iOS', 'Android TV & Box', 'MAG & Enigma2', 'Windows & Mac'].map((dev, idx) => (
                <div key={idx} className="p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] flex items-center gap-3 shadow-md">
                  <Check size={16} className="text-[#C9A96E] shrink-0" />
                  <span className="text-xs font-semibold text-[#F5F2EC]">{dev}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-[#1A1A1A] border border-[#2D2D2D] p-8 rounded-[2px] overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-[#2D2D2D]">
                <div className="p-3.5 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] rounded-[2px]">
                  <Server size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F5F2EC]">Dedicated CDN Nodes</h4>
                  <p className="text-xs text-[#F5F2EC]/60">High-speed servers in New York, London, and Toronto.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-6 border-b border-[#2D2D2D]">
                <div className="p-3.5 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] rounded-[2px]">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F5F2EC]">Zero Buffering Engine</h4>
                  <p className="text-xs text-[#F5F2EC]/60">Advanced load balancing during peak live sports & PPV events.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] rounded-[2px]">
                  <Headphones size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F5F2EC]">24/7 VIP Support</h4>
                  <p className="text-xs text-[#F5F2EC]/60">Instant WhatsApp & Telegram assistance whenever you need help.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#2D2D2D]/60">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-mono mb-3 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EC] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#F5F2EC]/70 text-sm">
            Everything you need to know about our subscription plans, activation, and support.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-[2px] overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#222222]/50 transition-colors"
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#F5F2EC]">{item.q}</span>
                  <span className="text-[#C9A96E] shrink-0">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#F5F2EC]/70 leading-relaxed border-t border-[#2D2D2D]/40 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT & DIRECT MESSAGING SECTION */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2D2D2D]/60 text-center">
        <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-mono mb-3 block">
          24/7 Instant Support & Sales
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EC] mb-6">
          Connect With Us Instantly
        </h2>
        <p className="text-[#F5F2EC]/70 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          Ready to subscribe or need a 24-hour trial? Message our team directly on WhatsApp, Telegram, or join our Discord community for instant assistance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#25D366] transition-all rounded-[2px] flex flex-col items-center gap-4 group shadow-xl"
          >
            <div className="w-14 h-14 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center rounded-full group-hover:bg-[#25D366] group-hover:text-white transition-colors shadow-md">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#F5F2EC]">WhatsApp Chat</h3>
              <p className="text-xs font-mono text-[#F5F2EC]/60 mt-1">Instant VIP Reply</p>
            </div>
            <span className="text-xs text-[#25D366] font-semibold mt-2 flex items-center gap-1.5">
              Open WhatsApp <ExternalLink size={12} />
            </span>
          </a>

          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#0088cc] transition-all rounded-[2px] flex flex-col items-center gap-4 group shadow-xl"
          >
            <div className="w-14 h-14 bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] flex items-center justify-center rounded-full group-hover:bg-[#0088cc] group-hover:text-white transition-colors shadow-md">
              <Radio size={28} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#F5F2EC]">Telegram Desk</h3>
              <p className="text-xs font-mono text-[#F5F2EC]/60 mt-1">24/7 Active</p>
            </div>
            <span className="text-xs text-[#0088cc] font-semibold mt-2 flex items-center gap-1.5">
              Open Telegram <ExternalLink size={12} />
            </span>
          </a>

          <a
            href={discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#5865F2] transition-all rounded-[2px] flex flex-col items-center gap-4 group shadow-xl"
          >
            <div className="w-14 h-14 bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#5865F2] flex items-center justify-center rounded-full group-hover:bg-[#5865F2] group-hover:text-white transition-colors shadow-md">
              <Award size={28} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#F5F2EC]">Discord Community</h3>
              <p className="text-xs font-mono text-[#F5F2EC]/60 mt-1">Join Server</p>
            </div>
            <span className="text-xs text-[#5865F2] font-semibold mt-2 flex items-center gap-1.5">
              Join Discord <ExternalLink size={12} />
            </span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2D2D2D] bg-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4 md:col-span-1">
            <a href="#" className="text-2xl font-serif font-bold tracking-wider text-[#F5F2EC]">
              IPTV<span className="text-[#C9A96E]">.</span>PRIME
            </a>
            <p className="text-xs text-[#F5F2EC]/60 leading-relaxed">
              The premier commercial IPTV streaming provider for customers across the USA, UK, and Canada. 20,000+ channels in crystal clear 4K UHD.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-[#F5F2EC]/80">Servers Online: USA, UK, CAN</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C9A96E] mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F2EC]/70">
              <li><a href="#channels" className="hover:text-[#C9A96E] transition-colors">Channel Lineup</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Subscription Plans</a></li>
              <li><a href="#how-it-works" className="hover:text-[#C9A96E] transition-colors">How It Works</a></li>
              <li><a href="#compatibility" className="hover:text-[#C9A96E] transition-colors">Device Setup</a></li>
              <li><a href="#contact" className="hover:text-[#C9A96E] transition-colors">Contact & Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C9A96E] mb-4">Direct Messaging</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F2EC]/70">
              <li><a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-[#C9A96E] transition-colors">WhatsApp Chat</a></li>
              <li><a href={telegramLink} target="_blank" rel="noreferrer" className="hover:text-[#C9A96E] transition-colors">Telegram Support</a></li>
              <li><a href={discordLink} target="_blank" rel="noreferrer" className="hover:text-[#C9A96E] transition-colors">Discord Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C9A96E] mb-4">Secure Activation</h4>
            <p className="text-xs text-[#F5F2EC]/60 mb-3 leading-relaxed">
              Instant activation and delivery within 60 seconds of contacting our sales desk.
            </p>
            <button
              onClick={() => openModal('subscribe', PLANS[2])}
              className="w-full bg-[#C9A96E] text-[#121212] py-2.5 text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#D8B97E] transition-all"
            >
              Get Started Now
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#2D2D2D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F2EC]/40">
          <p>© {new Date().getFullYear()} IPTV Prime. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-xl">
            Content availability varies by region. Service provided as-is. IPTV Prime does not host or broadcast any copyrighted content.
          </p>
        </div>
      </footer>

      {/* DIRECT CONTACT & ACTIVATION MODAL (Clean, Phone Numbers Hidden) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] max-w-md w-full rounded-[2px] p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#F5F2EC]/60 hover:text-[#C9A96E] transition-colors p-1"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-[#222222] border border-[#2D2D2D] text-[#C9A96E] text-[10px] uppercase font-mono tracking-widest rounded-[2px] mb-3">
                  {modalType === 'subscribe' ? '⚡ Instant Order Activation' : '🎁 24-Hour Free Trial Pass'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#F5F2EC]">
                  {modalType === 'subscribe' ? selectedPlan.name : 'Claim Free Test Pass'}
                </h3>
                <p className="text-xs text-[#F5F2EC]/70 mt-2 leading-relaxed">
                  {modalType === 'subscribe' 
                    ? `Selected: ${selectedPlan.duration} Pass (${CURRENCY_SYMBOLS[currency]}${selectedPlan.prices[currency].toFixed(2)} ${currency}). Connect with us instantly to receive your login credentials within 60 seconds.`
                    : 'Message our team on WhatsApp or Telegram to receive your 24-hour instant test line immediately with zero obligation.'}
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 px-4 text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-3 shadow-xl group"
                >
                  <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                  Connect via WhatsApp
                </a>

                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0088cc] text-white py-4 px-4 text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#0077b5] transition-all flex items-center justify-center gap-3 shadow-xl group"
                >
                  <Radio size={18} className="group-hover:scale-110 transition-transform" />
                  Connect via Telegram
                </a>

                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#5865F2] text-white py-4 px-4 text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#4752c4] transition-all flex items-center justify-center gap-3 shadow-xl group"
                >
                  <Award size={18} className="group-hover:scale-110 transition-transform" />
                  Join Discord Community
                </a>
              </div>

              <div className="pt-2 border-t border-[#2D2D2D]/60 flex items-center justify-center gap-2 text-[11px] text-[#F5F2EC]/50 font-mono">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Support online 24/7/365 • Instant setup</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANNEL CATEGORY PREVIEW MODAL */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] max-w-lg w-full rounded-[2px] p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setPreviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#F5F2EC]/60 hover:text-[#C9A96E] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] block mb-1">Lineup Preview</span>
                <h3 className="text-2xl font-serif font-bold text-[#F5F2EC]">{activeCategoryPreview.name}</h3>
                <p className="text-xs text-[#F5F2EC]/60 mt-1">{activeCategoryPreview.count} included in every pass</p>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {['USA Local & Cable Networks (ESPN, TNT, HBO, Fox, NBC, CBS)', 'UK Premier League & Sky Sports Main Event', 'Canadian TSN, Sportsnet, CBC & Global News', '24/7 PPV Event Dedicated Streams', 'Multi-Audio & Subtitle Options in 4K UHD'].map((ch, idx) => (
                  <div key={idx} className="p-3 bg-[#121212] border border-[#2D2D2D] rounded-[2px] flex items-center gap-3 text-xs text-[#F5F2EC]/90">
                    <Check size={14} className="text-[#C9A96E] shrink-0" />
                    <span>{ch}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => { setPreviewModalOpen(false); openModal('subscribe', PLANS[2]); }}
                  className="w-full bg-[#C9A96E] text-[#121212] py-3.5 text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#D8B97E] transition-all shadow-lg"
                >
                  Contact Us to Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
