import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  FlaskConical,
  Gauge,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

import heroImage from "@/assets/acquazul-water-industry.jpg";
import logo from "@/assets/acquazul-logo.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories, totalProducts, units, type Category } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const whatsapp = "https://wa.me/553335221919";

function Header({ openSearch }: { openSearch: () => void }) {
  const links = [
    ["Empresa", "#empresa"],
    ["Produtos", "#produtos"],
    ["Soluções", "#solucoes"],
    ["Unidades", "#unidades"],
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-line">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 md:h-24 md:px-10">
        <a href="#topo" aria-label="Acquazul — início" className="shrink-0">
          <img src={logo} alt="Acquazul" className="h-11 w-auto brightness-0 invert md:h-13" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map(([name, href]) => (
            <a key={href} href={href} className="text-[11px] font-bold uppercase text-hero-muted transition-colors hover:text-hero tracking-[0.14em]">
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={openSearch} variant="ghost" className="h-10 border border-hero-line bg-hero-soft px-3 text-hero hover:bg-hero-hover hover:text-hero md:px-4">
            <Search /> <span className="hidden sm:inline">Buscar</span><kbd className="ml-1 hidden border border-hero-line px-1.5 py-0.5 text-[9px] text-hero-muted md:inline">⌘K</kbd>
          </Button>
          <Button asChild className="hidden h-10 bg-cyan px-5 text-navy hover:bg-cyan-strong sm:inline-flex">
            <a href={whatsapp} target="_blank" rel="noreferrer">Falar com especialista <ArrowRight /></a>
          </Button>
          <Sheet>
            <SheetTrigger asChild><Button size="icon" variant="ghost" className="border border-hero-line text-hero hover:bg-hero-hover hover:text-hero lg:hidden" aria-label="Abrir menu"><Menu /></Button></SheetTrigger>
            <SheetContent className="w-full border-cyan-line bg-navy p-8 text-hero sm:max-w-full">
              <SheetTitle className="sr-only">Navegação</SheetTitle><SheetDescription className="sr-only">Links principais do site</SheetDescription>
              <img src={logo} alt="Acquazul" className="h-12 brightness-0 invert" />
              <nav className="mt-20 flex flex-col gap-2">
                {links.map(([name, href], index) => <a key={href} href={href} className="border-b border-hero-line py-5 text-4xl font-black uppercase"><span className="mr-4 text-xs text-cyan">0{index + 1}</span>{name}</a>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function SearchModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return categories.flatMap((category) => category.products.map((product) => ({ product, category }))).filter((item) => !normalized || `${item.product} ${item.category.label}`.toLocaleLowerCase("pt-BR").includes(normalized)).slice(0, 8);
  }, [query]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="top-[8vh] max-h-[84vh] max-w-3xl translate-y-0 overflow-hidden border-cyan-line bg-surface p-0 shadow-2xl sm:rounded-none">
        <DialogHeader className="sr-only"><DialogTitle>Buscar no catálogo</DialogTitle><DialogDescription>Encontre produtos e categorias Acquazul.</DialogDescription></DialogHeader>
        <div className="flex items-center gap-4 border-b border-border px-6 py-5"><Search className="text-cyan" /><Input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Produto, aplicação ou categoria…" className="h-12 border-0 text-lg shadow-none focus-visible:ring-0" /></div>
        <div className="flex gap-2 overflow-x-auto border-b border-border px-6 py-4">
          {categories.slice(0, 6).map((category) => <Button key={category.id} onClick={() => setQuery(category.label)} variant="outline" size="sm" className="shrink-0">{category.label}</Button>)}
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-4">
          <p className="px-2 pb-3 text-[10px] font-bold uppercase text-muted-foreground tracking-[0.18em]">{results.length} resultados em destaque</p>
          {results.map(({ product, category }) => (
            <button key={`${category.id}-${product}`} onClick={() => setOpen(false)} className="group flex w-full items-center gap-4 border-t border-border px-2 py-4 text-left transition-colors hover:bg-secondary">
              <img src={category.image} alt="" className="h-16 w-16 object-contain" /><span className="min-w-0 flex-1"><span className="block font-bold text-foreground">{product}</span><span className="text-xs text-muted-foreground">{category.label}</span></span><ArrowRight className="text-cyan transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductModal({ item, close }: { item: { name: string; category: Category } | null; close: () => void }) {
  const quoteUrl = item ? `${whatsapp}?text=${encodeURIComponent(`Olá, gostaria de solicitar uma cotação para ${item.name}.`)}` : whatsapp;
  return (
    <Dialog open={Boolean(item)} onOpenChange={(value) => !value && close()}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-cyan-line bg-surface p-0 sm:rounded-none">
        {item && <div className="grid md:grid-cols-[.85fr_1.15fr]">
          <div className="flex min-h-80 items-center justify-center bg-product p-8"><img src={item.category.image} alt={item.name} className="max-h-80 w-full object-contain transition-transform duration-700 hover:scale-105" /></div>
          <div className="p-7 md:p-10"><DialogHeader><p className="text-[10px] font-bold uppercase text-cyan tracking-[0.2em]">Ficha técnica • {item.category.code}</p><DialogTitle className="mt-3 text-3xl font-black uppercase leading-none md:text-4xl">{item.name}</DialogTitle><DialogDescription className="mt-3 text-base">Solução profissional da linha {item.category.label}.</DialogDescription></DialogHeader>
            <dl className="mt-8 grid grid-cols-2 border-y border-border">
              {[['Aplicação', item.category.description], ['Dosagem', 'Conforme orientação técnica'], ['Volumes', 'Consulte embalagens disponíveis'], ['Composição', 'Formulação técnica Acquazul']].map(([term, value]) => <div key={term} className="border-b border-border p-4 odd:border-r"><dt className="text-[9px] font-bold uppercase text-muted-foreground tracking-[0.15em]">{term}</dt><dd className="mt-2 text-sm font-semibold">{value}</dd></div>)}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Consulte a equipe técnica para indicação, diluição e uso seguro conforme a necessidade da sua operação.</p>
            <Button asChild className="mt-7 h-12 w-full bg-primary"><a href={quoteUrl} target="_blank" rel="noreferrer">Solicitar cotação <ArrowRight /></a></Button>
          </div>
        </div>}
      </DialogContent>
    </Dialog>
  );
}

function ProductExplorer() {
  const [selected, setSelected] = useState(0);
  const [product, setProduct] = useState<{ name: string; category: Category } | null>(null);
  const category = categories[selected];
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => track.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  if (!category) return null;
  return (
    <section id="produtos" className="bg-surface py-20 md:py-30">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div><p className="eyebrow">Catálogo / {String(totalProducts).padStart(2, "0")} soluções selecionadas</p><h2 className="display-heading mt-5 max-w-3xl text-5xl md:text-7xl">QUÍMICA QUE<br /><span className="text-cyan-dark">MOVE SETORES.</span></h2></div>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">Da produção rural ao ambiente hospitalar, reunimos linhas profissionais, equipamentos e suprimentos para operações de todas as escalas.</p>
        </div>
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-4">
          {categories.map((item, index) => <Button key={item.id} onClick={() => setSelected(index)} variant={index === selected ? "default" : "outline"} className={cn("h-11 shrink-0 rounded-none px-5", index === selected && "bg-primary")}>{item.code} / {item.label}<span className="text-[10px] opacity-60">{item.products.length}</span></Button>)}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[390px_1fr]">
          <article className="relative min-h-[470px] overflow-hidden bg-navy p-7 text-hero">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-category-glow" />
            <span className="relative text-xs text-cyan">LINHA / {category.code}</span><h3 className="relative mt-4 text-4xl font-black uppercase leading-none">{category.label}</h3><p className="relative mt-4 max-w-xs text-sm text-hero-muted">{category.description}</p>
            <img key={category.image} src={category.image} alt={`Produto da linha ${category.label}`} loading="lazy" className="relative mx-auto mt-8 h-64 w-full object-contain animate-fade-in drop-shadow-2xl" />
          </article>
          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between"><p className="text-xs font-bold uppercase text-muted-foreground tracking-[0.14em]">Explore a linha completa</p><div className="flex gap-2"><Button size="icon" variant="outline" onClick={() => scroll(-1)} aria-label="Produtos anteriores"><ChevronLeft /></Button><Button size="icon" variant="outline" onClick={() => scroll(1)} aria-label="Próximos produtos"><ChevronRight /></Button></div></div>
            <div ref={track} className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-4">
              {category.products.map((name, index) => <button key={name} onClick={() => setProduct({ name, category })} className="group flex min-h-[360px] w-[280px] shrink-0 snap-start flex-col border border-border bg-background p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-line hover:shadow-xl md:w-[310px]">
                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground"><span>{category.code}.{String(index + 1).padStart(2, "0")}</span><span>FICHA TÉCNICA ↗</span></div>
                <img src={category.image} alt="" loading="lazy" className="my-auto h-44 w-full object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1" />
                <p className="text-lg font-black uppercase leading-tight">{name}</p><p className="mt-3 text-xs text-muted-foreground">{category.label}</p>
              </button>)}
            </div>
          </div>
        </div>
      </div>
      <ProductModal item={product} close={() => setProduct(null)} />
    </section>
  );
}

function Solutions() {
  const [etaStep, setEtaStep] = useState(0);
  const [service, setService] = useState("Residencial");
  const eta = ["Análise da água", "Projeto técnico", "Montagem da estação", "Potabilidade atestada"];
  return (
    <section id="solucoes" className="bg-navy text-hero">
      <article className="mx-auto grid max-w-[1480px] border-x border-hero-line lg:grid-cols-2">
        <div className="relative min-h-[620px] overflow-hidden border-b border-hero-line p-7 md:p-12 lg:border-b-0 lg:border-r">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-cyan-line" /><div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-cyan-line" />
          <p className="eyebrow text-cyan">Divisão especial 01</p><h2 className="display-heading mt-6 text-5xl md:text-7xl">ÁGUA<br />PRONTA<br />PARA A VIDA.</h2><p className="mt-7 max-w-lg text-hero-muted">Solução completa para poços artesianos, minas, nascentes, rios, represas e lagos — da análise à água potável.</p>
          <div className="mt-12 space-y-2">{eta.map((step, index) => <button key={step} onMouseEnter={() => setEtaStep(index)} onClick={() => setEtaStep(index)} className={cn("flex w-full items-center justify-between border-t border-hero-line py-4 text-left transition-colors", etaStep === index ? "text-cyan" : "text-hero-muted")}><span className="flex items-center gap-4"><span className="text-xs">0{index + 1}</span><span className="font-bold uppercase">{step}</span></span>{etaStep === index ? <Check /> : <ArrowRight />}</button>)}</div>
        </div>
        <div className="relative min-h-[620px] overflow-hidden bg-cyan p-7 text-navy md:p-12">
          <div className="absolute right-8 top-8 opacity-20"><ShieldCheck size={140} strokeWidth={0.8} /></div><p className="eyebrow text-navy/60">Divisão especial 02</p><h2 className="display-heading mt-6 text-5xl md:text-7xl">ACQUA<br />DEDETIZADORA.</h2><p className="mt-7 max-w-lg text-navy/70">Controle profissional de pragas com atendimento 24 horas para residências, condomínios e operações críticas.</p>
          <div className="mt-10"><p className="text-[10px] font-bold uppercase tracking-[0.18em]">Selecione seu ambiente</p><div className="mt-3 flex flex-wrap gap-2">{["Residencial", "Condomínio", "Indústria", "Hospital", "Comércio"].map((item) => <Button key={item} onClick={() => setService(item)} variant="outline" className={cn("rounded-none border-navy/20 bg-transparent text-navy hover:bg-navy hover:text-hero", service === item && "bg-navy text-hero")}>{item}</Button>)}</div></div>
          <div className="mt-10 border border-navy/20 p-6"><div className="flex items-center gap-3"><Gauge /><p className="font-black uppercase">Orçamento imediato</p></div><p className="mt-2 text-sm text-navy/65">Atendimento certificado para {service.toLocaleLowerCase("pt-BR")}. Retorno rápido da equipe técnica.</p><Button asChild className="mt-6 h-12 w-full bg-navy text-hero hover:bg-navy/90"><a href={`${whatsapp}?text=${encodeURIComponent(`Olá, preciso de orçamento para dedetização: ${service}.`)}`} target="_blank" rel="noreferrer">Solicitar agora <ArrowRight /></a></Button></div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em]">Residências • escolas • transportadoras • pet shops • clínicas • galpões</p>
        </div>
      </article>
    </section>
  );
}

function Units() {
  const [selected, setSelected] = useState(0);
  const unit = units[selected];
  if (!unit) return null;
  return (
    <section id="unidades" className="bg-ice py-20 md:py-30">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <p className="eyebrow">Presença regional / MG • BA • ES</p><div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-end"><h2 className="display-heading text-5xl md:text-7xl">PERTO DE QUEM<br />FAZ ACONTECER.</h2><p className="max-w-md text-muted-foreground lg:justify-self-end">Uma operação conectada, pronta para atender empresas e consumidores com agilidade e orientação técnica.</p></div>
        <div className="mt-12 grid overflow-hidden border border-border bg-background lg:grid-cols-[.9fr_1.1fr]">
          <div className="p-6 md:p-10"><div className="space-y-2">{units.map((item, index) => <button key={item.short} onClick={() => setSelected(index)} className={cn("flex w-full items-center gap-4 border p-5 text-left transition-all", selected === index ? "border-cyan bg-secondary" : "border-border hover:border-cyan-line")}><span className="flex h-9 w-9 items-center justify-center bg-navy text-xs text-cyan">0{index + 1}</span><span><span className="block font-black uppercase">{item.short}</span><span className="text-xs text-muted-foreground">{item.city}</span></span></button>)}</div></div>
          <div className="relative min-h-[420px] overflow-hidden bg-map p-7 text-hero md:p-12">
            <div className="map-grid absolute inset-0 opacity-30"/><MapPin className="relative text-cyan" size={40}/><p className="relative mt-12 text-xs font-bold uppercase text-cyan tracking-[0.18em]">{unit.short}</p><h3 className="relative mt-3 text-4xl font-black uppercase md:text-5xl">{unit.city}</h3><p className="relative mt-6 text-lg">{unit.address}<br /><span className="text-hero-muted">{unit.zip}</span></p><a href={`tel:+${unit.tel}`} className="relative mt-7 inline-flex items-center gap-3 text-2xl font-black"><Phone /> {unit.phone}</a><div className="relative mt-10 flex flex-wrap gap-3"><Button asChild className="bg-cyan text-navy hover:bg-cyan-strong"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${unit.address}, ${unit.city}`)}`} target="_blank" rel="noreferrer">Abrir no mapa <ArrowRight /></a></Button><Button asChild variant="outline" className="border-hero-line bg-transparent text-hero hover:bg-hero-hover hover:text-hero"><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></Button></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AcquazulExperience() {
  const [searchOpen, setSearchOpen] = useState(false);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, []);
  const move = (event: MouseEvent<HTMLElement>) => {
    const rect = hero.current?.getBoundingClientRect(); if (!rect || !hero.current) return;
    hero.current.style.setProperty("--mx", `${(event.clientX - rect.left) / rect.width * 100}%`);
    hero.current.style.setProperty("--my", `${(event.clientY - rect.top) / rect.height * 100}%`);
  };
  return <main id="topo" className="overflow-hidden bg-background">
    <section ref={hero} onMouseMove={move} className="hero-shell relative min-h-[820px] text-hero md:min-h-[900px]">
      <img src={heroImage} alt="Água cristalina em uma instalação industrial de alta precisão" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" /><div className="hero-cursor-glow absolute inset-0" />
      <Header openSearch={() => setSearchOpen(true)} />
      <div className="relative z-10 mx-auto flex min-h-[820px] max-w-[1480px] flex-col justify-end px-5 pb-9 pt-32 md:min-h-[900px] md:px-10 md:pb-12">
        <div className="mb-auto mt-32 flex items-center gap-3 text-[10px] font-bold uppercase text-cyan tracking-[0.2em]"><span className="h-px w-10 bg-cyan" />Indústria química brasileira • desde 1995</div>
        <h1 className="hero-title max-w-6xl text-[clamp(4.5rem,12vw,12rem)] font-black uppercase leading-[.77]">PRECISÃO<br /><span className="outline-text">EM CADA</span><br />GOTA.</h1>
        <div className="mt-10 grid gap-8 border-t border-hero-line pt-7 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-base leading-relaxed text-hero-muted md:text-lg">Soluções químicas, tratamento de água, higiene profissional e equipamentos para transformar operações em Minas Gerais, Bahia e Espírito Santo.</p>
          <a href="#produtos" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em]">Explorar catálogo <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan text-cyan transition-transform group-hover:translate-y-1"><ArrowDown /></span></a>
        </div>
        <div className="mt-8 grid grid-cols-3 border-y border-hero-line text-center md:text-left"><div className="py-4 md:py-5"><strong className="block text-xl md:text-3xl">1995</strong><span className="text-[9px] uppercase text-hero-muted tracking-[0.1em]">Fundação</span></div><div className="border-x border-hero-line py-4 md:px-8 md:py-5"><strong className="block text-xl md:text-3xl">03</strong><span className="text-[9px] uppercase text-hero-muted tracking-[0.1em]">Estados</span></div><div className="py-4 md:px-8 md:py-5"><strong className="block text-xl md:text-3xl">100+</strong><span className="text-[9px] uppercase text-hero-muted tracking-[0.1em]">Soluções</span></div></div>
      </div>
    </section>
    <section id="empresa" className="bg-ice py-20 md:py-32"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 md:px-10 lg:grid-cols-[.45fr_1.55fr]"><p className="eyebrow">Acquazul / Teófilo Otoni</p><div><h2 className="display-heading max-w-5xl text-5xl md:text-8xl">A FORÇA DA INDÚSTRIA.<br /><span className="text-cyan-dark">A PUREZA DA ÁGUA.</span></h2><div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-3"><p className="text-lg leading-relaxed md:col-span-2">Há mais de três décadas, a Acquazul combina conhecimento químico, distribuição regional e compromisso técnico para entregar resultados consistentes.</p><div className="grid grid-cols-3 gap-4 text-center">{[[FlaskConical,"Química"],[Waves,"Água"],[Sparkles,"Precisão"]].map(([Icon,label]) => { const I=Icon as typeof Droplets; return <div key={label as string}><I className="mx-auto text-cyan-dark"/><span className="mt-2 block text-[9px] font-bold uppercase">{label as string}</span></div>})}</div></div></div></div></section>
    <ProductExplorer /><Solutions /><Units />
    <footer className="bg-navy px-5 py-12 text-hero md:px-10"><div className="mx-auto max-w-[1480px]"><div className="grid gap-10 border-b border-hero-line pb-12 md:grid-cols-2"><div><img src={logo} alt="Acquazul" className="h-14 brightness-0 invert"/><p className="mt-5 max-w-sm text-sm text-hero-muted">Indústria e Comércio. Soluções profissionais desde 1995.</p></div><div className="flex gap-3 md:justify-end"><Button asChild size="icon" variant="outline" className="border-hero-line bg-transparent text-hero hover:bg-hero-hover hover:text-hero"><a href="https://instagram.com/acquazulteo" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a></Button><Button asChild variant="outline" className="border-hero-line bg-transparent text-hero hover:bg-hero-hover hover:text-hero"><a href="https://facebook.com/acquazulind" target="_blank" rel="noreferrer">Facebook</a></Button></div></div><div className="flex flex-col gap-3 pt-7 text-[10px] uppercase text-hero-muted tracking-[0.12em] md:flex-row md:justify-between"><p>© 2026 Acquazul Indústria e Comércio</p><p>MG • BA • ES</p></div></div></footer>
    <SearchModal open={searchOpen} setOpen={setSearchOpen} />
  </main>;
}