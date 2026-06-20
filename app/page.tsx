 "use client";

import React, { useState } from 'react';
import { 
  ArrowRight, Zap, Globe, UserCheck, Image, Brain, Calendar, 
  X, Copy, Sparkles, Check, Star, Users, Play 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './components/Toaster';

// Types
interface Variation {
  id: number;
  angle: string;
  content: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface FAQ {
  q: string;
  a: string;
}

const platforms = ['LinkedIn', 'Instagram', 'TikTok', 'X', 'YouTube', 'Facebook'] as const;

// Smart variation generator - makes it feel real and high-quality
function generateVariations(topic: string): Variation[] {
  const cleanTopic = topic.trim() || "growing your personal brand";
  const angles = [
    "Personal Story Hook",
    "Contrarian Take", 
    "Actionable How-To",
    "Surprising List",
    "Provocative Question"
  ];

  const templates = [
    `I used to struggle with ${cleanTopic}... until I discovered this one shift.\n\nHere's exactly what changed everything for me:\n\n1. [Key insight 1]\n2. [Key insight 2]\n3. [Key insight 3]\n\nThe result? My engagement went through the roof.\n\nWhat's one thing you're struggling with right now? 👇`,
    `Most people are wrong about ${cleanTopic}.\n\nThey think it's about [common myth].\n\nBut after analyzing 500+ posts, here's the truth:\n\n→ It's actually about [real insight].\n\nThis completely changed how I approach content.\n\nAgree or disagree?`,
    `How I create content about ${cleanTopic} that gets 10x more saves & shares:\n\nStep 1: Start with a hook that stops the scroll\nStep 2: Deliver value in the first 3 lines\nStep 3: End with a question that sparks comments\n\nCopy this framework and watch your reach explode.`,
    `5 things nobody tells you about ${cleanTopic}:\n\n1. It's not about perfection — it's about consistency\n2. Your first 3 lines determine 80% of success\n3. Storytelling beats selling every single time\n4. Platform-specific formatting > generic posts\n5. The best posts often come from your personal pain points\n\nSave this for your next content session.`,
    `Quick question for anyone serious about ${cleanTopic}:\n\nIf you could only post ONE type of content for the next 30 days, what would it be?\n\nA) Personal stories\nB) Educational threads\nC) Behind-the-scenes\nD) Hot takes\n\nMy answer (and why) in the comments 👇`
  ];

  return angles.map((angle, index) => ({
    id: index + 1,
    angle,
    content: templates[index].replace(/\[.*?\]/g, (match) => {
      if (match.includes('Key insight')) return ['authenticity', 'consistency', 'value-first approach'][index % 3];
      if (match.includes('common myth')) return 'posting more frequently';
      if (match.includes('real insight')) return 'depth and originality win';
      return match;
    })
  }));
}

// FAQ Data
const faqs: FAQ[] = [
  { q: "Does it really sound human?", a: "Yes. Supenli uses advanced anti-AI protocols and style memory to eliminate the robotic tone. Your content passes even the strictest detectors and feels like it came from you." },
  { q: "Which platforms are supported?", a: "All major ones: LinkedIn, Instagram, TikTok, X (Twitter), YouTube, and Facebook. Each variation is automatically optimized for the platform's unique algorithm and audience expectations." },
  { q: "How is this different from ChatGPT?", a: "ChatGPT is general. Supenli is purpose-built for viral social content. It includes RAG on your own sources, real viral scoring, 5 variations per topic, anti-AI humanization, infographic generation, and style memory that learns your voice over time." },
  { q: "Can I generate infographics too?", a: "Absolutely. With one click you can turn any generated post into a beautiful, shareable infographic. Perfect for carousels and visual platforms." },
  { q: "Is my content private?", a: "100%. Your topics, sources, and generated content are private to your account. We never train on your data." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel with one click from your dashboard. No questions asked. Your content history remains accessible until the end of your billing period." }
];

// Testimonials
const testimonials: Testimonial[] = [
  { quote: "Supenli.ai transformed the way I create. I focus on ideas, the AI handles the rest. My LinkedIn engagement tripled.", name: "Awa K. Pen", role: "AI Expert" },
  { quote: "I generate 5 variations in 30 seconds. Before, I used to spend 2 hours on a single LinkedIn post. Game over for writer's block.", name: "Marcus Johnson", role: "Content Strategist · New York, USA" },
  { quote: "The Anti-AI mode is mind-blowing. Even my most demanding clients detect nothing. My content finally sounds human.", name: "Elena Torres", role: "Digital Marketer · Washington, USA" }
];

export default function SupenliLanding() {
  // Modals
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  // Demo state
  const [topic, setTopic] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([...platforms]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Pricing subscribe simulation
  const [subscribing, setSubscribing] = useState<string | null>(null);

  // FAQ open state
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  // Auth form
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Toggle platform in demo
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length === 1) return;
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Generate content
  const handleGenerate = async () => {
    if (!topic.trim()) {
      showToast("Please enter a topic or idea", "error");
      return;
    }
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 850));
    
    const newVariations = generateVariations(topic);
    setVariations(newVariations);
    setShowResults(true);
    setIsGenerating(false);
    
    showToast(`Generated 5 viral variations for ${selectedPlatforms.length} platforms!`);
  };

  // Copy variation
  const copyVariation = (content: string, angle: string) => {
    navigator.clipboard.writeText(content);
    showToast(`Copied "${angle}" to clipboard`);
  };

  // Fake infographic
  const createInfographic = (variation: Variation) => {
    showToast("Infographic prompt generated! (In real app: beautiful visual ready to download)");
  };

  // Reset demo
  const resetDemo = () => {
    setTopic("");
    setVariations([]);
    setShowResults(false);
    setSelectedPlatforms([...platforms]);
  };

  // Fake subscribe
  const handleSubscribe = async (plan: string) => {
    setSubscribing(plan);
    await new Promise(resolve => setTimeout(resolve, 600));
    setSubscribing(null);
    showToast(`Welcome to ${plan}! Check your email for onboarding. (Demo)`);
  };

  // Fake auth
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showToast("Please fill in all fields", "error");
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 400));
    showToast(authMode === 'signup' ? "Account created! Welcome to Supenli." : "Signed in successfully!");
    setIsAuthOpen(false);
    setAuthEmail("");
    setAuthPassword("");
    if (authMode === 'signup') {
      setTimeout(() => setIsDemoOpen(true), 600);
    }
  };

  // Open demo
  const openDemo = () => {
    setIsDemoOpen(true);
    setShowResults(false);
    setVariations([]);
    setTopic("");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-xl font-semibold tracking-tighter">Supenli</span>
                <span className="text-xl font-semibold tracking-tighter text-violet-600">.ai</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm">
              <button onClick={() => scrollTo('capabilities')} className="nav-link">Capabilities</button>
              <button onClick={() => scrollTo('why')} className="nav-link">Why Supenli</button>
              <button onClick={() => scrollTo('stories')} className="nav-link">Stories</button>
              <button onClick={() => scrollTo('pricing')} className="nav-link">Pricing</button>
              <button onClick={() => scrollTo('faq')} className="nav-link">FAQ</button>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => { setAuthMode('signin'); setIsAuthOpen(true); }} className="btn-ghost hidden md:block">Log in</button>
              <button onClick={openDemo} className="btn-primary text-sm">Start Creating <ArrowRight className="h-4 w-4" /></button>
              <button className="md:hidden btn-ghost p-2" onClick={() => scrollTo('pricing')}><Users className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-20 md:pb-24 border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1 text-xs font-semibold tracking-[0.5px] text-violet-700 mb-6">
            <Sparkles className="h-3.5 w-3.5" /> New: AI-powered infographics
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-[0.95] mb-6">
            Create Viral Content<br />in Seconds
          </h1>
          
          <p className="mx-auto max-w-2xl text-xl md:text-2xl text-zinc-600 tracking-tight mb-10">
            Stop spending 2 hours on a single post.<br />
            Generate <span className="font-semibold text-zinc-900">5 viral variations in 30 seconds</span> — for LinkedIn, Instagram, TikTok, X, YouTube &amp; Facebook.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openDemo} className="btn-primary text-base px-8 py-4 text-lg">Start Creating Free <ArrowRight className="h-5 w-5" /></button>
            <button onClick={() => scrollTo('pricing')} className="btn-secondary text-base px-8 py-4 text-lg">See Pricing</button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-500">
            <div className="flex items-center gap-2"><Users className="h-4 w-4" /> <span className="font-medium text-zinc-700">2,500+ creators</span></div>
            <div>Viral Content • Anti-AI Protocol • 6 Platforms • RAG Powered • Human Voice • 5 Variations</div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <div key={p} className="platform-pill text-xs px-4 py-1.5">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="text-center mb-12">
          <div className="text-violet-600 text-sm font-semibold tracking-[1px] mb-3">CAPABILITIES</div>
          <h2 className="text-5xl font-semibold tracking-tighter">All the unfair advantages,<br />in one place</h2>
          <p className="mt-4 text-xl text-zinc-600 max-w-md mx-auto">Research sources, generate, score for virality, ship.<br />No new tab to open, no plugin to install.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Zap, title: "5 variations instantly", desc: "One topic, five angles. Pick the best one and post." },
            { icon: Globe, title: "Platform-optimized", desc: "Built for LinkedIn, Instagram, TikTok, X, YouTube & Facebook. Each variation speaks the platform's language." },
            { icon: UserCheck, title: "AI that sounds human", desc: "No AI smell. Real voice. Real engagement. Our anti-AI protocol passes every detector." },
            { icon: Image, title: "Infographic generator", desc: "Turn any post into a shareable visual in seconds. Perfect for carousels and visual platforms." },
            { icon: Brain, title: "Style memory", desc: "AI learns your voice. Gets better every generation. Your unique tone, automatically." },
            { icon: Calendar, title: "Content calendar", desc: "Plan, schedule, and never miss a posting day. Stay consistent without the stress." },
          ].map((feature, idx) => (
            <div key={idx} className="feature-card group">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">{feature.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SUPENLI - Comparison */}
      <section id="why" className="bg-zinc-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <div className="text-violet-400 text-sm font-semibold tracking-[1px] mb-3">MARKET STANDARD</div>
            <h2 className="text-5xl font-semibold tracking-tighter">Why Supenli.ai?</h2>
            <p className="mt-3 text-xl text-zinc-400">Compare with other AI content creation tools.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="comparison-table w-full min-w-[900px] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950">
                  <th className="text-left font-medium text-zinc-400 w-72">Feature</th>
                  <th className="text-center font-semibold text-white">Supenli.ai</th>
                  <th className="text-center font-medium text-zinc-400">ChatGPT</th>
                  <th className="text-center font-medium text-zinc-400">Jasper</th>
                  <th className="text-center font-medium text-zinc-400">Claude</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {[
                  ["RAG on your sources", true, false, false, false],
                  ["Personalized AI Coach", true, false, false, false],
                  ["Auto infographics", true, false, false, false],
                  ["Style memory", true, false, false, false],
                  ["Real viral scoring", true, false, false, false],
                  ["Real-time trends", true, false, false, false],
                  ["5 variations per topic", true, false, false, false],
                  ["Anti-AI detector", true, false, false, false],
                  ["Monthly price", "$10", "$20", "$49", "$20"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-900/60">
                    <td className="font-medium text-white pl-6">{row[0]}</td>
                    <td className="text-center">{typeof row[1] === 'boolean' ? (row[1] ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <span className="text-zinc-600">—</span>) : <span className="font-semibold text-emerald-400">{row[1]}</span>}</td>
                    <td className="text-center text-zinc-400">{typeof row[2] === 'boolean' ? (row[2] ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-zinc-700" />) : row[2]}</td>
                    <td className="text-center text-zinc-400">{typeof row[3] === 'boolean' ? (row[3] ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-zinc-700" />) : row[3]}</td>
                    <td className="text-center text-zinc-400 pr-6">{typeof row[4] === 'boolean' ? (row[4] ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-zinc-700" />) : row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-zinc-500 mt-4">Supenli gives you everything the others don&apos;t — at a fraction of the price.</p>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section id="stories" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-violet-600 text-sm font-semibold tracking-[1px] mb-3">SUCCESS STORIES</div>
          <h2 className="text-5xl font-semibold tracking-tighter">What our creators say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="flex gap-1 mb-6 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="text-lg leading-relaxed mb-8 text-zinc-700">“{t.quote}”</blockquote>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-zinc-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BATTLE TESTED */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <div className="text-violet-600 text-sm font-semibold tracking-[1px] mb-3">BATTLE TESTED</div>
            <h2 className="text-5xl font-semibold tracking-tighter">The numbers speak for themselves.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "260K+", label: "Likes generated" },
              { number: "850M+", label: "Views reached" },
              { number: "50K+", label: "Shares" },
              { number: "8,810", label: "Reactions last week" },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl bg-white p-8 text-center border border-zinc-100">
                <div className="stat-number">{stat.number}</div>
                <div className="mt-2 text-sm font-medium text-zinc-500 tracking-tight">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-xs text-zinc-500">Real results from real creators using Supenli across LinkedIn, X, Instagram and more.</div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-violet-600 text-sm font-semibold tracking-[1px] mb-3">FAIR PRICING</div>
          <h2 className="text-5xl font-semibold tracking-tighter">Start. Scale fast.</h2>
          <p className="mt-3 text-xl text-zinc-600">Simple plans. Powerful results. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="pricing-card">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-sm font-semibold text-violet-600">PLUS</div>
                <div className="text-6xl font-semibold tracking-tighter mt-1">$10</div>
                <div className="text-sm text-zinc-500">per month • billed monthly</div>
              </div>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {["100 generations per month", "All 6 platforms (IG, TikTok, FB, LinkedIn, YT, X)", "5 viral variations per generation", "Anti-AI humanization — undetectable content", "Unlimited content history", "Upload documents (PDF, URL, notes)", "RAG — AI trained on YOUR content", "Image & infographic prompt generator"].map((f, i) => (
                <li key={i} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 text-emerald-500 flex-shrink-0" /> {f}</li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe('Plus')} disabled={!!subscribing} className="mt-8 w-full btn-primary py-3.5 text-base disabled:opacity-70">{subscribing === 'Plus' ? 'Processing...' : 'Start for $10/month →'}</button>
            <p className="text-center text-[10px] text-zinc-500 mt-3">14-day free trial • No credit card required to start</p>
          </div>

          <div className="pricing-card popular relative">
            <div className="absolute -top-3 right-6 rounded-full bg-violet-600 px-4 py-0.5 text-xs font-semibold text-white tracking-wider">MOST POPULAR</div>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-sm font-semibold text-violet-600">PRO</div>
                <div className="text-6xl font-semibold tracking-tighter mt-1">$30</div>
                <div className="text-sm text-zinc-500">per month • billed monthly</div>
              </div>
            </div>
            <div className="mt-2 text-sm font-medium text-emerald-600">Everything in Plus, plus:</div>
            <ul className="mt-4 space-y-3 text-sm">
              {["Unlimited generations", "Shared workspaces for teams", "Advanced analytics & insights", "Dedicated onboarding call", "Priority support & feature requests"].map((f, i) => (
                <li key={i} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 text-emerald-500 flex-shrink-0" /> {f}</li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe('Pro')} disabled={!!subscribing} className="mt-8 w-full btn-primary py-3.5 text-base bg-zinc-900 hover:bg-black disabled:opacity-70">{subscribing === 'Pro' ? 'Processing...' : 'Get Pro →'}</button>
            <p className="text-center text-[10px] text-zinc-500 mt-3">Everything you need to scale your content engine</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-zinc-50 border-y border-zinc-100 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <div className="text-violet-600 text-sm font-semibold tracking-[1px] mb-3">KNOWLEDGE BASE</div>
            <h2 className="text-5xl font-semibold tracking-tighter">Questions? Answers.</h2>
          </div>

          <div className="divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white">
            {faqs.map((faq, index) => (
              <div key={index} className="px-6">
                <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="faq-question w-full group">
                  <span>{faq.q}</span>
                  <span className={`ml-4 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}><ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600" /></span>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-6 text-zinc-600 pr-8">{faq.a}</motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-6xl font-semibold tracking-tighter">Your audience is waiting</h2>
        <p className="mt-4 text-2xl text-zinc-600 max-w-lg mx-auto">Stop staring at the blank page. Used by 2,500+ creators across six platforms — without the AI-generated smell.</p>
        <button onClick={openDemo} className="mt-10 btn-primary px-10 py-4 text-lg">Start Creating Now — It&apos;s Free to Try <ArrowRight className="h-5 w-5" /></button>
        <div className="mt-6 text-xs text-zinc-500">No credit card required • Cancel anytime • Instant access</div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white py-12 text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600 text-white text-xs">S</div>
              <span className="font-semibold text-zinc-900">Supenli.ai</span>
            </div>
            <div>© {new Date().getFullYear()} Supenli. All rights reserved.</div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="#" className="hover:text-zinc-700">Privacy</a>
            <a href="#" className="hover:text-zinc-700">Terms</a>
            <a href="#" className="hover:text-zinc-700">Twitter</a>
            <a href="#" className="hover:text-zinc-700">LinkedIn</a>
            <button onClick={() => { setAuthMode('signup'); setIsAuthOpen(true); }} className="hover:text-zinc-700">Create account</button>
          </div>
        </div>
      </footer>

      {/* DEMO MODAL */}
      <AnimatePresence>
        {isDemoOpen && (
          <div className="modal" onClick={() => setIsDemoOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }} transition={{ ease: [0.22, 1, 0.36, 1] }} className="modal-content max-w-[820px]" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b px-8 py-5">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-600 p-2 text-white"><Sparkles className="h-5 w-5" /></div>
                    <div>
                      <div className="font-semibold text-xl tracking-tight">Create Viral Content</div>
                      <div className="text-xs text-zinc-500 -mt-0.5">Powered by Supenli AI • 5 variations in seconds</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsDemoOpen(false)} className="rounded-full p-2 hover:bg-zinc-100"><X className="h-5 w-5" /></button>
              </div>

              <div className="p-8">
                {!showResults ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-zinc-700">What&apos;s your topic or idea?</label>
                      <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. How I grew my LinkedIn from 0 to 50k followers in 8 months" className="w-full resize-y min-h-[110px] rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-200" />
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-zinc-700">Optimize for platforms</label>
                        <button onClick={() => setSelectedPlatforms([...platforms])} className="text-xs text-violet-600 hover:underline">Select all</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {platforms.map((p) => (
                          <button key={p} onClick={() => togglePlatform(p)} className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${selectedPlatforms.includes(p) ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'}`}>{p}</button>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="mt-8 w-full btn-primary py-4 text-base disabled:cursor-not-allowed">
                      {isGenerating ? <>Generating 5 viral variations... <span className="animate-pulse">✦</span></> : <>Generate 5 Viral Variations <Zap className="h-4 w-4" /></>}
                    </button>
                    <p className="text-center text-[10px] text-zinc-400 mt-3">Style memory + RAG enabled • Anti-AI protocol active</p>
                  </>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="font-semibold">Here are your 5 viral variations</div>
                        <div className="text-sm text-zinc-500">Optimized for {selectedPlatforms.join(', ')}</div>
                      </div>
                      <button onClick={resetDemo} className="text-sm text-violet-600 hover:underline flex items-center gap-1"><Play className="h-3.5 w-3.5" /> New generation</button>
                    </div>

                    <div className="space-y-4 max-h-[420px] overflow-auto pr-2">
                      {variations.map((v, idx) => (
                        <div key={idx} className="variation-card group">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="rounded-lg bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">Variation {v.id}</div>
                              <div className="text-sm font-semibold text-zinc-800">{v.angle}</div>
                            </div>
                            <div className="flex gap-2 opacity-70 group-hover:opacity-100">
                              <button onClick={() => copyVariation(v.content, v.angle)} className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs hover:bg-zinc-50"><Copy className="h-3.5 w-3.5" /> Copy</button>
                              <button onClick={() => createInfographic(v)} className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs hover:bg-zinc-50"><Image className="h-3.5 w-3.5" /> Infographic</button>
                            </div>
                          </div>
                          <div className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-zinc-700 font-light tracking-[-0.1px]">{v.content}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button onClick={() => { setIsDemoOpen(false); showToast("Content saved to your dashboard (demo)"); }} className="flex-1 btn-secondary py-3">Save to Dashboard</button>
                      <button onClick={resetDemo} className="flex-1 btn-primary py-3">Generate More</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="modal" onClick={() => setIsAuthOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="modal-content max-w-md p-8" onClick={e => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white"><Sparkles className="h-6 w-6" /></div>
                <h3 className="text-2xl font-semibold tracking-tight">{authMode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
                <p className="text-sm text-zinc-500 mt-1">Start creating viral content in seconds</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-zinc-500">Email address</label>
                  <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-violet-300" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500">Password</label>
                  <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-violet-300" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full btn-primary py-3.5 mt-2 text-base">{authMode === 'signup' ? 'Create account & start free trial' : 'Sign in'}</button>
              </form>

              <div className="mt-5 text-center text-xs">
                {authMode === 'signup' ? <>Already have an account? <button onClick={() => setAuthMode('signin')} className="text-violet-600 font-medium hover:underline">Sign in</button></> : <>Don&apos;t have an account? <button onClick={() => setAuthMode('signup')} className="text-violet-600 font-medium hover:underline">Create one</button></>}
              </div>
              <button onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"><X className="h-5 w-5" /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
