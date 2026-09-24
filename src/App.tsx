import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Check,
  Factory,
  Flame,
  Nfc,
  Play,
  QrCode,
  Radio,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Bandage,
  Clock3,
  Image,
  Lock,
  Mail,
  Maximize,
  MessageCircle,
  Settings2,
  ShoppingBag,
  SkipForward,
  Store,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";

import placasMazzTagImage from "@/assets/placas-mazztag-azul-preta-10x10.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const APP_URL = "https://app.mazztag.com.br";

const wholesalePrices = [
  { min: 50, label: "50 ou mais", price: 17 },
  { min: 21, label: "21 a 49 unidades", price: 18 },
  { min: 1, label: "1 a 20 unidades", price: 20 },
];

const trustBadges = [
  { icon: Nfc, label: "NFC integrado" },
  { icon: QrCode, label: "QR Code" },
  { icon: Bandage, label: "Fita 3M original" },
  { icon: Banknote, label: "Sem mensalidade" },
];

const whyItems = [
  {
    icon: Bandage,
    title: "Fita 3M original",
    text: "Nosso fornecedor é o único que produz com fita dupla-face 3M genuína, garantindo fixação e durabilidade muito acima do padrão do mercado.",
  },
  {
    icon: Factory,
    title: "Direto do fabricante",
    text: "Sem intermediário: você compra direto de quem produz, sem markup de revendedor no meio.",
  },
  {
    icon: Banknote,
    title: "Sem mensalidade",
    text: "Pagamento único para ter acesso à loja e ao sistema de gestão das suas placas, sem assinatura recorrente.",
  },
];

const faqItems = [
  {
    question: "Preciso entender de tecnologia?",
    answer:
      "Não. O QR Code já funciona direto, sem nenhuma configuração — você só cadastra o link de destino (a avaliação do Google da empresa do seu cliente) normalmente no sistema. Já o chip NFC precisa ser configurado manualmente por você, mas é rápido: temos uma aula gratuita que ensina o passo a passo. Quem sabe usar o WhatsApp consegue operar a MazzTag sem dificuldade.",
  },
  {
    question: "Preciso ter experiência com vendas?",
    answer:
      "Também não. Qualquer pessoa consegue apresentar a solução, porque o produto é simples e o benefício é fácil de mostrar na prática. Você conta com suporte e materiais práticos para conduzir a conversa com o lojista.",
  },
  {
    question: "As placas estão incluídas no valor do plano?",
    answer:
      "Não. O plano dá acesso à loja, ao sistema de gestão, ao treinamento e aos preços de atacado. As placas são adquiridas separadamente, na quantidade que você precisar, pelo valor de atacado da tabela.",
  },
  {
    question: "Como funciona a garantia?",
    answer:
      "A garantia cobre o funcionamento do chip NFC, a durabilidade do material e a fita 3M original. Se alguma placa apresentar defeito de fabricação, é só acionar o suporte.",
  },
  {
    question: "É renda garantida?",
    answer:
      "Não. Não existe garantia de renda, de faturamento ou de ganho fácil. Os resultados dependem exclusivamente da dedicação, da prospecção e da execução de cada parceiro. A MazzTag entrega produto, estrutura e suporte — vender é com você.",
  },
];

const benefits = [
  { title: "Treinamento completo", text: "Um caminho claro para vender desde o primeiro cliente." },
  { title: "Sistema próprio", text: "Cadastre e gerencie suas placas em um só lugar." },
  { title: "Fornecedor exclusivo", text: "Produtos prontos, testados e com padrão profissional." },
  { title: "Comunidade", text: "Troque experiências com quem também está em campo." },
  { title: "Materiais práticos", text: "Recursos de venda para apresentar a solução aos clientes." },
  { title: "Acesso vitalício", text: "Aprenda no seu ritmo e consulte quando precisar." },
];

// Acesso à loja é grátis (cadastro direto, sem checkout) — só o upgrade pra
// Comunidade + Aulas + Suporte é pago.
const upgradePrice = 9.9;
const upgradeFullPrice = 60;

// Upgrade temporariamente bloqueado ("Em breve"). Pra liberar de novo, é só
// virar pra false — preço e checkout já ficam prontos.
const UPGRADE_LOCKED = true;

// Oferta de lançamento. Para prorrogar, altere apenas esta data (horário de Brasília, UTC-3).
const LAUNCH_OFFER_DEADLINE = new Date("2026-09-30T23:59:59.999-03:00").getTime();

