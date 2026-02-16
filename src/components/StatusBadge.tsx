import { cn } from "@/lib/utils";
import type { OSStatus } from "@/lib/mock-data";

const statusConfig: Record<OSStatus, { className: string }> = {
  Scheduled: { className: "bg-info/10 text-info border-info/20" },
  "In Progress": { className: "bg-warning/10 text-warning border-warning/20" },
  Completed: { className: "bg-success/10 text-success border-success/20" },
  Canceled: { className: "bg-destructive/10 text-destructive border-destructive/20" },
  "No-Show": { className: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({ status }: { status: OSStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className
      )}
    >
      {status}
    </span>
  );
}
