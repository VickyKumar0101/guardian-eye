import { cn } from "@/lib/utils";
import type { StudentStatus } from "@/lib/mock-data";

const statusConfig: Record<StudentStatus, { label: string; dot: string; bg: string; text: string }> = {
  clear: { label: "Clear", dot: "bg-status-clear", bg: "bg-status-clear-bg", text: "text-status-clear" },
  warning: { label: "Warning", dot: "bg-status-warning", bg: "bg-status-warning-bg", text: "text-status-warning" },
  flagged: { label: "Flagged", dot: "bg-status-flagged", bg: "bg-status-flagged-bg", text: "text-status-flagged" },
};

export const StatusBadge = ({ status, pulse = false }: { status: StudentStatus; pulse?: boolean }) => {
  const c = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", c.bg, c.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot, pulse && "animate-pulse-status")} />
      {c.label}
    </span>
  );
};
