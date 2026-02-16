import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowLeftRight } from "lucide-react";
import type { ServiceType } from "@/lib/mock-data";

const typeConfig: Record<ServiceType, { icon: typeof ArrowUp; className: string }> = {
  Embarkation: { icon: ArrowUp, className: "bg-success/10 text-success" },
  Disembarkation: { icon: ArrowDown, className: "bg-info/10 text-info" },
  Transfer: { icon: ArrowLeftRight, className: "bg-accent/10 text-accent" },
};

export function ServiceTypeBadge({ type }: { type: ServiceType }) {
  const config = typeConfig[type];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium", config.className)}>
      <Icon className="w-3 h-3" />
      {type}
    </span>
  );
}
