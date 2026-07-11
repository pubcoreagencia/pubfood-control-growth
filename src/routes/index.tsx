import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

import logoAsset from "@/assets/pub-food-logo.png.asset.json";
import heroFood from "@/assets/hero-food.jpg";
import kitchenOps from "@/assets/kitchen-ops.jpg";
import deliveryPack from "@/assets/delivery-pack.jpg";
import offDish from "@/assets/off-dish.jpg";
import { buildWhatsAppUrl, offReviews, pubFood } from "@/lib/pubfood-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PUB FOOD — Gestão de Restaurantes, Delivery e Dark Kitchens" },
      {
        name: "description",
        content:
          "Cria uma landing page B2B para a PUB FOOD, focada em gestão e estruturação de negócios gastronômicos.",
      },
      { property: "og:url", content: "/" },
      {
        property: "og:title",
        content: "PUB FOOD — Gestão de Restaurantes, Delivery e Dark Kitchens",
      },
      {
        property: "og:description",
        content:
          "Cria uma landing page B2B para a PUB FOOD, focada em gestão e estruturação de negócios gastronômicos.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "PUB FOOD",
          description:
            "Gestão, estruturação e desenvolvimento de restaurantes, deliveries e dark kitchens.",
          areaServed: "BR",
          serviceType: [
            "Gestão de restaurantes",
            "Estruturação de delivery",
            "Desenvolvimento de dark kitchens",
            "Marca e recorrência gastronômica",
          ],
          parentOrganization: { "@type": "Organization", name: "PUB CORE" },
        }),
      },
    ],
  }),
  component: Landing,
});

/* ------------------------------- Data ------------------------------- */

const NAV = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#metodo", label: "Como atuamos" },
  { href: "#case", label: "Case" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#pub-core", label: "PUB CORE" },
];

const PROBLEMS = [
  {
    n: "01",
    title: "Dependência de plataformas",
    text: "O aplicativo concentra o relacionamento, os dados e grande parte da percepção da marca.",
  },
  {
    n: "02",
    title: "Operação improvisada",
    text: "Pedidos, atendimento, produção e divulgação funcionam em ferramentas desconectadas.",
  },
  {
    n: "03",
    title: "Pouca recorrência",
    text: "O cliente compra uma vez, mas o negócio não possui estrutura para trazê-lo de volta.",
  },
  {
    n: "04",
    title: "Marca sem presença própria",
    text: "O restaurante existe dentro dos aplicativos, mas ainda não construiu um ativo digital próprio.",
  },
];

const PILLARS = [
  {
    n: "01",
    title: "Gestão e operação",
    items: [
      "Análise da operação",
      "Organização de atendimento",
      "Fluxo de pedidos e processos",
      "Ofertas, combos e experiência",
    ],
  },
  {
    n: "02",
    title: "Estrutura digital própria",
    items: [
      "Presença profissional",
      "Página de vendas e cardápio",
      "Integração com WhatsApp",
      "Captação consentida de clientes",
    ],
  },
  {
    n: "03",
    title: "Marketing e recorrência",
    items: [
      "Posicionamento e campanhas",
      "Conteúdo e reputação",
      "Relacionamento e fidelização",
      "Recuperação de clientes",
    ],
  },
  {
    n: "04",
    title: "Marca e expansão",
    items: [
      "Desenvolvimento de conceito",
      "Dark kitchens e marcas próprias",
      "Kits e produtos consumíveis",
      "Novos canais e réplicas",
    ],
  },
];

const METHOD = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Entendemos operação, público, canais, oferta, capacidade e gargalos.",
  },
  {
    n: "02",
    title: "Estrutura",
    text: "Organizamos presença, atendimento, comunicação, pedidos e processos.",
  },
  {
    n: "03",
    title: "Ativação",
    text: "Colocamos campanhas, ofertas e canais para trabalhar de forma coordenada.",
  },
  {
    n: "04",
    title: "Evolução",
    text: "Analisamos o comportamento da operação e construímos recorrência e expansão.",
  },
];

