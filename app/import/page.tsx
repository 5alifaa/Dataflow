import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ExcelImportWorkspace } from "@/components/import/excel-import-workspace";

export default function ImportPage() {
  return (
    <AppShell>
      <PageHeader
        backHref="/"
        title="Import workbooks with intent."
        description="Upload a workbook, review the detected columns, and append clean rows only after the structure is right."
      />
      <ExcelImportWorkspace />
    </AppShell>
  );
}
