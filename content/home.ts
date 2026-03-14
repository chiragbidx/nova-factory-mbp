export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  featureCards: { title: string; subtitle: string; body: string }[];
};

export type LogosContent = {
  title: string;
  subtitle: string;
  logos: string[];
};

export type FeaturesContent = {
  title: string;
  intro: string;
  items: { title: string; body: string }[];
};

export type MetricsContent = {
  title: string;
  blurb: string;
  stats: { label: string; value: string }[];
  snapshot: string[];
};

export type PricingContent = {
  title: string;
  blurb: string;
  ctas: { sales: { label: string; href: string }; terms: { label: string; href: string } };
  plans: { name: string; price: string; desc: string; features: string[]; cta: { label: string; href: string } }[];
};

export type SecurityContent = {
  title: string;
  blurb: string;
  checklist: string[];
  badges: string[];
  cta: { label: string; href: string };
};

export type DocsSupportContent = {
  title: string;
  blurb: string;
  links: { label: string; link: string }[];
  supportBullets: string[];
  supportBadge: string;
  supportCta: { label: string; href: string };
};

export type LegalContent = {
  title: string;
  blurb: string;
  docs: { label: string; link: string; tag?: string }[];
  corporate: string[];
  note: string;
};

export type CtaContent = {
  title: string;
  blurb: string;
  productLinks: { label: string; href: string }[];
  resourceLinks: { label: string; href: string }[];
  footer: string;
};

export type HomeContent = {
  hero: HeroContent;
  logos: LogosContent;
  features: FeaturesContent;
  metrics: MetricsContent;
  pricing: PricingContent;
  security: SecurityContent;
  docs: DocsSupportContent;
  legal: LegalContent;
  cta: CtaContent;
};

