import Link from "next/link";
import { ArrowRight, Database, FileSpreadsheet } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const destinations = [
  {
    href: "/import",
    title: "Excel Import",
    description:
      "Upload .xlsx or .xls files, parse them in a Web Worker, rename columns, and append results into the shared grid.",
    icon: FileSpreadsheet,
    eyebrow: "Client workflow",
  },
  {
    href: "/dummy-data",
    title: "Server Dummy Data",
    description:
      "Fetch a JSON-backed dataset from a typed Next.js API route and explore it through the same virtualized table.",
    icon: Database,
    eyebrow: "Route handler",
  },
];

export default function HomePage() {
  return (
    <AppShell className="justify-center">
      <PageHeader
        eyebrow="DataFlow"
        badge="POC"
        title="High-volume dataset import and exploration"
        description="Choose a workflow to validate Web Worker-based Excel parsing, server-backed sample data, and a reusable AG Grid experience tuned for large datasets."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        {destinations.map((destination) => {
          const Icon = destination.icon;

          return (
            <Card
              key={destination.href}
              className="group overflow-hidden border-stone-200/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(248,250,252,0.96)_100%)]"
            >
              <CardHeader className="gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    {destination.eyebrow}
                  </span>
                  <div className="rounded-2xl bg-sky-100 p-3 text-sky-700 transition-transform group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle>{destination.title}</CardTitle>
                  <CardDescription className="text-sm leading-7">
                    {destination.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="w-full justify-between">
                  <Link href={destination.href}>
                    Open workflow
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </AppShell>
  );
}
