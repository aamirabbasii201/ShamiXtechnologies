import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Cloud, Code2, Copy,
  Database, ExternalLink, Globe2, Linkedin, Mail,
  Menu, MessageCircle, Palette, Rocket,
  Send, ServerCog, ShieldCheck, Smartphone, Sparkles, Workflow, X,
  Quote, ChevronLeft, ChevronRight, ArrowUp, Star,
  Bot, BrainCircuit, FileSearch, LineChart, Cpu, Zap, MessagesSquare, Search,
} from 'lucide-react';
import './style.css';

/* ---------------------------------------------------------------
   CONTACT — replace with VERIFIED ShamiX business details.
   Anything left empty automatically shows a "coming soon" state.
---------------------------------------------------------------- */
const CONTACT = {
  email: '', // e.g. 'hello@your-verified-domain.com'
  whatsapp: '', // International digits only, e.g. '923001234567'
  linkedin: '', // Full company page URL, e.g. 'https://www.linkedin.com/company/...'
};

const SITE = {
  name: 'ShamiX Technologies',
  description:
    'ShamiX Technologies is an independent digital engineering studio designing and building custom software, web platforms, mobile apps and AI-powered products.',
};

/* ------------------------------ DATA ------------------------------ */
const services = [
  { icon: Code2, title: 'Custom Software Development', description: 'Purpose-built software, business systems and secure platforms designed around your operations.', tags: ['Business software', 'APIs', 'SaaS'] },
  { icon: Globe2, title: 'Web Design & Development', description: 'Fast, memorable websites and scalable web applications with exceptional user experiences.', tags: ['React', 'E-commerce', 'Web apps'] },
  { icon: Smartphone, title: 'Mobile App Development', description: 'Native and cross-platform mobile experiences crafted for usability, reliability and growth.', tags: ['Android', 'iOS', 'Cross-platform'] },
  { icon: Palette, title: 'UI/UX & Product Design', description: 'Clear, distinctive interfaces informed by research, usability and a consistent design language.', tags: ['Figma', 'Prototyping', 'Design systems'] },
  { icon: Sparkles, title: 'AI & Intelligent Automation', description: 'Practical AI features and workflow automations that simplify repetitive work and unlock value.', tags: ['AI integration', 'Automation', 'Assistants'] },
  { icon: Cloud, title: 'Cloud, Backend & DevOps', description: 'Resilient backend services, cloud deployments and infrastructure designed to evolve with demand.', tags: ['Architecture', 'Databases', 'Deployment'] },
  { icon: ShieldCheck, title: 'Maintenance & Optimization', description: 'Performance tuning, code modernization, security-minded reviews and ongoing improvements.', tags: ['Support', 'Audits', 'Performance'] },
  { icon: Workflow, title: 'Product Strategy & Consulting', description: 'From initial product discovery to launch planning, we connect business goals with technical execution.', tags: ['Discovery', 'Roadmaps', 'MVPs'] },
];

const projects = [
  { number: '01', category: 'PLATFORM CONCEPT', title: 'Enterprise Operations', description: 'Connected dashboards, role-based workflows and complex data made easier to navigate.', icon: Database, variant: 'project-platform' },
  { number: '02', category: 'MOBILE CONCEPT', title: 'Mobile-First Experiences', description: 'Intuitive mobile journeys designed for clarity, speed and everyday use.', icon: Smartphone, variant: 'project-mobile' },
  { number: '03', category: 'COMMERCE CONCEPT', title: 'Modern Digital Commerce', description: 'Thoughtful shopping experiences with streamlined discovery and checkout.', icon: Globe2, variant: 'project-commerce' },
];

const processSteps = [
  { number: '01', title: 'Discover', description: 'We understand the goals, users, constraints and opportunities before choosing the solution.' },
  { number: '02', title: 'Plan & Design', description: 'We map journeys, define architecture and prototype the experience for early alignment.' },
  { number: '03', title: 'Build & Validate', description: 'We implement iteratively, review quality and test the important user flows.' },
  { number: '04', title: 'Launch & Evolve', description: 'We prepare deployment, measure outcomes and refine the product over time.' },
];

const industries = [
  ['01', 'Startups & SaaS', 'Launch focused products and build foundations that can scale.'],
  ['02', 'Education', 'Create connected experiences for students, educators and administrators.'],
  ['03', 'Retail & Commerce', 'Make product discovery, ordering and operations more seamless.'],
  ['04', 'Professional Services', 'Replace fragmented workflows with purpose-built digital tools.'],
  ['05', 'Logistics & Location', 'Design systems for maps, routing, tracking and operational visibility.'],
  ['06', 'Product-Led Businesses', 'Improve onboarding, engagement and everyday product usability.'],
];

