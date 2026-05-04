import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { DummyDataWorkspace } from "@/components/table/dummy-data-workspace";

export default function DummyDataPage() {
  return (
    <AppShell>
      <PageHeader
        backHref="/"
        eyebrow="DataFlow POC"
        badge="API route"
        title="Server Dummy Data"
        description="Fetch a bundled JSON dataset through a typed Next.js route and render it through the same AG Grid experience used by the Excel import flow."
      />
      <DummyDataWorkspace />
    </AppShell>
  );
}
