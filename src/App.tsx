import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Tv,
  Film,
  Radio,
  Globe,
  Sparkles,
  Smile,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Play,
  X,
  Menu,
  Search,
  MessageSquare,
  Send,
  Users,
  ExternalLink,
  ShieldCheck,
  Headphones,
  Server
} from 'lucide-react';
import heroCinemaImg from './assets/images/hero_cinema_lounge_1794527675631.jpg';
import devicesSetupImg from './assets/images/devices_media_setup_1794527674906.jpg';

type Currency = 'USD' | 'GBP' | 'CAD';

interface Plan {
  id: string;
  name: string;
  duration: string;
  prices: { USD: number; GBP: number; CAD: number };
  perMonthNote: { USD: string; GBP: string; CAD: string };
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
    perMonthNote: { USD: '$19.99 / mo', GBP: '£15.99 / mo', CAD: 'C$26.99 / mo' }
  },
  {
    id: '3-month',
    name: 'Quarterly Pass',
    duration: '3 Months',
    prices: { USD: 49.99, GBP: 39.99, CAD: 67.99 },
    perMonthNote: { USD: '$16.66 / mo', GBP: '£13.33 / mo', CAD: 'C$22.66 / mo' },
    savings: 'Save 15%'
  },
  {
    id: '12-month',
    name: 'Annual VIP Pass',
    duration: '12 Months',
    prices: { USD: 74.99, GBP: 59.99, CAD: 104.99 },
    perMonthNote: { USD: '$6.25 / mo', GBP: '£5.00 / mo', CAD: 'C$8.75 / mo' },
    badge: 'Best Value',
    popular: true,
    savings: 'Save 69%'
  }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'C$'
};

const CATEGORIES = [
  {
    name: 'Sports',
    count: '1,200+ Live Channels',
    icon: Radio,
    details: [
      '4K UHD & 60fps Premier League, NFL, NBA, NHL, and MLB coverage',
      'Dedicated Pay-Per-View (PPV) boxing and UFC event streams',
      'North American regional sports networks and UK Sky & TNT sports tiers',
      'Multi-angle event feeds with low-latency routing'
    ]
  },
  {
    name: 'Entertainment',
    count: '4,500+ Channels',
    icon: Tv,
    details: [
      'Full USA national and local cable entertainment networks',
      'UK & Ireland broadcast channels including catch-up schedules',
      'Canadian coast-to-coast entertainment and lifestyle networks',
      'Real-time Electronic Program Guide (EPG) across all regions'
    ]
  },
  {
    name: 'Movies',
    count: '60,000+ VOD Titles',
    icon: Film,
    details: [
      'Curated cinema library updated daily in 4K UHD and Dolby Audio',
      'Classic cinema collections, studio blockbusters, and 24/7 movie feeds',
      'Complete multi-season boxsets and trending series on demand',
      'Multi-language subtitle tracks and instant resume playback'
    ]
  },
  {
    name: 'Kids',
    count: '450+ Family Channels',
    icon: Smile,
    details: [
      'Dedicated family, animation, and educational programming',
      'Ad-free children’s movie libraries on demand',
      'Parental PIN lock compatibility across supported player apps',
      'USA, UK, and Canadian children’s broadcast networks'
    ]
  },
  {
    name: 'News',
    count: '900+ Global Feeds',
    icon: Globe,
    details: [
      '24-hour breaking news from US, UK, Canadian, and international desks',
      'Business, financial markets, and parliamentary coverage',
      'Local city affiliate news feeds across North America and Britain',
      'Instant channel zapping with zero stream warmup delay'
    ]
  },
  {
    name: 'International',
    count: '8,000+ Regional Feeds',
    icon: Sparkles,
    details: [
      'French-Canadian, Latin American, European, and South Asian packs',
      'Live cultural, cinema, and international football broadcasts',
      'Organized regional bouquets so playlists stay clean and fast',
      'Customizable channel groups upon activation request'
    ]
  }
];

