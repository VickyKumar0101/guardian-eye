import { useState } from "react";
import { Shield, Users, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockStudents, type StudentStatus } from "@/lib/mock-data";
import { StudentCard } from "@/components/StudentCard";
import { Button } from "@/components/ui/button";

type Filter = "all" | StudentStatus;

const Dashboard = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? mockStudents : mockStudents.filter((s) => s.status === filter);
  const counts = {
    all: mockStudents.length,
    clear: mockStudents.filter((s) => s.status === "clear").length,
    warning: mockStudents.filter((s) => s.status === "warning").length,
    flagged: mockStudents.filter((s) => s.status === "flagged").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal" />
            <span className="font-bold text-foreground">Integrity</span>
            <span className="text-xs font-mono text-muted-foreground ml-2">Proctor Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">CS101 — Final Exam</span>
            <span className="h-2 w-2 rounded-full bg-status-clear animate-pulse-status" />
            <span className="text-xs text-status-clear font-medium">Live</span>
          </div>
        </div>
      </nav>

      <div className="container py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total" value={counts.all} />
          <StatCard icon={CheckCircle2} label="Clear" value={counts.clear} color="text-status-clear" />
          <StatCard icon={AlertTriangle} label="Warning" value={counts.warning} color="text-status-warning" />
          <StatCard icon={XCircle} label="Flagged" value={counts.flagged} color="text-status-flagged" />
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(["all", "clear", "warning", "flagged"] as Filter[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f} ({counts[f]})
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <StudentCard student={student} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color?: string }) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-card">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`h-4 w-4 ${color || "text-muted-foreground"}`} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <span className={`text-2xl font-bold font-mono ${color || "text-card-foreground"}`}>{value}</span>
  </div>
);

export default Dashboard;