const AUDIENCE = [
  "Operações começando e precisando de base",
  "Negócios que já vendem, mas trabalham no improviso",
  "Deliveries dependentes de aplicativos",
  "Restaurantes que desejam aumentar recorrência",
  "Dark kitchens que precisam de posicionamento",
  "Marcas gastronômicas que desejam expandir",
];

const FAQ = [
  {
    q: "A PUB FOOD é uma plataforma de delivery?",
    a: "Não. A PUB FOOD é uma empresa de gestão e estruturação para restaurantes, deliveries e dark kitchens.",
  },
  {
    q: "Preciso deixar de usar aplicativos?",
    a: "Não. O objetivo é reduzir a dependência exclusiva, organizar outros canais e construir ativos próprios para o negócio.",
  },
  {
    q: "A PUB FOOD cria sistemas de pedidos?",
    a: "Esse pode ser um dos componentes da estrutura, junto de gestão, presença digital, marketing, atendimento e recorrência.",
  },
  {
    q: "Vocês atendem negócios que ainda estão começando?",
    a: "Sim. A estrutura é definida de acordo com o estágio, capacidade e objetivo de cada operação.",
  },
  {
    q: "Vocês também desenvolvem marcas gastronômicas?",
    a: "Sim. A atuação pode incluir conceito, posicionamento, operação, dark kitchen, produtos, kits e novos canais.",
  },
  {
    q: "Como começa o trabalho?",
    a: "O primeiro passo é entender a operação atual, os gargalos e os objetivos do negócio.",
  },
];

/* --------------------------- Small primitives --------------------------- */

function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-[2px] text-red ${className}`} aria-label={`${n} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 2.5l2.9 6.2 6.6.7-4.9 4.6 1.4 6.5L12 17.9l-6 3.6 1.4-6.5L2.5 9.4l6.6-.7L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 h-12 px-6 text-[0.92rem] font-semibold tracking-tight transition-all duration-300 rounded-none";
  const styles = {
    primary: "bg-red text-primary-foreground hover:bg-red-2",
    ghost: "text-foreground hover:text-red",
    outline: "border border-current text-foreground hover:bg-foreground hover:text-background",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </a>
  );
}

