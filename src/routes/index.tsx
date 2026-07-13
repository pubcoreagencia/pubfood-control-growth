import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

import logoAsset from "@/assets/pub-food-logo.png";
import heroFood from "@/assets/hero-food.jpg";


import strogonoffAsset from "@/assets/off-strogonoff-v2.jpg";
import ifoodStoreAsset from "@/assets/ifood-store-cropped.jpg";
import reviewRenata from "@/assets/review-renata.png";
import reviewGabriel from "@/assets/review-gabriel.png";
import reviewMichelle from "@/assets/review-michelle.png";
import reviewCaio from "@/assets/review-caio.png";
import { buildWhatsAppUrl, pubFood } from "@/lib/pubfood-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PUB FOOD — Gestão de Restaurantes, Delivery e Dark Kitchens" },
      {
        name: "description",
        content:
          "Gestão, estruturação e desenvolvimento de restaurantes, deliveries e dark kitchens. Menos dependência de aplicativos, mais controle da operação.",
      },
      { property: "og:url", content: "/" },
      { property: "og:title", content: "PUB FOOD — Gestão de Restaurantes, Delivery e Dark Kitchens" },
      {
        property: "og:description",
        content:
          "Gestão, estruturação e desenvolvimento de restaurantes, deliveries e dark kitchens. Menos dependência de aplicativos, mais controle da operação.",
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

const REVIEW_SHOTS = [
  {
    src: reviewRenata,
    alt: "Avaliação de Renata para a OFF de Strogonoff, cinco estrelas, 10/06/2026.",
  },
  {
    src: reviewGabriel,
    alt: "Avaliação de Gabriel para a OFF de Strogonoff, cinco estrelas, 06/06/2026.",
  },
  {
    src: reviewMichelle,
    alt: "Avaliação de Michelle para a OFF de Strogonoff, cinco estrelas, 02/06/2026.",
  },
  {
    src: reviewCaio,
    alt: "Avaliação de Caio para a OFF de Strogonoff, cinco estrelas, 25/04/2026.",
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

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/** Institutional logo — displayed verbatim on a small white chip so the
 * original artwork is preserved on both light and dark surfaces.
 * Do not restyle, recolor, invert or crop the source image.
 */
function LogoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const h = size === "sm" ? "h-14" : "h-20";
  return (
    <span
      className={`inline-flex items-center ${h}`}
      aria-hidden={false}
    >
      <img
        src={logoAsset}
        alt="PUB FOOD"
        width={480}
        height={480}
        className="h-full w-auto object-contain"
        loading="eager"
        onError={(e) => {
          const el = e.currentTarget;
          const parent = el.parentElement;
          if (parent) {
            parent.innerHTML =
              '<span class="text-paper font-display font-bold tracking-tight text-2xl">PUB<span class="text-red">.</span>FOOD</span>';
          }
        }}
      />
    </span>
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
    "inline-flex items-center justify-center gap-2 h-12 px-6 text-[0.92rem] font-semibold tracking-tight transition-all duration-300 rounded-none group";
  const styles = {
    primary: "bg-red text-primary-foreground hover:bg-red-2",
    ghost: "text-foreground hover:text-red",
    outline:
      "border border-current text-foreground hover:bg-foreground hover:text-background",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-[3px]"
      >
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
        scrolled
          ? "bg-ink/90 backdrop-blur border-b border-white/10 py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="container-editorial grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <a href="#top" className="flex items-center shrink-0" aria-label="PUB FOOD — início">
          <LogoMark size={scrolled ? "sm" : "md"} />
        </a>
        <nav
          className="hidden lg:flex items-center justify-center gap-8"
          aria-label="Navegação principal"
        >
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
        <div className="flex items-center gap-3 justify-end">
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-ink border-t border-white/10">
          <nav
            className="container-editorial py-4 flex flex-col gap-4"
            aria-label="Navegação móvel"
          >
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

/** Interactive order-ticket panel: floats on the hero, tilts with the
 * pointer, and cycles through a live delivery status. Simple, polished,
 * product-like — the visual metaphor is "a live order flowing through
 * PUB FOOD's operation". Reduced-motion friendly. */
const HERO_STATUSES = [
  { label: "Pedido recebido", tone: "text-white/70" },
  { label: "Em preparo", tone: "text-white/85" },
  { label: "Saiu para entrega", tone: "text-red" },
  { label: "Entregue", tone: "text-emerald-400" },
];

function HeroOrderCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  // status cycle
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setStep(HERO_STATUSES.length - 1);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % HERO_STATUSES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  // pointer tilt
  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        card.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
      });
    };
    const onLeave = () => {
      card.style.transform =
        "perspective(1200px) rotateY(-4deg) rotateX(3deg) translateZ(0)";
    };
    onLeave();
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const progress = ((step + 1) / HERO_STATUSES.length) * 100;

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[5/6] md:aspect-[4/5] max-w-md mx-auto md:max-w-none"
    >
      {/* soft outer glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 60% 40%, oklch(0.58 0.22 27 / 0.35), transparent 70%)",
        }}
      />
      <div
        ref={cardRef}
        className="relative h-full w-full rounded-xl border border-white/12 overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out"
        style={{
          background:
            "linear-gradient(155deg, oklch(0.22 0.006 260) 0%, oklch(0.14 0.006 260) 55%, oklch(0.10 0.006 260) 100%)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* top gloss */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)",
          }}
        />
        {/* corner accent */}
        <div className="absolute top-0 right-0 h-16 w-16 pointer-events-none">
          <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red animate-pulse" />
          <div className="absolute top-2 right-8 text-[0.58rem] uppercase tracking-[0.28em] text-white/45">
            LIVE
          </div>
        </div>

        {/* header */}
        <div className="relative px-6 md:px-8 pt-8 md:pt-10 flex items-baseline justify-between">
          <div>
            <div className="text-[0.6rem] uppercase tracking-[0.28em] text-white/40">
              Pedido
            </div>
            <div className="mt-1 font-display text-xl md:text-2xl text-paper tracking-tight">
              #4821
            </div>
          </div>
          <div className="text-right">
            <div className="text-[0.6rem] uppercase tracking-[0.28em] text-white/40">
              Loja
            </div>
            <div className="mt-1 font-display text-sm md:text-base text-white/85 tracking-tight">
              OFF de Strogonoff
            </div>
          </div>
        </div>

        <div className="mx-6 md:mx-8 mt-6 h-px bg-white/10" />

        {/* items */}
        <div className="relative px-6 md:px-8 mt-6 space-y-3 text-sm">
          {[
            { q: "1×", n: "Strogonoff de Filé", p: "R$ 58,90" },
            { q: "1×", n: "Batata palha extra", p: "R$ 6,00" },
            { q: "2×", n: "Guaraná lata", p: "R$ 10,00" },
          ].map((it) => (
            <div key={it.n} className="flex items-baseline justify-between gap-3">
              <span className="text-white/50 font-mono text-xs w-8">{it.q}</span>
              <span className="flex-1 text-white/85 truncate">{it.n}</span>
              <span className="text-white/60 font-mono text-xs">{it.p}</span>
            </div>
          ))}
        </div>

        <div className="mx-6 md:mx-8 mt-6 h-px bg-white/10" />

        <div className="px-6 md:px-8 mt-4 flex items-baseline justify-between">
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-white/40">
            Total
          </span>
          <span className="font-display text-lg text-paper">R$ 74,90</span>
        </div>

        {/* status */}
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-8 pb-6 md:pb-7">
          <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.24em] text-white/40 mb-2">
            <span>Status</span>
            <span
              key={step}
              className={`font-medium ${HERO_STATUSES[step].tone}`}
              style={{ animation: "pf-status 400ms ease-out" }}
            >
              {HERO_STATUSES[step].label}
            </span>
          </div>
          <div className="relative h-[3px] w-full bg-white/10 overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, oklch(0.58 0.22 27), oklch(0.72 0.20 40))",
                boxShadow: "0 0 12px oklch(0.58 0.22 27 / 0.6)",
                transition: "width 700ms cubic-bezier(.4,.7,.2,1)",
              }}
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-white/35">
            <span className="h-1 w-1 rounded-full bg-red animate-pulse" />
            Em tempo real via PUB FOOD
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pf-status {
          0% { opacity: 0; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="pf-status"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 md:pt-40 pb-24 md:pb-36 text-paper"
      style={{
        background:
          "radial-gradient(120% 90% at 85% 15%, oklch(0.28 0.10 27 / 0.55), transparent 55%), radial-gradient(90% 80% at 10% 90%, oklch(0.20 0.02 260 / 0.85), transparent 60%), linear-gradient(180deg, oklch(0.10 0.006 260) 0%, oklch(0.08 0.006 260) 100%)",
      }}
    >
      {/* premium ambient glow layers */}
      <div
        className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, oklch(0.58 0.22 27 / 0.45), transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-32 h-[560px] w-[560px] rounded-full pointer-events-none blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, oklch(0.35 0.10 27 / 0.35), transparent 70%)",
        }}
      />
      {/* soft top and bottom fades to blend into next dark sections */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink pointer-events-none" />

      <div className="container-editorial relative grid grid-cols-12 gap-x-6 gap-y-14 items-center">
        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <div className="eyebrow">
              <span className="inline-block h-px w-10 bg-red" />
              Casa de gestão para negócios gastronômicos
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-8 text-[2.6rem] leading-[0.98] sm:text-6xl lg:text-[5.6rem] xl:text-[6.4rem] font-semibold tracking-[-0.035em] text-paper">
              A casa que dá{" "}
              <span
                className="italic font-normal text-white/80"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                forma
              </span>{" "}
              ao seu <span className="text-red">delivery</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-10 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed">
              A PUB FOOD estrutura restaurantes, deliveries e dark kitchens de alto padrão —
              operação, marca, canais próprios e recorrência tratados como um só sistema.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <CTAButton href={buildWhatsAppUrl()} external>
                Solicitar diagnóstico
              </CTAButton>
              <a
                href="#case"
                className="inline-flex items-center gap-2 h-12 px-6 text-[0.92rem] font-semibold text-white/90 hover:text-white border border-white/25 hover:border-white transition-colors"
              >
                Ver case OFF de Strogonoff
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 max-w-lg gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">Operação</div>
                <div className="mt-2 font-display text-lg text-paper">sob controle</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">Marca</div>
                <div className="mt-2 font-display text-lg text-paper">com autoridade</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">Cliente</div>
                <div className="mt-2 font-display text-lg text-paper">que retorna</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Reveal delay={200}>
            <HeroOrderCard />
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
            Muitos deliveries conseguem gerar pedidos, mas continuam sem controle sobre a
            própria operação, seus clientes e sua marca.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:pl-8">
          <div className="grid sm:grid-cols-2 gap-px bg-line">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
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
              Cada operação recebe uma estrutura compatível com seu estágio, público, capacidade
              e objetivos.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 80}>
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

