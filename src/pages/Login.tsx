import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Eye, EyeOff, Lock, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend engineers will integrate Supabase auth here
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - immersive branding */}
      <div
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-teal/10 blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-teal-light/8 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-teal/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-teal/3" />
        </div>

        {/* Grid pattern overlay */}
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
          {/* Shield icon with glow */}
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-teal/20 blur-2xl rounded-full scale-150" />
            <div className="relative bg-teal/10 border border-teal/20 rounded-2xl p-5">
              <Shield className="h-12 w-12 text-teal" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-primary-foreground mb-3 leading-tight">
            Status Codes,
            <br />
            <span className="text-teal-light">Not Video Streams</span>
          </h2>
          <p className="text-primary-foreground/50 leading-relaxed text-base max-w-sm mx-auto">
            Privacy-first exam proctoring powered by on-device AI. Zero video storage. Zero cloud footage.
          </p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {["On-Device AI", "Zero Storage", "WebRTC Sync"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-teal/20 bg-teal/5 text-teal-light"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-12 lg:hidden">
            <div className="bg-teal/10 border border-teal/20 rounded-xl p-2">
              <Shield className="h-5 w-5 text-teal" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">Integrity</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Secure Login</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="mt-2 text-muted-foreground text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-teal hover:text-teal-light transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full mt-2 group">
              Sign In
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Biometric hint */}
          <button className="w-full flex items-center justify-center gap-2 h-12 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-sm font-medium text-foreground">
            <Fingerprint className="h-4 w-4 text-teal" />
            Continue with Passkey
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal hover:text-teal-light font-semibold transition-colors">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