/* -------------------------------- Header -------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-white/10 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-editorial flex items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="PUB FOOD - início">
          <img
            src={logoAsset.url}
            alt="PUB FOOD"
            width={140}
            height={54}
            className="h-9 md:h-10 w-auto brightness-0 invert"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[0.82rem] font-medium tracking-wide text-white/80 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 h-10 px-5 bg-red text-primary-foreground text-[0.82rem] font-semibold hover:bg-red-2 transition-colors"
          >
            Falar com a PUB FOOD
          </a>
          <button
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-ink border-t border-white/10">
          <nav className="container-editorial py-4 flex flex-col gap-4" aria-label="Navegação móvel">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-white/85 text-base"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center h-11 px-5 bg-red text-primary-foreground font-semibold"
            >
              Falar com a PUB FOOD
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section id="top" className="on-dark relative bg-ink text-paper overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
      {/* backdrop grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full [background-image:linear-gradient(to_right,white_1px,transparent_1px)] [background-size:8.33%_100%]" />
      </div>
      <div className="container-editorial relative grid grid-cols-12 gap-x-6 gap-y-10 items-end">
        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <div className="eyebrow">
              <span className="inline-block h-px w-8 bg-red" />
              Gestão de restaurantes, deliveries e dark kitchens
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem] font-semibold tracking-[-0.03em] text-paper">
              Seu delivery pode vender muito{" "}
              <span className="italic font-light text-white/70">sem entregar</span>{" "}
              o controle do <span className="text-red">negócio</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-lg text-white/70 leading-relaxed">
              A PUB FOOD une gestão, operação, marketing e estrutura digital para transformar
              restaurantes e deliveries em negócios mais organizados, reconhecidos e recorrentes.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <CTAButton href={buildWhatsAppUrl()} external>
                Quero estruturar meu negócio
              </CTAButton>
              <a
                href="#case"
                className="inline-flex items-center gap-2 h-12 px-6 text-[0.92rem] font-semibold text-white/90 hover:text-white border border-white/25 hover:border-white transition-colors"
              >
                Ver case OFF de Strogonoff
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.2em] text-white/40">
              <span>Menos dependência.</span>
              <span className="text-red/80">Mais controle.</span>
              <span>Mais recorrência.</span>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-5 relative">
          <Reveal delay={200}>
            <div className="relative aspect-[4/5] w-full">
              <img
                src={heroFood}
                alt="Prato gastronômico servido em operação de delivery"
                width={1600}
                height={2000}
                className="absolute inset-0 h-full w-full object-cover grayscale-[0.05] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              {/* Editorial floating cards */}
              <div className="absolute -left-4 md:-left-10 bottom-8 bg-paper text-ink px-4 py-3 shadow-xl max-w-[220px]">
                <div className="text-[0.65rem] uppercase tracking-[0.18em] text-red font-semibold">
                  Reputação
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Stars n={5} />
                  <span className="text-sm font-semibold">5,0</span>
                </div>
                <div className="mt-1 text-[0.72rem] text-graphite">
                  em todas as avaliações exibidas
                </div>
              </div>
              <div className="absolute -right-2 md:-right-8 top-10 bg-red text-primary-foreground px-4 py-3 max-w-[200px]">
                <div className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold opacity-80">
                  iFood
                </div>
                <div className="mt-1 text-lg font-semibold leading-tight">Super</div>
                <div className="text-[0.72rem] opacity-90">classificação do perfil</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Problem section -------------------------- */

