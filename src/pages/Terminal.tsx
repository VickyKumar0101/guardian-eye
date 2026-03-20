import { useState, useEffect } from "react";
import { Shield, QrCode, Smartphone, CheckCircle2, Monitor, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

type Phase = "pairing" | "ready" | "exam";

const Terminal = () => {
  const [phase, setPhase] = useState<Phase>("pairing");
  const [sessionId] = useState(() => crypto.randomUUID().slice(0, 8).toUpperCase());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (phase !== "exam") return;
    const interval = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal" />
            <span className="font-bold text-foreground">Integrity</span>
            <span className="text-xs font-mono text-muted-foreground ml-2">Exam Terminal</span>
          </Link>
          {phase === "exam" && (
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatTime(timeElapsed)}
            </div>
          )}
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {phase === "pairing" && (
            <motion.div
              key="pairing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full text-center"
            >
              <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
                <div className="inline-flex items-center justify-center rounded-full bg-teal/10 p-3 mb-6">
                  <QrCode className="h-6 w-6 text-teal" />
                </div>

                <h1 className="text-2xl font-bold text-card-foreground mb-2">Pair Your Sentinel</h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Scan this QR code with your phone to activate the Sentinel camera.
                </p>

                <div className="inline-block p-4 bg-card rounded-xl border border-border shadow-card">
                  <QRCodeSVG
                    value={`integrity://pair/${sessionId}`}
                    size={200}
                    bgColor="transparent"
                    fgColor="hsl(220, 40%, 10%)"
                    level="M"
                  />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
                  <span>Session:</span>
                  <code className="bg-muted px-2 py-0.5 rounded">{sessionId}</code>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4 text-teal" />
                    <span>No app installation required — works in your browser</span>
                  </div>
                </div>

                <Button variant="hero" className="mt-6 w-full" onClick={() => setPhase("ready")}>
                  Simulate Pairing
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full text-center"
            >
              <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
                <div className="inline-flex items-center justify-center rounded-full bg-status-clear-bg p-3 mb-6">
                  <CheckCircle2 className="h-6 w-6 text-status-clear" />
                </div>

                <h1 className="text-2xl font-bold text-card-foreground mb-2">Sentinel Connected</h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Your phone is paired and monitoring. Position it against a mug for a desk-level view.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <MiniStat label="Camera" value="✓" ok />
                  <MiniStat label="Battery" value="85%" ok />
                  <MiniStat label="Gyro" value="✓" ok />
                </div>

                <div className="rounded-lg bg-muted/50 border border-border p-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 text-teal" />
                    <span>Exam: <strong className="text-card-foreground">CS101 — Final Exam</strong></span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Duration: 120 minutes • 50 questions</p>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={() => setPhase("exam")}>
                  <Monitor className="h-4 w-4 mr-2" />
                  Begin Exam
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "exam" && (
            <motion.div
              key="exam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl w-full"
            >
              <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 py-3 bg-muted/30 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-status-clear animate-pulse-status" />
                    <span className="text-xs font-medium text-status-clear">All systems clear</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span>Sentinel: 85%</span>
                    <span>Heartbeat: 105ms</span>
                  </div>
                </div>

                {/* Exam content */}
                <div className="p-8">
                  <div className="mb-6">
                    <span className="text-xs font-mono text-teal">Question 1 of 50</span>
                    <div className="h-1 bg-muted rounded-full mt-2">
                      <div className="h-full w-[2%] bg-teal rounded-full transition-all" />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-card-foreground mb-4">
                    What is the time complexity of binary search on a sorted array of n elements?
                  </h2>

                  <div className="space-y-3">
                    {["O(n)", "O(log n)", "O(n log n)", "O(1)"].map((opt, i) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:border-teal/40 hover:bg-teal/5 transition-colors"
                      >
                        <input type="radio" name="q1" className="accent-teal" />
                        <span className="text-sm text-card-foreground">{String.fromCharCode(65 + i)}. {opt}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button variant="hero">Next Question →</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MiniStat = ({ label, value, ok }: { label: string; value: string; ok: boolean }) => (
  <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
    <div className={`text-lg font-bold font-mono ${ok ? "text-status-clear" : "text-status-flagged"}`}>{value}</div>
    <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
  </div>
);

export default Terminal;