const POPULAR_LINEUP = [
  { name: 'Premier Football & Top-Flight UK Sports', category: 'Sports', region: 'UK' },
  { name: 'National Football, Basketball & Baseball Networks', category: 'Sports', region: 'USA' },
  { name: 'Canadian Hockey & National Sports Desks', category: 'Sports', region: 'Canada' },
  { name: 'Live PPV Championship Boxing & MMA Cards', category: 'Pay-Per-View', region: 'Global' },
  { name: 'US Coast-to-Coast Local Affiliates & News', category: 'News', region: 'USA' },
  { name: 'British Terrestrial & Drama Broadcasts', category: 'Entertainment', region: 'UK' },
  { name: 'Canadian English & French National Networks', category: 'Entertainment', region: 'Canada' },
  { name: '4K Cinema Vault & Weekly New Releases', category: 'Movies', region: 'Global' },
  { name: 'Complete Multi-Season Boxsets & Drama VOD', category: 'Series', region: 'Global' },
  { name: 'Family Animation & Educational Channels', category: 'Kids', region: 'USA · UK · CAN' }
];

const STEPS = [
  {
    num: '01',
    title: 'Choose your plan',
    desc: 'Select a Monthly, Quarterly, or Annual VIP pass in USD, GBP, or CAD, or request a 24-hour trial to test stream quality first.'
  },
  {
    num: '02',
    title: 'Receive credentials',
    desc: 'Connect with our desk on WhatsApp or Telegram. Your Xtream Codes login, M3U playlist link, and setup guide arrive within 60 seconds.'
  },
  {
    num: '03',
    title: 'Start streaming',
    desc: 'Enter your details into TiviMate, IPTV Smarters, or your preferred player on Firestick, Smart TV, Android, or iOS and watch in 4K.'
  }
];

const DEVICES = [
  'Amazon Firestick & Fire TV',
  'Samsung & LG Smart TV',
  'Apple TV & iOS',
  'Android TV & Shield',
  'MAG & Enigma2',
  'Windows & macOS'
];

const TESTIMONIALS = [
  {
    quote: 'Switched our living room TV from cable before football season. 4K sports streams hold steady all Sunday and activation took two minutes.',
    author: 'Marcus T.',
    region: 'New York, USA · Annual VIP Pass'
  },
  {
    quote: 'Cleanest UK and Canadian sports lineup I have used. Zero freezing during Saturday afternoon fixtures and support replied right away.',
    author: 'Liam W.',
    region: 'London, UK · Quarterly Pass'
  },
  {
    quote: 'Setup on TiviMate was effortless. All Canadian networks and 4K cinema releases load immediately without buffering.',
    author: 'Chloe M.',
    region: 'Toronto, Canada · Annual VIP Pass'
  }
];

const FAQ_ITEMS = [
  {
    q: 'Can I test IPTV Prime with a free trial before subscribing?',
    a: 'Yes. We provide a 24-hour evaluation pass so you can test our USA, UK, and Canadian channel lineup, live sports streams, and 4K VOD library on your own device before committing to a paid plan.'
  },
  {
    q: 'Which devices and apps are supported?',
    a: 'IPTV Prime works on Amazon Firestick, Samsung and LG Smart TVs, Apple TV, iOS, Android TV, Android phones, MAG boxes, and Windows or Mac computers using standard players such as TiviMate, IPTV Smarters Pro, and IBO Player.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We support major credit and debit cards processed securely via Stripe, PayPal, and select cryptocurrencies. Reach out to our activation desk on WhatsApp or Telegram to complete checkout in your preferred currency.'
  },
  {
    q: 'What is your refund policy?',
    a: 'All plans are covered by a 7-day satisfaction guarantee. If you encounter persistent playback issues that our technical desk cannot resolve on your connection, you may request a full refund within 7 days of activation.'
  },
  {
    q: 'How do I contact customer support?',
    a: 'Our support and activation team is available 24/7 via WhatsApp, Telegram, and our Discord community. Average response time for setup help or playlist customization is under five minutes.'
  },
  {
    q: 'What should I know regarding regional availability and compliance?',
    a: 'IPTV Prime operates as an independent streaming delivery service. Content availability varies by region, and subscribers are responsible for ensuring their use complies with local broadcast regulations and copyright laws in their jurisdiction.'
  }
];

