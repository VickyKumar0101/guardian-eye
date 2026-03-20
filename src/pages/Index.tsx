import { motion } from "framer-motion";
import { Shield, Eye, Wifi, Lock, Smartphone, Monitor, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Eye,
    title: "Status Codes, Not Video",
    description: "Only lightweight JSON flags are transmitted. Zero video storage, zero cloud footage.",
  },
  {
    icon: Smartphone,
    title: "Dual-Device Architecture",
    description: "Phone as Sentinel monitors the desk. Laptop handles the exam. Two angles, one privacy promise.",
  },
  {
    icon: Lock,
    title: "On-Device AI",
    description: "TensorFlow.js runs entirely in the browser. No frames leave your device — ever.",
  },
  {
    icon: Wifi,
    title: "< 10kbps Per Student",
    description: "Text-only status codes mean hundreds of students on minimal bandwidth.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-teal" />
            <span className="text-lg font-bold text-foreground">Integrity</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Proctor Dashboard</Button>
            </Link>
            <Link to="/terminal">
              <Button variant="hero" size="sm">Start Exam</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-[0.03]" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-8">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse-status" />
              <span className="text-sm font-medium text-teal">Privacy-First Proctoring</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              Status Codes,{" "}
              <span className="text-gradient-teal">Not Video Streams</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Integrity uses your phone as a local AI sentinel. Zero video storage.
              Zero cloud footage. Just honest exams.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/terminal">
                <Button variant="hero" size="xl">
                  Launch Exam Terminal
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="hero-outline" size="xl">
                  Proctor Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <DeviceCard
                  icon={<Monitor className="h-8 w-8" />}
                  label="Exam Terminal"
                  desc="Browser lock + gaze tracking"
                  status="Laptop"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase">WebSocket</div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
                  <code className="text-xs font-mono text-teal bg-teal/5 px-3 py-1 rounded-full">
                    {"{ status: 'CLEAR' }"}
                  </code>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
                  <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase">JSON only</div>
                </div>
                <DeviceCard
                  icon={<Smartphone className="h-8 w-8" />}
                  label="Sentinel"
                  desc="Object detection on-device"
                  status="Phone"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Built on Zero-Knowledge Principles
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              The proctor knows <em>if</em> cheating happens — never <em>sees</em> your room.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-teal/10 p-2.5 text-teal">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-border/50 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "Scan QR Code", desc: "Open the Sentinel on your phone — no app install needed." },
              { step: "02", title: "Position Your Phone", desc: "Lean it against a mug for a desk-level view. The AR guide helps." },
              { step: "03", title: "Take Your Exam", desc: "AI runs locally on both devices. Only status codes reach the proctor." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-6"
              >
                <span className="text-3xl font-bold font-mono text-teal/30">{s.step}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-teal" />
            <span>Integrity v1.0</span>
          </div>
          <span>Privacy-first proctoring</span>
        </div>
      </footer>
    </div>
  );
};

const DeviceCard = ({ icon, label, desc, status }: { icon: React.ReactNode; label: string; desc: string; status: string }) => (
  <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/30">
    <div className="text-teal">{icon}</div>
    <div>
      <div className="font-semibold text-foreground text-sm">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
    </div>
    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{status}</span>
  </div>
);

export default Index;
