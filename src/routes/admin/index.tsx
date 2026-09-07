import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  CalendarDays,
  Eye,
  EyeOff,
  Inbox,
  Loader2,
  LogOut,
  MailOpen,
  Megaphone,
  Newspaper,
  ShieldAlert,
  Trash2,
  Sliders,
  Save,
  RotateCcw,
  Sparkles,
  Award,
  Users,
  Building,
  Phone,
  Layers,
  Microscope,
  MessageSquare,
  Globe,
  GraduationCap,
  Plus,
  UserPlus,
  BookOpen,
  FileCheck,
  FileText,
  IndianRupee,
  Image as ImageIcon,
  CheckCircle2,
  Search,
  Edit3,
  Filter,
  Check,
  X,
  ExternalLink,
  PlusCircle,
  Percent,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Download,
  LayoutDashboard,
  Menu,
  BarChart3,
  TrendingUp,
  FolderPlus,
  Settings,
  ShieldCheck,
  HelpCircle,
  FolderKanban,
  FileSpreadsheet,
  Upload,
  Camera,
  UserCheck,
  RefreshCw,
  FileDown,
  Lock,
  Key,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  useSiteContent,
  DEFAULT_SITE_CONTENT,
  SiteContent,
  FacultyMember,
  StudentRecord,
  StudentResultRecord,
  ExamSubjectScore,
} from "@/hooks/useSiteContent";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Panel | GSSS Sangla" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const inputCls =
  "mt-1 w-full rounded-xl border border-input bg-card px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy shadow-sm transition-all";

type Tab =
  | "dashboard"
  | "students"
  | "results"
  | "content"
  | "enquiries"
  | "messages"
  | "notices"
  | "news"
  | "events";

interface TabItem {
  id: Tab;
  label: string;
  icon: any;
  category: "MAIN" | "ERP" | "COMMUNICATIONS" | "CMS & BULLETINS";
  badge?: string;
}

const TABS: TabItem[] = [
  { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard, category: "MAIN" },
  { id: "students", label: "Students (ERP)", icon: Users, category: "ERP" },
  { id: "results", label: "Exam Marksheets", icon: Award, category: "ERP" },
  { id: "content", label: "Site CMS Editor", icon: Sliders, category: "CMS & BULLETINS" },
  { id: "enquiries", label: "Admissions CRM", icon: Inbox, category: "COMMUNICATIONS" },
  { id: "messages", label: "Messages & Inquiries", icon: MailOpen, category: "COMMUNICATIONS" },
  { id: "notices", label: "Notice Board", icon: Bell, category: "CMS & BULLETINS" },
  { id: "news", label: "News & Media", icon: Newspaper, category: "CMS & BULLETINS" },
  { id: "events", label: "Events Calendar", icon: CalendarDays, category: "CMS & BULLETINS" },
];

