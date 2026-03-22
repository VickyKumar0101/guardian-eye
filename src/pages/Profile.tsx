import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, GraduationCap, UserCog, Camera, LogOut, ChevronRight, Bell, Lock, Palette, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Mock user — will be replaced by Supabase auth context
const mockUser = {
  name: "Jane Doe",
  email: "jane@university.edu",
  role: "student" as "student" | "admin",
  avatar: "",
  joinedAt: "2025-09-01",
  examsCompleted: 12,
  avgTrustScore: 94,
};

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    // TODO: Backend engineers will integrate Supabase profile update here
    setUser((prev) => ({ ...prev, name, email }));
    setEditing(false);
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal" />
            <span className="font-bold text-foreground">Integrity</span>
          </Link>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive gap-2">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </nav>

      <div className="container max-w-2xl py-10 space-y-8">
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden border-border/60">
            {/* Banner */}
            <div className="h-28 relative" style={{ background: "var(--gradient-hero)" }}>
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `linear-gradient(hsl(var(--teal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--teal)) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }} />
            </div>

            <CardContent className="relative pt-0 pb-6 px-6">
              {/* Avatar */}
              <div className="relative -mt-14 mb-4 w-fit">
                <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-teal/10 text-teal text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-teal text-accent-foreground rounded-full p-1.5 shadow-md hover:bg-teal-light transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isAdmin
                        ? "bg-secondary/10 text-secondary"
                        : "bg-teal/10 text-teal"
                    }`}>
                      {isAdmin ? <UserCog className="h-3 w-3" /> : <GraduationCap className="h-3 w-3" />}
                      {isAdmin ? "Administrator" : "Student"}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Joined {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                </div>
                <Button
                  variant={editing ? "hero" : "outline"}
                  size="sm"
                  onClick={editing ? handleSave : () => setEditing(true)}
                >
                  {editing ? "Save" : "Edit"}
                </Button>
              </div>

              {/* Stats row */}
              {!isAdmin && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{user.examsCompleted}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Exams Completed</div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
                    <div className="text-2xl font-bold text-teal">{user.avgTrustScore}%</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Avg Trust Score</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile fields */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Personal Information</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  {editing ? (
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 bg-muted/50 border-border/60 focus:bg-card" />
                  ) : (
                    <p className="text-foreground font-medium">{user.name}</p>
                  )}
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                  {editing ? (
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 bg-muted/50 border-border/60 focus:bg-card" />
                  ) : (
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  )}
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</Label>
                  <p className="text-foreground font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-1">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Settings</h2>

              <SettingsRow icon={Bell} label="Notifications" description="Email alerts for exam events">
                <Switch />
              </SettingsRow>
              <SettingsRow icon={Lock} label="Change Password" description="Update your account password">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </SettingsRow>
              <SettingsRow icon={Palette} label="Appearance" description="Dark mode & accessibility">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </SettingsRow>
              <SettingsRow icon={HelpCircle} label="Help & Support" description="FAQ and contact support">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </SettingsRow>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-destructive/20">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-destructive mb-3">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data.
              </p>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const SettingsRow = ({
  icon: Icon,
  label,
  description,
  children,
}: {
  icon: any;
  label: string;
  description: string;
  children: React.ReactNode;
}) => (
  <button className="w-full flex items-center justify-between py-3 px-1 rounded-lg hover:bg-muted/40 transition-colors group text-left">
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-muted/60 p-2 group-hover:bg-muted transition-colors">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
    {children}
  </button>
);

export default Profile;