export const defaultHomeContent: HomeContent = {
  hero: {
    eyebrow: "AI-powered Marketing Portal",
    title: "Marketiq: Elevate Your Agency's Capabilities",
    subtitle:
      "Manage all your clients, campaigns, and content in one place. AI marketing agents, automation, analytics, and seamless communication empower agencies to deliver powerful results at scale.",
    primaryCta: { label: "See how Marketiq works", href: "#features" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    featureCards: [
      { title: "Multi-client HQ", subtitle: "Client management", body: "Manage unlimited clients, track engagement, collaborate with their teams on a unified dashboard." },
      { title: "AI Marketing Agents", subtitle: "Smarter execution", body: "Delegate campaign planning, content creation, and reporting to always-on AI agents." },
      { title: "Campaigns & Assets", subtitle: "Organized and sharable", body: "Central library for creative, briefs, analytics, and campaign performance—search or share with a click." },
      { title: "Reporting & Analytics", subtitle: "Results made clear", body: "Beautiful, actionable reporting across brands—export or automate delivery for clients." },
    ],
  },
  logos: {
    title: "Trusted by agencies and consultants",
    subtitle: "For growth teams, agencies, and marketing professionals",
    logos: ["HubSpot", "Hootsuite", "Buffer", "Sprout Social", "Salesforce", "Intercom", "Zapier", "Notion", "Mailchimp", "Loom"],
  },
  features: {
    title: "Purpose-built for Marketing Agencies",
    intro: "The all-in-one workspace for client management, marketing execution, analytics, and AI-powered workflows.",
    items: [
      { title: "Multi-client Dashboard", body: "Switch between brands or clients seamlessly. Assign roles, set permissions, and unlock tailored views for every agency team member." },
      { title: "AI Marketing Agents", body: "Intelligent agents create calendars, automate social and email campaigns, and optimize outcomes on your behalf—your productivity multiplier." },
      { title: "Reporting, Analytics & Export", body: "Track KPIs, ROI, and engagement at a glance. Export beautiful branded reports for clients with one click." },
      { title: "Asset & Content Library", body: "Central hub for all creative—the single source of truth. AI assists with tagging, search, and creating new assets in your brand voice." },
      { title: "Client Communication", body: "Built-in messaging keeps strategic insights, updates, and deliverables in one thread, minimizing email chaos." },
      { title: "Secure & Scalable", body: "Enterprise-ready controls, granular permissions, and compliant infrastructure so you can scale confidently." },
    ],
  },
  metrics: {
    title: "Agencies winning with Marketiq",
    blurb: "Marketiq boosts utilization, client satisfaction, and revenue per team member. Agencies automate routine tasks and focus on strategic value.",
    stats: [
      { label: "Average hours saved/mo", value: "32" },
      { label: "Client retention lift", value: "18%" },
      { label: "Faster campaign launches", value: "66%" },
      { label: "Brands managed/agency", value: "12" },
    ],
    snapshot: [
      "AI agent copilots for social, email, and PPC campaigns",
      "One-click branded reporting and analytics for clients",
      "Asset management and brand library always organized",
      "Integrated team and client chat threads",
      "Real-time project timelines, updates, and feedback tracking",
    ],
  },
  pricing: {
    title: "Simple, transparent agency pricing",
    blurb: "Start with a free plan. Scale as your agency or client list grows—predictable costs and no hidden markups.",
    ctas: {
      sales: { label: "Talk to sales", href: "mailto:hi@chirag.co" },
      terms: { label: "Review terms", href: "#legal" },
    },
    plans: [
      {
        name: "Starter",
        price: "$0",
        desc: "Ideal for solo consultants and small agencies.",
        features: ["Up to 3 active clients", "Lead capture forms", "Standard analytics + reports", "Email support", "AI campaign assistant (limited)"],
        cta: { label: "Get started", href: "#contact" },
      },
      {
        name: "Agency",
        price: "$99",
        desc: "For fast-growing agencies with multiple brands.",
        features: ["Unlimited clients", "AI agents included", "Custom reporting", "Client chat/messaging", "All asset/workflow features"],
        cta: { label: "Start free trial", href: "#contact" },
      },
      {
        name: "Enterprise",
        price: "Custom",
        desc: "Security reviews, white-labelling, and advanced integrations.",
        features: ["Advanced permissions", "API/Integrations", "White-labelling", "Compliance exports", "Dedicated onboarding"],
        cta: { label: "Book a demo", href: "#contact" },
      },
    ],
  },
  security: {
    title: "Designed for privacy, built to scale",
    blurb: "Your clients' data stays secure and private. Marketiq applies best-in-class security controls, compliance, and fine-grained team access.",
    checklist: [
      "SOC2-ready access controls for teams and clients",
      "GDPR & CCPA compliance",
      "Encryption at rest and in transit",
      "Audit logs for all activity",
    ],
    badges: ["SOC2", "GDPR", "CCPA", "ISO 27001"],
    cta: { label: "Request security summary", href: "mailto:hi@chirag.co" },
  },
  docs: {
    title: "Help & documentation",
    blurb: "Step-by-step onboarding, guides on team setup, and rapid support from our expert team.",
    links: [
      { label: "Product overview", link: "#" },
      { label: "AI Agents", link: "#" },
      { label: "API Docs", link: "#" },
      { label: "White-labelling", link: "#" },
    ],
    supportBullets: [
      "Onboarding concierge for new agency accounts",
      "Live chat support during US work hours",
      "Agency-focused best practices library",
      "Feature requests prioritized by client votes",
    ],
    supportBadge: "Agency concierge",
    supportCta: { label: "Contact support", href: "mailto:hi@chirag.co" },
  },
  legal: {
    title: "Transparent terms for agencies",
    blurb: "We want every agency and their clients protected—review our documents or request custom terms for large teams.",
    docs: [
      { label: "Master Service Agreement", link: "#", tag: "PDF" },
      { label: "Privacy Policy", link: "#", tag: "PDF" },
      { label: "Acceptable Use", link: "#", tag: "PDF" },
    ],
    corporate: [
      "Marketiq (Chirag Dodiya, hi@chirag.co, San Francisco, CA)",
      "Legal documentation for US and EU clients",
      "Vendor onboarding checklist available",
      "Enterprise support available on request",
    ],
    note: "Need custom terms? Email hi@chirag.co and we'll review within 2 business days.",
  },
  cta: {
    title: "The last marketing dashboard you'll need.",
    blurb: "Modern agencies succeed with Marketiq. Centralize, automate, and empower every member of your team.",
    productLinks: [
      { label: "Features", href: "#features" },
      { label: "Book a demo", href: "#contact" },
    ],
    resourceLinks: [
      { label: "Contact Sales", href: "mailto:hi@chirag.co" },
      { label: "Support", href: "mailto:hi@chirag.co" },
    ],
    footer: "Marketiq by Chirag Dodiya • All rights reserved • 2026",
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}