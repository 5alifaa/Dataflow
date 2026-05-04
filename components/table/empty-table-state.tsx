import { DatabaseZap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyTableStateProps {
  title: string;
  description: string;
}

export function EmptyTableState({ title, description }: EmptyTableStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-2xl bg-sky-100 p-4 text-sky-700">
          <DatabaseZap className="size-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
          <p className="max-w-lg text-sm leading-6 text-stone-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
