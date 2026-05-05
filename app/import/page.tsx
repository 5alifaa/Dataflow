import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ExcelImportWorkspace } from "@/components/import/excel-import-workspace";

export default function ImportPage() {
  return (
    <AppShell>
      <PageHeader
        backHref="/"
        eyebrow="DataFlow"
        badge="Local parsing"
        title="Import Excel"
        description="Upload a workbook, review the detected columns, and append clean rows to the table."
      />
      <ExcelImportWorkspace />
    </AppShell>
  );
}
