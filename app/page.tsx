"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  Database,
  FileXls,
  Lightning,
  Rows,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MARQUEE_ITEMS = [
  "Worker parsing",
  "Virtualized rows",
  "Column review",
  "Local workbook flow",
  "Typed route handlers",
  "Image cells",
  "Wide schema ready",
  "No blocking imports",
];

const ACCORDION_ITEMS = [
  {
    title: "Import",
    copy: "Workbook parsing happens away from the main thread, so heavy files do not flatten the interface.",
    image: "https://picsum.photos/seed/import-workbench/900/1200",
  },
  {
    title: "Review",
    copy: "Column selection keeps the destructive choices out of the grid until the user confirms them.",
    image: "https://picsum.photos/seed/column-review/900/1200",
  },
  {
    title: "Explore",
    copy: "AG Grid handles wide, dense datasets with the calm rhythm of a desktop-grade tool.",
    image: "https://picsum.photos/seed/data-explorer/900/1200",
  },
];

const BENTO_CARDS = [
  {
    className: "lg:col-span-2 lg:row-span-2",
    tone: "light",
    title: "A polished workbook intake without ceremony.",
    copy: "Drag in a workbook, inspect the parsed structure, then choose exactly what enters the dataset.",
    icon: FileXls,
    image: "https://picsum.photos/seed/workbook-flow/1400/1000",
  },
  {
    className: "lg:col-span-2",
    tone: "dark",
    title: "The grid stays composed when the schema gets wide.",
    copy: "Rows, thumbnails, and typed values land in one virtualized surface built for scanning.",
    icon: Rows,
  },
  {
    className: "",
    tone: "light",
    title: "Off-thread parsing",
    copy: "The UI keeps its poise while workbooks are read in a browser worker.",
    icon: Lightning,
  },
  {
    className: "",
    tone: "light",
    title: "Typed data paths",
    copy: "The bundled API route and import flow resolve into the same grid contract.",
    icon: BracketsCurly,
  },
  {
    className: "lg:col-span-4",
    tone: "cream",
    title: "One table language for uploaded sheets and server-backed samples.",
    copy: "DataFlow keeps the product surface quiet: a few deliberate controls, clean feedback, and room for the rows to breathe.",
    icon: Database,
  },
];