export default function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Image fallback flags
  const [heroImgError, setHeroImgError] = useState(false);
  const [devicesImgError, setDevicesImgError] = useState(false);

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'subscribe' | 'trial'>('subscribe');
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[2]);

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [activeCategoryPreview, setActiveCategoryPreview] = useState(CATEGORIES[0]);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (type: 'subscribe' | 'trial', plan: Plan = PLANS[2]) => {
    setModalType(type);
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const whatsappLink = `https://wa.me/447731454811?text=${encodeURIComponent(
    modalType === 'subscribe'
      ? `Hi, I would like to subscribe to the ${selectedPlan.name} (${selectedPlan.duration} - ${CURRENCY_SYMBOLS[currency]}${selectedPlan.prices[currency].toFixed(2)} ${currency}) on IPTV Prime.`
      : 'Hi, I would like to request a 24-hour free trial pass for IPTV Prime.'
  )}`;
  const telegramLink = 'https://t.me/+447731454811';
  const discordLink = 'https://discord.com/invite/QyNQRYwJj3';

  const filteredLineup = POPULAR_LINEUP.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
      };

  return (
    <div className="min-h-screen bg-[#141414] text-[#F5F2EC] font-sans selection:bg-[#C9A96E] selection:text-[#141414]">
      {/* 1. STICKY TOP NAV — STRICT 3-ZONE CONTRACT */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#2C2C2C]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-[#F5F2EC] whitespace-nowrap shrink-0"
          >
            IPTV<span className="text-[#C9A96E]">.</span>PRIME
          </a>

          {/* Zone 2: 5 clean single-line nav links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm text-[#F5F2EC]/80"
          >
            <a
              href="#channels"
              className="hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0"
            >
              Channels
            </a>
            <a
              href="#pricing"
              className="hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
            <a
              href="#support"
              className="hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0"
            >
              Support
            </a>
          </nav>

          {/* Zone 3: 1 primary CTA action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openModal('subscribe', PLANS[2])}
              className="hidden sm:inline-flex items-center justify-center bg-[#C9A96E] text-[#141414] border border-[#C9A96E] px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Start Subscription
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#F5F2EC] p-2 hover:text-[#C9A96E] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1A1A1A] border-b border-[#2C2C2C] px-6 py-6 flex flex-col gap-4">
            <a
              href="#channels"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E] py-1"
            >
              Channels
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E] py-1"
            >
              Pricing
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E] py-1"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E] py-1"
            >
              FAQ
            </a>
            <a
              href="#support"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#F5F2EC]/90 hover:text-[#C9A96E] py-1"
            >
              Support
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('subscribe', PLANS[2]);
              }}
              className="w-full bg-[#C9A96E] text-[#141414] border border-[#C9A96E] py-3.5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] transition-colors mt-2"
            >
              Start Subscription
            </button>
          </div>
        )}
      </header>

      {/* 2. CINEMATIC HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Visual + Scrim */}
        <div className="absolute inset-0 z-0 bg-[#141414]">
          {!heroImgError ? (
            <img
              src={heroCinemaImg}
              alt="Luxury 4K home cinema streaming live sports"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgError(true)}
              className="w-full h-full object-cover object-center opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1E1C18] via-[#141414] to-[#0D0D0D]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/82 to-[#141414]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/65" />
        </div>

        {/* Main Editorial Column */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A96E] mb-6">
              United States · United Kingdom · Canada
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-serif font-semibold tracking-tight text-[#F5F2EC] leading-[1.06] mb-6">
              Live TV. Sports. Movies.{' '}
              <span className="text-[#C9A96E] italic font-normal block sm:inline">
                One subscription.
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-[#F5F2EC]/80 leading-relaxed mb-10">
              Stream 20,000+ live channels, 4K sports fixtures, and 60,000+ on-demand movies and series across North America and the UK with dedicated low-latency routing.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-3 bg-[#C9A96E] text-[#141414] border border-[#C9A96E] px-8 py-4 text-xs font-bold tracking-[0.16em] uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] transition-colors whitespace-nowrap"
              >
                View Plans
                <ArrowRight size={15} />
              </a>

              <button
                onClick={() => openModal('trial')}
                className="inline-flex items-center justify-center gap-3 bg-transparent text-[#F5F2EC] border border-[#F5F2EC]/30 px-8 py-4 text-xs font-bold tracking-[0.16em] uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Play size={14} className="text-[#C9A96E]" />
                Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Unboxed KPI Bar anchored below hero */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-[#2C2C2C]/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-semibold text-[#F5F2EC] tabular-nums">
              20,000+
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F2EC]/60 mt-1">
              Live Channels
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-semibold text-[#F5F2EC] tabular-nums">
              60,000+
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F2EC]/60 mt-1">
              Movies & Series VOD
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-semibold text-[#F5F2EC] tabular-nums">
              4K UHD
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F2EC]/60 mt-1">
              60fps Sports Broadcasts
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-semibold text-[#C9A96E] tabular-nums">
              99.9%
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F2EC]/60 mt-1">
              Regional Server Uptime
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BAR — GRAYSCALE PLATFORMS & PAYMENTS */}
      <div className="border-y border-[#2C2C2C] bg-[#1A1A1A] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-mono tracking-[0.12em] uppercase text-[#F5F2EC]/55">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="text-[#F5F2EC]/80">Works on</span>
            <span>Firestick</span>
            <span aria-hidden="true">·</span>
            <span>Smart TV</span>
            <span aria-hidden="true">·</span>
            <span>Android</span>
            <span aria-hidden="true">·</span>
            <span>iOS</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="text-[#F5F2EC]/80">Accepted</span>
            <span>Visa</span>
            <span aria-hidden="true">·</span>
            <span>Mastercard</span>
            <span aria-hidden="true">·</span>
            <span>PayPal</span>
            <span aria-hidden="true">·</span>
            <span>Stripe</span>
          </div>
        </div>
      </div>

      {/* 3. CHANNEL & CATEGORY STRIP (NO CARD CONTAINERS) */}
      <motion.section
        id="channels"
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
              Channel Categories
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#F5F2EC]">
              Built for North American & UK Viewing
            </h2>
          </div>
          <p className="text-sm text-[#F5F2EC]/70 max-w-md leading-relaxed">
            Browse every broadcast category included in your pass. Select any category to inspect included regional coverage.
          </p>
        </div>

        {/* Clean hairline-divided horizontal strip — zero card containers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-y border-[#2C2C2C] divide-y sm:divide-y-0 sm:divide-x divide-[#2C2C2C]">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategoryPreview(cat);
                  setPreviewModalOpen(true);
                }}
                className="group py-7 px-5 text-left border-t-2 border-t-transparent hover:border-t-[#C9A96E] hover:bg-[#1A1A1A] transition-colors flex flex-col justify-between gap-6 cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#C9A96E]">
                  <Icon size={20} strokeWidth={1.75} />
                  <ArrowRight
                    size={15}
                    className="text-[#F5F2EC]/30 group-hover:text-[#C9A96E] group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#F5F2EC] group-hover:text-[#C9A96E] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-[#F5F2EC]/55 mt-1.5 tabular-nums">
                    {cat.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Integrated Lineup Checker */}
        <div className="mt-12 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-xl font-serif font-semibold text-[#F5F2EC] mb-2">
              Search Channel & Sports Availability
            </h3>
            <p className="text-sm text-[#F5F2EC]/65 leading-relaxed mb-5">
              Filter by sport, network category, or country (USA, UK, Canada) to check instant availability before starting a trial.
            </p>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F5F2EC]/45"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search channels and sports"
                placeholder="Search sports, UK, USA, Canada, movies..."
                className="w-full bg-[#1A1A1A] border border-[#2C2C2C] rounded-[2px] pl-11 pr-4 py-3.5 text-sm text-[#F5F2EC] placeholder-[#F5F2EC]/40 focus:border-[#C9A96E] focus:outline-none"
              />
            </div>
          </div>

          <div className="lg:col-span-7 border-t border-[#2C2C2C] divide-y divide-[#2C2C2C]">
            {filteredLineup.length > 0 ? (
              filteredLineup.slice(0, 6).map((item) => (
                <div
                  key={item.name}
                  className="py-3.5 flex items-center justify-between gap-4 text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Check size={15} className="text-[#C9A96E] shrink-0" />
                    <span className="text-[#F5F2EC]/90 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5F2EC]/55 whitespace-nowrap shrink-0">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#C9A96E]">{item.region}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-sm text-[#F5F2EC]/60">
                Over 20,000 channels are included in every pass. Message our team to verify a specific regional feed.
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 4. PRICING TABLE + ASYMMETRIC VALUE COMPARISON */}
      <motion.section
        id="pricing"
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2C2C2C]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
              Subscription Plans
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#F5F2EC]">
              Simple, One-Time Passes
            </h2>
            <p className="text-sm sm:text-base text-[#F5F2EC]/70 mt-3 max-w-xl">
              Every plan unlocks all 20,000+ live channels, 60,000+ VOD titles, 3 simultaneous connections, and full 4K coverage.
            </p>
          </div>

          {/* Interactive Currency Toggle */}
          <div
            role="group"
            aria-label="Select currency"
            className="inline-flex items-center bg-[#1A1A1A] border border-[#2C2C2C] rounded-[2px] p-1 self-start md:self-auto"
          >
            {(['USD', 'GBP', 'CAD'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currency === c
                    ? 'bg-[#C9A96E] text-[#141414] font-semibold'
                    : 'text-[#F5F2EC]/70 hover:text-[#F5F2EC]'
                }`}
              >
                {c} ({CURRENCY_SYMBOLS[c]})
              </button>
            ))}
          </div>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const price = plan.prices[currency];
            const symbol = CURRENCY_SYMBOLS[currency];

            const otherCurrencies = (['USD', 'GBP', 'CAD'] as Currency[])
              .filter((c) => c !== currency)
              .map((c) => `${CURRENCY_SYMBOLS[c]}${plan.prices[c].toFixed(2)} ${c}`)
              .join(' · ');

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-[2px] p-8 transition-colors ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#231F18] to-[#1A1A1A] border border-[#C9A96E] border-t-2 border-t-[#C9A96E]'
                    : 'bg-[#1A1A1A] border border-[#2C2C2C] hover:border-[#C9A96E]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#C9A96E]">
                      {plan.duration}
                    </span>
                    {plan.badge ? (
                      <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#C9A96E] font-semibold">
                        {plan.badge} · {plan.savings}
                      </span>
                    ) : plan.savings ? (
                      <span className="text-xs font-mono text-[#F5F2EC]/60">
                        {plan.savings}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-2xl font-serif font-semibold text-[#F5F2EC]">
                    {plan.name}
                  </h3>

                  <div className="my-7 pb-7 border-b border-[#2C2C2C]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-serif font-semibold text-[#F5F2EC] tabular-nums">
                        {symbol}
                        {price.toFixed(2)}
                      </span>
                      <span className="text-xs font-mono text-[#F5F2EC]/60">
                        {currency}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#C9A96E]/90 mt-2.5 tabular-nums">
                      Equivalent to {plan.perMonthNote[currency]} · Billed once
                    </p>
                    <p className="text-[11px] font-mono text-[#F5F2EC]/45 mt-1 tabular-nums">
                      Also available in {otherCurrencies}
                    </p>
                  </div>

                  <ul className="space-y-3.5 text-sm text-[#F5F2EC]/85 mb-8">
                    <li className="flex items-center gap-3">
                      <Check size={15} className="text-[#C9A96E] shrink-0" />
                      <span>20,000+ Live USA, UK & Canada Channels</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={15} className="text-[#C9A96E] shrink-0" />
                      <span>60,000+ Movies & Series On Demand</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={15} className="text-[#C9A96E] shrink-0" />
                      <span>4K UHD & 60fps Live Sports Coverage</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={15} className="text-[#C9A96E] shrink-0" />
                      <span>3 Concurrent Device Connections</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={15} className="text-[#C9A96E] shrink-0" />
                      <span>7-Day Catch-Up, EPG & 24/7 Support</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => openModal('subscribe', plan)}
                  className={`w-full py-3.5 px-6 text-xs font-bold tracking-[0.16em] uppercase rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-[#C9A96E] text-[#141414] border border-[#C9A96E] hover:bg-transparent hover:text-[#C9A96E]'
                      : 'bg-transparent text-[#F5F2EC] border border-[#F5F2EC]/30 hover:bg-[#C9A96E] hover:text-[#141414] hover:border-[#C9A96E]'
                  }`}
                >
                  Subscribe
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Asymmetric Two-Column Plan Comparison */}
        <div className="mt-14 pt-12 border-t border-[#2C2C2C] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
              Plan Comparison
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#F5F2EC] mb-4">
              Why most subscribers choose the Annual VIP Pass
            </h3>
            <p className="text-sm text-[#F5F2EC]/70 leading-relaxed mb-6">
              You receive the exact same channel lineup and 4K sports stability across every pass—going annual simply cuts your monthly cost in half and keeps your playlist active for a full 12 months without renewal interruptions.
            </p>
            <button
              onClick={() => openModal('trial')}
              className="text-xs font-mono uppercase tracking-[0.14em] text-[#C9A96E] hover:underline inline-flex items-center gap-2 cursor-pointer"
            >
              Not sure yet? Request a 24-hour free trial
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#2C2C2C] rounded-[2px] divide-y divide-[#2C2C2C]">
            <div className="grid grid-cols-3 px-6 py-4 text-xs font-mono uppercase tracking-wider text-[#F5F2EC]/55">
              <span>Included Feature</span>
              <span className="text-right">Monthly</span>
              <span className="text-right text-[#C9A96E]">Annual VIP</span>
            </div>
            {[
              ['Monthly Equivalent', PLANS[0].perMonthNote[currency], PLANS[2].perMonthNote[currency]],
              ['Live TV & Sports', '20,000+ Feeds', '20,000+ Feeds'],
              ['Simultaneous Screens', '3 Devices', '3 Devices'],
              ['7-Day Money-Back Guarantee', 'Included', 'Included'],
              ['Priority Playlist Setup', 'Standard', 'VIP Priority']
            ].map(([label, mVal, aVal]) => (
              <div
                key={label}
                className="grid grid-cols-3 px-6 py-4 text-sm items-center"
              >
                <span className="text-[#F5F2EC]/85">{label}</span>
                <span className="text-right font-mono text-xs text-[#F5F2EC]/60 tabular-nums">
                  {mVal}
                </span>
                <span className="text-right font-mono text-xs text-[#C9A96E] font-medium tabular-nums">
                  {aVal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. HOW IT WORKS — 3 NUMBERED STEPS, NO CIRCLES AROUND ICONS */}
      <motion.section
        id="how-it-works"
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2C2C2C]"
      >
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
            Three-Step Setup
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#F5F2EC]">
            From Checkout to Live 4K in Minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#2C2C2C] divide-y md:divide-y-0 md:divide-x divide-[#2C2C2C]">
          {STEPS.map((step) => (
            <div key={step.num} className="py-8 md:px-8 first:md:pl-0 last:md:pr-0">
              <p className="text-3xl font-serif font-semibold text-[#C9A96E] tabular-nums mb-5">
                {step.num}
              </p>
              <h3 className="text-xl font-serif font-semibold text-[#F5F2EC] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#F5F2EC]/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 6. COMPATIBILITY & INFRASTRUCTURE SPLIT */}
      <motion.section
        id="compatibility"
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2C2C2C]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Visual Column */}
          <div className="lg:col-span-6 flex flex-col bg-[#1A1A1A] border border-[#2C2C2C] rounded-[2px] overflow-hidden">
            <div className="relative flex-1 min-h-[280px] lg:min-h-[380px]">
              {!devicesImgError ? (
                <img
                  src={devicesSetupImg}
                  alt="Streaming box, smart TV remote, and tablet on dark slate console"
                  referrerPolicy="no-referrer"
                  onError={() => setDevicesImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#1F1D19] to-[#141414]">
                  <Tv size={36} className="text-[#C9A96E] mb-3" />
                  <p className="font-serif text-lg text-[#F5F2EC]">Multi-Device Streaming</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-[#2C2C2C] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#F5F2EC]/65">
              <span className="text-[#C9A96E] uppercase tracking-wider">Supported Apps</span>
              <span>TiviMate · IPTV Smarters Pro · IBO Player · VLC</span>
            </div>
          </div>

          {/* Right Devices & Infrastructure Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
                Device Compatibility
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#F5F2EC] mb-4">
                Built for Every Screen in Your Home
              </h2>
              <p className="text-sm sm:text-base text-[#F5F2EC]/70 leading-relaxed mb-8">
                Full support for M3U playlists, Xtream Codes API, and MAG portals. Configure once on your living room television and take your lineup on mobile or tablet when traveling.
              </p>

              {/* Devices label grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 pb-8 border-b border-[#2C2C2C]">
                {DEVICES.map((device) => (
                  <div key={device} className="flex items-center gap-2.5 text-sm text-[#F5F2EC]/90">
                    <Check size={15} className="text-[#C9A96E] shrink-0" />
                    <span>{device}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#C9A96E] mb-1.5">
                  <Server size={16} />
                  <span className="text-xs font-mono uppercase tracking-wider">Regional Nodes</span>
                </div>
                <p className="text-xs text-[#F5F2EC]/65 leading-relaxed">
                  New York, London, and Toronto edge routing for clean 4K playback.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#C9A96E] mb-1.5">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-mono uppercase tracking-wider">7-Day Guarantee</span>
                </div>
                <p className="text-xs text-[#F5F2EC]/65 leading-relaxed">
                  Full refund protection if stream stability falls short on your connection.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#C9A96E] mb-1.5">
                  <Headphones size={16} />
                  <span className="text-xs font-mono uppercase tracking-wider">Direct Desk</span>
                </div>
                <p className="text-xs text-[#F5F2EC]/65 leading-relaxed">
                  24/7 WhatsApp, Telegram, and Discord assistance for player setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SUBSCRIBER REVIEWS */}
      <motion.section
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2C2C2C]"
      >
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
            Subscriber Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#F5F2EC]">
            Trusted Across the USA, UK & Canada
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.author}
              className="bg-[#1A1A1A] border border-[#2C2C2C] p-8 rounded-[2px] flex flex-col justify-between gap-6"
            >
              <p className="text-sm sm:text-base text-[#F5F2EC]/85 leading-relaxed">
                “{item.quote}”
              </p>
              <footer className="pt-4 border-t border-[#2C2C2C]">
                <p className="font-serif font-semibold text-[#F5F2EC]">{item.author}</p>
                <p className="text-xs font-mono text-[#F5F2EC]/55 mt-0.5">{item.region}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </motion.section>

      {/* 7. FAQ ACCORDION */}
      <motion.section
        id="faq"
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#2C2C2C]"
      >
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#F5F2EC]">
            Everything You Should Know
          </h2>
        </div>

        <div className="border-t border-[#2C2C2C] divide-y divide-[#2C2C2C]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-6 text-left flex items-center justify-between gap-6 hover:text-[#C9A96E] transition-colors cursor-pointer"
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#F5F2EC]">
                    {item.q}
                  </span>
                  <span className="text-[#C9A96E] shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-8 text-sm text-[#F5F2EC]/70 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* DIRECT SUPPORT & ACTIVATION CHANNELS (NO RAW PHONE NUMBERS SHOWN) */}
      <motion.section
        id="support"
        {...fadeUp}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2C2C2C]"
      >
        <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-[2px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-3">
              24/7 Activation & Support
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#F5F2EC] mb-4">
              Ready to Stream or Request a Free Trial?
            </h2>
            <p className="text-sm sm:text-base text-[#F5F2EC]/70 leading-relaxed">
              Message our desk directly on WhatsApp or Telegram, or join our Discord server for instant 24-hour test credentials, subscription checkout, and setup guidance.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#C9A96E] text-[#141414] border border-[#C9A96E] py-4 px-6 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-3">
                <MessageSquare size={17} />
                Connect via WhatsApp
              </span>
              <ExternalLink size={15} />
            </a>

            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-transparent text-[#F5F2EC] border border-[#2C2C2C] py-4 px-6 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-3">
                <Send size={17} />
                Connect via Telegram
              </span>
              <ExternalLink size={15} />
            </a>

            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-transparent text-[#F5F2EC] border border-[#2C2C2C] py-4 px-6 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-3">
                <Users size={17} />
                Join Discord Community
              </span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </motion.section>

      {/* 8. QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-[#2C2C2C] bg-[#1A1A1A] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <a
              href="#"
              className="text-2xl font-serif font-bold tracking-wider text-[#F5F2EC]"
            >
              IPTV<span className="text-[#C9A96E]">.</span>PRIME
            </a>
            <p className="text-xs text-[#F5F2EC]/60 leading-relaxed mt-4">
              Live TV, 4K sports, and on-demand cinema streaming for households across the United States, United Kingdom, and Canada.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#C9A96E] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F5F2EC]/70">
              <li>
                <a href="#channels" className="hover:text-[#C9A96E] transition-colors">
                  Channels
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#C9A96E] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#C9A96E] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C9A96E] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#C9A96E] mb-4">
              Support Desk
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F5F2EC]/70">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  WhatsApp Activation
                </a>
              </li>
              <li>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Telegram Support
                </a>
              </li>
              <li>
                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Discord Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#C9A96E] mb-4">
              Payment Methods
            </h4>
            <p className="text-sm text-[#F5F2EC]/70 leading-relaxed">
              Visa, Mastercard, PayPal, Stripe, and major cryptocurrencies supported via our activation desk.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#2C2C2C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F2EC]/45">
          <p>© {new Date().getFullYear()} IPTV Prime. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Content availability varies by region. Service provided as-is.
          </p>
        </div>
      </footer>

      {/* ACTIVATION & TRIAL MODAL (PHONE NUMBERS HIDDEN) */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#1A1A1A] border border-[#2C2C2C] max-w-md w-full rounded-[2px] p-6 sm:p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-[#F5F2EC]/60 hover:text-[#C9A96E] transition-colors p-2 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-2">
                  {modalType === 'subscribe' ? 'Instant Order Activation' : '24-Hour Free Trial'}
                </p>
                <h3 className="text-2xl font-serif font-semibold text-[#F5F2EC]">
                  {modalType === 'subscribe' ? selectedPlan.name : 'Request a Free Trial Pass'}
                </h3>
                <p className="text-sm text-[#F5F2EC]/70 mt-2 leading-relaxed">
                  {modalType === 'subscribe'
                    ? `Selected: ${selectedPlan.duration} (${CURRENCY_SYMBOLS[currency]}${selectedPlan.prices[currency].toFixed(2)} ${currency}). Connect below to complete checkout and receive login credentials within 60 seconds.`
                    : 'Connect with our desk below to receive your 24-hour evaluation credentials with no credit card required.'}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#C9A96E] text-[#141414] border border-[#C9A96E] py-3.5 px-5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <MessageSquare size={17} />
                    Connect via WhatsApp
                  </span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-transparent text-[#F5F2EC] border border-[#2C2C2C] py-3.5 px-5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <Send size={17} />
                    Connect via Telegram
                  </span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-transparent text-[#F5F2EC] border border-[#2C2C2C] py-3.5 px-5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <Users size={17} />
                    Join Discord Community
                  </span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="pt-4 border-t border-[#2C2C2C] text-xs font-mono text-[#F5F2EC]/55 text-center">
                Support is online 24/7 · Instant credential delivery
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY LINEUP PREVIEW MODAL */}
      {previewModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#1A1A1A] border border-[#2C2C2C] max-w-lg w-full rounded-[2px] p-6 sm:p-8 relative">
            <button
              onClick={() => setPreviewModalOpen(false)}
              aria-label="Close category preview"
              className="absolute top-4 right-4 text-[#F5F2EC]/60 hover:text-[#C9A96E] transition-colors p-2 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A96E] mb-2">
                  {activeCategoryPreview.count}
                </p>
                <h3 className="text-2xl font-serif font-semibold text-[#F5F2EC]">
                  {activeCategoryPreview.name}
                </h3>
              </div>

              <ul className="divide-y divide-[#2C2C2C] border-y border-[#2C2C2C]">
                {activeCategoryPreview.details.map((detail) => (
                  <li key={detail} className="py-3.5 flex items-start gap-3 text-sm text-[#F5F2EC]/85">
                    <Check size={15} className="text-[#C9A96E] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setPreviewModalOpen(false);
                    openModal('subscribe', PLANS[2]);
                  }}
                  className="flex-1 bg-[#C9A96E] text-[#141414] border border-[#C9A96E] py-3.5 px-5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:bg-transparent hover:text-[#C9A96E] transition-colors cursor-pointer"
                >
                  Subscribe Now
                </button>
                <button
                  onClick={() => {
                    setPreviewModalOpen(false);
                    openModal('trial');
                  }}
                  className="flex-1 bg-transparent text-[#F5F2EC] border border-[#2C2C2C] py-3.5 px-5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors cursor-pointer"
                >
                  Free 24H Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
