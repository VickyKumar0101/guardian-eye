import { Battery, BatteryLow, WifiOff, Wifi, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudentSession } from "@/lib/mock-data";
import { StatusBadge } from "./StatusBadge";
import { TrustScore } from "./TrustScore";

export const StudentCard = ({ student }: { student: StudentSession }) => {
  const borderColor = student.status === "flagged"
    ? "border-status-flagged/30"
    : student.status === "warning"
    ? "border-status-warning/30"
    : "border-border";

  return (
    <div className={cn(
      "rounded-xl border bg-card p-4 shadow-card hover:shadow-elevated transition-all duration-300",
      borderColor,
      student.status === "flagged" && "ring-1 ring-status-flagged/20"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm text-card-foreground">{student.name}</h3>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">{student.id}</p>
        </div>
        <StatusBadge status={student.status} pulse={student.status === "flagged"} />
      </div>

      <TrustScore score={student.trustScore} />

      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        {/* Sentinel */}
        <div className="flex items-center gap-1">
          {student.sentinelConnected ? (
            <Wifi className="h-3 w-3 text-status-clear" />
          ) : (
            <WifiOff className="h-3 w-3 text-status-flagged" />
          )}
          <span>{student.sentinelConnected ? `${student.heartbeatMs}ms` : "Lost"}</span>
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1">
          {student.sentinelBattery > 15 ? (
            <Battery className="h-3 w-3" />
          ) : (
            <BatteryLow className="h-3 w-3 text-status-warning" />
          )}
          <span>{student.sentinelBattery}%</span>
        </div>

        {/* Gaze */}
        <div className="flex items-center gap-1">
          {student.gazeStatus === "centered" ? (
            <Eye className="h-3 w-3 text-status-clear" />
          ) : (
            <EyeOff className="h-3 w-3 text-status-warning" />
          )}
          <span className="capitalize">{student.gazeStatus}</span>
        </div>
      </div>

      {student.flags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {student.flags.map((flag) => (
            <span key={flag} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              {flag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
