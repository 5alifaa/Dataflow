"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  CheckCircle,
  Columns,
  Database,
  FileXls,
  Lightning,
  Rows,
  UploadSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MARQUEE_ITEMS = [
  "Workbook intake",
  "Column review",
  "Rename before append",
  "21,373 imported rows",
  "Wide schema preview",
  "Worker parsing",
  "Image-rich rows",
  "Composed data room",
];

const PREVIEW_ROWS = [
  ["A10032", "SEA-01", "West", "2024-05-01", "Shipped"],
  ["A10033", "SEA-02", "West", "2024-05-01", "Shipped"],
  ["A10034", "DAL-01", "Central", "2024-05-01", "In Transit"],
  ["A10035", "ATL-03", "East", "2024-05-02", "Pending"],
  ["A10036", "MIA-02", "East", "2024-05-02", "Opening"],
];

const COLUMN_PILLS = ["order_id", "site", "region", "order_date", "status"];

const PALETTE = [
  ["Ivory", "#F7F3EA"],
  ["Charcoal", "#1C1917"],
  ["Stone", "#78716C"],
  ["Signal", "#2F8F6B"],
  ["Cyan", "#5FA9B8"],
  ["Amber", "#D39A35"],
];

const BENTO_CARDS = [
  {
    title: "Import workbench",
    copy: "A quiet intake surface for files, parse warnings, column choices, and the exact row impact before anything joins the dataset.",
    icon: FileXls,
    className: "lg:col-span-2 lg:row-span-2",
    kind: "workbench",
  },
  {
    title: "Identity system",
    copy: "The generated brand board is now treated as source material: ivory panels, charcoal rules, and one operational green signal.",
    icon: BracketsCurly,
    className: "lg:col-span-2",
    kind: "brand",
  },
  {
    title: "Transparent status",
    copy: "Warnings stay visible without raising the temperature of the interface.",
    icon: WarningCircle,
    className: "",
    kind: "status",
  },
  {
    title: "Column language",
    copy: "Rename decisions are made before append, where the risk is still contained.",
    icon: Columns,
    className: "",
    kind: "columns",
  },
  {
    title: "Wide tables stay composed",
    copy: "The product treats dense rows as the hero surface, supported by durable controls and measured feedback.",
    icon: Database,
    className: "lg:col-span-4 lg:row-span-2",
    kind: "stream",
  },
];

const WORKFLOW_ITEMS = [
  {
    title: "Import",
    copy: "Workbook parsing moves off the main thread, so the interface keeps its rhythm during heavy files.",
    image: "https://picsum.photos/seed/dataflow-import-ledger/1200/1500",
    icon: UploadSimple,
  },
  {
    title: "Review",
    copy: "Column choices and display names are settled in a focused room before the grid changes.",
    image: "https://picsum.photos/seed/dataflow-column-map/1200/1500",
    icon: Columns,
  },
  {
    title: "Append",
    copy: "Counts, warnings, and imported rows resolve into one table contract the team can trust.",
    image: "https://picsum.photos/seed/dataflow-table-room/1200/1500",
    icon: Rows,
  },
];

function DataFlowMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={[
        "dataflow-mark",
        inverted ? "dataflow-mark--inverted" : "",
      ].join(" ")}
      aria-hidden
    >
      <span className="dataflow-mark__lanes">
        <span />
        <span />
        <span />
      </span>
      <span className="dataflow-mark__grid">
        <span />
        <span />
        <span />
        <span />
      </span>
    </span>
  );
}

