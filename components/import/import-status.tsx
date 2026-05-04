import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ImportStatusState } from "@/lib/types";

interface ImportStatusProps {
  status: ImportStatusState;
}

export function ImportStatus({ status }: ImportStatusProps) {
  return (
    <Alert tone={status.tone}>
      <AlertTitle>{status.title}</AlertTitle>
      <AlertDescription>{status.description}</AlertDescription>
    </Alert>
  );
}
