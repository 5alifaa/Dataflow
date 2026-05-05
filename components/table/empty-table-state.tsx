import { Database } from "@phosphor-icons/react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyTableStateProps {
  title: string;
  description: string;
}

export function EmptyTableState({ title, description }: EmptyTableStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-72 flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-lg border border-stone-200 bg-white/70 text-stone-500">
          <Database className="size-7" weight="regular" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
          <p className="max-w-lg text-sm leading-6 text-stone-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