/** Scroll-driven operation dashboard — same visual family as the hero's
 * order card. As the user scrolls the Método section, KPI bars fill and
 * the active pillar highlights, translating the four-step method into a
 * live-looking control panel. */
function MethodOperationCard({ progress, active }: { progress: number; active: number }) {
  const kpis = [
    { label: "Pedidos organizados", base: 42, gain: 58 },
    { label: "Recompra 30d", base: 18, gain: 34 },
    { label: "Canais ativos", base: 25, gain: 65 },
  ];
  const stages = ["Diagnóstico", "Estrutura", "Ativação", "Evolução"];
  return (
    <div className="mt-10 hidden lg:block relative">
      <div
        className="absolute -inset-6 -z-10 blur-3xl opacity-60 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 40% 40%, oklch(0.58 0.22 27 / 0.28), transparent 70%)",
        }}
      />
      <div
        className="relative rounded-xl border border-white/10 overflow-hidden shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] text-paper"
        style={{
          background:
            "linear-gradient(155deg, oklch(0.22 0.006 260) 0%, oklch(0.14 0.006 260) 55%, oklch(0.10 0.006 260) 100%)",
        }}
      >
        {/* header */}
        <div className="flex items-baseline justify-between px-6 pt-6">
          <div>
            <div className="text-[0.58rem] uppercase tracking-[0.28em] text-white/40">
              Operação
            </div>
            <div className="mt-1 font-display text-lg tracking-tight">Painel de controle</div>
          </div>
          <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.24em] text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
            Ao vivo
          </div>
        </div>
        <div className="mx-6 mt-5 h-px bg-white/10" />
        {/* KPI bars */}
        <div className="px-6 py-6 space-y-5">
          {kpis.map((k, i) => {
            const localP = Math.max(0, Math.min(1, progress * 1.15 - i * 0.05));
            const value = Math.round(k.base + k.gain * localP);
            return (
              <div key={k.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[0.72rem] text-white/60 tracking-wide">{k.label}</span>
                  <span className="font-display text-base tabular-nums text-paper">
                    {value}
                    <span className="text-white/40 text-xs ml-0.5">%</span>
                  </span>
                </div>
                <div className="relative h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${value}%`,
                      background:
                        "linear-gradient(90deg, oklch(0.58 0.22 27), oklch(0.72 0.20 40))",
                      boxShadow: "0 0 10px oklch(0.58 0.22 27 / 0.55)",
                      transition: "width 500ms cubic-bezier(.4,.7,.2,1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-6 h-px bg-white/10" />
        {/* stage pips */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between text-[0.58rem] uppercase tracking-[0.24em] text-white/40 mb-3">
            <span>Etapa</span>
            <span className="font-medium text-paper">{stages[active]}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {stages.map((_, i) => {
              const filled = i <= active;
              return (
                <div
                  key={i}
                  className="h-1 rounded-full transition-colors duration-500"
                  style={{
                    background: filled
                      ? "linear-gradient(90deg, oklch(0.58 0.22 27), oklch(0.72 0.20 40))"
                      : "rgba(255,255,255,0.10)",
                    boxShadow: filled ? "0 0 8px oklch(0.58 0.22 27 / 0.4)" : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}



function MethodSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 within section
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // start when top of section reaches 60% of viewport, end when bottom hits 40%
        const start = vh * 0.6;
        const end = -rect.height + vh * 0.4;
        const raw = (start - rect.top) / (start - end);
        const p = Math.max(0, Math.min(1, raw));
        setProgress(p);
        setActive(Math.min(METHOD.length - 1, Math.floor(p * METHOD.length)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="bg-paper text-ink py-24 md:py-32 border-t border-line"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-y-0">
          {/* Left: sticky headline column */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow">
                <span className="inline-block h-px w-8 bg-red" />
                Método
              </div>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.02] tracking-tight">
                Do improviso para uma{" "}
                <span className="italic font-light text-graphite">operação estruturada.</span>
              </h2>
              <p className="mt-6 text-graphite leading-relaxed max-w-md">
                Um caminho em quatro etapas para transformar uma operação improvisada em um
                negócio com processos, marca e recorrência.
              </p>
              <MethodOperationCard progress={progress} active={active} />
            </div>
          </div>

          {/* Right: steps + vertical progress rail */}
          <div className="col-span-12 lg:col-span-7 lg:pl-10 relative">
            <div className="absolute top-2 bottom-2 left-4 md:left-6 w-px bg-line" aria-hidden />
            <div
              className="absolute top-2 left-4 md:left-6 w-px bg-red origin-top"
              style={{
                height: `calc((100% - 1rem) * ${progress})`,
                transition: "height 400ms linear",
              }}
              aria-hidden
            />
            <ol className="space-y-14 md:space-y-20">
              {METHOD.map((m, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li key={m.n} className="relative pl-12 md:pl-16">
                    <span
                      className={`absolute left-2.5 md:left-4.5 top-3 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-red border-red scale-125"
                          : isPast
                            ? "bg-red border-red"
                            : "bg-paper border-line"
                      }`}
                      aria-hidden
                    />
                    <Reveal delay={i * 60}>
                      <div
                        className={`transition-opacity duration-300 ${
                          isActive || isPast ? "opacity-100" : "opacity-70"
                        }`}
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            className={`font-display font-semibold leading-none tracking-tight transition-all duration-300 ${
                              isActive
                                ? "text-red text-6xl md:text-7xl"
                                : "text-ink/70 text-5xl md:text-6xl"
                            }`}
                          >
                            {m.n}
                          </span>
                          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                            {m.title}
                          </h3>
                        </div>
                        <p className="mt-4 text-graphite text-base md:text-lg leading-relaxed max-w-xl">
                          {m.text}
                        </p>
                        <div className="mt-6 h-px w-16 bg-line" />
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-10 max-w-3xl">
          <p className="text-2xl md:text-3xl font-display font-medium leading-snug tracking-tight">
            A PUB FOOD não substitui a operação. Ela dá <span className="text-red">forma</span>{" "}
            ao que já existe e prepara o que ainda precisa existir.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Case --------------------------------- */

function CaseSection() {
  return (
    <section
      id="case"
      className="on-dark bg-ink text-paper py-24 md:py-36 relative overflow-hidden"
    >
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Editorial composition — strogonoff hero + concise proofs */}
        <div className="mt-16 grid grid-cols-12 gap-4 md:gap-6 items-start">
          <div className="col-span-12 md:col-span-7 relative">
            <Reveal>
              <img
                src={strogonoffAsset}
                alt="Strogonoff brasileiro acompanhado de arroz branco e batata palha."
                width={1408}
                height={1120}
                loading="lazy"
                className="w-full aspect-[5/4] object-cover"
                style={{ objectPosition: "center" }}
              />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <Reveal delay={80}>
              <div className="bg-graphite-2 p-6 md:p-8 border-l-2 border-red">
                <div className="text-[0.62rem] uppercase tracking-[0.22em] text-red font-semibold">
                  Qualidade do serviço
                </div>
                <div className="mt-3 text-3xl md:text-4xl font-display font-semibold leading-none">
                  Super no iFood
                </div>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  Classificação exibida na página da loja com base nos pedidos dos últimos meses.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="bg-ink border border-white/10 p-6 md:p-8">
                <Stars n={5} />
                <div className="mt-3 text-lg md:text-xl font-display font-medium leading-snug text-paper">
                  Todas as avaliações exibidas possuem 5 estrelas.
                </div>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="bg-red text-primary-foreground p-6 md:p-8">
                <p className="text-base md:text-lg font-display font-medium leading-snug">
                  Quando produto, atendimento e operação seguem o mesmo padrão, a reputação
                  deixa de ser acaso.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Cropped store screenshot as visual evidence */}
        <div className="mt-16 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <div className="border border-white/10 bg-graphite-2 p-3 md:p-4 max-w-xs mx-auto md:mx-0">
                <img
                  src={ifoodStoreAsset}
                  alt="Página da OFF de Strogonoff no iFood exibindo classificação Super e nota 5,0 com 112 avaliações."
                  width={738}
                  height={1355}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-6">
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              Classificação{" "}
              <span className="text-paper font-medium">Super</span> e nota{" "}
              <span className="text-paper font-medium">5,0</span> exibidas pela própria
              plataforma, com base no comportamento dos pedidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Reviews ------------------------------ */

function ReviewsSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((v) => (v === null ? v : (v + 1) % REVIEW_SHOTS.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) =>
          v === null ? v : (v - 1 + REVIEW_SHOTS.length) % REVIEW_SHOTS.length,
        );
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section className="on-dark bg-graphite-2 text-paper py-24 md:py-32 border-t border-white/5">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-8">
            <div className="eyebrow">
              <span className="inline-block h-px w-8 bg-red" />
              Avaliações
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl leading-[1.02] tracking-tight text-paper">
              <span className="text-red">★★★★★</span> em todas as avaliações exibidas.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="text-white/60 text-sm border-l border-red/60 pl-4">
              Avaliações publicadas por clientes da OFF de Strogonoff.
            </p>
          </div>
        </div>

        {/* Desktop: 2-col grid. Mobile: horizontal snap scroll. */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {REVIEW_SHOTS.map((r, i) => (
            <Reveal key={r.src} delay={i * 60}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full text-left bg-white p-4 md:p-5 border border-white/10 hover:-translate-y-[3px] transition-transform duration-300"
                aria-label={`Ampliar avaliação: ${r.alt}`}
              >
                <img
                  src={r.src}
                  alt={r.alt}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <div className="md:hidden -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {REVIEW_SHOTS.map((r, i) => (
            <button
              key={r.src}
              type="button"
              onClick={() => setLightbox(i)}
              className="snap-start shrink-0 w-[85%] bg-white p-3 border border-white/10 text-left"
              aria-label={`Ampliar avaliação: ${r.alt}`}
            >
              <img src={r.src} alt={r.alt} loading="lazy" className="w-full h-auto" />
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/50 uppercase tracking-[0.18em]">
          Avaliações publicadas na loja OFF de Strogonoff.
        </p>
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Avaliação ampliada"
          className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Fechar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div
            className="bg-white p-4 md:p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={REVIEW_SHOTS[lightbox].src}
              alt={REVIEW_SHOTS[lightbox].alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* --------------------- What the case represents --------------------- */

function CaseReputationCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85;
        const end = vh * 0.2;
        const raw = (start - rect.top) / (start - end);
        setProgress(Math.max(0, Math.min(1, raw)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const incoming = [
    { name: "Renata", text: "Chegou impecável, super recomendo.", stars: 5 },
    { name: "Gabriel", text: "Padrão de restaurante, sempre.", stars: 5 },
    { name: "Michelle", text: "Melhor strogonoff da cidade.", stars: 5 },
  ];

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setReviewIdx((i) => (i + 1) % incoming.length), 3600);
    return () => clearInterval(id);
  }, [reduced, incoming.length]);

  const rating = reduced ? 5 : 4.2 + progress * 0.8;
  const recompra = reduced ? 68 : Math.round(progress * 68);
  const nps = reduced ? 92 : Math.round(72 + progress * 20);

  return (
    <div ref={wrapRef} className="relative max-w-md mt-10">
      {/* soft ambient */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 20%, oklch(0.58 0.22 27 / 0.10), transparent 70%), radial-gradient(60% 60% at 90% 90%, oklch(0.14 0.005 260 / 0.06), transparent 70%)",
        }}
      />
      <div
        className="relative bg-card border border-line rounded-md p-6 md:p-7"
        style={{ boxShadow: "0 20px 60px -30px oklch(0.14 0.005 260 / 0.35)" }}
      >
        <div className="flex items-center justify-between">
          <div className="text-[0.6rem] uppercase tracking-[0.24em] text-graphite">
            Reputação · OFF de Strogonoff
          </div>
          <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-graphite">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red" />
            </span>
            ao vivo
          </div>
        </div>

        {/* rating */}
        <div className="mt-6 flex items-end gap-4">
          <div className="font-display text-5xl md:text-6xl font-semibold tracking-tight tabular-nums">
            {rating.toFixed(1)}
          </div>
          <div className="pb-2">
            <div className="flex gap-1" aria-label={`Nota ${rating.toFixed(1)} de 5`}>
              {[0, 1, 2, 3, 4].map((i) => {
                const fill = Math.max(0, Math.min(1, rating - i));
                return (
                  <div key={i} className="relative w-4 h-4">
                    <svg viewBox="0 0 20 20" className="absolute inset-0 w-4 h-4 text-line">
                      <path
                        fill="currentColor"
                        d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
                      />
                    </svg>
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                      <svg viewBox="0 0 20 20" className="w-4 h-4 text-red">
                        <path
                          fill="currentColor"
                          d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-graphite">
              super · iFood
            </div>
          </div>
        </div>

        {/* metrics */}
        <div className="mt-8 space-y-5">
          {[
            { label: "Recompra 30d", value: `${recompra}%`, fill: recompra / 100 },
            { label: "NPS", value: `${nps}`, fill: nps / 100 },
            { label: "Consistência do padrão", value: `${Math.round(progress * 94 + 6)}%`, fill: progress * 0.94 + 0.06 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.22em] text-graphite mb-2">
                <span>{m.label}</span>
                <span className="tabular-nums text-ink font-medium">{m.value}</span>
              </div>
              <div className="h-[3px] bg-line overflow-hidden rounded-full">
                <div
                  className="h-full bg-red"
                  style={{
                    width: `${Math.min(1, m.fill) * 100}%`,
                    transition: "width 900ms cubic-bezier(0.2, 0.7, 0.2, 1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* incoming review toast */}
        <div className="mt-7 border-t border-line pt-5">
          <div className="text-[0.6rem] uppercase tracking-[0.24em] text-graphite mb-3">
            Última avaliação
          </div>
          <div key={reviewIdx} className="flex items-start gap-3" style={{ animation: reduced ? undefined : "pf-review 500ms ease-out" }}>
            <div className="h-8 w-8 rounded-full bg-ink text-paper flex items-center justify-center text-xs font-semibold shrink-0">
              {incoming[reviewIdx].name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{incoming[reviewIdx].name}</span>
                <span className="text-red text-xs tracking-tight">★★★★★</span>
              </div>
              <p className="mt-0.5 text-sm text-graphite leading-snug truncate">
                "{incoming[reviewIdx].text}"
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pf-review {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: none; }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="pf-review"] { animation: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

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
            Uma boa avaliação começa{" "}
            <span className="italic font-light text-graphite">muito antes</span> da entrega.
          </h2>
          <p className="mt-8 text-graphite leading-relaxed max-w-md">
            A PUB FOOD trabalha para transformar esses pontos em sistema, e não em esforço
            isolado.
          </p>
          <CaseReputationCard />
        </div>
        <div className="col-span-12 lg:col-span-7 lg:pl-8">
          <div className="grid grid-cols-1 gap-px bg-line">
            {points.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="bg-paper py-8 flex gap-6 items-start">
                  <div className="font-display text-red text-2xl font-semibold w-12 shrink-0">
                    {p.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{p.t}</h3>
                    <p className="mt-2 text-graphite">{p.d}</p>
                  </div>
                </div>
              </Reveal>
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
            <span className="italic font-light text-white/60">só receber pedidos</span> não
            basta.
          </h2>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a} delay={i * 60}>
              <li className="bg-ink p-8 flex items-start gap-4 hover:bg-graphite-2 transition-colors h-full">
                <span className="font-display text-red text-xs font-semibold pt-2 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-paper leading-snug">{a}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={300}>
          <div className="mt-14 border-l-2 border-red pl-6 max-w-3xl">
            <p className="text-white/70 text-lg">
              Não é para quem procura apenas uma arte, um cardápio isolado ou uma campanha sem
              estrutura.
            </p>
          </div>
        </Reveal>
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
                    className="w-full text-left py-6 flex items-start gap-4 md:gap-6 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-red text-sm font-semibold pt-2 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0 text-base md:text-xl font-medium tracking-tight group-hover:text-red transition-colors">
                      {f.q}
                    </span>
                    <span
                      className={`text-red transition-transform duration-300 mt-1 shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-12 md:pl-14 pr-4 md:pr-10">
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
              <label
                htmlFor="negocio"
                className="text-xs uppercase tracking-[0.18em] text-white/50"
              >
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
              <label
                htmlFor="whatsapp"
                className="text-xs uppercase tracking-[0.18em] text-white/50"
              >
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
              <label
                htmlFor="desafio"
                className="text-xs uppercase tracking-[0.18em] text-white/50"
              >
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
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-red text-primary-foreground text-sm font-semibold hover:bg-red-2 transition-colors group"
              >
                Quero falar com a PUB FOOD
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-[3px]"
                >
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
          <LogoMark size="sm" />
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
              Uma empresa da PUB CORE.
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
    <main className="bg-paper text-ink overflow-x-hidden">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <MethodSection />
      <CaseSection />
      <ReviewsSection />
      <CaseMeaning />
      <AudienceSection />
      <FaqSection />
      <CTASection />
      <Footer />
      <MobileCTA />
    </main>
  );
}