export default function HomePage() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (reduceMotion.matches) {
        return;
      }

      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".bento-card", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 78%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".motion-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 0.86, opacity: 0.52 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              end: "bottom 28%",
              scrub: true,
            },
          },
        );
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: ".desire-section",
            start: "top top+=96",
            end: "bottom bottom-=160",
            pin: ".desire-copy",
            pinSpacing: false,
          });
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      className="relative min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#f7f3ea] text-stone-950"
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),rgba(247,243,234,0)_62%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] [background-image:linear-gradient(rgba(28,25,23,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,0.8)_1px,transparent_1px)] [background-size:42px_42px]" />

      <nav className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/60 bg-white/75 px-4 shadow-[0_20px_70px_rgba(28,25,23,0.08)] backdrop-blur-2xl sm:px-5">
          <Link
            href="/"
            className="font-semibold tracking-normal text-stone-950"
          >
            DataFlow
          </Link>
          <div className="hidden items-center gap-7 text-sm font-medium text-stone-500 md:flex">
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
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-stone-950 px-4 text-sm font-semibold !text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start
            <ArrowRight className="size-4" weight="bold" />
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto flex min-h-[94dvh] max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6 lg:px-8">
        <h1 className="hero-reveal max-w-6xl text-balance text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-normal text-stone-950">
          Turn messy
          <span
            className="mx-3 inline-block h-[0.56em] w-[1.25em] rounded-full bg-cover bg-center align-middle grayscale contrast-125"
            style={{
              backgroundImage: "url(https://picsum.photos/seed/ledger-detail/300/160)",
            }}
            aria-hidden
          />
          spreadsheets into composed data rooms.
        </h1>
        <p className="hero-reveal mt-8 max-w-2xl text-pretty text-lg leading-8 text-stone-600">
          A focused import and exploration workspace for Excel files, API-backed
          samples, wide schemas, and image-rich rows.
        </p>
        <div className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/import"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stone-950 px-6 text-sm font-semibold !text-white shadow-[0_18px_50px_rgba(28,25,23,0.18)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Import workbook
            <ArrowRight className="size-4" weight="bold" />
          </Link>
          <Link
            href="/dummy-data"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-6 text-sm font-semibold text-stone-950 backdrop-blur transition-colors hover:bg-white"
          >
            View dataset
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="hero-reveal motion-image mt-16 aspect-[16/7] w-full max-w-6xl overflow-hidden rounded-lg border border-white/70 bg-stone-900 shadow-[0_30px_120px_rgba(28,25,23,0.18)]">
          <div
            className="h-full w-full bg-cover bg-center opacity-90 grayscale contrast-125"
            style={{
              backgroundImage: "url(https://picsum.photos/seed/dataflow-console/1920/1080)",
            }}
          />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-44 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-normal text-stone-950 sm:text-6xl">
            Dense capability, edited down to the essentials.
          </h2>
          <p className="max-w-xl text-base leading-7 text-stone-600 lg:justify-self-end">
            The interface is deliberately quiet: only the controls needed to
            move data forward, with the table remaining the main event.
          </p>
        </div>

        <div className="bento-grid grid grid-flow-dense grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {BENTO_CARDS.map((card) => {
            const Icon = card.icon;
            const isDark = card.tone === "dark";
            const isCream = card.tone === "cream";

            return (
              <article
                key={card.title}
                className={[
                  "bento-card group overflow-hidden rounded-lg border p-6 transition-transform duration-500 hover:-translate-y-1",
                  card.className,
                  isDark
                    ? "border-stone-900 bg-stone-950 text-white"
                    : isCream
                      ? "border-[#e8dbc4] bg-[#fff8e8] text-stone-950"
                      : "border-white/70 bg-white/75 text-stone-950 shadow-[0_18px_70px_rgba(28,25,23,0.055)] backdrop-blur",
                ].join(" ")}
              >
                <div className="flex h-full min-h-56 flex-col justify-between gap-8">
                  <div className="flex items-center justify-between">
                    <span
                      className={[
                        "inline-flex size-11 items-center justify-center rounded-lg border",
                        isDark
                          ? "border-white/10 bg-white/10 text-white"
                          : "border-stone-200 bg-white text-stone-950",
                      ].join(" ")}
                    >
                      <Icon className="size-5" weight="bold" />
                    </span>
                    {card.image ? (
                      <div className="h-20 w-32 overflow-hidden rounded-full">
                        <div
                          className="h-full w-full bg-cover bg-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{ backgroundImage: `url(${card.image})` }}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <h3
                      className={[
                        "max-w-xl text-2xl font-semibold leading-tight tracking-normal",
                        isDark ? "text-white" : "text-stone-950",
                      ].join(" ")}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={[
                        "mt-4 max-w-2xl text-sm leading-6",
                        isDark ? "text-white/60" : "text-stone-600",
                      ].join(" ")}
                    >
                      {card.copy}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="desire-section relative z-10 mx-auto grid max-w-7xl gap-14 px-4 py-32 sm:px-6 md:py-48 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="desire-copy h-fit lg:pt-8">
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.04] tracking-normal text-stone-950 sm:text-6xl">
            The workflow should feel calm when the file is not.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-stone-600">
            Scroll through the product rhythm: intake, review, then exploration.
            Motion stays functional, never decorative.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {ACCORDION_ITEMS.map((item) => (
            <article
              key={item.title}
              className="motion-image group grid min-h-[360px] overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-[0_20px_80px_rgba(28,25,23,0.07)] backdrop-blur md:grid-cols-[0.7fr_1.3fr]"
            >
              <div className="flex flex-col justify-between p-7">
                <h3 className="text-3xl font-semibold tracking-normal text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-8 text-sm leading-6 text-stone-600">
                  {item.copy}
                </p>
              </div>
              <div className="min-h-72 overflow-hidden">
                <div
                  className="h-full min-h-72 w-full bg-cover bg-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-stone-950/10 bg-stone-950 py-6 text-white">
        <div className="marquee-track" aria-hidden>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-7 pr-7 text-sm font-semibold text-white/60"
            >
              {item}
              <span className="h-px w-10 bg-white/20" />
            </span>
          ))}
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40 lg:px-8">
        <div className="grid gap-10 rounded-lg bg-stone-950 p-8 text-white shadow-[0_30px_120px_rgba(28,25,23,0.18)] md:grid-cols-[1fr_auto] md:items-end md:p-12">
          <div>
            <p className="text-4xl font-semibold leading-[1.04] tracking-normal sm:text-6xl">
              Give every dataset a composed first room.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
              Start with a workbook or inspect the bundled sample route. Both
              paths meet in the same refined grid experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/import"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold !text-stone-950 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Import workbook
              <ArrowRight className="size-4" weight="bold" />
            </Link>
            <Link
              href="/dummy-data"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Open explorer
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
