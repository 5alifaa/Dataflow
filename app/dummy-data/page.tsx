import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { DummyDataWorkspace } from "@/components/table/dummy-data-workspace";

export default function DummyDataPage() {
  return (
    <AppShell>
      <PageHeader
        backHref="/"
        title="Explore the sample dataset."
        description="Fetch bundled JSON through a typed route and inspect it in the same grid used by the workbook import flow."
      />
      <DummyDataWorkspace />
    </AppShell>
  );
}
