import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Eye, EyeOff, GraduationCap, UserCog, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "student" | "admin";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend engineers will integrate Supabase auth here
    console.log("Signup submitted:", { name, email, password, role });
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Good", "Strong"];
  const strengthColors = ["", "bg-destructive", "bg-status-warning", "bg-status-clear"];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - branding */}
      <div
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-teal/10 blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-teal-light/8 blur-[80px] animate-pulse" style={{ animationDelay: "1.2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-teal/5" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--teal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--teal)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-lg px-16 text-center"
        >
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-teal/20 blur-2xl rounded-full scale-150" />
            <div className="relative bg-teal/10 border border-teal/20 rounded-2xl p-5">
              <Shield className="h-12 w-12 text-teal" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-primary-foreground mb-3 leading-tight">
            Join{" "}
            <span className="text-teal-light">Integrity</span>
          </h2>
          <p className="text-primary-foreground/50 leading-relaxed text-base max-w-sm mx-auto">
            Ethical exam proctoring that respects your privacy. Get started in under a minute.
          </p>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 space-y-3 text-left max-w-xs mx-auto"
          >
            {[
              "No video leaves your device",
              "AI runs locally in your browser",
              "Works on any modern smartphone",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                <span className="text-sm text-primary-foreground/60">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[400px] py-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-12 lg:hidden">
            <div className="bg-teal/10 border border-teal/20 rounded-xl p-2">
              <Shield className="h-5 w-5 text-teal" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">Integrity</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Create account</h1>
            <p className="mt-2 text-muted-foreground text-sm">Get started with Integrity in seconds</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div className="space-y-2.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <RoleOption
                  icon={GraduationCap}
                  label="Student"
                  description="Taking exams"
                  selected={role === "student"}
                  onClick={() => setRole("student")}
                />
                <RoleOption
                  icon={UserCog}
                  label="Admin"
                  description="Managing exams"
                  selected={role === "admin"}
                  onClick={() => setRole("admin")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-muted/50 border-border/60 focus:bg-card transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-muted/50 border-border/60 focus:bg-card transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-12 bg-muted/50 border-border/60 focus:bg-card transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <div className="flex-1 flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            passwordStrength >= level ? strengthColors[passwordStrength] : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{strengthLabels[passwordStrength]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full mt-2 group">
              Create Account
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>

            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              By signing up, you agree to our{" "}
              <button type="button" className="text-teal hover:text-teal-light transition-colors underline underline-offset-2">
                Terms
              </button>{" "}
              and{" "}
              <button type="button" className="text-teal hover:text-teal-light transition-colors underline underline-offset-2">
                Privacy Policy
              </button>
            </p>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-teal hover:text-teal-light font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const RoleOption = ({
  icon: Icon,
  label,
  description,
  selected,
  onClick,
}: {
  icon: any;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
      selected
        ? "border-teal bg-teal/5 text-foreground shadow-glow"
        : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:bg-muted/50"
    }`}
  >
    {selected && (
      <motion.div
        layoutId="role-check"
        className="absolute top-2 right-2"
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <CheckCircle2 className="h-4 w-4 text-teal" />
      </motion.div>
    )}
    <Icon className={`h-6 w-6 transition-colors ${selected ? "text-teal" : ""}`} />
    <div className="text-center">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </button>
);

export default Signup;
