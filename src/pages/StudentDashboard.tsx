import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, BookOpen, Clock, TrendingUp, Calendar, ChevronRight,
  Play, FileText, AlertCircle, CheckCircle2, User, LogOut, Bell,
  Smartphone, Monitor, BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrustScore } from "@/components/TrustScore";

// Mock data — will be replaced by Supabase queries
const mockStudent = {
  name: "Jane Doe",
  initials: "JD",
  trustScore: 94,
  examsCompleted: 12,
  upcomingExams: 3,
  streak: 5,
};

const upcomingExams = [
  { id: "e1", title: "CS101 — Data Structures Final", date: "2026-03-25T14:00:00", duration: "120 min", status: "ready" as const },
  { id: "e2", title: "MATH201 — Linear Algebra Midterm", date: "2026-03-28T10:00:00", duration: "90 min", status: "setup-required" as const },
  { id: "e3", title: "PHY101 — Mechanics Quiz 4", date: "2026-04-02T09:00:00", duration: "45 min", status: "ready" as const },
];

const recentActivity = [
  { id: "a1", exam: "CS101 — Algorithms Quiz 3", date: "2026-03-18", score: 97, status: "clear" as const },
  { id: "a2", exam: "MATH201 — Calculus Final", date: "2026-03-12", score: 88, status: "clear" as const },
  { id: "a3", exam: "ENG102 — Essay Exam", date: "2026-03-05", score: 72, status: "warning" as const },
  { id: "a4", exam: "CS101 — Algorithms Quiz 2", date: "2026-02-28", score: 95, status: "clear" as const },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const StudentDashboard = () => {
  const [notifications] = useState(2);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal" />
            <span className="font-bold text-foreground">Integrity</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted/60 transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-status-flagged text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <Link to="/profile">
              <Avatar className="h-8 w-8 border-2 border-border hover:border-teal transition-colors cursor-pointer">
                <AvatarFallback className="bg-teal/10 text-teal text-xs font-bold">
                  {mockStudent.initials}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, <span className="text-teal">{mockStudent.name.split(" ")[0]}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Here's your exam overview for today.</p>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div variants={item}>
            <Card className="border-border/60 shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-lg bg-teal/10 p-2"><TrendingUp className="h-4 w-4 text-teal" /></div>
                  <span className="text-xs text-muted-foreground font-medium">Trust Score</span>
                </div>
                <div className="text-3xl font-bold font-mono text-teal">{mockStudent.trustScore}%</div>
                <Progress value={mockStudent.trustScore} className="mt-2 h-1.5" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-border/60 shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-lg bg-status-clear/10 p-2"><CheckCircle2 className="h-4 w-4 text-status-clear" /></div>
                  <span className="text-xs text-muted-foreground font-medium">Completed</span>
                </div>
                <div className="text-3xl font-bold font-mono text-foreground">{mockStudent.examsCompleted}</div>
                <p className="text-xs text-muted-foreground mt-1">Exams finished</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-border/60 shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-lg bg-status-warning/10 p-2"><Calendar className="h-4 w-4 text-status-warning" /></div>
                  <span className="text-xs text-muted-foreground font-medium">Upcoming</span>
                </div>
                <div className="text-3xl font-bold font-mono text-foreground">{mockStudent.upcomingExams}</div>
                <p className="text-xs text-muted-foreground mt-1">Exams scheduled</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-border/60 shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-lg bg-accent/10 p-2"><BarChart3 className="h-4 w-4 text-accent" /></div>
                  <span className="text-xs text-muted-foreground font-medium">Streak</span>
                </div>
                <div className="text-3xl font-bold font-mono text-foreground">{mockStudent.streak}</div>
                <p className="text-xs text-muted-foreground mt-1">Clean exams in a row</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Exams — takes 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border/60 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-teal" />
                    Upcoming Exams
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    View All <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
                        <FileText className="h-5 w-5 text-teal-glow" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{exam.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {formatDate(exam.date)}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {formatTime(exam.date)}
                          </span>
                          <span className="text-xs text-muted-foreground">{exam.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exam.status === "setup-required" ? (
                        <Badge variant="outline" className="border-status-warning/40 text-status-warning bg-status-warning-bg text-[10px]">
                          <AlertCircle className="h-3 w-3 mr-1" /> Setup Required
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-status-clear/40 text-status-clear bg-status-clear-bg text-[10px]">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Ready
                        </Badge>
                      )}
                      <Button size="sm" variant="hero" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-3 w-3 mr-1" /> Start
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Quick Actions */}
            <Card className="border-border/60 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Link to="/terminal">
                  <Button variant="outline" className="w-full justify-start gap-3 h-11 text-sm">
                    <Monitor className="h-4 w-4 text-teal" />
                    Open Exam Terminal
                  </Button>
                </Link>
                <Link to="/sentinel">
                  <Button variant="outline" className="w-full justify-start gap-3 h-11 text-sm">
                    <Smartphone className="h-4 w-4 text-teal" />
                    Setup Sentinel Device
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" className="w-full justify-start gap-3 h-11 text-sm">
                    <User className="h-4 w-4 text-teal" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/60 shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    All <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {recentActivity.map((a) => (
                  <div key={a.id} className="flex items-center justify-between py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{a.exam}</p>
                      <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <span className="text-sm font-bold font-mono text-foreground">{a.score}%</span>
                      <div className={`h-2 w-2 rounded-full ${a.status === "clear" ? "bg-status-clear" : "bg-status-warning"}`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
