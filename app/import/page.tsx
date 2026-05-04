import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ExcelImportWorkspace } from "@/components/import/excel-import-workspace";

export default function ImportPage() {
  return (
    <AppShell>
      <PageHeader
        backHref="/"
        eyebrow="DataFlow POC"
        badge="Worker parsing"
        title="Excel Import Workflow"
        description="Parse Excel files off the main thread, choose the columns that matter, rename the headers, and append the results into one large virtualized table."
      />
      <ExcelImportWorkspace />
    </AppShell>
  );
}