function ProductSurface() {
  return (
    <div className="brand-panel group relative overflow-hidden rounded-lg border border-stone-900/10 bg-[#f7f3ea] p-3 shadow-[0_36px_120px_rgba(28,25,23,0.18)]">
      <div className="overflow-hidden rounded-md border border-stone-800/20 bg-[#1c1917] text-[#f7f3ea]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#d8645a]" />
          <span className="size-2.5 rounded-full bg-[#d39a35]" />
          <span className="size-2.5 rounded-full bg-[#2f8f6b]" />
          <div className="ml-auto flex h-7 w-64 max-w-[48vw] items-center justify-center rounded-md border border-white/10 bg-white/[0.04] font-mono text-[10px] text-white/60">
            app.dataflow.io/import
          </div>
        </div>

        <div className="grid min-h-[470px] grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)]">
          <aside className="border-r border-white/10 bg-white/[0.03] p-3">
            <div className="mb-7 flex items-center gap-2">
              <DataFlowMark inverted />
            </div>
            {[
              ["Import", FileXls],
              ["Columns", Columns],
              ["Append", Database],
              ["Explore", Rows],
            ].map(([label, Icon], index) => {
              const IconComponent = Icon as typeof FileXls;

              return (
                <div
                  key={label as string}
                  className={[
                    "mb-2 flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] font-medium",
                    index === 0
                      ? "bg-white/10 text-white"
                      : "text-white/45 hover:bg-white/[0.06] hover:text-white/80",
                  ].join(" ")}
                >
                  <IconComponent className="size-4" weight="bold" />
                  <span className="hidden md:inline">{label as string}</span>
                </div>
              );
            })}
          </aside>

          <div className="grid bg-[#f7f3ea] text-stone-950 md:grid-cols-[0.74fr_1fr_1.65fr]">
            <section className="border-b border-stone-200 p-4 md:border-b-0 md:border-r">
              <p className="text-[10px] font-semibold uppercase text-stone-500">
                Workbooks
              </p>
              <div className="mt-5 space-y-3">
                {[
                  ["Ops_Q1.xlsx", "12,642 rows", "done"],
                  ["Delivery_May.xlsx", "8,531 rows", "active"],
                  ["Sites_Jun.xlsx", "Uploading", "loading"],
                ].map(([name, rows, state]) => (
                  <div
                    key={name}
                    className="rounded-md border border-stone-200 bg-white/70 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-xs font-semibold">{name}</p>
                      {state === "done" ? (
                        <CheckCircle
                          className="size-4 text-[#2f8f6b]"
                          weight="fill"
                        />
                      ) : (
                        <span className="size-3 rounded-full border-2 border-[#5fa9b8] border-t-transparent" />
                      )}
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-stone-500">
                      {rows}
                    </p>
                  </div>
                ))}
              </div>
              <button className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-3 text-xs font-semibold text-stone-950 transition-transform active:scale-[0.98]">
                <UploadSimple className="size-4" weight="bold" />
                Add workbook
              </button>
            </section>

            <section className="border-b border-stone-200 p-4 md:border-b-0 md:border-r">
              <p className="text-[10px] font-semibold uppercase text-stone-500">
                Select and rename
              </p>
              <div className="mt-5 space-y-3">
                {COLUMN_PILLS.map((column, index) => (
                  <div
                    key={column}
                    className="flex items-center justify-between gap-3 border-b border-stone-200 pb-3 last:border-0"
                  >
                    <span className="text-xs text-stone-700">
                      {["Order ID", "Site", "Region", "Order Date", "Status"][
                        index
                      ]}
                    </span>
                    <span className="rounded-md border border-[#2f8f6b]/20 bg-[#2f8f6b]/10 px-2 py-1 font-mono text-[10px] text-[#2f8f6b]">
                      {column}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-w-0 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase text-stone-500">
                  Preview
                </p>
                <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1 font-mono text-[10px] text-stone-600">
                  21,373 rows
                </span>
              </div>
              <div className="overflow-hidden rounded-md border border-stone-200 bg-white">
                <div className="grid grid-cols-5 border-b border-stone-200 bg-stone-50 text-[10px] font-semibold text-stone-500">
                  {COLUMN_PILLS.map((column) => (
                    <span key={column} className="truncate px-3 py-2">
                      {column}
                    </span>
                  ))}
                </div>
                {PREVIEW_ROWS.map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-5 border-b border-stone-100 text-[10px] text-stone-600 last:border-0"
                  >
                    {row.map((cell) => (
                      <span key={cell} className="truncate px-3 py-2.5">
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-stone-500">
                    <span>Importing</span>
                    <span>72%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-200">
                    <span className="progress-shimmer block h-full w-[72%] rounded-full bg-[#2f8f6b]" />
                  </div>
                </div>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#2f8f6b] px-5 text-xs font-semibold text-white transition-transform active:scale-[0.98]">
                  Append
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoContent({ kind }: { kind: string }) {
  if (kind === "workbench") {
    return (
      <div className="mt-8 overflow-hidden rounded-md border border-stone-200 bg-white/70">
        <div className="grid grid-cols-[0.8fr_1fr] border-b border-stone-200 text-xs">
          <div className="border-r border-stone-200 p-4">
            <p className="font-mono text-[10px] uppercase text-stone-500">
              Upload queue
            </p>
            <div className="mt-4 space-y-3">
              {["Ops_Q1.xlsx", "Delivery_May.xlsx", "Sites_Jun.xlsx"].map(
                (file, index) => (
                  <div key={file} className="flex items-center gap-3">
                    <span
                      className={[
                        "size-2 rounded-full",
                        index === 2 ? "bg-[#5fa9b8]" : "bg-[#2f8f6b]",
                      ].join(" ")}
                    />
                    <span className="truncate font-medium text-stone-700">
                      {file}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="p-4">
            <p className="font-mono text-[10px] uppercase text-stone-500">
              Column decisions
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {COLUMN_PILLS.map((column) => (
                <span
                  key={column}
                  className="rounded-md border border-[#2f8f6b]/20 bg-[#2f8f6b]/10 px-2.5 py-1.5 font-mono text-[10px] text-[#2f8f6b]"
                >
                  {column}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 text-[10px] text-stone-500">
          {PREVIEW_ROWS.slice(0, 3).map((row) =>
            row.map((cell) => (
              <span
                key={`${row[0]}-${cell}`}
                className="truncate border-r border-t border-stone-100 px-3 py-2 last:border-r-0"
              >
                {cell}
              </span>
            )),
          )}
        </div>
      </div>
    );
  }

  if (kind === "brand") {
    return (
      <div className="mt-7 aspect-[16/6] overflow-hidden rounded-md border border-stone-900/10 bg-stone-950">
        <Image
          src="/dataflow-brandkit.png"
          alt="DataFlow brand system board"
          width={1536}
          height={1024}
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="h-full w-full object-cover opacity-90 mix-blend-luminosity transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    );
  }

  if (kind === "status") {
    return (
      <div className="mt-8 space-y-3">
        {[
          ["Completed", "bg-[#2f8f6b]/10 text-[#2f8f6b]", CheckCircle],
          ["Warning", "bg-[#d39a35]/10 text-[#9b6b19]", WarningCircle],
          ["Importing", "bg-[#5fa9b8]/10 text-[#2b7785]", Lightning],
        ].map(([label, tone, Icon]) => {
          const IconComponent = Icon as typeof CheckCircle;

          return (
            <div
              key={label as string}
              className={`flex items-center justify-between rounded-md border border-stone-200 bg-white/70 px-3 py-2.5 ${tone as string}`}
            >
              <span className="text-xs font-semibold">{label as string}</span>
              <IconComponent className="size-4" weight="bold" />
            </div>
          );
        })}
      </div>
    );
  }

  if (kind === "columns") {
    return (
      <div className="mt-8 grid grid-cols-2 gap-2">
        {COLUMN_PILLS.map((column) => (
          <span
            key={column}
            className="rounded-md border border-stone-200 bg-white/70 px-3 py-3 font-mono text-[10px] text-stone-600"
          >
            {column}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-md border border-white/10 bg-[#1c1917] text-white">
      <div className="grid min-w-[720px] grid-cols-6 border-b border-white/10 bg-white/[0.04] font-mono text-[10px] text-white/45">
        {["order_id", "site", "region", "order_date", "status", "image"].map(
          (header) => (
            <span key={header} className="px-4 py-3">
              {header}
            </span>
          ),
        )}
      </div>
      <div className="data-stream min-w-[720px]">
        {[...PREVIEW_ROWS, ...PREVIEW_ROWS].map((row, index) => (
          <div
            key={`${row[0]}-${index}`}
            className="grid grid-cols-6 border-b border-white/10 font-mono text-[11px] text-white/70 last:border-0"
          >
            {row.map((cell) => (
              <span key={cell} className="truncate px-4 py-3">
                {cell}
              </span>
            ))}
            <span className="px-4 py-3 text-[#5fa9b8]">thumb_{index + 7}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevealText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="text-reveal-word inline-block opacity-[0.16]"
        >
          {word}
          {index < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </>
  );
}

export default function HomePage() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (reduceMotion.matches) {
        return;
      }

      const mm = gsap.matchMedia();

      gsap.from(".hero-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".bento-card", {
        y: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 78%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".motion-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 0.82, opacity: 0.45 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 92%",
              end: "bottom 24%",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".text-reveal-word").forEach((word) => {
        gsap.to(word, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".desire-section",
            start: "top 65%",
            end: "center 35%",
            scrub: true,
          },
        });
      });

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: ".desire-section",
          start: "top top+=104",
          end: "bottom bottom-=140",
          pin: ".desire-copy",
          pinSpacing: false,
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      className="relative min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#f7f3ea] text-stone-950"
    >
      <div className="pointer-events-none fixed inset-0 brand-noise" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_72%_8%,rgba(47,143,107,0.16),transparent_34%),radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.86),rgba(247,243,234,0)_58%)]" />

      <nav className="fixed inset-x-0 top-4 z-30 px-4">
        <div className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/70 bg-[#f7f3ea]/82 px-3 shadow-[0_18px_80px_rgba(28,25,23,0.1)] backdrop-blur-2xl">
          <Link
            href="/"
            className="flex w-fit items-center gap-2 rounded-full px-2 text-sm font-semibold text-stone-950"
            aria-label="DataFlow home"
          >
            <DataFlowMark />
            <span>DataFlow</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-stone-500 md:flex">
            <Link href="/import" className="transition-colors hover:text-stone-950">
              Import
            </Link>
            <Link
              href="/dummy-data"
              className="transition-colors hover:text-stone-950"
            >
              Explorer
            </Link>
          </div>
          <Link
            href="/import"
            className="justify-self-end inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1c1917] px-4 text-sm font-semibold !text-[#f7f3ea] transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
          >
            Start
            <ArrowRight className="size-4" weight="bold" />
          </Link>
        </div>
      </nav>

      <section className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] gap-10 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:items-center lg:px-8">
        <div className="relative z-10">
          <div className="hero-reveal mb-9 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            <span className="h-px w-12 bg-stone-950/30" />
            Operational data prep
          </div>
          <h1 className="hero-reveal max-w-6xl text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[0.96] tracking-normal text-stone-950">
            Messy sheets become
            <span
              className="mx-3 inline-block h-[0.5em] w-[1.32em] rounded-full bg-cover bg-center align-middle grayscale contrast-125"
              style={{
                backgroundImage:
                  "url(https://picsum.photos/seed/dataflow-ledger-light/600/280)",
              }}
              aria-hidden
            />
            composed data rooms.
          </h1>
          <p className="hero-reveal mt-8 max-w-xl text-base leading-8 text-stone-600">
            DataFlow gives operations teams a focused place to import Excel
            exports, choose the columns that matter, and append rows with clear
            counts, warnings, and trust signals.
          </p>
          <div className="hero-reveal mt-10 flex flex-wrap gap-3">
            <Link
              href="/import"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1c1917] px-6 text-sm font-semibold !text-[#f7f3ea] shadow-[0_18px_60px_rgba(28,25,23,0.18)] transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
            >
              Import workbook
              <ArrowRight className="size-4" weight="bold" />
            </Link>
            <Link
              href="/dummy-data"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/65 px-6 text-sm font-semibold text-stone-950 backdrop-blur transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
            >
              Open explorer
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="hero-reveal motion-image relative z-10 lg:-mr-28">
          <ProductSurface />
        </div>
      </section>

      <section className="relative mx-auto max-w-[1400px] px-4 py-32 sm:px-6 md:py-48 lg:px-8">
        <div className="mb-14 grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-normal text-stone-950 sm:text-6xl">
            The identity is now inside the product surface.
          </h2>
          <p className="max-w-xl text-base leading-7 text-stone-600 lg:justify-self-end">
            Ivory panels, charcoal construction lines, and one green decision
            state give the interface a recognizable system without making the
            workflow decorative.
          </p>
        </div>

        <div className="bento-grid grid grid-flow-dense grid-cols-1 gap-3 lg:auto-rows-[minmax(230px,auto)] lg:grid-cols-4">
          {BENTO_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className={[
                  "bento-card group overflow-hidden rounded-lg border border-stone-900/10 bg-white/62 p-6 shadow-[0_22px_80px_rgba(28,25,23,0.07)] backdrop-blur transition-transform duration-500 hover:-translate-y-1 md:p-7",
                  card.className,
                  card.kind === "stream" ? "bg-[#1c1917] text-white" : "",
                ].join(" ")}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={[
                          "inline-flex size-11 items-center justify-center rounded-md border",
                          card.kind === "stream"
                            ? "border-white/10 bg-white/10 text-white"
                            : "border-stone-200 bg-[#f7f3ea] text-stone-950",
                        ].join(" ")}
                      >
                        <Icon className="size-5" weight="bold" />
                      </span>
                      {card.kind === "stream" ? (
                        <DataFlowMark inverted />
                      ) : (
                        <DataFlowMark />
                      )}
                    </div>
                    <h3
                      className={[
                        "mt-7 max-w-xl text-2xl font-semibold leading-tight tracking-normal",
                        card.kind === "stream" ? "text-white" : "text-stone-950",
                      ].join(" ")}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={[
                        "mt-4 max-w-2xl text-sm leading-6",
                        card.kind === "stream" ? "text-white/58" : "text-stone-600",
                      ].join(" ")}
                    >
                      {card.copy}
                    </p>
                  </div>
                  <BentoContent kind={card.kind} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="desire-section relative mx-auto grid max-w-[1400px] gap-14 px-4 py-32 sm:px-6 md:py-48 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="desire-copy h-fit lg:pt-8">
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-normal text-stone-950 sm:text-6xl">
            <RevealText text="The workflow should feel calm when the file is not." />
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-stone-600">
            The motion follows the job: upload, inspect, append. Nothing asks
            for attention unless it changes user trust.
          </p>
        </div>

        <div className="space-y-5">
          <div className="workflow-accordion motion-image flex min-h-[560px] flex-col gap-3 lg:flex-row">
            {WORKFLOW_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative flex min-h-[280px] flex-1 overflow-hidden rounded-lg border border-stone-900/10 bg-stone-950 text-white transition-[flex] duration-700 ease-out lg:hover:flex-[1.65]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-62 grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,0.12),rgba(28,25,23,0.86))]" />
                  <div className="relative flex h-full min-h-[280px] flex-col justify-between p-6">
                    <div className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-white/10">
                      <Icon className="size-5" weight="bold" />
                    </div>
                    <div>
                      <p className="text-3xl font-semibold tracking-normal">
                        {item.title}
                      </p>
                      <p
                        className={[
                          "mt-4 max-w-sm text-sm leading-6 text-white/68",
                          index === 0 ? "lg:max-w-xs" : "",
                        ].join(" ")}
                      >
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]">
            <div className="motion-image overflow-hidden rounded-lg border border-stone-900/10 bg-white/70 p-3 shadow-[0_20px_80px_rgba(28,25,23,0.07)]">
              <Image
                src="/dataflow-brandkit.png"
                alt="DataFlow brand kit with logo, product UI, palette, typography, and system details"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 54vw"
                className="aspect-[16/9] w-full rounded-md object-cover"
              />
            </div>
            <div className="motion-image rounded-lg border border-stone-900/10 bg-[#1c1917] p-6 text-white shadow-[0_20px_80px_rgba(28,25,23,0.12)]">
              <p className="text-3xl font-semibold leading-tight tracking-normal">
                Messy sheets. Composed data.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {PALETTE.slice(0, 6).map(([name, color]) => (
                  <div key={name}>
                    <span
                      className="block h-12 rounded-md border border-white/10"
                      style={{ backgroundColor: color }}
                    />
                    <p className="mt-2 font-mono text-[10px] text-white/42">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-stone-950/10 bg-[#1c1917] py-6 text-white">
        <div className="marquee-track" aria-hidden>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-7 pr-7 text-sm font-semibold text-white/62"
            >
              {item}
              <span className="h-px w-10 bg-white/20" />
            </span>
          ))}
        </div>
      </section>

      <footer className="relative mx-auto max-w-[1400px] px-4 py-28 sm:px-6 md:py-40 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#1c1917] p-8 text-[#f7f3ea] shadow-[0_34px_130px_rgba(28,25,23,0.2)] md:p-12">
          <div className="absolute inset-0 opacity-[0.08] brand-grid" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <DataFlowMark inverted />
                <span className="text-sm font-semibold">DataFlow</span>
              </div>
              <p className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-normal sm:text-6xl">
                Give every workbook a composed first room.
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/58">
                Start with upload or inspect sample data. Both paths arrive in
                the same calm grid language.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/import"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f7f3ea] px-6 text-sm font-semibold !text-[#1c1917] transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
              >
                Import workbook
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <Link
                href="/dummy-data"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-[1px] hover:bg-white/10 active:scale-[0.98]"
              >
                View dataset
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