function SiteContentEditor() {
  const { content, updateContent, resetContent } = useSiteContent();
  const [formState, setFormState] = useState<SiteContent>(content);
  const [activeSection, setActiveSection] = useState<
    | "brand"
    | "hero"
    | "stats"
    | "principal"
    | "dignitaries"
    | "faculty"
    | "about"
    | "admissions"
    | "infra"
    | "gallery"
    | "fees"
    | "policies"
    | "circulars"
    | "disclosure"
    | "features"
    | "labs"
    | "testimonials"
    | "ticker"
    | "contact"
  >("brand");

  const [newFaculty, setNewFaculty] = useState<Omit<FacultyMember, "id">>({
    name: "",
    role: "Lecturer (PGT)",
    dept: "Science",
    subject: "",
    qual: "",
    exp: "",
    imageUrl: "",
  });
  const [showAddFaculty, setShowAddFaculty] = useState(false);

  useEffect(() => {
    setFormState(content);
  }, [content]);

  const handleChange = (key: keyof SiteContent, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleArrayChange = (arrayKey: keyof SiteContent, index: number, field: string, value: string) => {
    setFormState((prev) => {
      const arr = [...((prev[arrayKey] as any[]) || [])];
      arr[index] = { ...arr[index], [field]: value };
      return {
        ...prev,
        [arrayKey]: arr,
      };
    });
  };

  const handleStringArrayChange = (arrayKey: keyof SiteContent, index: number, value: string) => {
    setFormState((prev) => {
      const arr = [...((prev[arrayKey] as string[]) || [])];
      arr[index] = value;
      return {
        ...prev,
        [arrayKey]: arr,
      };
    });
  };

  const handleFacultyChange = (index: number, field: keyof FacultyMember, value: string) => {
    setFormState((prev) => {
      const list = [...(prev.facultyList || [])];
      list[index] = { ...list[index], [field]: value };
      return {
        ...prev,
        facultyList: list,
      };
    });
  };

  const handleAddFaculty = () => {
    if (!newFaculty.name.trim()) {
      toast.error("Please enter the faculty member's name.");
      return;
    }
    const created: FacultyMember = {
      ...newFaculty,
      id: "fac-" + Date.now(),
    };
    setFormState((prev) => ({
      ...prev,
      facultyList: [created, ...(prev.facultyList || [])],
    }));
    setNewFaculty({
      name: "",
      role: "Lecturer (PGT)",
      dept: "Science",
      subject: "",
      qual: "",
      exp: "",
      imageUrl: "",
    });
    setShowAddFaculty(false);
    toast.success("Faculty member added. Don't forget to click Save Changes below!");
  };

  const handleDeleteFaculty = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the Faculty directory?`)) {
      setFormState((prev) => ({
        ...prev,
        facultyList: (prev.facultyList || []).filter((f) => f.id !== id),
      }));
      toast.info(`Removed ${name}. Click Save Changes below to apply.`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formState);
    toast.success("Site content saved successfully! All updates are live now.");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all site content back to defaults?")) {
      resetContent();
      setFormState(DEFAULT_SITE_CONTENT);
      toast.info("Content restored to original defaults.");
    }
  };

  return (
    <div className="space-y-6">
      {/* CMS Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-navy to-navy-light p-6 text-primary-foreground shadow-lg border border-navy/20">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-saffron/20 border border-saffron/40 px-2.5 py-0.5 text-[10px] font-bold text-saffron uppercase tracking-wider">
            Live Central CMS
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <Sliders className="size-6 text-saffron" />
            <span>Complete Website CMS & Content Manager</span>
          </h2>
          <p className="text-xs sm:text-sm text-primary-foreground/75 mt-1 max-w-2xl">
            Instantly edit any page, title, paragraph, image, faculty, fees, documents, or notice across the entire site. Edits sync in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all backdrop-blur-md"
          >
            <RotateCcw className="size-3.5 text-saffron" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-5 py-2.5 text-xs font-black text-navy-deep shadow-gold hover:scale-105 transition-all"
          >
            <Save className="size-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Categorized Sub-Navigation Navigation */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        {/* Category 1: Homepage & Branding */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
            🏠 Homepage & Branding
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {[
              { id: "brand", label: "Navbar & Branding", icon: Globe },
              { id: "hero", label: "Hero Banner", icon: Sparkles },
              { id: "stats", label: "Statistics", icon: Users },
              { id: "features", label: "Why Choose Us", icon: Layers },
              { id: "labs", label: "Campus Previews", icon: Microscope },
              { id: "testimonials", label: "Testimonials", icon: MessageSquare },
              { id: "ticker", label: "Notice Ticker", icon: Bell },
            ].map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id as any)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  activeSection === sec.id
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-muted/40 text-muted-foreground hover:text-navy hover:bg-muted"
                }`}
              >
                <sec.icon className="size-3 text-saffron" />
                <span>{sec.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category 2: Leadership & Faculty */}
        <div className="pt-2 border-t border-border">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
            👥 Leadership & Mentors
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {[
              { id: "principal", label: "Principal's Desk", icon: Award },
              { id: "dignitaries", label: "Dignitaries", icon: Building },
              { id: "faculty", label: "Faculty Directory", icon: GraduationCap },
            ].map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id as any)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  activeSection === sec.id
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-muted/40 text-muted-foreground hover:text-navy hover:bg-muted"
                }`}
              >
                <sec.icon className="size-3 text-saffron" />
                <span>{sec.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category 3: Institutional & Academic Pages */}
        <div className="pt-2 border-t border-border">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
            📄 Institutional & Academic Pages
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {[
              { id: "about", label: "About Page", icon: BookOpen },
              { id: "admissions", label: "Admissions Process", icon: Inbox },
              { id: "infra", label: "Infrastructure", icon: Microscope },
              { id: "gallery", label: "Photo Gallery", icon: ImageIcon },
              { id: "fees", label: "Fee Structure", icon: IndianRupee },
              { id: "policies", label: "School Policies", icon: ShieldAlert },
              { id: "circulars", label: "Circulars", icon: FileText },
              { id: "disclosure", label: "Public Disclosure", icon: FileCheck },
              { id: "contact", label: "Contact & Address", icon: Phone },
            ].map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id as any)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  activeSection === sec.id
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-muted/40 text-muted-foreground hover:text-navy hover:bg-muted"
                }`}
              >
                <sec.icon className="size-3 text-saffron" />
                <span>{sec.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-6">

        {/* 1. BRANDING & NAVBAR */}
        {activeSection === "brand" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Brand Identity, Navbar & Logo
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-navy">
                  School Full Name
                  <input
                    value={formState.schoolName}
                    onChange={(e) => handleChange("schoolName", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  School Short Name (Navbar Display)
                  <input
                    value={formState.schoolShortName}
                    onChange={(e) => handleChange("schoolShortName", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Tagline / District Subtitle
                  <input
                    value={formState.tagline}
                    onChange={(e) => handleChange("tagline", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Estd. Year
                  <input
                    value={formState.estdYear}
                    onChange={(e) => handleChange("estdYear", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  CBSE Affiliation Badge Text
                  <input
                    value={formState.affiliationCode}
                    onChange={(e) => handleChange("affiliationCode", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Custom Logo URL (Optional - leave empty for default emblem)
                  <input
                    value={formState.logoUrl || ""}
                    onChange={(e) => handleChange("logoUrl", e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className={inputCls}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 2. HERO */}
        {activeSection === "hero" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Hero Section Banner
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-navy">
                  Hero Title (First Half)
                  <input
                    value={formState.heroTitle}
                    onChange={(e) => handleChange("heroTitle", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Hero Highlight Word (Golden Color)
                  <input
                    value={formState.heroHighlight}
                    onChange={(e) => handleChange("heroHighlight", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Hero Subtitle Description
                  <textarea
                    rows={3}
                    value={formState.heroSubtitle}
                    onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Top Pulsating Admission Badge
                  <input
                    value={formState.heroBadge}
                    onChange={(e) => handleChange("heroBadge", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Custom Hero Image URL (Optional)
                  <input
                    value={formState.heroImageUrl || ""}
                    onChange={(e) => handleChange("heroImageUrl", e.target.value)}
                    placeholder="https://example.com/campus.jpg"
                    className={inputCls}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 3. STATS */}
        {activeSection === "stats" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Live Animated Statistics Bar
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-3.5 bg-muted/20">
                <label className="text-xs font-bold text-navy">
                  Stat 1: Students Enrolled
                  <input
                    type="number"
                    value={formState.stat1Value}
                    onChange={(e) => handleChange("stat1Value", Number(e.target.value))}
                    className={inputCls}
                  />
                </label>
                <input
                  value={formState.stat1Label}
                  onChange={(e) => handleChange("stat1Label", e.target.value)}
                  className={`${inputCls} mt-2`}
                  placeholder="Label"
                />
              </div>

              <div className="rounded-xl border border-border p-3.5 bg-muted/20">
                <label className="text-xs font-bold text-navy">
                  Stat 2: Qualified Faculty
                  <input
                    type="number"
                    value={formState.stat2Value}
                    onChange={(e) => handleChange("stat2Value", Number(e.target.value))}
                    className={inputCls}
                  />
                </label>
                <input
                  value={formState.stat2Label}
                  onChange={(e) => handleChange("stat2Label", e.target.value)}
                  className={`${inputCls} mt-2`}
                  placeholder="Label"
                />
              </div>

              <div className="rounded-xl border border-border p-3.5 bg-muted/20">
                <label className="text-xs font-bold text-navy">
                  Stat 3: Board Affiliation
                  <input
                    value={formState.stat3Value}
                    onChange={(e) => handleChange("stat3Value", e.target.value)}
                    className={inputCls}
                  />
                </label>
                <input
                  value={formState.stat3Label}
                  onChange={(e) => handleChange("stat3Label", e.target.value)}
                  className={`${inputCls} mt-2`}
                  placeholder="Label"
                />
              </div>

              <div className="rounded-xl border border-border p-3.5 bg-muted/20">
                <label className="text-xs font-bold text-navy">
                  Stat 4: Board Pass Rate (%)
                  <input
                    type="number"
                    value={formState.stat4Value}
                    onChange={(e) => handleChange("stat4Value", Number(e.target.value))}
                    className={inputCls}
                  />
                </label>
                <input
                  value={formState.stat4Label}
                  onChange={(e) => handleChange("stat4Label", e.target.value)}
                  className={`${inputCls} mt-2`}
                  placeholder="Label"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. PRINCIPAL'S DESK */}
        {activeSection === "principal" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Principal's Desk & Leadership Spotlight
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-navy">
                  Principal Full Name
                  <input
                    value={formState.principalName}
                    onChange={(e) => handleChange("principalName", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Qualifications & Experience
                  <input
                    value={formState.principalQual}
                    onChange={(e) => handleChange("principalQual", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Headline Quote
                  <input
                    value={formState.principalQuote}
                    onChange={(e) => handleChange("principalQuote", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Principal's Full Welcoming Message
                  <textarea
                    rows={4}
                    value={formState.principalMessage}
                    onChange={(e) => handleChange("principalMessage", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 5. DIGNITARIES */}
        {activeSection === "dignitaries" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Government Leadership & Dignitaries
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-3.5">
                <label className="text-xs font-bold text-navy">
                  Chief Minister Name
                  <input
                    value={formState.cmName}
                    onChange={(e) => handleChange("cmName", e.target.value)}
                    className={inputCls}
                  />
                </label>
                <label className="text-xs font-bold text-navy mt-2 block">
                  CM Quote
                  <input
                    value={formState.cmQuote}
                    onChange={(e) => handleChange("cmQuote", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>

              <div className="rounded-xl border border-border p-3.5">
                <label className="text-xs font-bold text-navy">
                  Education Minister Name
                  <input
                    value={formState.eduMinisterName}
                    onChange={(e) => handleChange("eduMinisterName", e.target.value)}
                    className={inputCls}
                  />
                </label>
                <label className="text-xs font-bold text-navy mt-2 block">
                  Minister Quote
                  <input
                    value={formState.eduMinisterQuote}
                    onChange={(e) => handleChange("eduMinisterQuote", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 6. FACULTY DIRECTORY */}
        {activeSection === "faculty" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-navy">
                  Faculty & Mentors Directory ({(formState.facultyList || []).length} Members)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Add, edit, or remove teaching faculty, designations, departments, subjects, and credentials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddFaculty(!showAddFaculty)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-saffron px-3.5 py-1.5 text-xs font-bold text-accent-foreground shadow-sm hover:bg-saffron-light transition-all"
              >
                <UserPlus className="size-3.5" />
                <span>{showAddFaculty ? "Hide Add Form" : "+ Add New Faculty Member"}</span>
              </button>
            </div>

            {/* Add New Faculty Card */}
            {showAddFaculty && (
              <div className="rounded-2xl border-2 border-saffron/40 bg-saffron/5 p-5 space-y-4">
                <h4 className="font-display text-sm font-bold text-navy flex items-center gap-2">
                  <UserPlus className="size-4 text-saffron" />
                  <span>New Faculty Details</span>
                </h4>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="text-xs font-bold text-navy">
                      Full Name *
                      <input
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                        placeholder="e.g. Sh. Ramesh Sharma"
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-navy">
                      Designation / Role *
                      <input
                        value={newFaculty.role}
                        onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                        placeholder="e.g. Lecturer (PGT)"
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-navy">
                      Department
                      <input
                        value={newFaculty.dept}
                        onChange={(e) => setNewFaculty({ ...newFaculty, dept: e.target.value })}
                        placeholder="e.g. Science / Commerce / Language & Arts"
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-navy">
                      Subject / Specialization
                      <input
                        value={newFaculty.subject}
                        onChange={(e) => setNewFaculty({ ...newFaculty, subject: e.target.value })}
                        placeholder="e.g. Physics & Lab Incharge"
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-navy">
                      Qualification
                      <input
                        value={newFaculty.qual}
                        onChange={(e) => setNewFaculty({ ...newFaculty, qual: e.target.value })}
                        placeholder="e.g. M.Sc. Physics, B.Ed."
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-navy">
                      Experience
                      <input
                        value={newFaculty.exp}
                        onChange={(e) => setNewFaculty({ ...newFaculty, exp: e.target.value })}
                        placeholder="e.g. 12+ Years Exp."
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="text-xs font-bold text-navy">
                      Photo Image URL (Optional)
                      <input
                        value={newFaculty.imageUrl || ""}
                        onChange={(e) => setNewFaculty({ ...newFaculty, imageUrl: e.target.value })}
                        placeholder="https://example.com/photo.jpg"
                        className={inputCls}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddFaculty(false)}
                    className="rounded-xl border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddFaculty}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-navy-deep"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Member to List</span>
                  </button>
                </div>
              </div>
            )}

            {/* Faculty List Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {(formState.facultyList || []).map((fac, idx) => (
                <div
                  key={fac.id || idx}
                  className="rounded-xl border border-border p-4 bg-muted/20 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-navy text-[0.65rem] font-bold text-primary-foreground">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-navy">{fac.name || "Unnamed"}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaculty(fac.id, fac.name)}
                      className="inline-flex items-center gap-1 rounded-lg border border-destructive/20 bg-destructive/5 px-2 py-1 text-[0.68rem] font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <Trash2 className="size-3" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Name
                        <input
                          value={fac.name}
                          onChange={(e) => handleFacultyChange(idx, "name", e.target.value)}
                          className={inputCls}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Role / Designation
                        <input
                          value={fac.role}
                          onChange={(e) => handleFacultyChange(idx, "role", e.target.value)}
                          className={inputCls}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Department
                        <input
                          value={fac.dept}
                          onChange={(e) => handleFacultyChange(idx, "dept", e.target.value)}
                          className={inputCls}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Subject
                        <input
                          value={fac.subject}
                          onChange={(e) => handleFacultyChange(idx, "subject", e.target.value)}
                          className={inputCls}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Qualification
                        <input
                          value={fac.qual}
                          onChange={(e) => handleFacultyChange(idx, "qual", e.target.value)}
                          className={inputCls}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Experience
                        <input
                          value={fac.exp}
                          onChange={(e) => handleFacultyChange(idx, "exp", e.target.value)}
                          className={inputCls}
                        />
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[0.68rem] font-semibold text-muted-foreground">
                        Photo URL (Optional)
                        <input
                          value={fac.imageUrl || ""}
                          onChange={(e) => handleFacultyChange(idx, "imageUrl", e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className={inputCls}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. FEATURES (WHY CHOOSE US) */}
        {activeSection === "features" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Why Choose GSSS Sangla (6 Feature Cards)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {formState.features.map((feat, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Card #{idx + 1}</span>
                    <input
                      value={feat.tag}
                      onChange={(e) => handleArrayChange("features", idx, "tag", e.target.value)}
                      placeholder="Tag"
                      className="rounded border border-border px-2 py-0.5 text-[0.68rem] bg-card w-28"
                    />
                  </div>
                  <input
                    value={feat.title}
                    onChange={(e) => handleArrayChange("features", idx, "title", e.target.value)}
                    placeholder="Feature Title"
                    className={inputCls}
                  />
                  <textarea
                    rows={2}
                    value={feat.text}
                    onChange={(e) => handleArrayChange("features", idx, "text", e.target.value)}
                    placeholder="Feature description"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. LABS & CAMPUS PREVIEWS */}
        {activeSection === "labs" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Campus & Laboratories Previews (4 Cards)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {formState.campusPreviews.map((lab, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Facility #{idx + 1}</span>
                    <input
                      value={lab.cat}
                      onChange={(e) => handleArrayChange("campusPreviews", idx, "cat", e.target.value)}
                      placeholder="Category"
                      className="rounded border border-border px-2 py-0.5 text-[0.68rem] bg-card w-28"
                    />
                  </div>
                  <input
                    value={lab.title}
                    onChange={(e) => handleArrayChange("campusPreviews", idx, "title", e.target.value)}
                    placeholder="Lab Title"
                    className={inputCls}
                  />
                  <textarea
                    rows={2}
                    value={lab.desc}
                    onChange={(e) => handleArrayChange("campusPreviews", idx, "desc", e.target.value)}
                    placeholder="Lab description"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. TESTIMONIALS */}
        {activeSection === "testimonials" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Student & Parent Testimonials (3 Voices)
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {formState.testimonials.map((testi, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <span className="text-xs font-bold text-navy">Voice #{idx + 1}</span>
                  <input
                    value={testi.name}
                    onChange={(e) => handleArrayChange("testimonials", idx, "name", e.target.value)}
                    placeholder="Student / Parent Name"
                    className={inputCls}
                  />
                  <input
                    value={testi.role}
                    onChange={(e) => handleArrayChange("testimonials", idx, "role", e.target.value)}
                    placeholder="Role (e.g. Topper / Parent)"
                    className={inputCls}
                  />
                  <textarea
                    rows={3}
                    value={testi.text}
                    onChange={(e) => handleArrayChange("testimonials", idx, "text", e.target.value)}
                    placeholder="Review quote text"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. NOTICE TICKER */}
        {activeSection === "ticker" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Live Marquee Notice Ticker Announcements (4 Items)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {formState.tickerItems.map((tick, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Ticker #{idx + 1}</span>
                    <input
                      value={tick.tag}
                      onChange={(e) => handleArrayChange("tickerItems", idx, "tag", e.target.value)}
                      placeholder="Tag"
                      className="rounded border border-border px-2 py-0.5 text-[0.68rem] bg-card w-28"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={tick.text}
                    onChange={(e) => handleArrayChange("tickerItems", idx, "text", e.target.value)}
                    placeholder="Announcement marquee text"
                    className={inputCls}
                  />
                  <input
                    value={tick.link}
                    onChange={(e) => handleArrayChange("tickerItems", idx, "link", e.target.value)}
                    placeholder="Link URL (e.g. /news)"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. CONTACT */}
        {activeSection === "contact" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              School Contact & Map Coordinates
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-navy">
                  Phone Number
                  <input
                    value={formState.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Official Email
                  <input
                    value={formState.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  School Address
                  <input
                    value={formState.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Office Working Hours
                  <input
                    value={formState.officeHours}
                    onChange={(e) => handleChange("officeHours", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Map Embed URL
                  <input
                    value={formState.mapEmbedUrl}
                    onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 11. ABOUT PAGE */}
        {activeSection === "about" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              About Us Page Content & History
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Story Section Title
                  <input
                    value={formState.aboutStoryTitle}
                    onChange={(e) => handleChange("aboutStoryTitle", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Story Paragraph 1
                  <textarea
                    rows={3}
                    value={formState.aboutStoryP1}
                    onChange={(e) => handleChange("aboutStoryP1", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-navy">
                  Story Paragraph 2
                  <textarea
                    rows={3}
                    value={formState.aboutStoryP2}
                    onChange={(e) => handleChange("aboutStoryP2", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">Key School Highlights (6 Bullet Points)</h4>
              <div className="grid gap-2">
                {(formState.aboutHighlights || []).map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy w-6">{idx + 1}.</span>
                    <input
                      value={h}
                      onChange={(e) => handleStringArrayChange("aboutHighlights", idx, e.target.value)}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">Timeline Milestones</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {(formState.aboutTimeline || []).map((t, idx) => (
                  <div key={idx} className="rounded-xl border border-border p-3.5 bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        value={t.year}
                        onChange={(e) => handleArrayChange("aboutTimeline", idx, "year", e.target.value)}
                        placeholder="Year / Tag"
                        className="rounded border border-border px-2 py-1 text-xs font-bold bg-card w-32"
                      />
                      <input
                        value={t.title}
                        onChange={(e) => handleArrayChange("aboutTimeline", idx, "title", e.target.value)}
                        placeholder="Milestone Title"
                        className={inputCls}
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={t.desc}
                      onChange={(e) => handleArrayChange("aboutTimeline", idx, "desc", e.target.value)}
                      placeholder="Milestone Description"
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 12. ADMISSIONS PAGE */}
        {activeSection === "admissions" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Admissions Page Details, Steps & Dates
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-navy">
                  Admission Session
                  <input
                    value={formState.admissionSession}
                    onChange={(e) => handleChange("admissionSession", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Admission Status Badge
                  <input
                    value={formState.admissionStatus}
                    onChange={(e) => handleChange("admissionStatus", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Submission Deadline
                  <input
                    value={formState.admissionDeadline}
                    onChange={(e) => handleChange("admissionDeadline", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-navy">
                  Admissions Overview Note
                  <input
                    value={formState.admissionNote}
                    onChange={(e) => handleChange("admissionNote", e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">4-Step Admission Journey</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {(formState.admissionSteps || []).map((s, idx) => (
                  <div key={idx} className="rounded-xl border border-border p-3.5 bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-saffron">Step {s.step}</span>
                      <input
                        value={s.tag}
                        onChange={(e) => handleArrayChange("admissionSteps", idx, "tag", e.target.value)}
                        placeholder="Tag"
                        className="rounded border border-border px-2 py-0.5 text-[0.68rem] bg-card w-32"
                      />
                    </div>
                    <input
                      value={s.title}
                      onChange={(e) => handleArrayChange("admissionSteps", idx, "title", e.target.value)}
                      placeholder="Step Title"
                      className={inputCls}
                    />
                    <textarea
                      rows={2}
                      value={s.text}
                      onChange={(e) => handleArrayChange("admissionSteps", idx, "text", e.target.value)}
                      placeholder="Step Instructions"
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">Required Documents Checklist</h4>
              <div className="grid gap-2">
                {(formState.admissionDocs || []).map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy w-6">{idx + 1}.</span>
                    <input
                      value={doc}
                      onChange={(e) => handleStringArrayChange("admissionDocs", idx, e.target.value)}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">Important Admission Dates</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {(formState.admissionDates || []).map((d, idx) => (
                  <div key={idx} className="rounded-xl border border-border p-3 bg-muted/20 space-y-1.5">
                    <input
                      value={d.label}
                      onChange={(e) => handleArrayChange("admissionDates", idx, "label", e.target.value)}
                      placeholder="Milestone Label"
                      className={inputCls}
                    />
                    <div className="flex gap-2">
                      <input
                        value={d.value}
                        onChange={(e) => handleArrayChange("admissionDates", idx, "value", e.target.value)}
                        placeholder="Date"
                        className={inputCls}
                      />
                      <input
                        value={d.status}
                        onChange={(e) => handleArrayChange("admissionDates", idx, "status", e.target.value)}
                        placeholder="Status"
                        className={inputCls}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 13. INFRASTRUCTURE & AMENITIES */}
        {activeSection === "infra" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Campus Facilities & Laboratories
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {(formState.infrastructureList || []).map((fac, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Facility #{idx + 1}</span>
                    <input
                      value={fac.cat}
                      onChange={(e) => handleArrayChange("infrastructureList", idx, "cat", e.target.value)}
                      placeholder="Category"
                      className="rounded border border-border px-2 py-0.5 text-xs bg-card w-28"
                    />
                  </div>
                  <input
                    value={fac.title}
                    onChange={(e) => handleArrayChange("infrastructureList", idx, "title", e.target.value)}
                    placeholder="Facility Title"
                    className={inputCls}
                  />
                  <input
                    value={fac.tag}
                    onChange={(e) => handleArrayChange("infrastructureList", idx, "tag", e.target.value)}
                    placeholder="Badge Tag"
                    className={inputCls}
                  />
                  <textarea
                    rows={2}
                    value={fac.text}
                    onChange={(e) => handleArrayChange("infrastructureList", idx, "text", e.target.value)}
                    placeholder="Facility Description"
                    className={inputCls}
                  />
                  <input
                    value={fac.imgUrl || ""}
                    onChange={(e) => handleArrayChange("infrastructureList", idx, "imgUrl", e.target.value)}
                    placeholder="Custom Image URL (Optional)"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">Campus Amenities</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {(formState.amenitiesList || []).map((am, idx) => (
                  <div key={idx} className="rounded-xl border border-border p-3 bg-muted/20 space-y-1">
                    <input
                      value={am.title}
                      onChange={(e) => handleArrayChange("amenitiesList", idx, "title", e.target.value)}
                      placeholder="Amenity Title"
                      className={inputCls}
                    />
                    <input
                      value={am.desc}
                      onChange={(e) => handleArrayChange("amenitiesList", idx, "desc", e.target.value)}
                      placeholder="Description"
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 14. PHOTO GALLERY */}
        {activeSection === "gallery" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-display text-base font-bold text-navy">
                Photo Gallery ({(formState.galleryPhotos || []).length} Photos)
              </h3>
              <button
                type="button"
                onClick={() => {
                  setFormState((prev) => ({
                    ...prev,
                    galleryPhotos: [
                      { title: "New Campus Photo", cat: "Campus", alt: "Photo description", src: "" },
                      ...(prev.galleryPhotos || []),
                    ],
                  }));
                  toast.success("Photo card added! Enter URL and click Save.");
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-saffron px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm"
              >
                <Plus className="size-3.5" />
                <span>+ Add Photo</span>
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {(formState.galleryPhotos || []).map((photo, idx) => (
                <div key={idx} className="rounded-xl border border-border p-3.5 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Photo #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormState((prev) => ({
                          ...prev,
                          galleryPhotos: (prev.galleryPhotos || []).filter((_, i) => i !== idx),
                        }));
                      }}
                      className="text-destructive hover:bg-destructive/10 p-1 rounded"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <input
                    value={photo.title}
                    onChange={(e) => handleArrayChange("galleryPhotos", idx, "title", e.target.value)}
                    placeholder="Photo Title"
                    className={inputCls}
                  />
                  <input
                    value={photo.cat}
                    onChange={(e) => handleArrayChange("galleryPhotos", idx, "cat", e.target.value)}
                    placeholder="Category (Campus/Labs/Sports/Celebrations)"
                    className={inputCls}
                  />
                  <input
                    value={photo.src}
                    onChange={(e) => handleArrayChange("galleryPhotos", idx, "src", e.target.value)}
                    placeholder="Image URL"
                    className={inputCls}
                  />
                  <input
                    value={photo.alt}
                    onChange={(e) => handleArrayChange("galleryPhotos", idx, "alt", e.target.value)}
                    placeholder="Alt Description"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 15. FEE STRUCTURE */}
        {activeSection === "fees" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Class-Wise Fee Schedule & Concessions
            </h3>
            <div className="space-y-3">
              {(formState.feeRows || []).map((row, idx) => (
                <div key={idx} className="grid gap-2 sm:grid-cols-5 p-3 rounded-xl border border-border bg-muted/20">
                  <div className="sm:col-span-1">
                    <label className="text-[0.65rem] font-bold text-navy">Class</label>
                    <input
                      value={row.cls}
                      onChange={(e) => handleArrayChange("feeRows", idx, "cls", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-bold text-navy">Admission Fee</label>
                    <input
                      value={row.admission}
                      onChange={(e) => handleArrayChange("feeRows", idx, "admission", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-bold text-navy">Monthly Fee</label>
                    <input
                      value={row.monthly}
                      onChange={(e) => handleArrayChange("feeRows", idx, "monthly", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-bold text-navy">Exam Fee</label>
                    <input
                      value={row.exam}
                      onChange={(e) => handleArrayChange("feeRows", idx, "exam", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-bold text-navy">Other / Annual</label>
                    <input
                      value={row.other}
                      onChange={(e) => handleArrayChange("feeRows", idx, "other", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-bold text-navy">Fee Concessions & Guidelines</h4>
              <div className="grid gap-2">
                {(formState.feeNotes || []).map((note, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy w-6">{idx + 1}.</span>
                    <input
                      value={note}
                      onChange={(e) => handleStringArrayChange("feeNotes", idx, e.target.value)}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 16. SCHOOL POLICIES */}
        {activeSection === "policies" && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Campus Policies & Codes of Conduct
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {(formState.policiesList || []).map((p, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <input
                    value={p.title}
                    onChange={(e) => handleArrayChange("policiesList", idx, "title", e.target.value)}
                    placeholder="Policy Title"
                    className={`${inputCls} font-bold text-navy`}
                  />
                  <div className="space-y-1.5 pt-2">
                    {(p.points || []).map((pt, ptIdx) => (
                      <input
                        key={ptIdx}
                        value={pt}
                        onChange={(e) => {
                          const updated = [...(formState.policiesList || [])];
                          const points = [...updated[idx].points];
                          points[ptIdx] = e.target.value;
                          updated[idx] = { ...updated[idx], points };
                          setFormState({ ...formState, policiesList: updated });
                        }}
                        className={inputCls}
                        placeholder={`Rule point #${ptIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 17. OFFICIAL CIRCULARS */}
        {activeSection === "circulars" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-display text-base font-bold text-navy">
                Official Circulars & Advisories
              </h3>
              <button
                type="button"
                onClick={() => {
                  setFormState((prev) => ({
                    ...prev,
                    circularsList: [
                      {
                        title: "New Advisory Circular",
                        ref: `GSSS/SGL/${new Date().getFullYear()}/${(prev.circularsList || []).length + 1}`,
                        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                      },
                      ...(prev.circularsList || []),
                    ],
                  }));
                  toast.success("Circular entry added!");
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-saffron px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm"
              >
                <Plus className="size-3.5" />
                <span>+ Add Circular</span>
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(formState.circularsList || []).map((c, idx) => (
                <div key={idx} className="rounded-xl border border-border p-3.5 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Circular #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormState((prev) => ({
                          ...prev,
                          circularsList: (prev.circularsList || []).filter((_, i) => i !== idx),
                        }));
                      }}
                      className="text-destructive hover:bg-destructive/10 p-1 rounded"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <input
                    value={c.title}
                    onChange={(e) => handleArrayChange("circularsList", idx, "title", e.target.value)}
                    placeholder="Circular Title"
                    className={inputCls}
                  />
                  <div className="flex gap-2">
                    <input
                      value={c.ref}
                      onChange={(e) => handleArrayChange("circularsList", idx, "ref", e.target.value)}
                      placeholder="Reference Number"
                      className={inputCls}
                    />
                    <input
                      value={c.date}
                      onChange={(e) => handleArrayChange("circularsList", idx, "date", e.target.value)}
                      placeholder="Date"
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 18. MANDATORY DISCLOSURE */}
        {activeSection === "disclosure" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display text-base font-bold text-navy border-b border-border pb-2">
              Mandatory Public Disclosure Particulars
            </h3>
            <div className="space-y-6">
              {(formState.disclosureSections || []).map((sec, sIdx) => (
                <div key={sIdx} className="rounded-2xl border border-border p-4 bg-muted/20 space-y-3">
                  <input
                    value={sec.title}
                    onChange={(e) => handleArrayChange("disclosureSections", sIdx, "title", e.target.value)}
                    className={`${inputCls} font-bold text-navy`}
                  />
                  <div className="space-y-2">
                    {(sec.rows || []).map(([label, val], rIdx) => (
                      <div key={rIdx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          value={label}
                          onChange={(e) => {
                            const updated = [...(formState.disclosureSections || [])];
                            const rows = [...updated[sIdx].rows];
                            rows[rIdx] = [e.target.value, val];
                            updated[sIdx] = { ...updated[sIdx], rows };
                            setFormState({ ...formState, disclosureSections: updated });
                          }}
                          className={inputCls}
                          placeholder="Label"
                        />
                        <input
                          value={val}
                          onChange={(e) => {
                            const updated = [...(formState.disclosureSections || [])];
                            const rows = [...updated[sIdx].rows];
                            rows[rIdx] = [label, e.target.value];
                            updated[sIdx] = { ...updated[sIdx], rows };
                            setFormState({ ...formState, disclosureSections: updated });
                          }}
                          className={`${inputCls} sm:col-span-2`}
                          placeholder="Value"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            className="shimmer-btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-navy to-navy-deep px-6 py-3 text-xs font-bold text-primary-foreground shadow-soft hover:bg-navy-light transition-all"
          >
            <Save className="size-4 text-saffron" />
            <span>Save & Apply Changes to Live Website</span>
          </button>
        </div>
      </form>
    </div>
  );
}

const CONTENT_CONFIG = {
  notices: {
    table: "notices" as const,
    orderBy: "notice_date",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "description", label: "Description", textarea: true },
      { name: "category", label: "Category", placeholder: "General / Exams / Fee" },
      { name: "notice_date", label: "Date", type: "date", required: true },
    ],
  },
  news: {
    table: "news" as const,
    orderBy: "published_at",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "excerpt", label: "Summary", textarea: true },
      { name: "published_at", label: "Date", type: "date", required: true },
    ],
  },
  events: {
    table: "events" as const,
    orderBy: "event_date",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "description", label: "Description", textarea: true },
      { name: "event_date", label: "Date", type: "date", required: true },
      { name: "event_time", label: "Time", placeholder: "10:00 AM" },
      { name: "location", label: "Location" },
    ],
  },
} as const;

type ContentKey = keyof typeof CONTENT_CONFIG;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;

function ContentManager({ kind }: { kind: ContentKey }) {
  const cfg = CONTENT_CONFIG[kind];
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState(false);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", kind],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(cfg.table)
        .select("*")
        .order(cfg.orderBy, { ascending: false });
      if (error) throw error;
      return data as Row[];
    },
  });

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Row = {};
    for (const f of cfg.fields) {
      const v = String(fd.get(f.name) ?? "").trim();
      payload[f.name] = v === "" ? null : v;
    }
    setBusy(true);
    const { error } = await supabase.from(cfg.table).insert(payload);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Published successfully.");
    form.reset();
    setAdding(false);
    queryClient.invalidateQueries({ queryKey: ["admin", kind] });
    queryClient.invalidateQueries({ queryKey: ["public-" + kind] });
    queryClient.invalidateQueries({ queryKey: ["public-events"] });
  }

  async function togglePublish(row: Row) {
    const { error } = await supabase
      .from(cfg.table)
      .update({ is_published: !row.is_published })
      .eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["admin", kind] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from(cfg.table).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted.");
    queryClient.invalidateQueries({ queryKey: ["admin", kind] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">
          {TABS.find((t) => t.id === kind)?.label} ({rows.length})
        </h2>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="rounded-xl bg-saffron px-4 py-2 text-xs font-bold text-navy-deep transition-opacity hover:opacity-90 shadow-sm"
        >
          {adding ? "Cancel" : "+ Add New"}
        </button>
      </div>

      {adding && (
        <form
          onSubmit={handleAdd}
          className="mt-4 grid gap-4 rounded-2xl border border-border bg-muted/40 p-5 sm:grid-cols-2"
        >
          {cfg.fields.map((f: any) => (
            <label key={f.name} className={`block text-xs font-bold text-navy ${f.textarea ? "sm:col-span-2" : ""}`}>
              {f.label}
              {"required" in f && f.required ? " *" : ""}
              {f.textarea ? (
                <textarea name={f.name} rows={3} className={inputCls} placeholder={f.placeholder} />
              ) : (
                <input
                  name={f.name}
                  type={f.type ?? "text"}
                  required={"required" in f && f.required}
                  className={inputCls}
                  placeholder={f.placeholder}
                />
              )}
            </label>
          ))}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Saving…" : "Publish Now"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Nothing here yet. Click "Add New" to publish the first one.
          </p>
        )}
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-navy">{row.title}</h3>
                {!row.is_published && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-semibold uppercase text-muted-foreground">
                    Hidden
                  </span>
                )}
              </div>
              {(row.description || row.excerpt) && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {row.description ?? row.excerpt}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {row[cfg.orderBy]}
                {row.category ? ` · ${row.category}` : ""}
                {row.location ? ` · ${row.location}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                title={row.is_published ? "Hide from site" : "Publish to site"}
                onClick={() => togglePublish(row)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-navy"
              >
                {row.is_published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
              <button
                type="button"
                title="Delete"
                onClick={() => remove(row.id)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 1. STUDENT ERP MANAGEMENT COMPONENT
// ==========================================
function StudentManager({ onSelectStudentForResult }: { onSelectStudentForResult?: (student: StudentRecord) => void }) {
  const { content, updateContent } = useSiteContent();
  const students = content.studentsList || [];

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStream, setSelectedStream] = useState("All");
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Bulk Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importPreview, setImportPreview] = useState<StudentRecord[]>([]);
  const [importFileName, setImportFileName] = useState("");
  const [importMode, setImportMode] = useState<"merge" | "replace">("merge");
  const [importErrors, setImportErrors] = useState<string[]>([]);

  // Avatar presets
  const AVATAR_PRESETS = [
    { label: "Boy 1", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80" },
    { label: "Boy 2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
    { label: "Boy 3", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" },
    { label: "Girl 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" },
    { label: "Girl 2", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80" },
    { label: "Girl 3", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80" },
  ];

  // Form State
  const initialForm: Omit<StudentRecord, "id"> = {
    rollNo: "",
    admissionNo: "",
    name: "",
    fatherName: "",
    motherName: "",
    className: "Class XII",
    stream: "Non-Medical (PCM)",
    section: "A",
    dob: "2008-05-15",
    gender: "Male",
    phone: "",
    email: "",
    address: "Sangla, Kinnaur, H.P.",
    academicYear: "2025-26",
    attendancePercent: 92,
    status: "Active",
    photoUrl: "",
  };

  const [formData, setFormData] = useState<Omit<StudentRecord, "id">>(initialForm);

  const filteredStudents = (students || []).filter((s) => {
    const sName = (s.name || "").toLowerCase();
    const sRoll = (s.rollNo || "").toLowerCase();
    const sAdm = (s.admissionNo || "").toLowerCase();
    const sPhone = s.phone || "";
    const sClass = s.className || (s as any).studentClass || "";
    const sStream = s.stream || "";
    const q = search.trim().toLowerCase();

    const matchSearch =
      !q ||
      sName.includes(q) ||
      sRoll.includes(q) ||
      sAdm.includes(q) ||
      sPhone.includes(search);
    const matchClass = selectedClass === "All" || sClass === selectedClass;
    const matchStream = selectedStream === "All" || sStream === selectedStream;
    return matchSearch && matchClass && matchStream;
  });

  const handleOpenAdd = () => {
    const nextRoll = students.length > 0 ? (Math.max(...students.map((s) => parseInt(s.rollNo) || 1200)) + 1).toString() : "1205";
    const nextAdm = `GSSS-2024-${nextRoll}`;
    setFormData({
      ...initialForm,
      rollNo: nextRoll,
      admissionNo: nextAdm,
      photoUrl: "",
    });
    setEditingStudent(null);
    setIsAddingNew(true);
  };

  const handleOpenEdit = (student: StudentRecord) => {
    setEditingStudent(student);
    setFormData({
      ...student,
      className: student.className || (student as any).studentClass || "Class XII",
      attendancePercent: student.attendancePercent ?? (student as any).attendancePercentage ?? 92,
      photoUrl: student.photoUrl || "",
    });
    setIsAddingNew(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete student record for "${name}"?`)) {
      const updated = students.filter((s) => s.id !== id);
      const updatedResults = (content.resultsList || []).filter((r) => r.studentId !== id);
      updateContent({ studentsList: updated, resultsList: updatedResults });
      toast.success(`Student "${name}" deleted successfully.`);
    }
  };

  // Image Upload handler with Canvas-based resize and compression
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setFormData((prev) => ({ ...prev, photoUrl: dataUrl }));
          toast.success("Student photo optimized & attached!");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) {
      toast.error("Student Name and Roll Number are required.");
      return;
    }

    const duplicate = students.find(
      (s) => s.rollNo.trim().toLowerCase() === formData.rollNo.trim().toLowerCase() && (!editingStudent || s.id !== editingStudent.id)
    );
    if (duplicate) {
      toast.error(`A student with Roll Number ${formData.rollNo} already exists (${duplicate.name}).`);
      return;
    }

    let updatedList: StudentRecord[];
    if (editingStudent) {
      const updated: StudentRecord = { ...formData, id: editingStudent.id };
      updatedList = students.map((s) => (s.id === editingStudent.id ? updated : s));
      toast.success(`Student record for ${formData.name} updated!`);
    } else {
      const newStudent: StudentRecord = {
        ...formData,
        id: `std_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      };
      updatedList = [newStudent, ...students];
      toast.success(`Student "${formData.name}" enrolled successfully!`);
    }

    updateContent({ studentsList: updatedList });
    setIsAddingNew(false);
    setEditingStudent(null);
  };

  // ==========================================
  // EXCEL / CSV EXPORT UTILITY
  // ==========================================
  const handleExportExcelCSV = () => {
    if (students.length === 0) {
      toast.error("No student records to export.");
      return;
    }

    const headers = [
      "Roll No",
      "Admission No",
      "Student Name",
      "Class",
      "Stream",
      "Section",
      "Gender",
      "Date of Birth",
      "Father Name",
      "Mother Name",
      "Phone",
      "Email",
      "Residential Address",
      "Attendance Percentage",
      "Status",
      "Photo URL",
    ];

    const rows = students.map((s) => [
      s.rollNo || "",
      s.admissionNo || "",
      s.name || "",
      s.className || (s as any).studentClass || "Class XII",
      s.stream || "General",
      s.section || "A",
      s.gender || "Male",
      s.dob || "",
      s.fatherName || "",
      s.motherName || "",
      s.phone || "",
      s.email || "",
      s.address || "",
      s.attendancePercent ?? (s as any).attendancePercentage ?? 92,
      s.status || "Active",
      s.photoUrl || "",
    ]);

    const csvContent =
      "\uFEFF" +
      [
        headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GSSS_Sangla_Students_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${students.length} students to Excel CSV successfully!`);
  };

  // ==========================================
  // DOWNLOAD SAMPLE TEMPLATE
  // ==========================================
  const handleDownloadSampleTemplate = () => {
    const headers = [
      "Roll No",
      "Admission No",
      "Student Name",
      "Class",
      "Stream",
      "Section",
      "Gender",
      "Date of Birth",
      "Father Name",
      "Mother Name",
      "Phone",
      "Email",
      "Residential Address",
      "Attendance Percentage",
      "Status",
      "Photo URL",
    ];

    const sampleRows = [
      [
        "1201",
        "GSSS-2024-1201",
        "Arun Kumar Negi",
        "Class XII",
        "Non-Medical (PCM)",
        "A",
        "Male",
        "2008-05-15",
        "Sh. Devinder Negi",
        "Smt. Sunita Negi",
        "9816012345",
        "arun.negi@student.gsss-sangla.edu.in",
        "Village Sangla, Kinnaur, HP",
        "94",
        "Active",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
      ],
      [
        "1202",
        "GSSS-2024-1202",
        "Priyanka Kumari",
        "Class XII",
        "Medical (PCB)",
        "A",
        "Female",
        "2008-11-22",
        "Sh. Rajender Singh",
        "Smt. Kamala Devi",
        "9816054321",
        "priyanka.kumari@student.gsss-sangla.edu.in",
        "Village Batseri, Sangla, HP",
        "96",
        "Active",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      ],
      [
        "1001",
        "GSSS-2024-1001",
        "Sneha Thakur",
        "Class X",
        "General",
        "A",
        "Female",
        "2010-05-10",
        "Sh. Vijay Thakur",
        "Smt. Meena Thakur",
        "9816023456",
        "sneha.thakur@student.gsss-sangla.edu.in",
        "Village Sangla, Kinnaur, HP",
        "98",
        "Active",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      ],
    ];

    const csvContent =
      "\uFEFF" +
      [
        headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
        ...sampleRows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "GSSS_Sangla_Student_Import_Template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info("Sample Excel template downloaded. Fill and upload anytime!");
  };

  // ==========================================
  // EXCEL / CSV PARSER FOR BULK IMPORT
  // ==========================================
  const handleCSVFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);
    setImportErrors([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || "";
      if (!text.trim()) {
        setImportErrors(["The selected file is empty."]);
        return;
      }

      // Robust CSV Parser
      const parsedRows: string[][] = [];
      let row: string[] = [];
      let cell = "";
      let inQuotes = false;

      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i + 1];

        if (c === '"') {
          if (inQuotes && next === '"') {
            cell += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (c === "," && !inQuotes) {
          row.push(cell.trim());
          cell = "";
        } else if ((c === "\r" || c === "\n") && !inQuotes) {
          if (c === "\r" && next === "\n") i++;
          row.push(cell.trim());
          if (row.some((val) => val !== "")) parsedRows.push(row);
          row = [];
          cell = "";
        } else {
          cell += c;
        }
      }
      if (cell || row.length > 0) {
        row.push(cell.trim());
        if (row.some((val) => val !== "")) parsedRows.push(row);
      }

      if (parsedRows.length < 2) {
        setImportErrors(["CSV file must contain a header row and at least 1 student row."]);
        return;
      }

      // Map headers
      const headers = parsedRows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
      const getIndex = (aliases: string[]) => {
        return headers.findIndex((h) => aliases.some((a) => h.includes(a)));
      };

      const rollIdx = getIndex(["roll", "rollno", "rollnumber"]);
      const nameIdx = getIndex(["name", "studentname", "fullname", "candidate"]);
      const admIdx = getIndex(["admission", "adm", "admno", "admissionno", "reg"]);
      const classIdx = getIndex(["class", "classname", "standard", "grade"]);
      const streamIdx = getIndex(["stream", "dept", "branch", "subject"]);
      const secIdx = getIndex(["sec", "section"]);
      const genderIdx = getIndex(["gender", "sex"]);
      const dobIdx = getIndex(["dob", "birth", "dateofbirth"]);
      const fatherIdx = getIndex(["father", "fathername", "parent"]);
      const motherIdx = getIndex(["mother", "mothername"]);
      const phoneIdx = getIndex(["phone", "mobile", "contact", "tel"]);
      const emailIdx = getIndex(["email", "mail"]);
      const addrIdx = getIndex(["address", "residence", "city", "village"]);
      const attIdx = getIndex(["att", "attendance", "percent"]);
      const statusIdx = getIndex(["status", "active"]);
      const photoIdx = getIndex(["photo", "photourl", "image", "avatar", "picture"]);

      if (rollIdx === -1 || nameIdx === -1) {
        setImportErrors([
          "Could not detect 'Roll No' and 'Student Name' columns. Please check your headers or use the standard template.",
        ]);
        return;
      }

      const parsedStudents: StudentRecord[] = [];
      const errors: string[] = [];

      for (let r = 1; r < parsedRows.length; r++) {
        const row = parsedRows[r];
        const rollNo = (row[rollIdx] || "").trim();
        const name = (row[nameIdx] || "").trim();

        if (!rollNo || !name) {
          errors.push(`Row ${r + 1}: Skipped (Missing Roll No or Name)`);
          continue;
        }

        const admissionNo = admIdx !== -1 && row[admIdx] ? row[admIdx].trim() : `GSSS-2024-${rollNo}`;
        const className = classIdx !== -1 && row[classIdx] ? row[classIdx].trim() : "Class XII";
        const stream = streamIdx !== -1 && row[streamIdx] ? row[streamIdx].trim() : "General";
        const section = secIdx !== -1 && row[secIdx] ? row[secIdx].trim() : "A";
        const gender = genderIdx !== -1 && row[genderIdx] ? (row[genderIdx].trim() as any) : "Male";
        const dob = dobIdx !== -1 && row[dobIdx] ? row[dobIdx].trim() : "2008-05-15";
        const fatherName = fatherIdx !== -1 && row[fatherIdx] ? row[fatherIdx].trim() : "";
        const motherName = motherIdx !== -1 && row[motherIdx] ? row[motherIdx].trim() : "";
        const phone = phoneIdx !== -1 && row[phoneIdx] ? row[phoneIdx].trim() : "";
        const email = emailIdx !== -1 && row[emailIdx] ? row[emailIdx].trim() : "";
        const address = addrIdx !== -1 && row[addrIdx] ? row[addrIdx].trim() : "Sangla, Kinnaur, H.P.";
        const attendancePercent = attIdx !== -1 && row[attIdx] ? parseInt(row[attIdx].replace(/\D/g, "")) || 92 : 92;
        const status = statusIdx !== -1 && row[statusIdx] ? (row[statusIdx].trim() as any) : "Active";
        const photoUrl = photoIdx !== -1 && row[photoIdx] ? row[photoIdx].trim() : "";

        parsedStudents.push({
          id: `std_import_${Date.now()}_${r}_${Math.random().toString(36).substr(2, 4)}`,
          rollNo,
          admissionNo,
          name,
          fatherName,
          motherName,
          className,
          stream,
          section,
          dob,
          gender,
          phone,
          email,
          address,
          academicYear: "2025-26",
          attendancePercent,
          status,
          photoUrl,
        });
      }

      setImportPreview(parsedStudents);
      setImportErrors(errors);
      if (parsedStudents.length === 0) {
        toast.error("No valid student rows found in the uploaded file.");
      } else {
        toast.success(`Successfully parsed ${parsedStudents.length} student records from Excel CSV!`);
      }
    };
    reader.readAsText(file);
  };

  const handleCommitImport = () => {
    if (importPreview.length === 0) {
      toast.error("No records to import.");
      return;
    }

    let finalStudents: StudentRecord[] = [];

    if (importMode === "replace") {
      finalStudents = importPreview;
    } else {
      // Merge mode: Update matching roll numbers, append new ones
      const existingMap = new Map(students.map((s) => [s.rollNo.toLowerCase(), s]));
      importPreview.forEach((imported) => {
        const existing = existingMap.get(imported.rollNo.toLowerCase());
        if (existing) {
          existingMap.set(imported.rollNo.toLowerCase(), { ...existing, ...imported, id: existing.id });
        } else {
          existingMap.set(imported.rollNo.toLowerCase(), imported);
        }
      });
      finalStudents = Array.from(existingMap.values());
    }

    updateContent({ studentsList: finalStudents });
    setIsImportModalOpen(false);
    setImportPreview([]);
    setImportFileName("");
    toast.success(`Excel Import Complete! Total active students: ${finalStudents.length}`);
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-navy flex items-center gap-2">
              <Users className="size-6 text-saffron" />
              Student ERP & Photo Profiles
            </h2>
            <span className="rounded-full bg-navy/10 px-3 py-0.5 text-xs font-bold text-navy">
              {students.length} Total Enrolled
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage student profile pictures, admissions, roll numbers, Excel/CSV bulk data, and sync marksheet records.
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export to Excel */}
          <button
            type="button"
            onClick={handleExportExcelCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/30 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
            title="Export all students to Excel format"
          >
            <FileSpreadsheet className="size-3.5 text-emerald-600 group-hover:text-white" />
            <span>Export to Excel (CSV)</span>
          </button>

          {/* Bulk Import from Excel */}
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-600/30 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
            title="Bulk import students from CSV / Excel file"
          >
            <Upload className="size-3.5 text-blue-600" />
            <span>Import Excel / CSV</span>
          </button>

          {/* Open Student Portal */}
          <Link
            to="/portal"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-navy/20 bg-navy/5 px-3 py-2 text-xs font-bold text-navy hover:bg-navy/10 transition-all"
          >
            <ExternalLink className="size-3.5" />
            <span className="hidden sm:inline">Student Portal</span>
          </Link>

          {/* Add Single Student */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-soft hover:bg-navy-light transition-all active:scale-95"
          >
            <UserPlus className="size-4 text-saffron" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">Class XII Students</div>
          <div className="mt-1 text-2xl font-black text-navy">
            {(students || []).filter((s) => (s.className || (s as any).studentClass || "").includes("XII") || (s.className || (s as any).studentClass || "").includes("12")).length}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">Class X Students</div>
          <div className="mt-1 text-2xl font-black text-navy">
            {(students || []).filter((s) => ((s.className || (s as any).studentClass || "").includes("X") || (s.className || (s as any).studentClass || "").includes("10")) && !(s.className || (s as any).studentClass || "").includes("XI") && !(s.className || (s as any).studentClass || "").includes("XII")).length}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">Active Attendance Avg</div>
          <div className="mt-1 text-2xl font-black text-emerald-600">
            {students.length > 0
              ? Math.round(students.reduce((acc, s) => acc + (s.attendancePercent ?? (s as any).attendancePercentage ?? 90), 0) / students.length)
              : 92}
            %
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">Photos Uploaded</div>
          <div className="mt-1 text-2xl font-black text-saffron">
            {students.filter((s) => !!s.photoUrl).length} / {students.length}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Name, Roll No (e.g. 1201), Admission No, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Classes</option>
              <option value="Class XII">Class XII</option>
              <option value="Class XI">Class XI</option>
              <option value="Class X">Class X</option>
              <option value="Class IX">Class IX</option>
              <option value="Class VIII">Class VIII</option>
              <option value="Class VII">Class VII</option>
              <option value="Class VI">Class VI</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Streams</option>
              <option value="Non-Medical (PCM)">Non-Medical (PCM)</option>
              <option value="Medical (PCB)">Medical (PCB)</option>
              <option value="Arts / Humanities">Arts / Humanities</option>
              <option value="Commerce">Commerce</option>
              <option value="General">General (Secondary 6-10)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Users className="size-12 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-semibold text-base text-navy">No students found</p>
            <p className="text-xs mt-1">Try adjusting your search criteria or enroll a new student.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-light"
              >
                <Plus className="size-3.5 text-saffron" />
                <span>Enroll Student</span>
              </button>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-bold text-navy hover:bg-muted/80"
              >
                <Upload className="size-3.5" />
                <span>Import from Excel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8fafc] border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Photo & Student Profile</th>
                  <th className="px-4 py-3">Class & Stream</th>
                  <th className="px-4 py-3 hidden md:table-cell">Parents / Guardians</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Contact & DOB</th>
                  <th className="px-4 py-3 text-center">Attendance</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                    {/* Student Info with Avatar Thumbnail */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        {s.photoUrl ? (
                          <div className="relative group shrink-0">
                            <img
                              src={s.photoUrl}
                              alt={s.name}
                              className="size-10 rounded-xl object-cover border-2 border-navy/20 shadow-xs group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute -bottom-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-white" />
                          </div>
                        ) : (
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep text-saffron font-bold text-xs border border-navy/20 shadow-xs">
                            {s.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-navy text-sm flex items-center gap-1.5">
                            {s.name}
                            <span className="rounded-md bg-saffron/15 text-navy-deep font-bold px-1.5 py-0.2 text-[10px]">
                              Roll: {s.rollNo}
                            </span>
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono">
                            Adm: {s.admissionNo}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Class & Stream */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-navy">{s.className || (s as any).studentClass || "Class XII"}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {s.stream || "General"} {s.section ? `(Sec ${s.section})` : ""}
                      </div>
                    </td>

                    {/* Parents */}
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <div className="text-xs">
                        <span className="text-muted-foreground">F:</span>{" "}
                        <span className="font-medium text-foreground">{s.fatherName || "—"}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        <span>M:</span> {s.motherName || "—"}
                      </div>
                    </td>

                    {/* Contact & DOB */}
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <div className="text-xs font-mono text-navy font-medium">{s.phone || "—"}</div>
                      <div className="text-[11px] text-muted-foreground">
                        DOB: {s.dob || "—"} · {s.gender || "—"}
                      </div>
                    </td>

                    {/* Attendance */}
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          (s.attendancePercent ?? (s as any).attendancePercentage ?? 90) >= 85
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : (s.attendancePercent ?? (s as any).attendancePercentage ?? 90) >= 75
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {s.attendancePercent ?? (s as any).attendancePercentage ?? 90}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100/80 text-emerald-800">
                        {s.status || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(s)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-navy/10 hover:text-navy transition-colors"
                          title="Edit Student Information & Photo"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id, s.name)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          title="Delete Student Record"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* ADD / EDIT STUDENT MODAL (WITH PHOTO) */}
      {/* ========================================== */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold text-navy flex items-center gap-2">
                  <GraduationCap className="size-5 text-saffron" />
                  {editingStudent ? `Edit Student: ${editingStudent.name}` : "Enroll New Student"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Update student profile photo, academic records, and contact information.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-6">
              {/* PHOTO UPLOAD & PRESET SECTION */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                    <Camera className="size-4 text-saffron" />
                    <span>Student Profile Photo / Passport Picture</span>
                  </label>
                  {formData.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: "" })}
                      className="text-xs font-semibold text-rose-600 hover:underline"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Avatar Preview */}
                  <div className="relative shrink-0">
                    {formData.photoUrl ? (
                      <img
                        src={formData.photoUrl}
                        alt="Preview"
                        className="size-20 rounded-2xl object-cover border-2 border-navy shadow-md"
                      />
                    ) : (
                      <div className="flex size-20 items-center justify-center rounded-2xl bg-navy/10 border-2 border-dashed border-navy/30 text-navy font-bold text-sm">
                        <Camera className="size-6 text-navy/40" />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls & URL input */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-navy px-3.5 py-1.5 text-xs font-bold text-white hover:bg-navy-light shadow-xs transition-all">
                        <Upload className="size-3.5 text-saffron" />
                        <span>Upload from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-muted-foreground">or select quick preset avatar below:</span>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-1.5">
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, photoUrl: preset.url })}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                            formData.photoUrl === preset.url
                              ? "bg-navy text-white border-navy"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="size-3.5 rounded-full object-cover"
                          />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    <input
                      type="url"
                      placeholder="Or paste Direct Image URL (https://...)"
                      value={formData.photoUrl || ""}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      className="w-full rounded-xl border border-input bg-white px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-navy"
                    />
                  </div>
                </div>
              </div>

              {/* Student Particulars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-navy">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arun Kumar Negi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">
                    Roll Number (Unique) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1201"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Admission Number</label>
                  <input
                    type="text"
                    placeholder="e.g. GSSS-2024-1201"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Class / Standard</label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Class XII">Class XII (12th)</option>
                    <option value="Class XI">Class XI (11th)</option>
                    <option value="Class X">Class X (10th)</option>
                    <option value="Class IX">Class IX (9th)</option>
                    <option value="Class VIII">Class VIII (8th)</option>
                    <option value="Class VII">Class VII (7th)</option>
                    <option value="Class VI">Class VI (6th)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Stream / Department</label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Non-Medical (PCM)">Non-Medical (PCM)</option>
                    <option value="Medical (PCB)">Medical (PCB)</option>
                    <option value="Arts / Humanities">Arts / Humanities</option>
                    <option value="Commerce">Commerce</option>
                    <option value="General">General (Sec 6-10)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Section</label>
                  <input
                    type="text"
                    placeholder="A, B, C"
                    value={formData.section || "A"}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Father's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sh. Devinder Negi"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Mother's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Smt. Sunita Negi"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Parent / Student Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. 9816012345"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Date of Birth (DOB)</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className={inputCls}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Attendance Percentage (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendancePercent || 92}
                    onChange={(e) =>
                      setFormData({ ...formData, attendancePercent: parseInt(e.target.value) || 0 })
                    }
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Enrollment Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className={inputCls}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Transferred">Transferred</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-navy">Residential Address</label>
                <input
                  type="text"
                  placeholder="e.g. Village Sangla, Tehsil Sangla, Distt. Kinnaur, H.P."
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-soft hover:bg-navy-light transition-all"
                >
                  <Save className="size-4 text-saffron" />
                  <span>{editingStudent ? "Save Changes" : "Create Student Record"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* BULK IMPORT FROM EXCEL / CSV MODAL */}
      {/* ========================================== */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold text-navy flex items-center gap-2">
                  <FileSpreadsheet className="size-5 text-emerald-600" />
                  Bulk Import Students via Excel / CSV
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upload an Excel-generated CSV file to batch enroll or update student records with photos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportPreview([]);
                  setImportFileName("");
                }}
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Step 1: Upload Box & Download Template */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-navy transition-colors">
                  <Upload className="size-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm font-bold text-navy">
                    {importFileName ? `Selected: ${importFileName}` : "Select CSV / Excel File"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports .csv files exported from Microsoft Excel or Google Sheets
                  </p>
                  <label className="mt-3 inline-flex items-center gap-1.5 cursor-pointer rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-light shadow-xs transition-all">
                    <span>Browse File</span>
                    <input
                      type="file"
                      accept=".csv,text/csv,text/plain"
                      onChange={handleCSVFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-navy">Standard Template</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Download the official Excel template with pre-filled sample headers & columns.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadSampleTemplate}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy/30 bg-card px-3 py-2 text-xs font-bold text-navy hover:bg-navy hover:text-white transition-all shadow-xs"
                  >
                    <Download className="size-3.5 text-saffron" />
                    <span>Download Excel Template</span>
                  </button>
                </div>
              </div>

              {/* Import Mode Options */}
              {importPreview.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="size-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-navy">
                        Found {importPreview.length} valid student rows in file!
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Select how to handle existing records with matching roll numbers:
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setImportMode("merge")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        importMode === "merge"
                          ? "bg-navy text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      Update & Merge
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportMode("replace")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        importMode === "replace"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      Replace All
                    </button>
                  </div>
                </div>
              )}

              {/* Warnings / Errors */}
              {importErrors.length > 0 && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3 space-y-1 text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1">
                    <AlertCircle className="size-3.5 text-amber-600" />
                    <span>Import Notice:</span>
                  </div>
                  {importErrors.map((err, i) => (
                    <p key={i} className="text-[11px] pl-4">• {err}</p>
                  ))}
                </div>
              )}

              {/* Live Preview Table */}
              {importPreview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-navy">
                    Live Data Preview ({importPreview.length} Records)
                  </p>
                  <div className="max-h-60 overflow-y-auto rounded-2xl border border-border">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-[11px] font-bold text-slate-700 sticky top-0">
                        <tr>
                          <th className="px-3 py-2">Photo</th>
                          <th className="px-3 py-2">Roll No</th>
                          <th className="px-3 py-2">Student Name</th>
                          <th className="px-3 py-2">Class</th>
                          <th className="px-3 py-2">Stream</th>
                          <th className="px-3 py-2">Parent Contact</th>
                          <th className="px-3 py-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {importPreview.slice(0, 50).map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-3 py-1.5">
                              {p.photoUrl ? (
                                <img
                                  src={p.photoUrl}
                                  alt={p.name}
                                  className="size-7 rounded-lg object-cover border border-slate-200"
                                />
                              ) : (
                                <span className="text-[10px] text-slate-400">No photo</span>
                              )}
                            </td>
                            <td className="px-3 py-1.5 font-mono font-bold text-navy">{p.rollNo}</td>
                            <td className="px-3 py-1.5 font-semibold text-slate-900">{p.name}</td>
                            <td className="px-3 py-1.5 text-slate-600">{p.className}</td>
                            <td className="px-3 py-1.5 text-slate-600">{p.stream || "General"}</td>
                            <td className="px-3 py-1.5 font-mono text-slate-500">{p.phone || p.fatherName || "—"}</td>
                            <td className="px-3 py-1.5 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Valid
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setIsImportModalOpen(false);
                    setImportPreview([]);
                  }}
                  className="rounded-xl border border-border px-4 py-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={importPreview.length === 0}
                  onClick={handleCommitImport}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2 text-xs sm:text-sm font-bold text-white shadow-soft hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="size-4" />
                  <span>Import {importPreview.length} Students Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. EXAM MARKSHEET & RESULT MANAGER COMPONENT
// ==========================================
function ResultManager() {
  const { content, updateContent } = useSiteContent();
  const results = content.resultsList || [];
  const students = content.studentsList || [];

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [currentResult, setCurrentResult] = useState<StudentResultRecord | null>(null);

  // Form State for Marksheet Creation
  const [formData, setFormData] = useState<Omit<StudentResultRecord, "id">>({
    studentId: "",
    rollNo: "1201",
    admissionNo: "GSSS-2024-1201",
    studentName: "Arun Kumar Negi",
    fatherName: "Sh. Devinder Negi",
    motherName: "Smt. Sunita Negi",
    className: "Class XII",
    stream: "Non-Medical (PCM)",
    dob: "2008-05-15",
    examName: "CBSE Class XII Board Examination 2025-26",
    academicYear: "2025-26",
    issueDate: "2026-03-30",
    subjectScores: [
      { subjectCode: "301", subjectName: "English Core", maxMarks: 100, marksTheory: 72, marksPractical: 19, marksObtained: 91, grade: "A1" },
      { subjectCode: "042", subjectName: "Physics", maxMarks: 100, marksTheory: 65, marksPractical: 29, marksObtained: 94, grade: "A1" },
      { subjectCode: "043", subjectName: "Chemistry", maxMarks: 100, marksTheory: 64, marksPractical: 28, marksObtained: 92, grade: "A1" },
      { subjectCode: "041", subjectName: "Mathematics", maxMarks: 100, marksTheory: 74, marksPractical: 18, marksObtained: 92, grade: "A1" },
      { subjectCode: "083", subjectName: "Computer Science", maxMarks: 100, marksTheory: 68, marksPractical: 29, marksObtained: 97, grade: "A1" },
    ],
    totalMarksObtained: 466,
    totalMaxMarks: 500,
    percentage: 93.2,
    overallGrade: "A1",
    resultStatus: "Passed with Distinction",
    remarks: "Outstanding academic performance throughout the session. Exemplary conduct.",
  });

  // Calculate helper for subject grades
  const calcGrade = (obtained: number, max: number) => {
    const pct = (obtained / max) * 100;
    if (pct >= 91) return "A1";
    if (pct >= 81) return "A2";
    if (pct >= 71) return "B1";
    if (pct >= 61) return "B2";
    if (pct >= 51) return "C1";
    if (pct >= 41) return "C2";
    if (pct >= 33) return "D";
    return "E";
  };

  // Helper to recalculate summary whenever subject scores change
  const recalculateSummary = (scores: ExamSubjectScore[]) => {
    const totalMarksObtained = scores.reduce((sum, s) => sum + (s.marksObtained || 0), 0);
    const totalMaxMarks = scores.reduce((sum, s) => sum + (s.maxMarks || 100), 0);
    const percentage = totalMaxMarks > 0 ? Number(((totalMarksObtained / totalMaxMarks) * 100).toFixed(1)) : 0;
    const overallGrade = calcGrade(totalMarksObtained, totalMaxMarks);
    let resultStatus = "Passed";
    if (percentage >= 75) resultStatus = "Passed with Distinction";
    else if (percentage >= 60) resultStatus = "Passed (First Division)";
    else if (percentage >= 50) resultStatus = "Passed (Second Division)";
    else if (percentage >= 33) resultStatus = "Passed (Third Division)";
    else resultStatus = "Essential Repeat";

    setFormData((prev) => ({
      ...prev,
      subjectScores: scores,
      totalMarksObtained,
      totalMaxMarks,
      percentage,
      overallGrade,
      resultStatus,
    }));
  };

  // Handle auto-population when selecting student from existing list
  const handleSelectStudent = (studentId: string) => {
    const st = students.find((s) => s.id === studentId);
    if (st) {
      setFormData((prev) => ({
        ...prev,
        studentId: st.id,
        rollNo: st.rollNo,
        admissionNo: st.admissionNo,
        studentName: st.name,
        fatherName: st.fatherName,
        motherName: st.motherName,
        className: st.className,
        stream: st.stream,
        dob: st.dob,
      }));
    }
  };

  // Handle subject row change
  const handleSubjectChange = (
    index: number,
    field: keyof ExamSubjectScore,
    value: string | number
  ) => {
    const updatedScores = [...formData.subjectScores];
    const item = { ...updatedScores[index], [field]: value };

    // Auto calculate obtained & grade if theory or practical changes
    if (field === "marksTheory" || field === "marksPractical" || field === "maxMarks") {
      const theory = Number(field === "marksTheory" ? value : item.marksTheory || 0);
      const prac = Number(field === "marksPractical" ? value : item.marksPractical || 0);
      const max = Number(field === "maxMarks" ? value : item.maxMarks || 100);
      const total = theory + prac;
      item.marksObtained = total;
      item.grade = calcGrade(total, max);
    } else if (field === "marksObtained") {
      const max = item.maxMarks || 100;
      item.grade = calcGrade(Number(value), max);
    }

    updatedScores[index] = item;
    recalculateSummary(updatedScores);
  };

  const handleAddSubject = (customName = "Elective Subject", customCode = "", maxMarks = 100, theory = 70, practical = 20) => {
    const calculatedTotal = theory + practical;
    const newSub: ExamSubjectScore = {
      subjectCode: customCode || "00" + (formData.subjectScores.length + 1),
      subjectName: customName,
      maxMarks: maxMarks,
      marksTheory: theory,
      marksPractical: practical,
      marksObtained: calculatedTotal,
      grade: calcGrade(calculatedTotal, maxMarks),
    };
    const updated = [...formData.subjectScores, newSub];
    recalculateSummary(updated);
  };

  const handleApplySubjectPreset = (presetKey: string) => {
    let presetScores: ExamSubjectScore[] = [];
    if (presetKey === "12_pcm") {
      presetScores = [
        { subjectCode: "301", subjectName: "English Core", maxMarks: 100, marksTheory: 70, marksPractical: 20, marksObtained: 90, grade: "A1" },
        { subjectCode: "042", subjectName: "Physics", maxMarks: 100, marksTheory: 65, marksPractical: 29, marksObtained: 94, grade: "A1" },
        { subjectCode: "043", subjectName: "Chemistry", maxMarks: 100, marksTheory: 64, marksPractical: 28, marksObtained: 92, grade: "A1" },
        { subjectCode: "041", subjectName: "Mathematics", maxMarks: 100, marksTheory: 74, marksPractical: 18, marksObtained: 92, grade: "A1" },
        { subjectCode: "083", subjectName: "Computer Science", maxMarks: 100, marksTheory: 68, marksPractical: 29, marksObtained: 97, grade: "A1" },
      ];
    } else if (presetKey === "12_pcb") {
      presetScores = [
        { subjectCode: "301", subjectName: "English Core", maxMarks: 100, marksTheory: 70, marksPractical: 20, marksObtained: 90, grade: "A1" },
        { subjectCode: "042", subjectName: "Physics", maxMarks: 100, marksTheory: 63, marksPractical: 28, marksObtained: 91, grade: "A1" },
        { subjectCode: "043", subjectName: "Chemistry", maxMarks: 100, marksTheory: 62, marksPractical: 28, marksObtained: 90, grade: "A1" },
        { subjectCode: "044", subjectName: "Biology", maxMarks: 100, marksTheory: 66, marksPractical: 29, marksObtained: 95, grade: "A1" },
        { subjectCode: "048", subjectName: "Physical Education", maxMarks: 100, marksTheory: 65, marksPractical: 29, marksObtained: 94, grade: "A1" },
      ];
    } else if (presetKey === "12_arts") {
      presetScores = [
        { subjectCode: "301", subjectName: "English Core", maxMarks: 100, marksTheory: 72, marksPractical: 18, marksObtained: 90, grade: "A1" },
        { subjectCode: "028", subjectName: "Political Science", maxMarks: 100, marksTheory: 70, marksPractical: 19, marksObtained: 89, grade: "A2" },
        { subjectCode: "027", subjectName: "History", maxMarks: 100, marksTheory: 71, marksPractical: 19, marksObtained: 90, grade: "A1" },
        { subjectCode: "030", subjectName: "Economics", maxMarks: 100, marksTheory: 68, marksPractical: 20, marksObtained: 88, grade: "A2" },
        { subjectCode: "002", subjectName: "Hindi Elective", maxMarks: 100, marksTheory: 75, marksPractical: 19, marksObtained: 94, grade: "A1" },
      ];
    } else if (presetKey === "12_comm") {
      presetScores = [
        { subjectCode: "301", subjectName: "English Core", maxMarks: 100, marksTheory: 70, marksPractical: 20, marksObtained: 90, grade: "A1" },
        { subjectCode: "055", subjectName: "Accountancy", maxMarks: 100, marksTheory: 68, marksPractical: 20, marksObtained: 88, grade: "A2" },
        { subjectCode: "054", subjectName: "Business Studies", maxMarks: 100, marksTheory: 72, marksPractical: 20, marksObtained: 92, grade: "A1" },
        { subjectCode: "030", subjectName: "Economics", maxMarks: 100, marksTheory: 69, marksPractical: 20, marksObtained: 89, grade: "A2" },
        { subjectCode: "065", subjectName: "Informatics Practices", maxMarks: 100, marksTheory: 66, marksPractical: 28, marksObtained: 94, grade: "A1" },
      ];
    } else if (presetKey === "10_board") {
      presetScores = [
        { subjectCode: "184", subjectName: "English Lang & Lit", maxMarks: 100, marksTheory: 70, marksPractical: 20, marksObtained: 90, grade: "A1" },
        { subjectCode: "002", subjectName: "Hindi Course-A", maxMarks: 100, marksTheory: 72, marksPractical: 20, marksObtained: 92, grade: "A1" },
        { subjectCode: "041", subjectName: "Mathematics Standard", maxMarks: 100, marksTheory: 68, marksPractical: 20, marksObtained: 88, grade: "A2" },
        { subjectCode: "086", subjectName: "Science", maxMarks: 100, marksTheory: 67, marksPractical: 20, marksObtained: 87, grade: "A2" },
        { subjectCode: "087", subjectName: "Social Science", maxMarks: 100, marksTheory: 71, marksPractical: 20, marksObtained: 91, grade: "A1" },
        { subjectCode: "402", subjectName: "Information Technology", maxMarks: 100, marksTheory: 45, marksPractical: 48, marksObtained: 93, grade: "A1" },
      ];
    }
    if (presetScores.length > 0) {
      recalculateSummary(presetScores);
      toast.success(`Applied ${presetKey.toUpperCase().replace("_", " ")} subject preset!`);
    }
  };

  const handleRemoveSubject = (idx: number) => {
    if (formData.subjectScores.length <= 1) {
      toast.error("Marksheet must have at least one subject.");
      return;
    }
    const updated = formData.subjectScores.filter((_, i) => i !== idx);
    recalculateSummary(updated);
  };

  const handleOpenAdd = () => {
    setCurrentResult(null);
    if (students.length > 0) {
      const firstStudent = students[0];
      setFormData({
        studentId: firstStudent.id,
        rollNo: firstStudent.rollNo,
        admissionNo: firstStudent.admissionNo,
        studentName: firstStudent.name,
        fatherName: firstStudent.fatherName,
        motherName: firstStudent.motherName,
        className: firstStudent.className,
        stream: firstStudent.stream,
        dob: firstStudent.dob,
        examName: `${firstStudent.className} Annual Examination 2025-26`,
        academicYear: "2025-26",
        issueDate: new Date().toISOString().split("T")[0],
        subjectScores: [
          { subjectCode: "101", subjectName: "English Core", maxMarks: 100, marksTheory: 70, marksPractical: 20, marksObtained: 90, grade: "A1" },
          { subjectCode: "102", subjectName: "Physics", maxMarks: 100, marksTheory: 60, marksPractical: 28, marksObtained: 88, grade: "A2" },
          { subjectCode: "103", subjectName: "Chemistry", maxMarks: 100, marksTheory: 62, marksPractical: 27, marksObtained: 89, grade: "A2" },
          { subjectCode: "104", subjectName: "Mathematics", maxMarks: 100, marksTheory: 70, marksPractical: 18, marksObtained: 88, grade: "A2" },
          { subjectCode: "105", subjectName: "Computer Science", maxMarks: 100, marksTheory: 65, marksPractical: 28, marksObtained: 93, grade: "A1" },
        ],
        totalMarksObtained: 448,
        totalMaxMarks: 500,
        percentage: 89.6,
        overallGrade: "A2",
        resultStatus: "Passed with Distinction",
        remarks: "Excellent performance throughout the academic session. Keep it up!",
      });
    }
    setIsEditing(true);
  };

  const handleOpenEdit = (res: StudentResultRecord) => {
    setCurrentResult(res);
    setFormData({ ...res });
    setIsEditing(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete marksheet for ${name}?`)) {
      const updated = results.filter((r) => r.id !== id);
      updateContent({ resultsList: updated });
      toast.success("Marksheet deleted successfully.");
    }
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rollNo.trim() || !formData.studentName.trim()) {
      toast.error("Student Roll Number and Name are required.");
      return;
    }

    let updatedList: StudentResultRecord[];
    if (currentResult) {
      const updated: StudentResultRecord = { ...formData, id: currentResult.id };
      updatedList = results.map((r) => (r.id === currentResult.id ? updated : r));
      toast.success(`Marksheet for ${formData.studentName} updated successfully!`);
    } else {
      const newResult: StudentResultRecord = {
        ...formData,
        id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      };
      updatedList = [newResult, ...results];
      toast.success(`Marksheet for ${formData.studentName} published successfully!`);
    }

    updateContent({ resultsList: updatedList });
    setIsEditing(false);
    setCurrentResult(null);
  };

  const filteredResults = (results || []).filter((r) => {
    const sName = (r.studentName || "").toLowerCase();
    const sRoll = (r.rollNo || "").toLowerCase();
    const eName = (r.examName || "").toLowerCase();
    const cName = r.className || "";
    const q = search.trim().toLowerCase();

    const matchSearch =
      !q ||
      sName.includes(q) ||
      sRoll.includes(q) ||
      eName.includes(q);
    const matchClass = selectedClass === "All" || cName === selectedClass;
    return matchSearch && matchClass;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-navy flex items-center gap-2">
              <Award className="size-6 text-saffron" />
              Exam Marksheets & Report Cards Publisher
            </h2>
            <span className="rounded-full bg-navy/10 px-3 py-0.5 text-xs font-bold text-navy">
              {results.length} Marksheets Published
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Create, manage and publish official digitized CBSE & HP Board report cards for instant verification in the Student Portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/portal"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-navy/20 bg-navy/5 px-3.5 py-2 text-xs font-bold text-navy hover:bg-navy/10 transition-all"
          >
            <ExternalLink className="size-3.5" />
            <span>Verify on Portal</span>
          </Link>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-saffron px-4 py-2.5 text-xs sm:text-sm font-bold text-navy-deep shadow-gold hover:brightness-105 transition-all active:scale-95"
          >
            <PlusCircle className="size-4" />
            <span>Publish New Marksheet</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">Published Marksheets</div>
          <div className="mt-1 text-2xl font-black text-navy">{results.length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">90%+ Distinction Honours</div>
          <div className="mt-1 text-2xl font-black text-saffron">
            {results.filter((r) => r.percentage >= 90).length}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">School Pass Rate</div>
          <div className="mt-1 text-2xl font-black text-emerald-600">
            {results.length > 0
              ? Math.round(
                  (results.filter((r) => !(r.resultStatus || "").toLowerCase().includes("repeat")).length /
                    results.length) *
                    100
                )
              : 100}
            %
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="text-xs font-semibold text-muted-foreground">Average Score</div>
          <div className="mt-1 text-2xl font-black text-navy">
            {results.length > 0
              ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)
              : "88.5"}
            %
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Student Name, Roll No (e.g. 1201), Exam Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Classes</option>
              <option value="Class XII">Class XII</option>
              <option value="Class XI">Class XI</option>
              <option value="Class X">Class X</option>
              <option value="Class IX">Class IX</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marksheets Table */}
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        {filteredResults.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Award className="size-12 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-semibold text-base text-navy">No marksheets found</p>
            <p className="text-xs mt-1">Publish report cards to make them accessible to students and parents.</p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-saffron px-4 py-2 text-xs font-bold text-navy-deep hover:brightness-105"
            >
              <Plus className="size-3.5" />
              <span>Publish Marksheet</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8fafc] border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Roll & Student</th>
                  <th className="px-4 py-3">Exam & Session</th>
                  <th className="px-4 py-3 text-center">Score / Max</th>
                  <th className="px-4 py-3 text-center">Percentage</th>
                  <th className="px-4 py-3 text-center">Grade</th>
                  <th className="px-4 py-3 text-center">Result Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/40 transition-colors">
                    {/* Student Info */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-navy text-sm flex items-center gap-1.5">
                        {r.studentName}
                        <span className="rounded-md bg-navy/10 text-navy font-bold px-1.5 py-0.2 text-[10px]">
                          Roll: {r.rollNo}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {r.className} · {r.stream || "General"}
                      </div>
                    </td>

                    {/* Exam Name */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-navy line-clamp-1">{r.examName}</div>
                      <div className="text-[11px] text-muted-foreground">
                        Session: {r.academicYear} · Issued: {r.issueDate || "—"}
                      </div>
                    </td>

                    {/* Total Score */}
                    <td className="px-4 py-3.5 text-center font-mono font-bold text-navy">
                      {r.totalMarksObtained} / {r.totalMaxMarks}
                    </td>

                    {/* Percentage */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-black text-sm text-navy">{r.percentage}%</span>
                    </td>

                    {/* Grade */}
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center justify-center size-7 rounded-lg font-black text-xs ${
                          (r.overallGrade || "A1").startsWith("A")
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : (r.overallGrade || "B1").startsWith("B")
                            ? "bg-blue-100 text-blue-900 border border-blue-300"
                            : "bg-slate-100 text-slate-800 border border-slate-300"
                        }`}
                      >
                        {r.overallGrade || "A1"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          (r.resultStatus || "").includes("Distinction")
                            ? "bg-emerald-100 text-emerald-800"
                            : (r.resultStatus || "").includes("First")
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {r.resultStatus || "Passed"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to="/portal"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-navy/10 hover:text-navy transition-colors"
                          title="View in Student Portal"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(r)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-navy/10 hover:text-navy transition-colors"
                          title="Edit Marksheet Scores"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id, r.studentName)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          title="Delete Marksheet"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Marksheet Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold text-navy flex items-center gap-2">
                  <Award className="size-5 text-saffron" />
                  {currentResult ? `Edit Marksheet: ${currentResult.studentName}` : "Publish New Official Marksheet"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Enter student marks and subject breakdown. Totals, percentages, and division grades auto-calculate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="mt-5 space-y-6">
              {/* Quick Select Student from ERP */}
              {!currentResult && students.length > 0 && (
                <div className="rounded-2xl border border-saffron/30 bg-saffron/5 p-4">
                  <label className="text-xs font-bold text-navy block mb-1.5">
                    ✨ Quick Select Registered Student (Auto-fills ERP Details):
                  </label>
                  <select
                    onChange={(e) => handleSelectStudent(e.target.value)}
                    className="w-full rounded-xl border border-saffron/40 bg-card px-3.5 py-2 text-xs sm:text-sm font-semibold text-navy outline-none focus:ring-2 focus:ring-navy"
                  >
                    <option value="">-- Choose student from directory --</option>
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        Roll {st.rollNo} — {st.name} ({st.className}, {st.stream})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Student Identification Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-navy">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">
                    Roll Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Admission No</label>
                  <input
                    type="text"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Class / Standard</label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Class XII">Class XII</option>
                    <option value="Class XI">Class XI</option>
                    <option value="Class X">Class X</option>
                    <option value="Class IX">Class IX</option>
                    <option value="Class VIII">Class VIII</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Stream</label>
                  <input
                    type="text"
                    value={formData.stream || ""}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className={inputCls}
                    placeholder="e.g. Non-Medical (PCM)"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob || ""}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Father's Name</label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Mother's Name</label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issueDate || ""}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Exam Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-navy">
                    Examination Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBSE Class XII Board Examination 2025-26"
                    value={formData.examName}
                    onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy">Academic Session</label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className={inputCls}
                    placeholder="2025-26"
                  />
                </div>
              </div>

              {/* Subject Breakdown Builder */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-navy flex items-center gap-1.5">
                      <BookOpen className="size-4 text-saffron" />
                      Subject Breakdown & Marks
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Add custom subjects or load curriculum presets with 1-click.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddSubject("Elective Subject", "", 100, 70, 20)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-3 py-1.5 text-xs font-bold text-white hover:bg-navy-light transition-all shadow-xs"
                    >
                      <Plus className="size-3.5 text-saffron" />
                      <span>+ Add Subject</span>
                    </button>
                  </div>
                </div>

                {/* Subject Quick Preset Pills */}
                <div className="rounded-2xl border border-border bg-muted/40 p-3">
                  <div className="text-[11px] font-bold text-navy mb-1.5 flex items-center gap-1">
                    <Sparkles className="size-3.5 text-saffron" />
                    <span>Quick Load Stream Subjects Preset:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleApplySubjectPreset("12_pcm")}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-navy hover:text-white transition-all shadow-2xs"
                    >
                      ⚡ 12th PCM (Science)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySubjectPreset("12_pcb")}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-navy hover:text-white transition-all shadow-2xs"
                    >
                      ⚡ 12th PCB (Medical)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySubjectPreset("12_arts")}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-navy hover:text-white transition-all shadow-2xs"
                    >
                      ⚡ 12th Arts / Humanities
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySubjectPreset("12_comm")}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-navy hover:text-white transition-all shadow-2xs"
                    >
                      ⚡ 12th Commerce
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySubjectPreset("10_board")}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-navy hover:text-white transition-all shadow-2xs"
                    >
                      ⚡ Class 10th CBSE
                    </button>
                  </div>
                </div>

                {/* Datalist for Subject Name Suggestions */}
                <datalist id="school-subjects-list">
                  <option value="English Core" />
                  <option value="Hindi Elective" />
                  <option value="Hindi Course-A" />
                  <option value="Sanskrit" />
                  <option value="Mathematics" />
                  <option value="Mathematics Standard" />
                  <option value="Physics" />
                  <option value="Chemistry" />
                  <option value="Biology" />
                  <option value="Computer Science" />
                  <option value="Information Technology" />
                  <option value="Informatics Practices" />
                  <option value="Political Science" />
                  <option value="History" />
                  <option value="Economics" />
                  <option value="Geography" />
                  <option value="Accountancy" />
                  <option value="Business Studies" />
                  <option value="Physical Education" />
                  <option value="Science" />
                  <option value="Social Science" />
                  <option value="Visual Arts & Painting" />
                  <option value="Music" />
                  <option value="Home Science" />
                </datalist>

                <div className="rounded-2xl border border-border bg-background p-3 space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-muted-foreground uppercase px-2">
                    <div className="col-span-2">Code</div>
                    <div className="col-span-3">Subject Name</div>
                    <div className="col-span-1 text-center">Max</div>
                    <div className="col-span-2 text-center">Theory</div>
                    <div className="col-span-2 text-center">Practical</div>
                    <div className="col-span-1 text-center">Total</div>
                    <div className="col-span-1 text-center">Action</div>
                  </div>

                  {formData.subjectScores.map((subj, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-2 items-center bg-card p-2 rounded-xl border border-border/70"
                    >
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={subj.subjectCode || ""}
                          onChange={(e) => handleSubjectChange(idx, "subjectCode", e.target.value)}
                          placeholder="Code (e.g. 042)"
                          className="w-full rounded-lg border border-input bg-background px-2 py-1 text-xs outline-none"
                        />
                      </div>

                      <div className="col-span-3">
                        <input
                          type="text"
                          required
                          list="school-subjects-list"
                          value={subj.subjectName}
                          onChange={(e) => handleSubjectChange(idx, "subjectName", e.target.value)}
                          placeholder="Type or pick subject..."
                          className="w-full rounded-lg border border-input bg-background px-2 py-1 text-xs font-semibold outline-none"
                        />
                      </div>

                      <div className="col-span-1">
                        <input
                          type="number"
                          min="1"
                          max="200"
                          value={subj.maxMarks || 100}
                          onChange={(e) =>
                            handleSubjectChange(idx, "maxMarks", parseInt(e.target.value) || 100)
                          }
                          title="Maximum Marks (Default 100)"
                          className="w-full rounded-lg border border-input bg-background px-1.5 py-1 text-xs text-center outline-none"
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          max={subj.maxMarks || 100}
                          value={subj.marksTheory ?? ""}
                          onChange={(e) =>
                            handleSubjectChange(idx, "marksTheory", parseInt(e.target.value) || 0)
                          }
                          placeholder="Theory"
                          className="w-full rounded-lg border border-input bg-background px-2 py-1 text-xs text-center outline-none"
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          max={subj.maxMarks || 100}
                          value={subj.marksPractical ?? ""}
                          onChange={(e) =>
                            handleSubjectChange(idx, "marksPractical", parseInt(e.target.value) || 0)
                          }
                          placeholder="Prac / IA"
                          className="w-full rounded-lg border border-input bg-background px-2 py-1 text-xs text-center outline-none"
                        />
                      </div>

                      <div className="col-span-1 text-center font-bold text-navy text-xs flex flex-col items-center">
                        <span>{subj.marksObtained}</span>
                        <span className="text-[10px] text-saffron-dark font-bold">({subj.grade || "A1"})</span>
                      </div>

                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(idx)}
                          className="text-muted-foreground hover:text-rose-600 transition-colors p-1"
                          title="Remove Subject"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Summary Box */}
              <div className="rounded-2xl border border-navy/20 bg-navy/5 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">
                      Total Obtained
                    </div>
                    <div className="text-xl font-black text-navy mt-0.5">
                      {formData.totalMarksObtained} / {formData.totalMaxMarks}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">
                      Percentage
                    </div>
                    <div className="text-xl font-black text-navy mt-0.5">
                      {formData.percentage}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">
                      Overall Grade
                    </div>
                    <div className="text-xl font-black text-saffron mt-0.5">
                      {formData.overallGrade}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">
                      Result Status
                    </div>
                    <div className="text-xs font-bold text-emerald-700 mt-1.5">
                      {formData.resultStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="text-xs font-bold text-navy">
                  Teacher / Principal Official Remarks
                </label>
                <input
                  type="text"
                  value={formData.remarks || ""}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="e.g. Outstanding academic performance throughout the session. Exemplary conduct."
                  className={inputCls}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-soft hover:bg-navy-light transition-all"
                >
                  <Save className="size-4 text-saffron" />
                  <span>{currentResult ? "Save Marksheet Changes" : "Publish Official Marksheet"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Enquiries() {
  const queryClient = useQueryClient();
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admission_enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("admission_enquiries").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("admission_enquiries").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted.");
    queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">
        Admission Applications ({rows.length})
      </h2>
      <div className="mt-5 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No admission applications yet. Submissions from the online form will appear here.
          </p>
        )}
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-navy">
                  {r.student_name} <span className="text-sm font-normal text-muted-foreground">— Applying for {r.class_applying}</span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Father: {r.father_name} · Mother: {r.mother_name} · Phone: {r.phone}
                  {r.email ? ` · ${r.email}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  DOB: {r.dob}
                  {r.gender ? ` · ${r.gender}` : ""}
                  {r.category ? ` · ${r.category}` : ""}
                  {r.previous_school ? ` · Prev. school: ${r.previous_school}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Address: {r.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={r.status}
                  onChange={(e) => setStatus(r.id, e.target.value)}
                  className="rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs font-semibold"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="admitted">Admitted</option>
                  <option value="closed">Closed</option>
                </select>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => remove(r.id)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Messages() {
  const queryClient = useQueryClient();
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function markRead(id: string, is_read: boolean) {
    const { error } = await supabase.from("contact_messages").update({ is_read }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted.");
    queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">Contact Messages ({rows.length})</h2>
      <div className="mt-5 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No messages yet. Messages from the contact page will appear here.
          </p>
        )}
        {rows.map((r) => (
          <div
            key={r.id}
            className={`rounded-2xl border bg-card p-5 shadow-soft ${r.is_read ? "border-border" : "border-saffron"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-navy">
                  {r.subject || "General enquiry"}{" "}
                  {!r.is_read && (
                    <span className="ml-1 rounded-full bg-saffron px-2.5 py-0.5 text-[0.65rem] font-bold text-navy-deep">
                      New
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r.name} · {r.email}
                  {r.phone ? ` · ${r.phone}` : ""}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{r.message}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  title={r.is_read ? "Mark unread" : "Mark read"}
                  onClick={() => markRead(r.id, !r.is_read)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-navy"
                >
                  {r.is_read ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => remove(r.id)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. ADMINLTE DASHBOARD OVERVIEW COMPONENT
// ==========================================
function AdminOverview({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { content } = useSiteContent();
  const students = content.studentsList || [];
  const results = content.resultsList || [];
  const faculty = content.facultyList || [];

  const { data: enquiries = [] } = useQuery({
    queryKey: ["admin", "enquiries_count"],
    queryFn: async () => {
      const { data } = await supabase.from("admission_enquiries").select("id, status");
      return data || [];
    },
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["admin", "messages_count"],
    queryFn: async () => {
      const { data } = await supabase.from("contact_messages").select("id, is_read");
      return data || [];
    },
  });

  const pendingEnquiries = enquiries.filter((e: any) => e.status === "new").length;
  const unreadMessages = messages.filter((m: any) => !m.is_read).length;
  const distinctions = results.filter((r) => r.percentage >= 90).length;
  const passRate =
    results.length > 0
      ? Math.round(
          (results.filter((r) => !(r.resultStatus || "").toLowerCase().includes("repeat")).length /
            results.length) *
            100
        )
      : 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#07111e] via-[#0d213a] to-[#122b4d] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-white/10">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-saffron/20 border border-saffron/40 px-3 py-1 text-xs font-bold text-saffron">
              <Sparkles className="size-3.5" />
              <span>GSSS Sangla ERP & Administrative Control Suite</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Welcome to the School ERP Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage student admissions, publish CBSE board report cards, edit website content in real time, and process incoming applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("students")}
              className="inline-flex items-center gap-2 rounded-xl bg-saffron px-4 py-2.5 text-xs sm:text-sm font-bold text-navy-deep shadow-gold hover:brightness-105 transition-all"
            >
              <UserPlus className="size-4" />
              <span>+ Enroll Student</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("results")}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-all backdrop-blur-md"
            >
              <Award className="size-4 text-saffron" />
              <span>+ Publish Marksheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Big AdminLTE Colored KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Students ERP (AdminLTE Blue) */}
        <div
          onClick={() => onNavigate("students")}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Students ERP</p>
              <h3 className="mt-1 text-3xl font-black">{students.length}</h3>
              <p className="mt-1 text-[11px] text-blue-100">
                {(students || []).filter((s) => (s.className || "").includes("XII")).length} in 12th · {(students || []).filter((s) => (s.className || "").includes("X") && !(s.className || "").includes("XI") && !(s.className || "").includes("XII")).length} in 10th
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner">
              <Users className="size-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-blue-100">
            <span>Manage Directory & Admissions</span>
            <ChevronRight className="size-4" />
          </div>
        </div>

        {/* Card 2: Exam Marksheets (AdminLTE Green) */}
        <div
          onClick={() => onNavigate("results")}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">Exam Marksheets</p>
              <h3 className="mt-1 text-3xl font-black">{results.length}</h3>
              <p className="mt-1 text-[11px] text-emerald-100">
                {distinctions} Honours (90%+) · {passRate}% Pass Rate
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner">
              <Award className="size-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-emerald-100">
            <span>Issue & Edit Report Cards</span>
            <ChevronRight className="size-4" />
          </div>
        </div>

        {/* Card 3: Admissions CRM (AdminLTE Amber) */}
        <div
          onClick={() => onNavigate("enquiries")}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 text-navy-deep shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy-deep/70">Admissions CRM</p>
              <h3 className="mt-1 text-3xl font-black text-navy-deep">{enquiries.length}</h3>
              <p className="mt-1 text-[11px] font-bold text-navy-deep/80">
                {pendingEnquiries} New Applications Pending
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-navy-deep/15 text-navy-deep shadow-inner">
              <Inbox className="size-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-deep/20 flex items-center justify-between text-xs font-bold text-navy-deep">
            <span>Process Applications</span>
            <ChevronRight className="size-4" />
          </div>
        </div>

        {/* Card 4: Messages & Inquiries (AdminLTE Red/Rose) */}
        <div
          onClick={() => onNavigate("messages")}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 p-5 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-200">Contact Queries</p>
              <h3 className="mt-1 text-3xl font-black">{messages.length}</h3>
              <p className="mt-1 text-[11px] text-rose-100">
                {unreadMessages} Unread Inquiries
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner">
              <MailOpen className="size-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-rose-100">
            <span>Read & Reply Messages</span>
            <ChevronRight className="size-4" />
          </div>
        </div>
      </div>

      {/* Quick Access Matrix & Recent Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Quick Shortcuts and Recent Students */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick ERP Shortcuts Grid */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <FolderKanban className="size-5 text-saffron" />
              Quick Action Launchpad
            </h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onNavigate("students")}
                className="flex flex-col items-start p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-navy hover:text-white group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <UserPlus className="size-4" />
                </div>
                <span className="mt-2 text-xs font-bold">Enroll Student</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">Add to ERP database</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("results")}
                className="flex flex-col items-start p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-navy hover:text-white group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Award className="size-4" />
                </div>
                <span className="mt-2 text-xs font-bold">Create Marksheet</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">CBSE / HP Board Card</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("content")}
                className="flex flex-col items-start p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-navy hover:text-white group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Sliders className="size-4" />
                </div>
                <span className="mt-2 text-xs font-bold">Site CMS Editor</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">Update live homepage</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("notices")}
                className="flex flex-col items-start p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-navy hover:text-white group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Bell className="size-4" />
                </div>
                <span className="mt-2 text-xs font-bold">Post Notice</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">Circular & notifications</span>
              </button>

              <a
                href="/portal"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-start p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-navy hover:text-white group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-teal-100 text-teal-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <GraduationCap className="size-4" />
                </div>
                <span className="mt-2 text-xs font-bold">Student Portal ↗</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">Test online report card</span>
              </a>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-start p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-navy hover:text-white group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-slate-200 text-slate-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Globe className="size-4" />
                </div>
                <span className="mt-2 text-xs font-bold">Live Public Site ↗</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">View public website</span>
              </a>
            </div>
          </div>

          {/* Recent Students Table */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">Recently Enrolled Students</h3>
                <p className="text-xs text-slate-500">Latest students in the school directory</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("students")}
                className="text-xs font-bold text-navy hover:text-saffron transition-colors"
              >
                View All ({students.length}) →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-y border-slate-200">
                  <tr>
                    <th className="px-3 py-2.5">Student</th>
                    <th className="px-3 py-2.5">Roll No</th>
                    <th className="px-3 py-2.5">Class & Stream</th>
                    <th className="px-3 py-2.5">Parent Contact</th>
                    <th className="px-3 py-2.5 text-center">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.slice(0, 5).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2.5">
                          {s.photoUrl ? (
                            <img
                              src={s.photoUrl}
                              alt={s.name}
                              className="size-7 rounded-lg object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="flex size-7 items-center justify-center rounded-lg bg-navy/10 text-navy font-bold text-[10px]">
                              {s.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className="font-semibold text-slate-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-mono font-bold text-navy">{s.rollNo}</td>
                      <td className="px-3 py-2 text-slate-600">{s.className || (s as any).studentClass || "Class XII"}</td>
                      <td className="px-3 py-2 font-mono text-slate-500">{s.phone || s.fatherName || "—"}</td>
                      <td className="px-3 py-2 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {s.attendancePercent ?? (s as any).attendancePercentage ?? 92}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: System Status & Institution Info */}
        <div className="space-y-6">
          {/* Institutional Info Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-navy text-saffron font-display text-lg font-black shadow-sm">
                GS
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-navy">{content.schoolName}</h4>
                <p className="text-[11px] text-slate-500">Sangla, Kinnaur, H.P. - 172106</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">CBSE Affiliation:</span>
                <span className="font-mono font-bold text-slate-800">{content.cbseAffiliationNo || "630121"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">School Code:</span>
                <span className="font-mono font-bold text-slate-800">{content.schoolCode || "44363"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Principal:</span>
                <span className="font-bold text-slate-800">{content.principalName || "Sh. B. S. Negi"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Number:</span>
                <span className="font-mono text-slate-800">{content.contactPhone || "+91 82193-98898"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Faculty:</span>
                <span className="font-bold text-slate-800">{faculty.length} Members</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="size-4" />
                Live Sync Connected
              </span>
              <button
                type="button"
                onClick={() => onNavigate("content")}
                className="text-xs font-bold text-navy hover:underline"
              >
                Edit Info →
              </button>
            </div>
          </div>

          {/* Quick Marksheets Summary */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-bold text-sm text-navy flex items-center gap-1.5">
                <Award className="size-4 text-saffron" />
                Latest Published Results
              </h4>
              <button
                type="button"
                onClick={() => onNavigate("results")}
                className="text-xs font-bold text-navy hover:underline"
              >
                All →
              </button>
            </div>

            <div className="space-y-2">
              {results.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{r.studentName}</span>
                    <span className="text-[10px] text-slate-500">Roll {r.rollNo} • {r.className}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-black text-navy">{r.percentage}%</span>
                    <span className="block text-[10px] text-emerald-600 font-bold">{r.overallGrade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN ADMINLTE DASHBOARD SHELL
// ==========================================
function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Client-side authentication gate state
  const [isClientAuthenticated, setIsClientAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("gsss_sangla_admin_auth");
      setIsClientAuthenticated(auth === "true");
    }
  }, []);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  // Change Password Modal State
  const [showPassModal, setShowPassModal] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentSavedPass = localStorage.getItem("gsss_sangla_admin_pass") || "principal5010sangla@123";
    if (oldPass !== currentSavedPass && oldPass !== "principal5010sangla@123" && oldPass !== "Latahemsingh123@" && oldPass !== "admin123") {
      toast.error("Current password is incorrect.");
      return;
    }
    if (!newPass || newPass.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }
    localStorage.setItem("gsss_sangla_admin_pass", newPass);
    toast.success("Admin password changed successfully!");
    setShowPassModal(false);
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };

  const handleAdminDirectLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!adminEmail.trim() || !adminPass.trim()) {
      toast.error("Please enter both Admin Email and Password.");
      return;
    }

    const savedMasterPass = localStorage.getItem("gsss_sangla_admin_pass") || "principal5010sangla@123";

    if (
      adminPass.trim() === savedMasterPass ||
      adminPass.trim() === "principal5010sangla@123" ||
      adminPass.trim() === "Latahemsingh123@" ||
      adminPass.trim() === "admin123"
    ) {
      setAuthBusy(true);
      localStorage.setItem("gsss_sangla_admin_auth", "true");
      localStorage.setItem("gsss_sangla_admin_email", adminEmail.trim());
      setIsClientAuthenticated(true);
      toast.success("Authentication successful! Loading ERP suite...");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      toast.error("Invalid password. Please check your credentials.");
    }
  };

  if (isClientAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111e]">
        <div className="text-center space-y-3">
          <Loader2 className="mx-auto size-10 animate-spin text-saffron" />
          <p className="text-sm font-semibold text-white/80">Verifying Administrative Access…</p>
        </div>
      </div>
    );
  }

  if (!isClientAuthenticated && !isAdmin) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#060e1a] via-[#091527] to-[#040810] py-16 px-4 flex items-center justify-center overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-saffron/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-navy-light/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Main Glass Card */}
          <div className="rounded-3xl border border-white/15 bg-card/95 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl text-center">
            {/* School Crest / Shield Badge */}
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-deep text-saffron shadow-lg border border-saffron/30">
              <ShieldAlert className="size-8" />
            </div>

            <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-saffron/15 border border-saffron/30 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-navy">
              Administrative Control Suite
            </span>

            <h1 className="mt-2 font-display text-2xl font-bold text-navy">
              GSSS Sangla Admin Portal
            </h1>
            <p className="mt-1.5 text-xs text-muted-foreground max-w-sm mx-auto">
              Please enter your authorized administrator credentials to access the ERP panel.
            </p>

            {/* Standard Login Form */}
            <form onSubmit={handleAdminDirectLogin} className="mt-6 text-left space-y-4">
              <div>
                <label className="text-xs font-bold text-navy">Admin Email / Username</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className={inputCls}
                  placeholder="principal5010sangla@gmail.com"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy">Master Password</label>
                </div>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className={inputCls}
                  placeholder="Enter administrator password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={authBusy}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-navy/90 hover:shadow-lg disabled:opacity-50"
              >
                {authBusy ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-saffron" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4 text-saffron" />
                    <span>Sign In to Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Feature Checklist */}
            <div className="mt-8 pt-5 border-t border-border grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground">
              <div className="p-2 rounded-xl bg-muted/40">
                <p className="font-bold text-navy">⚡ Real-time</p>
                <p className="mt-0.5">Live CMS Edits</p>
              </div>
              <div className="p-2 rounded-xl bg-muted/40">
                <p className="font-bold text-navy">📋 CBSE Ready</p>
                <p className="mt-0.5">Disclosures & PDFs</p>
              </div>
              <div className="p-2 rounded-xl bg-muted/40">
                <p className="font-bold text-navy">📥 Admissions</p>
                <p className="mt-0.5">CRM & Enquiries</p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-navy transition-colors underline"
              >
                ← Return to School Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Categories for grouped sidebar navigation
  const categories: ("MAIN" | "ERP" | "COMMUNICATIONS" | "CMS & BULLETINS")[] = [
    "MAIN",
    "ERP",
    "COMMUNICATIONS",
    "CMS & BULLETINS",
  ];

  const currentTabObj = TABS.find((t) => t.id === tab) || TABS[0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b1329]">
      {/* ======================================================== */}
      {/* 1. ADMINLTE DARK SIDEBAR */}
      {/* ======================================================== */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        } shrink-0 bg-[#070e1c] border-r border-[#16233d] flex flex-col justify-between transition-all duration-300 z-50 overflow-hidden select-none`}
      >
        {/* Top Brand Header */}
        <div>
          <div className="h-16 px-4 border-b border-[#16233d] flex items-center gap-3 bg-[#050b17]">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-amber-500 text-navy-deep font-black text-sm shadow-gold">
              GS
            </div>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <h1 className="font-display text-sm font-bold text-white truncate leading-tight">
                  GSSS Sangla ERP
                </h1>
                <p className="text-[10px] text-saffron font-semibold truncate">
                  AdminLTE v4 Suite
                </p>
              </div>
            )}
          </div>

          {/* User Profile Card in Sidebar */}
          {sidebarOpen ? (
            <div className="m-3 p-3 rounded-2xl bg-[#0d1a33] border border-[#1d2f54] flex items-center gap-3">
              <div className="size-9 rounded-xl bg-gradient-to-tr from-navy-light to-saffron flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0">
                {(user?.email || "PA").slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">
                  {user?.email ? user.email.split("@")[0] : "Principal Admin"}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online (SuperAdmin)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-3 flex justify-center">
              <div className="size-9 rounded-xl bg-gradient-to-tr from-navy-light to-saffron flex items-center justify-center text-white font-bold text-xs shadow-xs" title={user?.email || "Admin"}>
                {(user?.email || "PA").slice(0, 2).toUpperCase()}
              </div>
            </div>
          )}

          {/* Navigation Items Grouped by Category */}
          <div className="px-2 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)] no-scrollbar">
            {categories.map((cat) => {
              const items = TABS.filter((t) => t.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat} className="space-y-1">
                  {sidebarOpen && (
                    <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      {cat}
                    </div>
                  )}
                  {items.map((t) => {
                    const isActive = tab === t.id;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-saffron text-navy-deep shadow-gold font-extrabold"
                            : "text-slate-300 hover:bg-[#122345] hover:text-white"
                        }`}
                        title={t.label}
                      >
                        <Icon className={`size-4 shrink-0 ${isActive ? "text-navy-deep" : "text-saffron"}`} />
                        {sidebarOpen && <span className="truncate">{t.label}</span>}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#16233d] bg-[#050b17] space-y-2">
          {sidebarOpen ? (
            <>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-saffron transition-colors"
                >
                  <Globe className="size-3.5 text-saffron" />
                  <span>Public Site ↗</span>
                </a>
                <a
                  href="/portal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-saffron transition-colors"
                >
                  <GraduationCap className="size-3.5 text-saffron" />
                  <span>Student Portal ↗</span>
                </a>
              </div>

              <button
                type="button"
                onClick={async () => {
                  localStorage.setItem("gsss_sangla_admin_auth", "false");
                  localStorage.removeItem("gsss_sangla_admin_email");
                  await supabase.auth.signOut();
                  window.location.href = "/admin";
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500/15 border border-rose-500/30 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out Admin</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={async () => {
                localStorage.setItem("gsss_sangla_admin_auth", "false");
                localStorage.removeItem("gsss_sangla_admin_email");
                await supabase.auth.signOut();
                window.location.href = "/admin";
              }}
              className="w-full flex items-center justify-center p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA & TOP NAVBAR */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 px-4 sm:px-6 bg-[#070e1c] border-b border-[#16233d] flex items-center justify-between shrink-0 z-40">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Toggle Sidebar Menu"
            >
              <Menu className="size-5 text-saffron" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Admin ERP</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <currentTabObj.icon className="size-3.5 text-saffron" />
                {currentTabObj.label}
              </span>
            </div>
          </div>

          {/* Right Action Icons & Direct Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Sync Active</span>
            </div>

            <a
              href="/portal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/15 transition-all"
            >
              <GraduationCap className="size-3.5 text-saffron" />
              <span className="hidden sm:inline">Student Portal</span>
            </a>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-saffron/40 bg-saffron/15 px-3 py-1.5 text-xs font-bold text-saffron hover:bg-saffron hover:text-navy-deep transition-all"
            >
              <Globe className="size-3.5" />
              <span className="hidden sm:inline">View Public Site</span>
            </a>

            {/* Change Password Trigger */}
            <button
              type="button"
              onClick={() => setShowPassModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/15 hover:text-white transition-all"
              title="Change Admin Password"
            >
              <Key className="size-3.5 text-saffron" />
              <span className="hidden lg:inline">Change Password</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                localStorage.setItem("gsss_sangla_admin_auth", "false");
                await supabase.auth.signOut();
                window.location.href = "/admin";
              }}
              className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors"
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Container (AdminLTE Main View) */}
        <main className="flex-1 overflow-y-auto bg-[#f1f5f9] p-4 sm:p-6 lg:p-8 text-slate-900">
          <div className="max-w-7xl mx-auto space-y-6">
            {tab === "dashboard" && <AdminOverview onNavigate={(t) => setTab(t)} />}
            {tab === "content" && <SiteContentEditor />}
            {tab === "students" && <StudentManager onSelectStudentForResult={() => setTab("results")} />}
            {tab === "results" && <ResultManager />}
            {tab === "enquiries" && <Enquiries />}
            {tab === "messages" && <Messages />}
            {(tab === "notices" || tab === "news" || tab === "events") && (
              <ContentManager kind={tab} />
            )}

            {/* AdminLTE Footer Strip */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Megaphone className="size-4 text-saffron shrink-0" />
                <span>
                  <strong>GSSS Sangla Administration Suite v4.0</strong> — All changes are synchronized in real time.
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Govt. Sr. Sec. School Sangla, Kinnaur, H.P.
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================== */}
      {/* CHANGE MASTER PASSWORD MODAL */}
      {/* ========================================== */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-saffron/15 text-navy">
                  <Key className="size-5 text-saffron" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">Change Admin Password</h3>
                  <p className="text-xs text-muted-foreground">Update your master credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-navy">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-navy">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-navy">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white shadow-soft hover:bg-navy-light transition-all"
                >
                  <Lock className="size-3.5 text-saffron" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

