import { useState } from "react";
import { Shield, Camera, Battery, Wifi, RotateCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type Phase = "permissions" | "positioning" | "monitoring";

const Sentinel = () => {
  const [phase, setPhase] = useState<Phase>("permissions");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile-optimized nav */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-teal" />
            <span className="font-bold text-sm text-foreground">Sentinel Mode</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">SESSION: A1B2C3D4</span>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {phase === "permissions" && (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-sm text-center"
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
                <div className="inline-flex items-center justify-center rounded-full bg-teal/10 p-3 mb-4">
                  <Camera className="h-6 w-6 text-teal" />
                </div>

                <h1 className="text-xl font-bold text-card-foreground mb-2">Camera Access</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Integrity needs your camera to detect objects on your desk. 
                  <strong className="text-card-foreground"> No video is recorded or transmitted.</strong>
                </p>

                <div className="space-y-3 mb-6 text-left">
                  {[
                    { icon: Camera, text: "Camera — local AI processing only" },
                    { icon: Battery, text: "Battery monitoring for low-power alerts" },
                    { icon: Wifi, text: "Network — sends status codes (< 1kb/s)" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 text-teal shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <Button variant="hero" className="w-full" onClick={() => setPhase("positioning")}>
                  Grant Permissions
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "positioning" && (
            <motion.div
              key="positioning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-sm text-center"
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
                <div className="inline-flex items-center justify-center rounded-full bg-teal/10 p-3 mb-4">
                  <RotateCw className="h-6 w-6 text-teal" />
                </div>

                <h1 className="text-xl font-bold text-card-foreground mb-2">Position Your Phone</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Lean your phone against a mug or book for a top-down desk view.
                </p>

                {/* AR positioning guide mockup */}
                <div className="relative rounded-xl border-2 border-dashed border-teal/30 bg-muted/30 aspect-[4/3] mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-20 border-2 border-teal/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xs font-mono text-teal/60">DESK AREA</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">Align desk within the frame</span>
                    </div>
                  </div>
                  {/* Scan line animation */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent animate-scan-line" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <MiniCheck label="Camera" ok />
                  <MiniCheck label="Angle" ok={false} />
                  <MiniCheck label="Light" ok />
                </div>

                <Button variant="hero" className="w-full" onClick={() => setPhase("monitoring")}>
                  Confirm Position
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "monitoring" && (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-sm text-center"
            >
              <div className="rounded-2xl border border-status-clear/30 bg-card p-6 shadow-elevated">
                <div className="inline-flex items-center justify-center rounded-full bg-status-clear-bg p-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-status-clear" />
                </div>

                <h1 className="text-xl font-bold text-card-foreground mb-2">Monitoring Active</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Keep this screen open. Do not move the phone.
                </p>

                <div className="rounded-xl border border-border bg-muted/30 p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-muted-foreground">STATUS</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-status-clear animate-pulse-status" />
                      <span className="text-xs font-medium text-status-clear">CLEAR</span>
                    </span>
                  </div>

                  <div className="space-y-2 text-left">
                    {[
                      { label: "Objects Detected", value: "0 unauthorized" },
                      { label: "Heartbeat", value: "105ms" },
                      { label: "Battery", value: "85%" },
                      { label: "Frame Rate", value: "12 fps" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-mono text-card-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground">
                  All AI processing happens locally on this device.
                  No video data leaves your phone.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MiniCheck = ({ label, ok }: { label: string; ok: boolean }) => (
  <div className="rounded-lg border border-border bg-muted/30 p-2 text-center">
    <div className={`text-sm font-bold ${ok ? "text-status-clear" : "text-status-warning"}`}>
      {ok ? "✓" : "…"}
    </div>
    <div className="text-[10px] text-muted-foreground">{label}</div>
  </div>
);

export default Sentinel;
