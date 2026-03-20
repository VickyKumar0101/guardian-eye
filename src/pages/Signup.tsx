import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Eye, EyeOff, GraduationCap, UserCog } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - branding */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-teal-light blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md px-12 text-center"
        >
          <Shield className="h-16 w-16 text-teal mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Join <span className="text-teal-light">Integrity</span>
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Ethical exam proctoring that respects your privacy. Get started in under a minute.
          </p>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Shield className="h-6 w-6 text-teal" />
            <span className="text-lg font-bold text-foreground">Integrity</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Create account</h1>
            <p className="mt-2 text-muted-foreground">Get started with Integrity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div className="space-y-2">
              <Label>I am a</Label>
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-12 pr-10"
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

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Create Account
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-teal hover:text-teal-light font-medium transition-colors">
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
    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
      selected
        ? "border-teal bg-teal/5 text-foreground shadow-glow"
        : "border-border bg-card text-muted-foreground hover:border-border/80"
    }`}
  >
    <Icon className={`h-6 w-6 ${selected ? "text-teal" : ""}`} />
    <div className="text-center">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </button>
);

export default Signup;
