"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileXls,
  Database,
  Lightning,
  Code,
  ArrowUpRight,
} from "@phosphor-icons/react";

/* ─── Marquee items ──────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "Web Worker Parsing",
  "AG Grid Virtualization",
  "TypeScript Native",
  "xlsx Ingestion",
  "JSON Route Handlers",
  "Client-side Processing",
  "Shared Dataset State",
  "Zero Config",
];

export default function HomePage() {
  /* IntersectionObserver — never window.addEventListener('scroll') */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main
      style={{
        backgroundColor: "var(--canvas)",
        color: "var(--ink)",
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      {/* ── Nav ───────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          backgroundColor: "rgba(251,251,250,0.88)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "0 32px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.125rem",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
          >
            DataFlow
          </span>

          <div className="home-nav-links">
            <Link href="/import" className="nav-link">
              Excel Import
            </Link>
            <Link href="/dummy-data" className="nav-link">
              Data Explorer
            </Link>
            <Link href="/import" className="cta-primary" style={{ padding: "7px 16px" }}>
              Get started
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "104px 32px 96px",
          position: "relative",
        }}
      >
        {/* Ambient warm glow — fixed layer, never on scroll container */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 720,
            height: 420,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(251,243,219,0.38) 0%, transparent 68%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Version badge */}
        <div
          className="reveal"
          style={{ marginBottom: 20, position: "relative", zIndex: 1 }}
        >
          <span
            className="tag"
            style={{
              backgroundColor: "var(--pale-yellow-bg)",
              color: "var(--pale-yellow-text)",
            }}
          >
            POC — v0.1
          </span>
        </div>

        {/* H1 — editorial serif, max 3 lines guaranteed by wide container + clamp */}
        <h1
          className="reveal"
          data-delay="1"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 5.5vw, 5.25rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            maxWidth: 820,
            margin: "0 0 28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Parse without limits.
          <br />
          Explore without lag.
        </h1>

        <p
          className="reveal"
          data-delay="2"
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.7,
            color: "var(--ink-3)",
            maxWidth: 480,
            margin: "0 0 40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Upload any{" "}
          <kbd
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.8125rem",
              padding: "1px 6px",
              border: "1px solid var(--border)",
              borderRadius: 4,
              background: "#f7f6f3",
              color: "var(--ink-2)",
            }}
          >
            .xlsx
          </kbd>{" "}
          file. It parses off-thread via a Web Worker, then lands in a shared
          AG Grid virtualized table — no freezes, no spinners blocking the UI.
        </p>

        <div
          className="reveal"
          data-delay="3"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link href="/import" className="cta-primary">
            Import an Excel file
            <ArrowRight size={15} weight="bold" />
          </Link>
          <Link href="/dummy-data" className="cta-ghost">
            View sample dataset
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Bento grid ────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 32px 112px",
        }}
      >
        <div
          className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 grid-flow-dense"
        >
          {/* Card A — Excel Import (large) */}
          <div
            className="bento-card"
            style={{
              gridColumn: "1 / -1",
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <span
                className="tag"
                style={{
                  backgroundColor: "var(--pale-blue-bg)",
                  color: "var(--pale-blue-text)",
                }}
              >
                <FileXls size={11} weight="bold" />
                Client workflow
              </span>
            </div>

            {/* Faux OS window */}
            <div className="os-window" style={{ flex: 1, minHeight: 200 }}>
              <div className="os-window__bar">
                <div className="os-dot" />
                <div className="os-dot" />
                <div className="os-dot" />
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: "0.75rem",
                    color: "var(--ink-3)",
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}
                >
                  import.xlsx — DataFlow
                </span>
              </div>
              <div
                style={{
                  padding: "28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    border: "1.5px dashed #c8c8c8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileXls size={24} weight="thin" style={{ color: "var(--ink-3)" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--ink-2)", fontWeight: 500 }}>
                    Drop a .xlsx file to begin
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--ink-3)", marginTop: 4 }}>
                    Parsed off-thread — main thread stays responsive
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {["Sheet1", "Revenue_Q4", "Contacts"].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: "0.75rem",
                      padding: "3px 10px",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      color: "var(--ink-3)",
                      fontFamily: "var(--font-geist-mono, monospace)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
                  Excel Import
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--ink-3)", lineHeight: 1.6 }}>
                  Rename columns, merge sheets, append rows — all in the browser.
                </p>
              </div>
              <Link href="/import" className="cta-primary" style={{ flexShrink: 0 }}>
                Open workflow
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Card C — Performance stat */}
          <div
            className="bento-card"
            style={{ padding: "28px 32px" }}
          >
            <span
              className="tag"
              style={{
                backgroundColor: "var(--pale-green-bg)",
                color: "var(--pale-green-text)",
                marginBottom: 16,
              }}
            >
              <Lightning size={11} weight="fill" />
              Performance
            </span>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "3.5rem",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--ink)",
                margin: "8px 0 6px",
              }}
            >
              10K+
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--ink-3)", lineHeight: 1.6 }}>
              rows rendered at 60fps via AG Grid row virtualization — only what
              is on screen is in the DOM.
            </p>
          </div>

          {/* Card D — TypeScript */}
          <div
            className="bento-card"
            style={{ padding: "28px 32px" }}
          >
            <span
              className="tag"
              style={{
                backgroundColor: "var(--pale-blue-bg)",
                color: "var(--pale-blue-text)",
                marginBottom: 16,
              }}
            >
              <Code size={11} weight="bold" />
              Type-safe
            </span>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2rem",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: "8px 0 6px",
              }}
            >
              Zero&nbsp;
              <br />
              lock-in.
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--ink-3)", lineHeight: 1.6 }}>
              Plain TypeScript throughout. No proprietary SDKs.
            </p>
          </div>

          {/* Card B — Server Data — dark accent card */}
          <div
            className="bento-card lg:col-span-2"
            style={{
              padding: "32px 28px",
              background: "var(--ink)",
              borderColor: "transparent",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span
                className="tag"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <Database size={11} weight="bold" />
                Route handler
              </span>
            </div>

            {/* Simulated JSON payload */}
            <div
              style={{
                flex: 1,
                borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "16px 18px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.6875rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.45)",
                overflow: "hidden",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.2)" }}>GET</span>{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>/api/dummy-data</span>
              <br />
              <br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>{`{`}</span>
              <br />
              {"  "}
              <span style={{ color: "#e1f3fe" }}>{`"rows"`}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
              <span style={{ color: "#fbf3db" }}> 10000</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>,</span>
              <br />
              {"  "}
              <span style={{ color: "#e1f3fe" }}>{`"typed"`}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
              <span style={{ color: "#edf3ec" }}> true</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>,</span>
              <br />
              {"  "}
              <span style={{ color: "#e1f3fe" }}>{`"ms"`}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
              <span style={{ color: "#fbf3db" }}> 42</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>{`}`}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: 6,
                  }}
                >
                  Server-backed data
                </p>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.65,
                  }}
                >
                  A typed Next.js Route Handler streams structured JSON directly
                  into the same virtualized grid.
                </p>
              </div>
              <Link
                href="/dummy-data"
                className="cta-ghost"
                style={{
                  flexShrink: 0,
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Explore the data
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "18px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left fade */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(to right, var(--canvas), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(to left, var(--canvas), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div className="marquee-track" aria-hidden>
          {/* Duplicate the list for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 32,
                paddingRight: 48,
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--ink-3)",
                letterSpacing: "0.01em",
                fontFamily: "var(--font-geist-mono, monospace)",
              }}
            >
              {item}
              <span style={{ color: "var(--border)", fontSize: "1rem" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "56px 32px 48px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              display: "block",
              marginBottom: 8,
            }}
          >
            DataFlow
          </span>
          <p style={{ fontSize: "0.8125rem", color: "var(--ink-3)", maxWidth: 280, lineHeight: 1.6 }}>
            A proof-of-concept for high-volume dataset import and exploration in
            Next.js.
          </p>
        </div>

        <nav style={{ display: "flex", gap: 40 }} aria-label="Footer navigation">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-2)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>
              Workflows
            </span>
            <Link href="/import" className="nav-link" style={{ fontSize: "0.8125rem" }}>
              Excel Import
            </Link>
            <Link href="/dummy-data" className="nav-link" style={{ fontSize: "0.8125rem" }}>
              Data Explorer
            </Link>
          </div>
        </nav>
      </footer>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          textAlign: "center",
          padding: "16px 32px",
          fontSize: "0.75rem",
          color: "var(--ink-3)",
        }}
      >
        DataFlow POC — built with Next.js, AG Grid, and Web Workers
      </div>
    </main>
  );
}