function LaunchOffer() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateRemaining = () => setRemaining(Math.max(0, LAUNCH_OFFER_DEADLINE - Date.now()));
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const expired = remaining === 0;
  const totalSeconds = Math.floor((remaining ?? 0) / 1000);
  const units = [
    { label: "dias", value: Math.floor(totalSeconds / 86400) },
    { label: "horas", value: Math.floor((totalSeconds % 86400) / 3600) },
    { label: "min", value: Math.floor((totalSeconds % 3600) / 60) },
    { label: "seg", value: totalSeconds % 60 },
  ];

  return (
    <div className="mx-auto mb-6 max-w-4xl overflow-hidden rounded-lg border border-brand-blue bg-ink text-ink-foreground shadow-deep">
      <div className="border-b border-ink-border px-5 py-4 text-center">
        <p className="flex items-center justify-center gap-2 font-display text-base font-bold md:text-lg">
          {!expired && <Flame className="size-5 text-google-blue" aria-hidden="true" />}
          {expired ? "Oferta de lançamento encerrada" : "Oferta de lançamento — válida até 30/09 às 23:59"}
        </p>
        <p className="mt-1 text-xs text-ink-muted">Horário de Brasília</p>
      </div>
      {!expired && (
        <div className="grid grid-cols-4 divide-x divide-ink-border" aria-label="Tempo restante da oferta" aria-live="polite">
          {units.map((unit) => (
            <div key={unit.label} className="px-2 py-4 text-center">
              <strong className="block font-display text-2xl tabular-nums text-google-blue md:text-3xl">
                {remaining === null ? "--" : String(unit.value).padStart(2, "0")}
              </strong>
              <span className="mt-1 block text-[10px] font-bold uppercase text-ink-muted md:text-xs">{unit.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

function RevenueSimulator() {
  const [quantity, setQuantity] = useState(20);
  const [salePrice, setSalePrice] = useState(59.9);
  const revenue = quantity * salePrice;

  return (
    <section id="simulador" className="scroll-mt-20 bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-5 flex items-center gap-2 text-sm font-bold uppercase text-google-blue">
            <Sparkles className="size-4" /> Simule sua oportunidade
          </p>
          <h2 className="max-w-lg font-display text-4xl font-bold leading-tight md:text-5xl">
            Quanto você pode faturar com a MazzTag?
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            Defina sua meta de vendas e o preço que faz sentido para o seu mercado. A conta acontece na hora.
          </p>
           <div className="mt-8 flex items-start gap-3 border-l-2 border-google-blue pl-4 text-sm leading-relaxed text-ink-muted">
             <ShieldCheck className="mt-0.5 size-5 shrink-0 text-google-blue" />
             <p>Você continua no controle da quantidade e do preço final de cada placa.</p>
           </div>
        </div>

        <div className="rounded-lg border border-ink-border bg-ink-elevated p-5 shadow-deep md:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h3 className="font-display text-xl font-semibold">Seu cenário</h3>
            <span className="rounded-md border border-ink-border bg-ink-soft px-3 py-2 text-sm font-semibold text-google-blue">
              Placa 10x10 cm
            </span>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink-muted">Quantidade de placas</span>
              <div className="flex h-14 items-center rounded-md border border-ink-border bg-ink-soft px-4 focus-within:border-brand-blue">
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(event) => setQuantity(Math.max(1, Math.min(500, Number(event.target.value) || 1)))}
                  className="min-w-0 flex-1 bg-transparent text-2xl font-bold outline-none"
                  aria-label="Quantidade de placas"
                />
                <span className="text-sm text-ink-muted">unidades</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={Math.min(quantity, 100)}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="mt-4 w-full accent-brand-blue"
                aria-label="Ajustar quantidade de placas"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink-muted">Preço que vai cobrar por placa</span>
              <div className="flex h-14 items-center rounded-md border border-ink-border bg-ink-soft px-4 focus-within:border-brand-blue">
                <span className="mr-2 text-sm text-ink-muted">R$</span>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={salePrice}
                  onChange={(event) => setSalePrice(Math.max(0, Number(event.target.value) || 0))}
                  className="min-w-0 flex-1 bg-transparent text-2xl font-bold outline-none"
                  aria-label="Preço de revenda por placa"
                />
              </div>
              <p className="mt-4 text-xs text-ink-muted">Preço livre: você escolhe quanto cobrar.</p>
            </label>
          </div>

          <div className="mt-8 overflow-hidden rounded-md bg-brand-blue p-6 text-primary-foreground md:p-7">
            <span className="text-xs font-bold uppercase text-primary-foreground/75">Faturamento total</span>
            <strong className="mt-2 block font-display text-4xl md:text-5xl">{formatCurrency(revenue)}</strong>
            <small className="mt-2 block text-primary-foreground/75">
              {quantity} {quantity === 1 ? "placa" : "placas"} × {formatCurrency(salePrice)}
            </small>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-ink-muted">
            Simulação ilustrativa. O resultado não considera frete, impostos e outros custos, e não representa
            garantia de vendas.
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingTable() {
  const rows = [...wholesalePrices].reverse();
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-end justify-between bg-secondary px-6 py-5">
        <div>
          <p className="text-xs font-bold uppercase text-brand-blue">Placa MazzTag</p>
          <h3 className="mt-1 font-display text-2xl font-bold">10x10 cm</h3>
        </div>
        <span className="text-sm text-muted-foreground">por unidade</span>
      </div>
      <table className="w-full text-left">
        <thead className="border-y border-border text-xs uppercase text-muted-foreground">
          <tr><th className="px-6 py-3 font-medium">Quantidade</th><th className="px-6 py-3 text-right font-medium">Seu custo</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="px-6 py-5 text-sm font-medium">{row.label}</td>
              <td className="px-6 py-5 text-right text-lg font-bold text-brand-blue">{formatCurrency(row.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrustStrip() {
  return (
    <section aria-label="Diferenciais da placa" className="border-b border-border bg-background py-7">
      <ul className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-3 px-5 sm:justify-between lg:px-8">
        {trustBadges.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
          >
            <Icon className="size-4 text-brand-blue" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhyMazzTag() {
  return (
    <section id="por-que" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="por-que-title">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase text-brand-blue">Por que a MazzTag</p>
          <h2 id="por-que-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Diferença que aparece no balcão do seu cliente
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {whyItems.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-border bg-card p-7">
              <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-accent text-brand-blue">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductIn20Seconds() {
  return (
    <section className="border-y border-border bg-secondary py-20 md:py-28" aria-labelledby="produto-title">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase text-brand-blue">O produto em 20 segundos</p>
          <h2 id="produto-title" className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Uma boa experiência não vira avaliação sozinha.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            O cliente adora o atendimento, mas na hora de avaliar não sabe onde encontrar o perfil da empresa no Google. E a avaliação se perde.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground">
            A MazzTag fica visível no balcão e resolve isso no ato: aproximou o celular por NFC ou escaneou o QR Code, a página exata de avaliação já abre.
          </p>
          <div className="mt-8 border-l-4 border-google-blue bg-background px-5 py-4">
            <div className="flex items-start gap-3">
              <Smartphone className="mt-0.5 size-5 shrink-0 text-google-blue" />
              <p className="text-sm leading-relaxed">
                <strong className="block font-display text-base">Pronta para usar, sem complicação técnica.</strong>
                Chip NFC e QR Code já configurados. Basta inserir o link da avaliação do Google da empresa.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-lg bg-brand-blue text-primary-foreground shadow-product">
            <Nfc className="pointer-events-none absolute -right-8 -top-8 size-44 text-hero-foreground/5" aria-hidden="true" />

            <div className="relative flex items-center justify-between border-b border-hero-line px-6 py-4 md:px-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-hero-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-hero-foreground/80">
                <Star className="size-3 fill-current text-google-blue" />
                avaliações
              </span>
              <span className="font-display text-lg font-bold">Mazz<span className="text-google-blue">Tag</span></span>
            </div>

            <div className="relative px-6 py-8 md:px-8">
              <h3 className="font-display text-3xl font-bold leading-[1.08] md:text-4xl">
                Avalie-nos
                <br />
                no Google
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-hero-foreground/85">
                A página exata de avaliação abre em segundos — sem procurar o nome da empresa, sem digitar nada.
              </p>

              <div className="mt-8">
                <div className="flex items-start gap-4 rounded-lg bg-hero-soft p-4 ring-1 ring-hero-line">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-hero ring-1 ring-hero-line">
                    <Nfc className="size-5 text-google-blue" />
                  </span>
                  <div>
                    <strong className="block font-display text-base">Aproxime o celular</strong>
                    <span className="text-sm leading-relaxed text-hero-foreground/85">
                      O link abre na hora, sem instalar aplicativo.
                    </span>
                  </div>
                  <span className="ml-auto self-center font-mono text-xs text-hero-foreground/60">01</span>
                </div>

                <div className="flex justify-center" aria-hidden="true">
                  <div className="flex -my-px flex-col items-center">
                    <span className="h-3 w-px bg-hero-line" />
                    <span className="my-1 rounded-full bg-hero px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-hero-foreground/70 ring-1 ring-hero-line">
                      ou
                    </span>
                    <span className="h-3 w-px bg-hero-line" />
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-hero-soft p-4 ring-1 ring-hero-line">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-hero ring-1 ring-hero-line">
                    <QrCode className="size-5 text-google-blue" />
                  </span>
                  <div>
                    <strong className="block font-display text-base">Escaneie o QR Code</strong>
                    <span className="text-sm leading-relaxed text-hero-foreground/85">
                      Basta abrir a câmera do celular.
                    </span>
                  </div>
                  <span className="ml-auto self-center font-mono text-xs text-hero-foreground/60">02</span>
                </div>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hero-line px-6 py-5 text-xs text-hero-foreground/75 md:px-8">
              <span className="inline-flex items-center gap-2">
                <span className="flex gap-1" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-google-blue" />
                  <span className="size-2.5 rounded-full bg-hero ring-1 ring-hero-line" />
                </span>
                Azul ou preta
              </span>
              <span>10x10 cm</span>
              <span className="ml-auto font-display text-sm font-bold text-hero-foreground">mazztag.com.br</span>
            </div>
          </div>

          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-blue px-4 py-2 text-xs font-bold uppercase text-primary-foreground shadow-deep ring-1 ring-hero-line">
            <Radio className="mr-2 inline size-3.5 -translate-y-px text-google-blue" />
            NFC + QR Code na mesma placa
          </span>
        </div>
      </div>
    </section>
  );
}

const howItWorksSteps = [
  { icon: ShoppingBag, title: "Você compra sua placa", text: "Escolha a quantidade ideal para começar ou atender sua demanda." },
  { icon: Settings2, title: "Configura o destino no sistema", text: "Insira o link exato da avaliação no Google pelo sistema MazzTag." },
  { icon: Store, title: "Instala no comércio", text: "Fixe a placa no balcão e ela já estará pronta para gerar avaliações." },
];

function HowItWorks() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="como-funciona-title">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase text-brand-blue">Como funciona</p>
          <h2 id="como-funciona-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">Do pedido ao balcão em 3 passos</h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {howItWorksSteps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative rounded-lg border border-border bg-card p-7">
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-accent">0{index + 1}</span>
              <span className="mb-6 grid size-11 place-items-center rounded-md bg-brand-blue text-primary-foreground"><Icon className="size-5" /></span>
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SocialProof() {
  const proofItems = [
    { icon: Play, label: "Vídeos em campo", title: "Vendas e instalações reais", text: "Espaço reservado para demonstrações enviadas por parceiros MazzTag." },
    { icon: MessageCircle, label: "Depoimentos", title: "A experiência de quem usa", text: "Relatos reais de clientes e parceiros serão publicados aqui." },
    { icon: Image, label: "Resultados reais", title: "Conversas e avaliações", text: "Prints autorizados de comerciantes e avaliações 5 estrelas em crescimento." },
  ];

  return (
    <section className="border-y border-border bg-secondary py-20 md:py-28" aria-labelledby="prova-social-title">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase text-brand-blue">MazzTag na prática</p>
          <h2 id="prova-social-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">Resultados que você pode ver</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">Esta área receberá conteúdos reais de vendas, instalações e experiências dos parceiros.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {proofItems.map(({ icon: Icon, label, title, text }) => (
            <article key={title} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="grid aspect-video place-items-center bg-ink text-ink-foreground">
                <span className="grid size-14 place-items-center rounded-full border border-ink-border bg-ink-soft"><Icon className="size-6 text-google-blue" /></span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase text-brand-blue">{label} · Em breve</span>
                <h3 className="mt-2 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-y border-border bg-secondary py-20 md:py-28"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase text-brand-blue">Ainda com dúvida?</p>
          <h2 id="faq-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Perguntas frequentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-6">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-border">
              <AccordionTrigger className="font-display text-base font-bold hover:no-underline md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          A MazzTag oferece produto, estrutura e suporte. Não há garantia de renda ou de resultados: tudo depende da
          dedicação, da prospecção e da execução de cada parceiro.
        </p>
      </div>
    </section>
  );
}


function App() {
  const [offerExpired, setOfferExpired] = useState<boolean | null>(null);

  useEffect(() => {
    const updateOfferStatus = () => setOfferExpired(Date.now() > LAUNCH_OFFER_DEADLINE);
    updateOfferStatus();
    const timer = window.setInterval(updateOfferStatus, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-hero-line">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
          <a href="#topo" className="font-display text-2xl font-bold text-hero-foreground" aria-label="MazzTag, início">
            Mazz<span className="text-google-blue">Tag</span>
          </a>
          <Button asChild className="bg-google-blue text-primary-foreground shadow-none hover:bg-google-blue/90">
            <a href="#planos">Quero começar <ArrowRight /></a>
          </Button>
        </div>
      </header>

      <section id="topo" className="relative bg-hero pt-20 text-hero-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="mb-5 text-xs font-bold uppercase text-google-blue">Operação real · Conheça o produto</p>
          <div className="relative overflow-hidden rounded-lg border border-hero-line bg-ink shadow-product" aria-label="Player do vídeo de apresentação da MazzTag">
            <img src={placasMazzTagImage} width={1536} height={1024} alt="Placas MazzTag azul e preta" className="aspect-video w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="absolute inset-x-0 top-[34%] flex -translate-y-1/2 justify-center md:inset-0 md:grid md:translate-y-0 md:place-items-center">
              <Button type="button" size="icon" disabled aria-label="Vídeo aguardando envio" className="size-16 rounded-full bg-google-blue text-primary-foreground opacity-100 shadow-deep disabled:opacity-100 md:size-20">
                <Play className="ml-1 size-7 fill-current md:size-8" />
              </Button>
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-hero-line bg-hero/90 px-3 py-2 shadow-deep md:left-5 md:top-5">
              <QrCode className="size-4 text-google-blue" />
              <span className="text-xs font-bold">2 cores · 1 tamanho — Azul ou preta · 10x10 cm</span>
            </div>
            <div className="absolute inset-x-4 bottom-14 mx-auto max-w-3xl border-l-2 border-google-blue bg-ink/90 px-4 py-3 text-center text-sm font-medium md:bottom-20 md:text-base">
              “Veja como a MazzTag transforma uma boa experiência em uma avaliação no Google.”
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t border-hero-line bg-ink/95 px-3 py-2.5 md:px-5 md:py-3">
              <div className="mb-2 h-1 overflow-hidden rounded-full bg-ink-soft"><span className="block h-full w-0 bg-google-blue" /></div>
              <div className="flex items-center gap-2 text-hero-muted">
                <Button type="button" size="icon" variant="ghost" disabled aria-label="Reproduzir" className="size-8 text-hero-foreground disabled:opacity-60"><Play className="size-4 fill-current" /></Button>
                <Button type="button" size="icon" variant="ghost" disabled aria-label="Avançar" className="hidden size-8 text-hero-foreground disabled:opacity-60 sm:inline-flex"><SkipForward className="size-4" /></Button>
                <Button type="button" size="icon" variant="ghost" disabled aria-label="Volume" className="size-8 text-hero-foreground disabled:opacity-60"><Volume2 className="size-4" /></Button>
                <span className="text-xs tabular-nums">00:00 / --:--</span>
                <span className="ml-auto hidden items-center gap-1 text-xs sm:flex"><Clock3 className="size-3.5" /> Vídeo aguardando envio</span>
                <Button type="button" size="icon" variant="ghost" disabled aria-label="Tela cheia" className="size-8 text-hero-foreground disabled:opacity-60"><Maximize className="size-4" /></Button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-hero-line bg-hero-soft px-3 py-1.5 text-xs font-semibold uppercase">
                <Radio className="size-4 text-google-blue" /> NFC + QR Code
              </div>
            <h1 className="max-w-2xl font-display text-5xl font-bold leading-[1.03] sm:text-6xl lg:text-7xl">
              Venda tecnologia que aproxima negócios de <span className="text-google-blue">mais avaliações.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-hero-muted md:text-xl">
              Revenda placas inteligentes que levam o cliente direto à avaliação no Google — com um toque ou leitura do QR Code.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="h-12 bg-google-blue px-6 text-base text-primary-foreground hover:bg-google-blue/90">
                <a href="#simulador">Simular meu faturamento <ArrowDown /></a>
              </Button>
              <span className="flex items-center gap-2 text-sm text-hero-muted"><BadgeCheck className="size-5 text-google-blue" /> Fácil de vender. Simples de usar.</span>
            </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-hero-line bg-hero-soft p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-google-blue" />
                  <p className="text-sm leading-relaxed text-hero-muted">
                    <strong className="mb-1 block font-display text-hero-foreground">A melhor qualidade do mercado</strong>
                    Fita 3M original para fixação firme e durabilidade muito superior.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-hero-line bg-hero-soft p-4">
                <div className="flex items-start gap-3">
                  <Banknote className="mt-0.5 size-5 shrink-0 text-google-blue" />
                  <p className="text-sm leading-relaxed text-hero-muted">
                    <strong className="mb-1 block font-display text-hero-foreground">O melhor preço</strong>
                    Preço de atacado direto da fábrica, sem intermediários e com margens superiores frente aos concorrentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <WhyMazzTag />

      <ProductIn20Seconds />

      <HowItWorks />

      <RevenueSimulator />

      <section className="py-20 md:py-28" aria-labelledby="precos-title">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase text-brand-blue">O melhor preço, sem abrir mão da qualidade</p>
            <h2 id="precos-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">Quanto você paga por placa</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Quanto maior o pedido, menor o custo unitário — e maior o potencial da sua margem.</p>
          </div>
          <div className="mx-auto max-w-2xl"><PricingTable /></div>
          <p className="mt-5 text-center text-xs text-muted-foreground">Tabela informativa. A compra das placas é feita na loja após o acesso.</p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-20 md:py-28" aria-labelledby="beneficios-title">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase text-brand-blue">Você não começa sozinho</p>
            <h2 id="beneficios-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">Tudo para transformar oportunidade em resultado</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="bg-background p-7">
                <div className="mb-5 flex size-9 items-center justify-center rounded-md bg-accent text-google-blue"><Check className="size-5" strokeWidth={3} /></div>
                <h3 className="font-display text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Temporariamente removida — <SocialProof /> */}

      <section id="planos" className="scroll-mt-10 py-20 md:py-28" aria-labelledby="planos-title">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase text-brand-blue">Comece grátis</p>
            <h2 id="planos-title" className="mt-4 font-display text-4xl font-bold md:text-5xl">Seu próximo passo começa aqui</h2>
            <p className="mt-5 text-muted-foreground">Crie sua conta grátis e comece a comprar placas na loja exclusiva agora mesmo.</p>
          </div>
          {!UPGRADE_LOCKED && <LaunchOffer />}
          <div className="mx-auto mb-6 flex max-w-4xl items-start gap-3 rounded-lg border border-border bg-secondary px-5 py-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-blue" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="font-display text-foreground">Compra protegida.</strong> O acesso à loja e ao sistema é referente à plataforma MazzTag. As placas físicas são compradas separadamente dentro da loja, após o acesso ser liberado.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            <article className="relative flex flex-col rounded-lg border border-border bg-card p-7 md:p-9">
              <p className="text-sm font-bold uppercase text-brand-blue">Loja MazzTag</p>
              <div className="mt-5 min-h-20">
                <div className="flex items-end gap-2">
                  <strong className="font-display text-6xl">Grátis</strong>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Sem custo, sem cartão de crédito.</p>
              </div>
              <p className="mt-5 min-h-12 leading-relaxed text-muted-foreground">Cadastre-se e comece a comprar placas agora mesmo, sem pagar nada.</p>
              <ul className="my-8 space-y-3">
                {["Acesso à loja de placas", "Sistema de gestão", "Ativação das placas"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm"><Check className="size-5 text-google-blue" /> {item}</li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button asChild size="lg" variant="outline" className="h-12 w-full border-foreground text-base">
                  <a href={`${APP_URL}/cadastro`}>Cadastre-se grátis <ArrowRight /></a>
                </Button>
              </div>
            </article>

            <article className="relative flex flex-col rounded-lg border border-brand-blue bg-ink p-7 text-ink-foreground shadow-deep md:p-9">
              {!UPGRADE_LOCKED && (
                <span className="absolute right-5 top-5 rounded-full bg-google-blue px-3 py-1 text-xs font-bold uppercase text-primary-foreground">Recomendado</span>
              )}
              <p className="text-sm font-bold uppercase text-google-blue">Comunidade + Aulas + Suporte</p>
              <div className="mt-5 min-h-20">
                {UPGRADE_LOCKED ? (
                  <div className="flex items-center gap-2">
                    <Lock className="size-8 text-ink-muted" />
                    <strong className="font-display text-4xl">Em breve</strong>
                  </div>
                ) : (
                  <>
                    {offerExpired !== true && (
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm text-ink-muted line-through">De R$ {upgradeFullPrice}</span>
                        <span className="rounded-md bg-google-blue px-2 py-1 text-[10px] font-bold uppercase text-primary-foreground">Preço de lançamento</span>
                      </div>
                    )}
                    <div className="flex items-end gap-2">
                      <span className="mb-2 text-lg">R$</span>
                      <strong className="font-display text-6xl">
                        {(offerExpired === true ? upgradeFullPrice : upgradePrice).toFixed(2).replace(".", ",")}
                      </strong>
                      <span className="mb-2 text-sm text-ink-muted">acesso único</span>
                    </div>
                  </>
                )}
              </div>
              <p className="mt-5 min-h-12 leading-relaxed text-ink-muted">Desbloqueie a comunidade, o treinamento completo e suporte direto com a gente.</p>
              <ul className="my-8 space-y-3">
                {["Comunidade exclusiva de parceiros", "Treinamento completo", "Suporte direto"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm"><Check className="size-5 text-google-blue" /> {item}</li>
                ))}
              </ul>
              <div className="mt-auto">
                {UPGRADE_LOCKED ? (
                  <Button size="lg" disabled className="h-12 w-full bg-brand-blue text-base text-primary-foreground opacity-50">
                    <Lock /> Em breve
                  </Button>
                ) : (
                  <Button asChild size="lg" className="h-12 w-full bg-brand-blue text-base text-primary-foreground hover:bg-brand-blue/90">
                    <a href={`${APP_URL}/comprar/completo`}>Desbloquear agora <ArrowRight /></a>
                  </Button>
                )}
              </div>
            </article>
          </div>
          <div className="mx-auto mt-8 flex max-w-4xl items-start gap-3 rounded-lg border border-border bg-secondary px-5 py-4">
            <Smartphone className="mt-0.5 size-5 shrink-0 text-google-blue" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="mb-1 block font-display text-base text-foreground">Placa pronta para usar, sem complicação técnica.</strong>
              Chip NFC e QR Code já configurados na fábrica — basta inserir o link da avaliação do Google da empresa.
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Sem mensalidade. A compra de placas acontece separadamente dentro da loja.</p>
        </div>
      </section>

      <Faq />

      <footer className="border-t border-ink-border bg-ink py-12 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-10 border-b border-ink-border pb-10 md:grid-cols-3">
            <div>
              <p className="font-display text-2xl font-bold">Mazz<span className="text-google-blue">Tag</span></p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">Placas NFC e QR Code para aproximar negócios de mais avaliações no Google.</p>
            </div>
            <div>
              <p className="font-display font-bold">Contato</p>
              <div className="mt-4 space-y-3 text-sm text-ink-muted">
                <a href="mailto:mazztag@gmail.com" className="flex items-center gap-2 hover:text-hero-foreground"><Mail className="size-4 text-google-blue" /> mazztag@gmail.com</a>
                <a href="https://wa.me/5561983695386" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-hero-foreground"><MessageCircle className="size-4 text-google-blue" /> (61) 98369-5386</a>
              </div>
            </div>
            <nav aria-label="Links institucionais">
              <p className="font-display font-bold">Institucional</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-ink-muted">
                <a href={`${APP_URL}/termos-de-uso`} className="hover:text-hero-foreground">Termos de Uso</a>
                <a href={`${APP_URL}/politica-de-privacidade`} className="hover:text-hero-foreground">Política de Privacidade</a>
              </div>
            </nav>
          </div>
          <div className="flex flex-col gap-2 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 MazzTag. Todos os direitos reservados.</p>
            <p>MazzTag · Brasil</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