function ProblemSection() {
  return (
    <section className="bg-paper text-ink py-24 md:py-32 border-t border-line">
      <div className="container-editorial grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            O problema
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Vender não é o mesmo que{" "}
            <span className="italic font-light text-graphite">construir um negócio.</span>
          </h2>
          <p className="mt-6 text-graphite max-w-md leading-relaxed">
            Muitos deliveries conseguem gerar pedidos, mas continuam sem controle sobre a própria
            operação, seus clientes e sua marca.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:pl-8">
          <div className="grid sm:grid-cols-2 gap-px bg-line">
            {PROBLEMS.map((p) => (
              <Reveal key={p.n}>
                <article className="bg-paper p-8 h-full flex flex-col gap-3 hover:bg-muted transition-colors">
                  <span className="text-red font-display text-lg font-semibold">{p.n}</span>
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-graphite text-[0.95rem] leading-relaxed">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Solution / pillars -------------------------- */

function SolutionSection() {
  return (
    <section id="solucoes" className="on-dark bg-ink text-paper py-24 md:py-32">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="eyebrow">
              <span className="inline-block h-px w-8 bg-red" />
              Solução PUB FOOD
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl leading-[1.02] tracking-tight text-paper">
              Estrutura para vender <span className="text-red">hoje</span> e continuar crescendo
              amanhã.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pl-6">
            <p className="text-white/60 text-sm leading-relaxed border-l border-red/60 pl-4">
              Cada operação recebe uma estrutura compatível com seu estágio, público, capacidade e
              objetivos.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <article className="bg-ink p-8 md:p-10 h-full flex flex-col gap-4 group hover:bg-graphite-2 transition-colors">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-red text-sm font-semibold tracking-widest">
                    {p.n}
                  </span>
                  <span className="h-px w-16 bg-white/15 group-hover:bg-red transition-colors" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-paper">
                  {p.title}
                </h3>
                <ul className="mt-2 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="text-white/70 text-[0.95rem] flex gap-3">
                      <span className="text-red mt-2 h-px w-3 bg-red inline-block" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Method --------------------------------- */

function MethodSection() {
  return (
    <section id="metodo" className="bg-paper text-ink py-24 md:py-32 border-t border-line">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            Método
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Do improviso para uma <span className="italic font-light text-graphite">operação estruturada.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 relative">
          <div className="hidden lg:block absolute top-[3.2rem] left-0 right-0 h-px bg-line" />
          {METHOD.map((m, i) => (
            <Reveal key={m.n} delay={i * 80}>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative pt-0 lg:pt-8">
                <div className="hidden lg:block absolute -top-1 left-0 h-2 w-2 rounded-full bg-red" />
                <div className="font-display text-[3.5rem] leading-none font-semibold text-ink/90">
                  {m.n}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-3 text-graphite text-[0.95rem] leading-relaxed">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-5">
            <img
              src={kitchenOps}
              alt="Cozinha profissional em operação"
              width={1400}
              height={1000}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-10">
            <p className="text-2xl md:text-3xl font-display font-medium leading-snug tracking-tight">
              A PUB FOOD não substitui a operação. Ela dá <span className="text-red">forma</span>{" "}
              ao que já existe e prepara o que ainda precisa existir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Case --------------------------------- */

function CaseSection() {
  return (
    <section id="case" className="on-dark bg-ink text-paper py-24 md:py-36 relative overflow-hidden">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="eyebrow">
              <span className="inline-block h-px w-8 bg-red" />
              Showcase principal
            </div>
            <h2 className="mt-6 text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-[-0.035em] font-semibold text-paper">
              OFF de <br />
              <span className="text-red">Strogonoff</span>
            </h2>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Uma operação gastronômica que transformou qualidade em reputação.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.2em] text-white/50">
              <span>Cabo Frio, RJ</span>
              <span className="text-red">•</span>
              <span>Presente no iFood</span>
              <span className="text-red">•</span>
              <span>Brasileira</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex lg:justify-end">
            <a
              href={pubFood.offIfoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/25 hover:border-red hover:text-red transition-colors h-12 px-6 text-sm font-semibold text-white"
            >
              Ver loja no iFood
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Editorial composition */}
        <div className="mt-16 grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-7 relative">
            <img
              src={offDish}
              alt="Strogonoff — prato de referência da OFF de Strogonoff"
              width={1400}
              height={1400}
              loading="lazy"
              className="w-full aspect-[5/4] object-cover"
            />
            <div className="absolute left-0 -bottom-8 md:-bottom-10 bg-paper text-ink px-6 py-5 max-w-[300px] shadow-2xl">
              <div className="text-[0.62rem] uppercase tracking-[0.22em] text-red font-semibold">
                iFood
              </div>
              <div className="mt-1 text-2xl font-display font-semibold">Super</div>
              <div className="text-[0.75rem] text-graphite mt-1">
                Loja classificada como Super no iFood
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <div className="bg-graphite-2 p-6 md:p-8 flex-1">
              <Stars n={5} className="text-red" />
              <div className="mt-4 text-4xl md:text-5xl font-display font-semibold leading-none">
                5,0
              </div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                em todas as avaliações públicas exibidas na página da loja
              </p>
            </div>
            <div className="bg-red text-primary-foreground p-6 md:p-8 flex-1">
              <div className="text-[0.62rem] uppercase tracking-[0.22em] opacity-80 font-semibold">
                Padrão
              </div>
              <p className="mt-3 text-lg md:text-xl font-display font-medium leading-snug">
                Quando produto, atendimento e operação seguem o mesmo padrão, a reputação deixa de
                ser acaso.
              </p>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            { k: "Super", v: "no iFood" },
            { k: "100%", v: "das avaliações exibidas com 5 estrelas" },
            { k: "Consistência", v: "de qualidade percebida em cada pedido" },
          ].map((it) => (
            <div key={it.k} className="bg-ink p-8 md:p-10">
              <div className="font-display text-3xl md:text-5xl font-semibold text-paper tracking-tight">
                {it.k}
              </div>
              <div className="mt-2 text-white/60 text-sm max-w-[260px]">{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Reviews ------------------------------ */

function ReviewsSection() {
  return (
    <section className="on-dark bg-graphite-2 text-paper py-24 md:py-32 border-t border-white/5">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-8">
            <div className="eyebrow">
              <span className="inline-block h-px w-8 bg-red" />
              Avaliações reais
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl leading-[1.02] tracking-tight text-paper">
              <span className="text-red">★★★★★</span> em todas as avaliações exibidas.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="text-white/60 text-sm border-l border-red/60 pl-4">
              Avaliações publicadas por clientes na página da OFF de Strogonoff no iFood.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {offReviews.map((r) => (
            <Reveal key={r.name + r.date}>
              <article className="bg-ink border border-white/10 p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-red/15 border border-red/30 flex items-center justify-center text-red font-semibold">
                      {r.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-paper">{r.name}</div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Stars n={r.rating} />
                        <span>{r.rating.toFixed(1).replace(".", ",")}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-white/40">{r.date}</span>
                </div>
                <p className="mt-6 text-white/80 leading-relaxed text-[0.98rem]">"{r.text}"</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- What the case represents --------------------- */

function CaseMeaning() {
  const points = [
    { n: "01", t: "Produto consistente", d: "Padrão que o cliente reconhece a cada pedido." },
    { n: "02", t: "Comunicação clara", d: "Informações objetivas em cada canal do negócio." },
    { n: "03", t: "Atendimento organizado", d: "Fluxos que reduzem erros e retrabalho." },
    { n: "04", t: "Experiência que gera confiança", d: "Cuidado que leva à recompra." },
  ];
  return (
    <section className="bg-paper text-ink py-24 md:py-32">
      <div className="container-editorial grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            O que o case representa
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl leading-[1.02] tracking-tight">
            Uma boa avaliação começa <span className="italic font-light text-graphite">muito antes</span> da entrega.
          </h2>
          <p className="mt-8 text-graphite leading-relaxed max-w-md">
            A PUB FOOD trabalha para transformar esses pontos em sistema, e não em esforço isolado.
          </p>
          <img
            src={deliveryPack}
            alt="Embalagem de delivery com padrão de operação"
            width={1200}
            height={1500}
            loading="lazy"
            className="mt-10 w-full aspect-[4/5] object-cover max-w-md"
          />
        </div>
        <div className="col-span-12 lg:col-span-7 lg:pl-8">
          <div className="grid grid-cols-1 gap-px bg-line">
            {points.map((p) => (
              <div key={p.n} className="bg-paper py-8 flex gap-6 items-start">
                <div className="font-display text-red text-2xl font-semibold w-12 shrink-0">
                  {p.n}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-graphite">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Audience -------------------------------- */

function AudienceSection() {
  return (
    <section id="para-quem" className="on-dark bg-ink text-paper py-24 md:py-32">
      <div className="container-editorial">
        <div className="max-w-4xl">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            Para quem é
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl leading-[1.02] tracking-tight text-paper">
            A PUB FOOD é para quem já entendeu que{" "}
            <span className="italic font-light text-white/60">só receber pedidos</span> não basta.
          </h2>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {AUDIENCE.map((a, i) => (
            <li
              key={a}
              className="bg-ink p-8 flex items-start gap-4 hover:bg-graphite-2 transition-colors"
            >
              <span className="font-display text-red text-xs font-semibold pt-2 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-paper leading-snug">{a}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-l-2 border-red pl-6 max-w-3xl">
          <p className="text-white/70 text-lg">
            Não é para quem procura apenas uma arte, um cardápio isolado ou uma campanha sem
            estrutura.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- PUB CORE --------------------------------- */

function PubCoreSection() {
  const nodes = [
    { k: "PUB CORE", v: "Estratégia e governança" },
    { k: "PUB FOOD", v: "Gestão e operação gastronômica" },
    { k: "PUB IA · MEDIA · FILMS", v: "Tecnologia, audiência e comunicação" },
  ];
  return (
    <section id="pub-core" className="bg-paper text-ink py-24 md:py-32 border-t border-line">
      <div className="container-editorial grid grid-cols-12 gap-x-6 gap-y-10 items-start">
        <div className="col-span-12 lg:col-span-5">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            Ecossistema
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Uma empresa da <span className="text-red">PUB CORE</span>.
          </h2>
          <p className="mt-6 text-graphite leading-relaxed max-w-md">
            A PUB FOOD faz parte de um ecossistema que conecta tecnologia, mídia, produtos, dados e
            operação. Essa integração permite combinar estratégia gastronômica com presença
            digital, automação, conteúdo e inteligência operacional.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-10">
          <div className="relative">
            {nodes.map((n, i) => (
              <div key={n.k} className="flex items-start gap-6 py-6 border-t border-line first:border-t-0">
                <div className="font-display text-red text-sm font-semibold w-8 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="text-xl md:text-2xl font-semibold tracking-tight">{n.k}</div>
                  <div className="text-graphite mt-1">{n.v}</div>
                </div>
                <div className="hidden md:block text-graphite/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-paper text-ink py-24 md:py-32 border-t border-line">
      <div className="container-editorial grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            Perguntas frequentes
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl leading-[1.02] tracking-tight">
            Antes de <span className="italic font-light text-graphite">começar.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="border-t border-ink/20">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-ink/20">
                  <button
                    className="w-full text-left py-6 flex items-start gap-6 group"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-red text-sm font-semibold pt-2 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg md:text-xl font-medium tracking-tight group-hover:text-red transition-colors">
                      {f.q}
                    </span>
                    <span
                      className={`text-red transition-transform duration-300 mt-1 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden pl-14 pr-10">
                      <p className="text-graphite leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- CTA form --------------------------------- */

function CTASection() {
  const [form, setForm] = useState({
    nome: "",
    negocio: "",
    cidade: "",
    whatsapp: "",
    tipo: "",
    desafio: "",
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const extra = `Nome: ${form.nome}\nNegócio: ${form.negocio}\nCidade: ${form.cidade}\nWhatsApp: ${form.whatsapp}\nTipo de operação: ${form.tipo}\nPrincipal desafio: ${form.desafio}`;
    window.open(buildWhatsAppUrl(extra), "_blank", "noopener,noreferrer");
  };
  const input =
    "w-full bg-transparent border-b border-white/25 focus:border-red outline-none py-3 text-paper placeholder:text-white/40 text-[0.95rem] transition-colors";
  return (
    <section id="contato" className="on-dark bg-ink text-paper py-24 md:py-36">
      <div className="container-editorial grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <div className="eyebrow">
            <span className="inline-block h-px w-8 bg-red" />
            Contato
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl leading-[1.02] tracking-tight text-paper">
            Seu negócio não precisa escolher entre{" "}
            <span className="text-red">vender</span> nos aplicativos e{" "}
            <span className="italic font-light text-white/70">construir</span> algo próprio.
          </h2>
          <p className="mt-8 text-white/70 text-lg max-w-md leading-relaxed">
            Comece organizando a operação, a marca e os canais que continuarão pertencendo ao seu
            negócio.
          </p>

          <div className="mt-12 space-y-3 text-sm text-white/70">
            <div>
              WhatsApp:{" "}
              <a
                className="text-paper hover:text-red"
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pubFood.whatsapp.display}
              </a>
            </div>
            <div>
              E-mail:{" "}
              <a className="text-paper hover:text-red" href={`mailto:${pubFood.email}`}>
                {pubFood.email}
              </a>
            </div>
            <div>
              Instagram:{" "}
              <a
                className="text-paper hover:text-red"
                href={pubFood.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pubFood.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:pl-10">
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="nome" className="text-xs uppercase tracking-[0.18em] text-white/50">
                Nome
              </label>
              <input
                id="nome"
                required
                className={input}
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="negocio" className="text-xs uppercase tracking-[0.18em] text-white/50">
                Nome do negócio
              </label>
              <input
                id="negocio"
                required
                className={input}
                value={form.negocio}
                onChange={(e) => setForm({ ...form, negocio: e.target.value })}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cidade" className="text-xs uppercase tracking-[0.18em] text-white/50">
                Cidade
              </label>
              <input
                id="cidade"
                required
                className={input}
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="whatsapp" className="text-xs uppercase tracking-[0.18em] text-white/50">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                required
                type="tel"
                className={input}
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="tipo" className="text-xs uppercase tracking-[0.18em] text-white/50">
                Tipo de operação
              </label>
              <select
                id="tipo"
                required
                className={`${input} appearance-none cursor-pointer`}
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="" className="bg-ink">
                  Selecione
                </option>
                {[
                  "Restaurante",
                  "Delivery",
                  "Dark kitchen",
                  "Hamburgueria",
                  "Pizzaria",
                  "Marmitaria",
                  "Açaíteria",
                  "Lanchonete",
                  "Doceria",
                  "Cozinha caseira profissionalizada",
                  "Outro",
                ].map((o) => (
                  <option key={o} value={o} className="bg-ink">
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="desafio" className="text-xs uppercase tracking-[0.18em] text-white/50">
                Principal desafio atual
              </label>
              <textarea
                id="desafio"
                required
                rows={3}
                className={`${input} resize-none`}
                value={form.desafio}
                onChange={(e) => setForm({ ...form, desafio: e.target.value })}
              />
            </div>
            <div className="col-span-2 mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-red text-primary-foreground text-sm font-semibold hover:bg-red-2 transition-colors"
              >
                Quero falar com a PUB FOOD
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-white/25 text-sm font-semibold hover:border-red hover:text-red transition-colors"
              >
                Abrir WhatsApp direto
              </a>
            </div>
            <p className="col-span-2 text-xs text-white/40">
              Ao enviar, uma mensagem pré-preenchida abre no WhatsApp da PUB FOOD.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="on-dark bg-ink text-white/70 border-t border-white/10 py-14">
      <div className="container-editorial grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <img
            src={logoAsset.url}
            alt="PUB FOOD"
            width={140}
            height={54}
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm">
            Gestão, estrutura e crescimento para restaurantes, deliveries e dark kitchens.
          </p>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-xs uppercase tracking-[0.18em] text-white/40">Contato</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${pubFood.email}`} className="hover:text-red">
                {pubFood.email}
              </a>
            </li>
            <li>
              <a
                href={pubFood.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="text-xs uppercase tracking-[0.18em] text-white/40">Institucional</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red">
                Termos
              </a>
            </li>
            <li className="text-white/40 pt-4 text-xs uppercase tracking-[0.18em]">
              Uma empresa da PUB CORE
            </li>
          </ul>
        </div>
        <div className="col-span-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} PUB FOOD. Todos os direitos reservados.</span>
          <span>{pubFood.domain}</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Sticky mobile CTA --------------------------------- */

function MobileCTA() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:hidden fixed bottom-4 left-4 right-4 z-40 h-12 bg-red text-primary-foreground flex items-center justify-center font-semibold text-sm shadow-2xl"
    >
      Falar com a PUB FOOD
    </a>
  );
}

/* ---------------------------------- Page ---------------------------------- */

function Landing() {
  return (
    <main className="bg-paper text-ink">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <MethodSection />
      <CaseSection />
      <ReviewsSection />
      <CaseMeaning />
      <AudienceSection />
      <PubCoreSection />
      <FaqSection />
      <CTASection />
      <Footer />
      <MobileCTA />
    </main>
  );
}
