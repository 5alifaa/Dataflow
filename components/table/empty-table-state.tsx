import { Database, Rows } from "@phosphor-icons/react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyTableStateProps {
  title: string;
  description: string;
}

export function EmptyTableState({ title, description }: EmptyTableStateProps) {
  return (
    <Card className="border-dashed bg-[#f9f9f8]">
      <CardContent className="flex min-h-80 flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="relative flex size-16 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-500">
          <Rows className="absolute -right-2 -top-2 size-7 rounded-md border border-stone-200 bg-[#fbf3db] p-1 text-[#956400]" weight="bold" />
          <Database className="size-8" weight="duotone" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
          <p className="max-w-lg text-sm leading-6 text-stone-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