const techGroups = [
  ['Frontend & Web', 'React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
  ['Mobile & Apps', 'Kotlin', 'Java', 'Android', 'Jetpack Compose', 'React Native'],
  ['Backend & Data', 'Node.js', 'NestJS', 'REST APIs', 'SQL', 'Database design'],
  ['Product & Delivery', 'Figma', 'UI/UX', 'Git', 'Testing', 'Cloud deployment'],
];

const engagements = [
  {
    number: '01', title: 'MVP Sprint', tag: 'VALIDATE FAST',
    description: 'A tightly scoped first release that tests your most important assumptions with real users.',
    points: ['Focused feature scope', 'Rapid design & build cycles', 'Clear path to version two'],
  },
  {
    number: '02', title: 'Project Delivery', tag: 'DEFINED SCOPE',
    description: 'End-to-end delivery of a defined product, from discovery and design through launch.',
    points: ['Phased milestones', 'Transparent progress updates', 'Documented, maintainable code'],
  },
  {
    number: '03', title: 'Ongoing Partnership', tag: 'GROW CONTINUOUSLY',
    description: 'Long-term product engineering, improvement and support as your needs evolve.',
    points: ['Continuous improvements', 'Performance & security reviews', 'Flexible capacity'],
  },
];

const faqs = [
  ['What types of projects can ShamiX help with?', 'We focus on custom software, websites, mobile applications, UI/UX, backend systems, AI integrations and product modernization.'],
  ['Can you work with an existing product or codebase?', 'Yes. An initial technical review helps determine whether improvement, modernization or a rebuild is the best approach.'],
  ['How do you estimate project timelines and budgets?', 'We first review the scope, features, integrations, design requirements and delivery priorities, then propose a suitable phased plan.'],
  ['Do you offer support after launch?', 'Maintenance, improvements and ongoing product development can be discussed as part of the engagement.'],
  ['Can we start with a small MVP?', 'Yes. A focused MVP is often a sensible way to validate the most important product assumptions before expanding.'],
];

// Replace with real, approved client testimonials before publishing.
const testimonialExamples = [
  { category: 'PRODUCT ENGINEERING', quote: 'The team understood our product goals and made the technical decisions easy to follow.', role: 'Example feedback · SaaS project' },
  { category: 'DESIGN & EXPERIENCE', quote: 'A thoughtful design process helped turn a complicated workflow into something simple.', role: 'Example feedback · UI/UX project' },
  { category: 'MOBILE DEVELOPMENT', quote: 'Clear milestones and attention to detail made the development process feel collaborative.', role: 'Example feedback · Mobile project' },
];

// Replace each placeholder with an approved portrait and the real team member's name.
const leadership = [
  { role: 'CEO & Founder', label: 'Leadership & Vision', image: '/team/ceo.jpg', initials: 'CEO' },
  { role: 'Manager', label: 'Operations & Delivery', image: '/team/manager.jpg', initials: 'MGR' },
  { role: 'Team Lead', label: 'Engineering & Quality', image: '/team/team-lead.jpg', initials: 'TL' },
];

/*
 * FICTIONAL SAMPLE REVIEWS — for layout demonstration only.
 * These are not actual ShamiX clients or verified customer testimonials.
 * Replace with permissioned, authentic feedback before public launch.
 */
const reviews = [
  {"name": "Alex M.", "role": "Web platform", "company": "Demo example", "rating": 5, "text": "We had a lot of ideas but no clear place to start. The discovery sessions helped us figure out what actually needed to be in version one.", "source": "SAMPLE"},
  {"name": "Taylor R.", "role": "Website redesign", "company": "Demo example", "rating": 5, "text": "The new layout feels much easier to use. I especially liked that the team explained why certain design choices made sense.", "source": "SAMPLE"},
  {"name": "Jordan K.", "role": "Mobile app", "company": "Demo example", "rating": 4, "text": "There were a few tricky parts with the app, but communication stayed clear throughout. That made a big difference for us.", "source": "SAMPLE"},
  {"name": "Sam P.", "role": "UI/UX design", "company": "Demo example", "rating": 5, "text": "Our original dashboard had too much going on. The revised flow is simpler, and people can find what they need faster.", "source": "SAMPLE"},
  {"name": "Morgan L.", "role": "Product design", "company": "Demo example", "rating": 5, "text": "I appreciated the small details. Even the empty states and error messages were thought through instead of being left until the end.", "source": "SAMPLE"},
  {"name": "Casey D.", "role": "Backend development", "company": "Demo example", "rating": 4, "text": "We needed a backend that would be easy to maintain. The structure and documentation gave our developers a good starting point.", "source": "SAMPLE"},
  {"name": "Jamie W.", "role": "Landing page", "company": "Demo example", "rating": 5, "text": "The first design wasn’t quite the direction we wanted, but the revisions got us there. The final page feels much more like our brand.", "source": "SAMPLE"},
  {"name": "Riley S.", "role": "App modernization", "company": "Demo example", "rating": 4, "text": "We were worried about changing an existing app. The work was broken into manageable steps, which made the process less stressful.", "source": "SAMPLE"},
  {"name": "Cameron B.", "role": "SaaS dashboard", "company": "Demo example", "rating": 5, "text": "What stood out was how much attention went into everyday workflows, not just the main screens. That’s where the product improved most.", "source": "SAMPLE"},
  {"name": "Avery N.", "role": "E-commerce experience", "company": "Demo example", "rating": 5, "text": "Checkout used to feel like a long process. The updated screens are cleaner and the steps make more sense now.", "source": "SAMPLE"},
  {"name": "Drew H.", "role": "API integration", "company": "Demo example", "rating": 4, "text": "We hit a few integration issues along the way. They were explained clearly, and we agreed on a practical way forward each time.", "source": "SAMPLE"},
  {"name": "Reese G.", "role": "Startup MVP", "company": "Demo example", "rating": 5, "text": "We didn’t have the budget to build everything at once. Prioritizing the core features helped us get a usable first version.", "source": "SAMPLE"},
  {"name": "Quinn F.", "role": "Design system", "company": "Demo example", "rating": 5, "text": "The component library saved us from making the same decisions over and over. Handoffs between design and development are smoother.", "source": "SAMPLE"},
  {"name": "Parker J.", "role": "Business software", "company": "Demo example", "rating": 5, "text": "The most useful change was replacing a bunch of spreadsheets with one straightforward workflow. It’s a lot easier to keep track of things.", "source": "SAMPLE"},
  {"name": "Skyler T.", "role": "Mobile UX", "company": "Demo example", "rating": 4, "text": "Some of the improvements were surprisingly simple—better labels, clearer buttons, fewer taps. They added up quickly.", "source": "SAMPLE"},
  {"name": "Robin C.", "role": "Cloud infrastructure", "company": "Demo example", "rating": 5, "text": "The deployment process was explained in plain language, which I appreciated. We also got a clearer picture of what to maintain afterward.", "source": "SAMPLE"},
  {"name": "Devon A.", "role": "Website build", "company": "Demo example", "rating": 5, "text": "We wanted something polished without feeling overdesigned. The finished layout struck a good balance.", "source": "SAMPLE"},
  {"name": "Finley O.", "role": "Product strategy", "company": "Demo example", "rating": 4, "text": "They challenged a couple of our assumptions in a helpful way. We ended up with a smaller, more focused scope.", "source": "SAMPLE"},
  {"name": "Harper E.", "role": "Admin portal", "company": "Demo example", "rating": 5, "text": "Our team spends hours in the admin panel, so usability mattered more than flashy visuals. The updated screens reflect that.", "source": "SAMPLE"},
  {"name": "Rowan I.", "role": "Frontend development", "company": "Demo example", "rating": 5, "text": "The interface works well across different screen sizes, and the code was organized enough for us to continue building on it.", "source": "SAMPLE"},
  {"name": "Kendall V.", "role": "Automation concept", "company": "Demo example", "rating": 4, "text": "We started with a repetitive manual task. Mapping out the steps showed where automation would help and where it really wouldn’t.", "source": "SAMPLE"},
  {"name": "Blake U.", "role": "UI refresh", "company": "Demo example", "rating": 5, "text": "The visual changes are nice, but the clearer navigation is what I notice most when using the product.", "source": "SAMPLE"},
  {"name": "Emerson Y.", "role": "Technical consulting", "company": "Demo example", "rating": 5, "text": "The advice felt practical, not like a sales pitch. We got a straightforward explanation of the trade-offs.", "source": "SAMPLE"},
  {"name": "Sage Z.", "role": "Feature redesign", "company": "Demo example", "rating": 4, "text": "A few rounds of feedback were needed, which is normal for a project like this. I appreciated that our comments were taken seriously.", "source": "SAMPLE"},
];


/* ------------------------------ AI DATA ------------------------------ */
// Capabilities we offer. Written as services, not as claims about past projects.
const aiCapabilities = [
  { icon: Bot, title: 'AI Assistants & Copilots', description: 'Conversational assistants embedded in your product or internal tools, grounded in your own content and rules.', points: ['Customer & staff assistants', 'Tool use & actions', 'Tone and policy control'] },
  { icon: FileSearch, title: 'Knowledge Search (RAG)', description: 'Ask questions across documents, wikis and databases and get answers that point back to their sources.', points: ['Document ingestion', 'Semantic search', 'Source citations'] },
  { icon: Workflow, title: 'Workflow Automation', description: 'Automate repetitive, multi-step work such as triage, data entry, routing and reporting, with humans in the loop where it matters.', points: ['Email & ticket triage', 'Approvals & hand-offs', 'System integrations'] },
  { icon: MessagesSquare, title: 'Document Intelligence', description: 'Extract, classify and summarize contracts, invoices, forms and reports into structured, usable data.', points: ['Data extraction', 'Summaries', 'Classification'] },
  { icon: LineChart, title: 'Analytics & Prediction', description: 'Turn historical data into forecasts, scores and recommendations that feed straight into dashboards and decisions.', points: ['Forecasting', 'Anomaly detection', 'Recommendations'] },
  { icon: Cpu, title: 'AI-Accelerated Engineering', description: 'We use modern AI tooling in our own delivery to prototype faster, test more and keep quality high.', points: ['Rapid prototyping', 'Test generation', 'Code review support'] },
];

const aiPipeline = [
  ['01', 'Data & context', 'Connect the right sources, clean them and decide what the model should and should not see.'],
  ['02', 'Model & prompt design', 'Choose a suitable model, design prompts and retrieval, and balance quality, speed and cost.'],
  ['03', 'Guardrails & evaluation', 'Test against real scenarios, add safety checks and measure results before launch.'],
  ['04', 'Product & monitoring', 'Ship it inside a polished interface, then monitor usage, quality and spend.'],
];

const aiPrinciples = [
  ['Privacy first', 'Sensitive data handling is designed in from day one, not bolted on.'],
  ['Human in the loop', 'People review and approve actions where mistakes would be costly.'],
  ['Measured, not guessed', 'We evaluate with real examples so quality is something you can see.'],
  ['Cost aware', 'Model choice, caching and limits keep usage predictable as you scale.'],
];

// Scripted, clearly-labelled illustration. NOT a live model.
const aiDemoScenarios = [
  { q: 'Summarize the key risks in this supplier contract.', a: 'Three points to review: an auto-renewal clause (section 4), uncapped liability for delays (section 9) and a 60-day termination notice (section 12).' },
  { q: 'Which open support tickets look urgent?', a: 'Flagged 4 of 37 as urgent: payment failures and a login outage. Drafted replies are ready for your review.' },
  { q: 'What is our refund policy for annual plans?', a: 'Annual plans can be refunded within 30 days of purchase. Source: Billing Policy, page 2.' },
];

// Stats are derived from the site's own content, so they never overstate anything.
const techCount = techGroups.reduce((sum, g) => sum + g.length - 1, 0);
const stats = [
  { value: services.length, label: 'Service disciplines' },
  { value: processSteps.length, label: 'Phase delivery process' },
  { value: industries.length, label: 'Industries we serve' },
  { value: techCount, label: 'Technologies in our toolkit' },
];

const navLinks = [
  ['Work', 'work'], ['Services', 'expertise'], ['AI', 'ai'], ['About', 'about'],
  ['Process', 'process'], ['FAQ', 'faq'], ['Contact', 'contact'],
];

/* --------------------------- SHARED PIECES --------------------------- */
function Brand() {
  return (
    <a className="brand" href="#home" aria-label={`${SITE.name} home`}>
      <span className="brand-avatar">
        <img
          className="brand-logo"
          src="/brand-concept.png"
          alt=""
          width="54"
          height="54"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </span>
      <span className="brand-type"><strong>Shami<span>X</span></strong><small>TECHNOLOGIES</small></span>
    </a>
  );
}

function SectionIntro({ eyebrow, title, accent, description }) {
  return (
    <div className="full-section-intro">
      <div>
        <span className="section-kicker"><span />{eyebrow}</span>
        <h2>{title} <em>{accent}</em></h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') { setValue(target); return undefined; }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return [ref, value];
}

/* ------------------------------ HEADER ------------------------------ */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(([, id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sx-lock', open);
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('sx-lock'); window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <Brand />
        <nav id="main-nav" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([name, id]) => (
            <a key={id} href={`#${id}`} className={activeId === id ? 'active' : ''} aria-current={activeId === id ? 'true' : undefined} onClick={() => setOpen(false)}>{name}</a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">Let's Talk <ArrowUpRight size={17} /></a>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className="sx-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}

/* ------------------------------- HERO ------------------------------- */
function Hero() {
  return (
    <section id="home" className="hero full-hero">
      <div className="hero-grid" />
      <div className="orb orb-one" /><div className="orb orb-two" />
      <div className="container full-hero-layout">
        <div className="hero-content">
          <span className="section-kicker"><span /> INDEPENDENT DIGITAL ENGINEERING STUDIO</span>
          <h1>Engineering<br /><em>What's Next.</em></h1>
          <p>We design, engineer and evolve ambitious digital products — bringing together thoughtful strategy, exceptional design and dependable technology.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#work">Explore Our Work <ArrowUpRight size={19} /></a>
            <a className="btn secondary" href="#contact">Start a Project <ArrowRight size={18} /></a>
          </div>
          <div className="hero-footnote"><span className="status-dot" /> OPEN TO PROJECT INQUIRIES <span className="footnote-rule" /> BUILT WITH PURPOSE</div>
        </div>
        <div className="full-hero-visual" role="img" aria-label="ShamiX software architecture illustration">
          <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
          <div className="architecture-card">
            <div className="architecture-bar"><span className="window-lights">● ● ●</span><span>SHAMIX / PRODUCT SYSTEMS</span></div>
            <div className="architecture-heading"><ServerCog size={21} /> From idea to impact</div>
            {['Discovery & strategy', 'Experience design', 'Engineering & delivery', 'Launch & iteration'].map((item, i) => (
              <div className="architecture-row" key={item}><span className="architecture-index">0{i + 1}</span><span>{item}</span><Check size={16} /></div>
            ))}
            <div className="architecture-footer"><span className="status-dot" /> BUILT TO EVOLVE <ArrowUpRight size={15} /></div>
          </div>
        </div>
      </div>
      <div className="container full-trust-strip"><span>STRATEGY</span><i /> <span>DESIGN</span><i /> <span>ENGINEERING</span><i /> <span>GROWTH</span></div>
    </section>
  );
}

function Stat({ value, label }) {
  const [ref, n] = useCountUp(value);
  return (
    <div className="sx-stat" ref={ref}>
      <strong>{n}<em>+</em></strong>
      <span>{label}</span>
    </div>
  );
}

function Stats() {
  return (
    <section className="sx-stats" aria-label="ShamiX at a glance">
      <div className="container sx-stats-grid">
        {stats.map((s) => <Stat key={s.label} {...s} />)}
      </div>
    </section>
  );
}

function TechMarquee() {
  const items = techGroups.flatMap(([, ...rest]) => rest);
  const group = (hidden) => (
    <div className="sx-marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
  return (
    <div className="sx-marquee" aria-label="Technologies we work with">
      <div className="sx-marquee-track">{group(false)}{group(true)}</div>
    </div>
  );
}


/* ------------------------------ PRELOADER ------------------------------ */
function Preloader() {
  const [state, setState] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'gone';
      if (sessionStorage.getItem('sx-intro')) return 'gone';
    } catch { /* storage unavailable: just show the intro */ }
    return 'show';
  });
  useEffect(() => {
    if (state !== 'show') return undefined;
    try { sessionStorage.setItem('sx-intro', '1'); } catch { /* ignore */ }
    const t1 = setTimeout(() => setState('leaving'), 1100);
    const t2 = setTimeout(() => setState('gone'), 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [state]);
  if (state === 'gone') return null;
  return (
    <div className={`sx-preloader ${state === 'leaving' ? 'leaving' : ''}`} aria-hidden="true">
      <div className="sx-preloader-mark">Shami<span>X</span></div>
      <div className="sx-preloader-bar"><i /></div>
      <small>TECHNOLOGIES</small>
    </div>
  );
}

/* ------------------------------ CTA BAND ------------------------------ */
function CtaBand() {
  return (
    <section className="sx-cta" aria-labelledby="cta-heading">
      <div className="sx-cta-glow" aria-hidden="true" />
      <div className="container sx-cta-inner">
        <div>
          <span className="section-kicker"><span /> READY WHEN YOU ARE</span>
          <h2 id="cta-heading">Have a product in mind? <em>Let's shape it.</em></h2>
        </div>
        <div className="sx-cta-actions">
          <a className="btn primary" href="#contact">Start a Project <ArrowUpRight size={19} /></a>
          <a className="btn secondary" href="#process">See how we work <ArrowRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- REVIEWS WALL ----------------------------- */
function Stars({ rating = 0 }) {
  return (
    <span className="sx-stars" role="img" aria-label={rating ? `${rating} out of 5 stars` : 'No rating yet'}>
      {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={15} className={n <= rating ? 'on' : ''} />)}
    </span>
  );
}

function ReviewCard({ review }) {
  const initials = review.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <figure className="sx-review sx-glow">
      <div className="sx-review-top"><Stars rating={review.rating} />{review.source && <small>{review.source}</small>}</div>
      <blockquote>“{review.text}”</blockquote>
      <figcaption>
        <span className="sx-review-avatar">{initials}</span>
        <span><strong>{review.name}</strong><small>{[review.role, review.company].filter(Boolean).join(' · ')}</small></span>
        {review.url && <a href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${review.name}'s review on ${review.source || 'the source'}`}><ExternalLink size={15} /></a>}
      </figcaption>
    </figure>
  );
}

function ReviewSlot({ index }) {
  return (
    <figure className="sx-review sx-review-slot sx-glow">
      <div className="sx-review-top"><Stars rating={0} /><small>SLOT {String(index + 1).padStart(2, '0')}</small></div>
      <div className="sx-skeleton"><i /><i /><i style={{ width: '62%' }} /></div>
      <figcaption>
        <span className="sx-review-avatar">?</span>
        <span><strong>Your client's name</strong><small>Role · Company</small></span>
      </figcaption>
    </figure>
  );
}

function ReviewsWall() {
  const hasReviews = reviews.length > 0;
  const items = hasReviews
    ? reviews.map((r, i) => <ReviewCard key={`${r.name}-${i}`} review={r} />)
    : Array.from({ length: 9 }, (_, i) => <ReviewSlot key={i} index={i} />);
  const cols = [[], [], []];
  items.forEach((el, i) => cols[i % 3].push(el));
  const scrolls = items.length >= 6;

  return (
    <section id="reviews" className="full-section sx-reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="full-section-intro">
          <div>
            <span className="section-kicker"><span /> SAMPLE REVIEW WALL</span>
            <h2 id="reviews-heading">A preview of <em>client feedback.</em></h2>
          </div>
          <p><strong>Illustrative content only.</strong> These {reviews.length} fictional examples demonstrate the review layout and animation. They are not actual client feedback or verified ratings.</p>
        </div>
        <div className={`sx-reviews-wall ${scrolls ? 'scrolls' : ''}`}>
          {cols.map((col, c) => (
            <div className={`sx-reviews-col col-${c}`} key={c}>
              <div className="sx-reviews-track">
                {col}
                {scrolls && <div className="sx-reviews-dup" aria-hidden="true">{col.map((el) => React.cloneElement(el, { key: `d-${el.key}` }))}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ------------------------------ AI SHOWCASE ------------------------------ */
function NeuralNet() {
  const layers = [3, 5, 5, 2];
  const W = 420, H = 300, padX = 46;
  const nodes = layers.map((count, li) => Array.from({ length: count }, (_, ni) => ({
    x: padX + (li * (W - padX * 2)) / (layers.length - 1),
    y: ((ni + 1) * H) / (count + 1),
    id: `${li}-${ni}`,
  })));
  const links = [];
  nodes.slice(0, -1).forEach((layer, li) => layer.forEach((a) => nodes[li + 1].forEach((b) => links.push([a, b]))));
  return (
    <svg className="sx-neural" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Illustration of a neural network processing data">
      {links.map(([a, b], i) => (
        <line key={i} className="sx-link" x1={a.x} y1={a.y} x2={b.x} y2={b.y} style={{ animationDelay: `${(i % 9) * 0.28}s` }} />
      ))}
      {nodes.flat().map((n, i) => (
        <circle key={n.id} className="sx-node" cx={n.x} cy={n.y} r="6" style={{ animationDelay: `${(i % 7) * 0.35}s` }} />
      ))}
    </svg>
  );
}

function AIChatDemo() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [i, setI] = useState(0);
  const [q, setQ] = useState(reduce ? aiDemoScenarios[0].q : '');
  const [a, setA] = useState(reduce ? aiDemoScenarios[0].a : '');
  const [thinking, setThinking] = useState(false);
  const boxRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (boxRef.current) io.observe(boxRef.current);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce || !visible) return undefined;
    const { q: fullQ, a: fullA } = aiDemoScenarios[i];
    let cancelled = false;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(() => { if (!cancelled) fn(); }, ms); timers.push(t); };
    const type = (text, set, speed, done) => {
      let n = 0;
      const step = () => { n += 1; set(text.slice(0, n)); if (n < text.length) later(step, speed); else done(); };
      step();
    };
    setQ(''); setA(''); setThinking(false);
    later(() => type(fullQ, setQ, 28, () => {
      later(() => {
        setThinking(true);
        later(() => {
          setThinking(false);
          type(fullA, setA, 14, () => later(() => setI((x) => (x + 1) % aiDemoScenarios.length), 3400));
        }, 1000);
      }, 400);
    }), 500);
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [i, visible, reduce]);

  return (
    <div className="sx-chat" ref={boxRef}>
      <div className="sx-chat-bar"><span className="window-lights">● ● ●</span><span>AI ASSISTANT · ILLUSTRATION</span></div>
      <div className="sx-chat-body" aria-live="off">
        <div className="sx-msg user">{q || ' '}</div>
        {thinking && <div className="sx-msg bot sx-typing" aria-hidden="true"><i /><i /><i /></div>}
        {a && <div className="sx-msg bot"><Bot size={15} /><span>{a}</span></div>}
      </div>
      <p className="sx-chat-note">Scripted illustration of how an assistant could behave. Not a live model.</p>
    </div>
  );
}

function AIShowcase() {
  return (
    <section id="ai" className="full-section sx-ai" aria-labelledby="ai-heading">
      <div className="sx-ai-bg" aria-hidden="true" />
      <div className="container">
        <div className="full-section-intro">
          <div>
            <span className="section-kicker"><span /> ARTIFICIAL INTELLIGENCE</span>
            <h2 id="ai-heading">AI that does real work <em>inside your product.</em></h2>
          </div>
          <p>We design and build practical AI: assistants, search, automation and analytics that fit your data, your workflows and your risk tolerance, and ship as polished products people actually use.</p>
        </div>

        <div className="sx-ai-hero">
          <div className="sx-ai-visual sx-ai-reveal">
            <div className="sx-ai-visual-top"><span className="status-dot" /> DATA → MODEL → PRODUCT</div>
            <NeuralNet />
            <div className="sx-ai-tags"><span>Assistants</span><span>RAG</span><span>Automation</span><span>Analytics</span><span>Evaluation</span></div>
          </div>
          <div className="sx-ai-demo sx-ai-reveal"><AIChatDemo /></div>
        </div>

        <div className="sx-ai-grid">
          {aiCapabilities.map(({ icon: Icon, title, description, points }) => (
            <article className="sx-ai-card" key={title}>
              <span className="sx-ai-icon"><Icon size={24} strokeWidth={1.6} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>{points.map((p) => <li key={p}><Zap size={13} />{p}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="sx-ai-flow">
          <div className="sx-ai-flow-head"><BrainCircuit size={22} /><h3>How we take AI from idea to production</h3></div>
          <div className="sx-ai-steps">
            {aiPipeline.map(([n, title, text]) => (
              <div className="sx-ai-step" key={n}><span>{n}</span><h4>{title}</h4><p>{text}</p></div>
            ))}
          </div>
        </div>

        <div className="sx-ai-principles">
          {aiPrinciples.map(([title, text]) => (
            <div className="sx-ai-principle" key={title}><ShieldCheck size={18} /><div><strong>{title}</strong><small>{text}</small></div></div>
          ))}
        </div>

        <div className="sx-ai-cta">
          <p>Have a process that eats hours, or a product that could be smarter?</p>
          <a className="btn primary" href="#contact">Discuss an AI project <ArrowUpRight size={19} /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- CONTENT SECTIONS ---------------------------- */
function Services() {
  return (
    <section id="expertise" className="full-section full-services">
      <div className="container">
        <SectionIntro eyebrow="WHAT WE DO" title="Expertise across the" accent="digital landscape." description="One partner for the critical stages of your digital product — from strategy and interface design to engineering, launch and improvement." />
        <div className="full-services-grid">
          {services.map(({ icon: Icon, title, description, tags }, i) => (
            <article className="full-service-card" key={title}>
              <div className="full-service-top"><span className="full-service-icon"><Icon size={24} strokeWidth={1.6} /></span><span>{String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span></div>
              <h3>{title}</h3><p>{description}</p>
              <div className="full-service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="full-section full-work">
      <div className="container">
        <SectionIntro eyebrow="OUR CAPABILITIES IN ACTION" title="Ideas shaped into" accent="experiences." description="A visual look at the kinds of solutions we can create. These are illustrative concepts, not claims of completed client engagements." />
        <div className="full-project-grid">
          {projects.map(({ number, category, title, description, icon: Icon, variant }) => (
            <article className="full-project full-project-card" key={number}>
              <div className={`full-project-art ${variant}`}>
                <div className="project-art-grid" />
                <div className="project-art-window"><div className="project-window-top"><span>● ● ●</span><span>SHAMIX / {number}</span></div><Icon size={64} strokeWidth={1} /><span>DESIGNED FOR WHAT'S NEXT</span><div className="project-art-bars"><i /><i /><i /><i /></div></div>
              </div>
              <div className="full-project-info"><div><span className="mini-label">{category} / {number}</span><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={24} /></div>
            </article>
          ))}
        </div>
        <p className="full-disclaimer">Portfolio visuals are design concepts. Replace them with approved, verified case studies when available.</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="full-section full-about">
      <div className="container full-about-layout">
        <div>
          <span className="section-kicker"><span /> WHO WE ARE</span>
          <h2>Technology with<br /><em>intention.</em></h2>
          <div className="about-brand-art"><img src="/brand-concept.png" alt="" loading="lazy" onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }} /></div>
        </div>
        <div className="full-about-copy">
          <p className="about-lead">Great software is more than code. It is a considered blend of strategy, design, engineering and an understanding of the people who use it.</p>
          <p>ShamiX Technologies is a software and digital product studio focused on creating useful, resilient and visually distinctive experiences. We approach every engagement with curiosity, clear communication and respect for the details that make a product feel exceptional.</p>
          <p>Whether you are exploring a new idea, improving an existing product or modernizing the technology behind your business, our approach stays the same: understand the challenge, make deliberate decisions and build for lasting value.</p>
          <div className="full-values"><div><Check size={18} /><span>Thoughtful product decisions</span></div><div><Check size={18} /><span>Clarity throughout delivery</span></div><div><Check size={18} /><span>Maintainable engineering</span></div><div><Check size={18} /><span>Design that serves users</span></div></div>
          <a className="text-link" href="#contact">Let's build together <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section className="full-section full-tech" id="technology"><div className="container">
      <SectionIntro eyebrow="TOOLS & TECHNOLOGIES" title="Modern tools. Timeless" accent="principles." description="Technology choices should follow the product, not the other way around. These are examples of the technologies we work with or can evaluate for your project." />
      <div className="full-tech-grid">{techGroups.map(([title, ...items]) => <div className="full-tech-group" key={title}><h3>{title}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
    </div></section>
  );
}

function Industries() {
  return (
    <section className="full-section full-industries" id="industries"><div className="container">
      <SectionIntro eyebrow="WHERE WE CAN HELP" title="Different industries." accent="Shared ambition." description="We adapt the approach to the business context, the people using the product and the outcomes that matter." />
      <div className="full-industries-grid">{industries.map(([number, title, description]) => <div className="full-industry" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={20} /></div>)}</div>
    </div></section>
  );
}

function Process() {
  return (
    <section id="process" className="full-section full-process"><div className="container">
      <SectionIntro eyebrow="HOW WE WORK" title="A considered path" accent="from idea to launch." description="A collaborative, transparent process that keeps business goals, product quality and engineering decisions aligned." />
      <div className="full-process-grid">{processSteps.map((item) => <article key={item.number} className="full-process-step"><span>{item.number} <i /></span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      <div className="full-process-note"><Rocket size={26} /><div><strong>Starting small? That's a smart strategy.</strong><p>We can help define a focused first release, prioritize what matters and create room for future iterations.</p></div><a href="#contact">Discuss your MVP <ArrowUpRight size={18} /></a></div>
    </div></section>
  );
}

function Engagement() {
  return (
    <section id="engagement" className="full-section sx-engage"><div className="container">
      <SectionIntro eyebrow="WORKING TOGETHER" title="Flexible ways to" accent="partner with us." description="Every product is different. Choose the engagement model that fits your stage, budget and ambition — we can always adjust as you grow." />
      <div className="sx-engage-grid">
        {engagements.map((e) => (
          <article className="sx-engage-card" key={e.number}>
            <div className="sx-engage-top"><span>{e.number}</span><small>{e.tag}</small></div>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <ul>{e.points.map((p) => <li key={p}><Check size={16} />{p}</li>)}</ul>
            <a className="text-link" href="#contact">Discuss this model <ArrowUpRight size={16} /></a>
          </article>
        ))}
      </div>
    </div></section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonialExamples.length;
  const move = (delta) => setActive((current) => (current + delta + total) % total);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((c) => (c + 1) % total), 7000);
    return () => clearInterval(id);
  }, [paused, total, active]);

  return (
    <section id="testimonials" className="full-section sx-testimonials" aria-labelledby="testimonials-heading">
      <div className="container" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="sx-testimonials-header">
          <div>
            <span className="section-kicker"><span /> CLIENT EXPERIENCE</span>
            <h2 id="testimonials-heading">Words that <em>matter.</em></h2>
            <p>How great collaborations should feel — thoughtful, transparent, and focused on outcomes.</p>
          </div>
          <div className="sx-testimonial-controls" aria-label="Testimonial navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonial"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="sx-testimonial-layout">
          <div className="sx-testimonial-feature" key={active} aria-live="polite">
            <Quote className="sx-testimonial-quote-icon" size={42} strokeWidth={1.3} />
            <span className="sx-testimonial-category">{testimonialExamples[active].category}</span>
            <blockquote>“{testimonialExamples[active].quote}”</blockquote>
            <div className="sx-testimonial-author"><span className="sx-testimonial-avatar">SX</span><div><strong>Illustrative testimonial</strong><small>{testimonialExamples[active].role}</small></div></div>
          </div>
          <div className="sx-testimonial-aside">
            <span>OUR APPROACH</span>
            <h3>Good partnerships build better products.</h3>
            <p>We prioritize communication, careful execution, and long-term product thinking in every collaboration.</p>
            <a className="text-link" href="#contact">Work with us <ArrowUpRight size={18} /></a>
            <div className="sx-testimonial-progress">{testimonialExamples.map((item, i) => <button key={item.category} type="button" className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === active ? 'true' : undefined}><span /></button>)}</div>
          </div>
        </div>
        <p className="sx-testimonial-disclaimer">These are illustrative examples, not verified client reviews. Replace them with approved testimonials before publishing.</p>
      </div>
    </section>
  );
}

function FAQItem({ index, question, answer, open, onToggle }) {
  const panelRef = useRef(null);
  // `inert` is set via ref so it works on both React 18 and React 19.
  useEffect(() => { if (panelRef.current) panelRef.current.inert = !open; }, [open]);
  return (
    <article className={`full-faq-item ${open ? 'active' : ''}`}>
      <h3>
        <button type="button" id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`} aria-expanded={open} onClick={onToggle}>
          <span className="faq-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="faq-question">{question}</span>
          <span className="faq-toggle"><ChevronDown size={19} /></span>
        </button>
      </h3>
      <div ref={panelRef} className="faq-answer-wrap" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
        <div className="faq-answer-inner"><p>{answer}</p></div>
      </div>
    </article>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section id="faq" className="full-section full-faq">
      <div className="container full-faq-layout">
        <div className="faq-intro">
          <span className="section-kicker"><span /> COMMON QUESTIONS</span>
          <h2>Good questions.<br /><em>Clear answers.</em></h2>
          <p>Need something more specific? Tell us about your project and we'll take it from there.</p>
          <a className="text-link" href="#contact">Ask us directly <ArrowUpRight size={18} /></a>
        </div>
        <div className="full-faq-items">
          {faqs.map(([question, answer], i) => (
            <FAQItem key={question} index={i} question={question} answer={answer} open={active === i} onToggle={() => setActive(active === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="full-section sx-leadership" aria-labelledby="leadership-heading">
      <div className="container">
        <div className="full-section-intro sx-leadership-heading">
          <div>
            <span className="section-kicker"><span /> THE PEOPLE BEHIND SHAMIX</span>
            <h2 id="leadership-heading">Meet the <em>leadership.</em></h2>
          </div>
          <p>A space to introduce the people guiding our vision, delivering projects and leading engineering.</p>
        </div>
        <div className="sx-leadership-grid">
          {leadership.map((person, index) => (
            <article className="sx-leader-card" key={person.role}>
              <div className="sx-leader-photo">
                <img src={person.image} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                <div className="sx-leader-placeholder" aria-hidden="true"><span>{person.initials}</span><small>PORTRAIT SPACE</small></div>
                <span className="sx-leader-corner">0{index + 1}</span>
              </div>
              <div className="sx-leader-info">
                <span className="sx-leader-kicker">{person.label}</span>
                <h3>{person.role}</h3>
                <p>Name and professional photo to be added</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CONTACT ------------------------------- */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', timeline: '', message: '' });
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const update = (event) => { const { name, value } = event.target; setForm((prev) => ({ ...prev, [name]: value })); setNotice(''); };
  const waDigits = CONTACT.whatsapp.replace(/\D/g, '');
  const whatsappUrl = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent('Hello ShamiX Technologies, I would like to discuss a project.')}` : '';
  const linkedinUrl = CONTACT.linkedin.startsWith('https://') ? CONTACT.linkedin : '';

  const inquiryBody = () => `Name: ${form.name || 'Not provided'}\nEmail: ${form.email || 'Not provided'}\nCompany: ${form.company || 'Not provided'}\nService: ${form.service || 'Not specified'}\nBudget: ${form.budget || 'Not specified'}\nTimeline: ${form.timeline || 'Not specified'}\n\nProject details:\n${form.message || 'Please tell us about your project.'}`;

  const copyEmail = async () => {
    if (!CONTACT.email) return;
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setNotice('Email address copied.');
    } catch {
      setNotice('Copy was blocked by your browser. Please use the email link instead.');
    }
  };

  const openWhatsAppInquiry = () => {
    if (!waDigits) return;
    const text = `Hello ShamiX Technologies! I would like to discuss a project.\n\n${inquiryBody()}`;
    window.open(`https://wa.me/${waDigits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const sendEmail = (event) => {
    event.preventDefault();
    if (!CONTACT.email) { setNotice('Email is not configured yet. Add your verified business email in the CONTACT settings at the top of main.jsx.'); return; }
    const subject = `New project inquiry — ${form.service || 'General'} — ${form.name}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryBody())}`;
    setNotice('Your email app should open with the inquiry prepared. Please send it from there; this website has not submitted the message.');
  };

  return (
    <section id="contact" className="full-section full-contact"><div className="container">
      <SectionIntro eyebrow="LET'S TALK" title="Let's create something" accent="worth building." description="Share a little about your idea. We'll use your brief to start a meaningful conversation about the next steps." />
      <div className="full-contact-layout">
        <div className="full-contact-sidebar">
          <h3>Start a conversation.</h3><p>Have an idea, a challenge or an existing product that needs attention? Choose the channel that works for you.</p>
          <div className="full-contact-methods">
            {CONTACT.email ? <a href={`mailto:${CONTACT.email}`}><span><Mail size={22} /></span><span><small>EMAIL US</small><strong>{CONTACT.email}</strong></span><ArrowUpRight size={19} /></a> : <div className="contact-method-disabled"><span><Mail size={22} /></span><span><small>EMAIL</small><strong>Business email coming soon</strong></span></div>}
            {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><span><MessageCircle size={22} /></span><span><small>WHATSAPP</small><strong>Chat with ShamiX</strong></span><ExternalLink size={18} /></a> : <div className="contact-method-disabled"><span><MessageCircle size={22} /></span><span><small>WHATSAPP</small><strong>Business WhatsApp coming soon</strong></span></div>}
            {linkedinUrl ? <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"><span><Linkedin size={22} /></span><span><small>LINKEDIN</small><strong>Connect with our team</strong></span><ExternalLink size={18} /></a> : <div className="contact-method-disabled"><span><Linkedin size={22} /></span><span><small>LINKEDIN</small><strong>Company profile coming soon</strong></span></div>}
          </div>
          {CONTACT.email && <button className="sx-copy-contact" type="button" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Email copied' : 'Copy email address'}</button>}
          <div className="sx-contact-meta">
            <div><span>01 /</span><strong>Project inquiries</strong><small>Share your goals, requirements and timeline.</small></div>
            <div><span>02 /</span><strong>Collaboration</strong><small>Discuss product design, engineering or ongoing support.</small></div>
          </div>
          <div className="full-contact-note"><ShieldCheck size={21} /><p>Project information is only used to prepare your inquiry. This website does not store form submissions.</p></div>
        </div>
        <form className="full-contact-form" onSubmit={sendEmail}>
          <div className="form-topline"><span>PROJECT INQUIRY</span><span>01 / START HERE</span></div>
          <div className="form-grid">
            <label>Full name <span>*</span><input name="name" value={form.name} onChange={update} required maxLength={100} placeholder="Your full name" autoComplete="name" /></label>
            <label>Work email <span>*</span><input type="email" name="email" value={form.email} onChange={update} required maxLength={180} placeholder="you@company.com" autoComplete="email" /></label>
            <label>Company / organization<input name="company" value={form.company} onChange={update} maxLength={120} placeholder="Company name (optional)" autoComplete="organization" /></label>
            <label>Service needed <span>*</span><select name="service" value={form.service} onChange={update} required><option value="">Select a service</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}<option>Not sure yet</option></select></label>
            <label>Estimated budget<select name="budget" value={form.budget} onChange={update}><option value="">Select budget (optional)</option><option>Under $2,500</option><option>$2,500–$10,000</option><option>$10,000–$25,000</option><option>$25,000+</option><option>Let's discuss</option></select></label>
            <label>Preferred timeline<select name="timeline" value={form.timeline} onChange={update}><option value="">Select timeline (optional)</option><option>As soon as possible</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Flexible / exploring</option></select></label>
            <label className="form-full">Tell us about your project <span>*</span><textarea name="message" value={form.message} onChange={update} required minLength={10} maxLength={4000} rows={6} placeholder="What are you building? What problem are you solving? Share your goals, features or existing challenges..." /></label>
          </div>
          <div className="sx-form-actions">
            <button type="submit" className="btn primary form-submit">Prepare Email Inquiry <Send size={18} /></button>
            {whatsappUrl && <button type="button" className="btn secondary sx-whatsapp-submit" onClick={openWhatsAppInquiry}><MessageCircle size={18} /> Discuss on WhatsApp</button>}
          </div>
          <p className="form-helper">This opens your email application; it does not send automatically.</p>
          {notice && <p className="form-notice" role="status">{notice}</p>}
        </form>
      </div>
    </div></section>
  );
}

/* ------------------------------- FOOTER ------------------------------- */
function Footer() {
  return (
    <footer className="full-footer"><div className="container">
      <div className="full-footer-main">
        <div><Brand /><p>Thoughtful digital products. Dependable engineering. Built with intention.</p></div>
        <div><strong>EXPLORE</strong><a href="#home">Home</a><a href="#expertise">Services</a><a href="#ai">AI</a><a href="#work">Work</a><a href="#about">About</a></div>
        <div><strong>MORE</strong><a href="#technology">Technology</a><a href="#industries">Industries</a><a href="#process">Our process</a><a href="#engagement">Engagement</a><a href="#faq">FAQs</a></div>
        <div><strong>GET IN TOUCH</strong><a href="#contact">Project inquiry</a>{CONTACT.email && <a href={`mailto:${CONTACT.email}`}>Email</a>}{linkedinUrlSafe() && <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}{CONTACT.whatsapp && <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}</div>
      </div>
      <div className="full-footer-wordmark" aria-hidden="true">SHAMIX<span>®</span></div>
      <div className="full-footer-bottom"><span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span><span>DESIGNED WITH INTENT · ENGINEERED FOR IMPACT</span><a href="#home">Back to top ↑</a></div>
    </div></footer>
  );
}
function linkedinUrlSafe() { return CONTACT.linkedin.startsWith('https://'); }

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a href="#home" className={`sx-top ${show ? 'visible' : ''}`} aria-label="Back to top" tabIndex={show ? 0 : -1}><ArrowUp size={20} /></a>
  );
}

/* --------------------------------- APP --------------------------------- */
function App() {
  // SEO: description + Organization structured data (no unverified claims).
  useEffect(() => {
    document.title = `${SITE.name} — Digital Engineering Studio`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = SITE.description;
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      description: SITE.description,
      ...(CONTACT.email && { email: CONTACT.email }),
      ...(CONTACT.linkedin.startsWith('https://') && { sameAs: [CONTACT.linkedin] }),
    });
    document.head.appendChild(ld);
    return () => { document.head.removeChild(ld); };
  }, []);

  // Scroll-reveal with varied directions.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const variants = {
      up: '.sx-ai-visual, .full-section-intro, .full-project-card, .sx-testimonials-header, .sx-form-actions, .sx-leader-card, .sx-cta-inner, .full-process-note',
      scale: '.full-service-card, .full-tech-group, .sx-engage-card, .sx-stat, .sx-testimonial-layout, .sx-ai-card, .sx-ai-step',
      left: '.full-process-step, .full-contact-sidebar, .full-about-layout, .full-values > div, .full-contact-methods > a',
      right: '.full-contact-form, .sx-contact-meta > div, .sx-ai-demo',
      fade: '.full-industry, .full-faq-item, .sx-ai-principle, .sx-ai-cta',
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    let index = 0;
    Object.entries(variants).forEach(([kind, selector]) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
        element.classList.add('reveal-on-scroll', `rv-${kind}`);
        observer.observe(element);
        index += 1;
      });
    });
    return () => observer.disconnect();
  }, []);

  // Cursor-follow spotlight on cards (mouse only).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const glowSelector = '.full-service-card, .full-project-card, .full-tech-group, .full-industry, .sx-engage-card, .full-process-step, .sx-leader-card, .sx-ai-card';
    document.querySelectorAll(glowSelector).forEach((el) => el.classList.add('sx-glow'));
    let frame = 0;
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const card = e.target.closest && e.target.closest('.sx-glow');
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <Preloader />
      <a className="sx-skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <TechMarquee />
        <Services />
        <AIShowcase />
        <Work />
        <About />
        <Technology />
        <Industries />
        <Process />
        <Engagement />
        <Testimonials />
        <ReviewsWall />
        <FAQ />
        <Leadership />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);