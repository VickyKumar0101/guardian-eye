import { cn } from "@/lib/utils";

export const TrustScore = ({ score }: { score: number }) => {
  const color = score >= 80 ? "text-status-clear" : score >= 50 ? "text-status-warning" : "text-status-flagged";
  const bg = score >= 80 ? "bg-status-clear" : score >= 50 ? "bg-status-warning" : "bg-status-flagged";

  return (
    <div className="flex items-center gap-2">
      <span className={cn("text-2xl font-bold font-mono tabular-nums", color)}>{score}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-500", bg)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};
