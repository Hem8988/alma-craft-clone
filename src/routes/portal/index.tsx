import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  UserRound,
  Search,
  Printer,
  FileCheck2,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Building2,
  Download,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { SchoolLogo } from "@/components/site/SchoolLogo";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent, StudentResultRecord, StudentRecord } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/portal/")({
  head: () => ({
    meta: [
      { title: "Student & Parent Portal | Online Marksheet & Results | GSSS Sangla" },
      {
        name: "description",
        content:
          "Check and download official CBSE report cards, exam marks, student attendance, and login to the GSSS Sangla student and parent portal.",
      },
      { property: "og:title", content: "Student & Parent Portal — GSSS Sangla" },
      {
        property: "og:description",
        content: "Instant online marksheet verification and student login portal.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/portal" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/portal" }],
  }),
  component: Portal,
});

const inputCls =
  "mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-all";

function Portal() {
  const { user, isAdmin, loading } = useAuth();
  const { content } = useSiteContent();

  // Active Tab: "results" (Instant Search) | "login" (Account Login)
  const [activeTab, setActiveTab] = useState<"results" | "login">("results");

  // Search State
  const [searchRollNo, setSearchRollNo] = useState<string>("1201");
  const [searchedResult, setSearchedResult] = useState<StudentResultRecord | null>(() => {
    const list = content.resultsList || [];
    return list.find((r) => r.rollNo === "1201") || list[0] || null;
  });
  const [searchedStudent, setSearchedStudent] = useState<StudentRecord | null>(() => {
    const list = content.studentsList || [];
    return list.find((s) => s.rollNo === "1201") || list[0] || null;
  });
  const [searchError, setSearchError] = useState<string | null>(null);

  // Student Account Auth State
  const [studentAuthRoll, setStudentAuthRoll] = useState<string>("");
  const [studentAuthDob, setStudentAuthDob] = useState<string>("");
  const [loggedInStudent, setLoggedInStudent] = useState<StudentRecord | null>(null);

  // Result Search Handler
  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSearchError(null);
    const query = searchRollNo.trim().toLowerCase();
    if (!query) {
      setSearchError("Please enter a valid student Roll Number or Admission Number.");
      return;
    }

    const rList = content.resultsList || [];
    const sList = content.studentsList || [];

    const foundResult = rList.find(
      (r) =>
        (r.rollNo || "").toLowerCase() === query ||
        (r.admissionNo && (r.admissionNo || "").toLowerCase() === query) ||
        (r.studentName && (r.studentName || "").toLowerCase().includes(query))
    );

    const foundStudent = sList.find(
      (s) =>
        (s.rollNo || "").toLowerCase() === query ||
        (s.admissionNo && (s.admissionNo || "").toLowerCase() === query) ||
        (s.name && (s.name || "").toLowerCase().includes(query))
    );

    if (foundResult) {
      setSearchedResult(foundResult);
      setSearchedStudent(foundStudent || null);
      toast.success(`Marksheet found for ${foundResult.studentName} (Roll: ${foundResult.rollNo})`);
    } else {
      setSearchedResult(null);
      setSearchedStudent(null);
      setSearchError(
        `No exam result found for Roll No / ID "${searchRollNo.trim()}". Please check the roll number or try sample roll numbers: 1201, 1202, 1203, 1001.`
      );
    }
  }

  // Quick Roll No Pill Click
  function handleQuickSelect(roll: string) {
    setSearchRollNo(roll);
    const rList = content.resultsList || [];
    const sList = content.studentsList || [];
    const foundResult = rList.find((r) => r.rollNo === roll);
    const foundStudent = sList.find((s) => s.rollNo === roll);
    if (foundResult) {
      setSearchedResult(foundResult);
      setSearchedStudent(foundStudent || null);
      setSearchError(null);
      toast.success(`Loaded report card for Roll No ${roll}`);
    }
  }

  // Student Direct Login
  function handleStudentLogin(e: React.FormEvent) {
    e.preventDefault();
    const query = studentAuthRoll.trim().toLowerCase();
    const sList = content.studentsList || [];
    const found = sList.find(
      (s) =>
        (s.rollNo || "").toLowerCase() === query ||
        (s.admissionNo && (s.admissionNo || "").toLowerCase() === query) ||
        (s.email && (s.email || "").toLowerCase() === query)
    );

    if (found) {
      setLoggedInStudent(found);
      toast.success(`Welcome back, ${found.name}!`);
    } else {
      toast.error(`Student record not found for "${studentAuthRoll}". Try Roll No: 1201 or 1001.`);
    }
  }

  function handlePrintMarksheet() {
    window.print();
  }

  return (
    <>
      <PageHero
        title="Student & Parent Portal"
        subtitle="Online Marksheet Verification, CBSE Examination Results, and Academic Progress"
      />

      <section className="py-12 bg-background min-h-screen">
        <div className="mx-auto max-w-6xl px-4">
          {/* Main Top Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-2 rounded-2xl bg-muted p-1.5 border border-border w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("results")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "results"
                    ? "bg-navy text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-navy"
                }`}
              >
                <FileCheck2 className="size-4 text-saffron" />
                <span>Online Marksheet & Result</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "login"
                    ? "bg-navy text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-navy"
                }`}
              >
                <UserRound className="size-4 text-saffron" />
                <span>Student / Parent Login</span>
              </button>
            </div>

            {/* Quick Admin Access Link */}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl border border-saffron/40 bg-saffron/10 px-4 py-2 text-xs font-bold text-navy hover:bg-saffron hover:text-navy-deep transition-all shrink-0"
            >
              <span>🔒 Principal & Staff CMS</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: ONLINE MARKSHEET & RESULT VERIFICATION */}
          {/* ========================================================================= */}
          {activeTab === "results" && (
            <div className="mt-8 space-y-8 animate-fade-in">
              {/* Search Bar Card */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
                <div className="max-w-2xl">
                  <span className="section-label">Session 2025-26 / 2026-27</span>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-navy">
                    Instant Online Marksheet Search
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
                    Enter the student's Roll Number or Admission Number to view and print the certified report card.
                  </p>
                </div>

                <form onSubmit={handleSearch} className="mt-6 grid gap-4 sm:grid-cols-12 items-end">
                  <div className="sm:col-span-8">
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/80 mb-1">
                      Student Roll Number / Admission No:
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchRollNo}
                        onChange={(e) => setSearchRollNo(e.target.value)}
                        placeholder="e.g. 1201, 1202, 1001, GSSS-2022-1201"
                        className="w-full rounded-2xl border border-input bg-background pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <button
                      type="submit"
                      className="shimmer-btn w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-amber-500 py-3 text-sm font-black text-navy-deep shadow-gold hover:scale-[1.02] transition-all"
                    >
                      <Search className="size-4" />
                      <span>Search Marksheet</span>
                    </button>
                  </div>
                </form>

                {/* Quick Sample Roll Numbers */}
                <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-navy/70">Quick Test Samples:</span>
                  {[
                    { roll: "1201", label: "Roll 1201 (Class 12 Non-Med • 96%)" },
                    { roll: "1202", label: "Roll 1202 (Class 12 Medical • 92.4%)" },
                    { roll: "1203", label: "Roll 1203 (Class 12 Commerce • 89.6%)" },
                    { roll: "1204", label: "Roll 1204 (Class 12 Arts • 91.2%)" },
                    { roll: "1001", label: "Roll 1001 (Class 10 Topper • 94.8%)" },
                    { roll: "1002", label: "Roll 1002 (Class 10 • 87.2%)" },
                  ].map((s) => (
                    <button
                      key={s.roll}
                      type="button"
                      onClick={() => handleQuickSelect(s.roll)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition-all ${
                        searchRollNo === s.roll
                          ? "bg-navy text-primary-foreground border-navy"
                          : "bg-muted text-foreground/80 border-border hover:bg-muted/80"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {searchError && (
                  <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium">
                    {searchError}
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* CERTIFIED DIGITAL MARKSHEET CARD (PRINTABLE) */}
              {/* ========================================================================= */}
              {searchedResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Official Certified Result
                    </span>
                    <button
                      type="button"
                      onClick={handlePrintMarksheet}
                      className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-soft hover:bg-navy-deep transition-all"
                    >
                      <Printer className="size-4 text-saffron" />
                      <span>Print / Download PDF Marksheet</span>
                    </button>
                  </div>

                  {/* Marksheet Body */}
                  <div
                    id="printable-marksheet"
                    className="relative overflow-hidden rounded-3xl border-2 border-navy/20 bg-card p-6 sm:p-10 shadow-elevated"
                  >
                    {/* Official Institutional Header */}
                    <div className="border-b-2 border-navy/30 pb-6 text-center space-y-2">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <SchoolLogo size="md" showText={false} />
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-navy/70">
                            DIRECTORATE OF HIGHER EDUCATION • GOVT. OF HIMACHAL PRADESH
                          </p>
                          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy">
                            {content.schoolName}
                          </h2>
                          <p className="text-xs font-bold text-saffron">
                            Kinnaur District, Himachal Pradesh - 172106 • CBSE Affiliation No: 630121
                          </p>
                        </div>
                      </div>

                      <div className="inline-block rounded-full bg-navy px-6 py-1.5 text-xs font-black text-primary-foreground uppercase tracking-widest mt-2">
                        {searchedResult.examName || "Annual Examination"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Academic Session: <strong>{searchedResult.academicYear || (searchedResult as any).academicSession || "2025-26"}</strong> • Date of Issue:{" "}
                        <strong>{searchedResult.issueDate || "2026-03-30"}</strong>
                      </p>
                    </div>

                    {/* Candidate Particulars Grid */}
                    <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-muted/50 p-4 border border-border text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Candidate Name</span>
                        <strong className="text-navy text-sm">{searchedResult.studentName}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Roll Number</span>
                        <strong className="text-navy text-sm font-mono">{searchedResult.rollNo}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Class & Stream</span>
                        <strong className="text-navy">
                          {searchedResult.className || (searchedResult as any).studentClass || "Class XII"}{" "}
                          {searchedResult.stream ? `(${searchedResult.stream})` : ""}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Father's Name</span>
                        <strong className="text-navy">{searchedResult.fatherName || "N/A"}</strong>
                      </div>
                      {searchedResult.admissionNo && (
                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase font-bold">Admission Number</span>
                          <strong className="text-navy font-mono">{searchedResult.admissionNo}</strong>
                        </div>
                      )}
                      {searchedResult.dob && (
                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase font-bold">Date of Birth</span>
                          <strong className="text-navy">{searchedResult.dob}</strong>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">School Board</span>
                        <strong className="text-navy">CBSE, New Delhi</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Status</span>
                        <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 font-bold text-[10px]">
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Subject Marks Table */}
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-navy text-primary-foreground font-bold uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Subject Name</th>
                            <th className="py-3 px-4 text-center">Theory Marks</th>
                            <th className="py-3 px-4 text-center">Practical / IA</th>
                            <th className="py-3 px-4 text-center">Marks Obtained</th>
                            <th className="py-3 px-4 text-center">Max Marks</th>
                            <th className="py-3 px-4 text-center">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border font-medium">
                          {(searchedResult.subjectScores || (searchedResult as any).scores || []).map((score: any, i: number) => (
                            <tr key={i} className="hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-4 font-bold text-navy">{score.subjectName}</td>
                              <td className="py-3 px-4 text-center font-mono">{score.marksTheory ?? score.theoryMarks ?? "-"}</td>
                              <td className="py-3 px-4 text-center font-mono">{score.marksPractical ?? score.practicalMarks ?? "-"}</td>
                              <td className="py-3 px-4 text-center font-bold text-navy font-mono">
                                {score.marksObtained}
                              </td>
                              <td className="py-3 px-4 text-center text-muted-foreground font-mono">{score.maxMarks || 100}</td>
                              <td className="py-3 px-4 text-center font-bold text-saffron font-mono">
                                {score.grade || "A1"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-muted/80 font-bold border-t-2 border-navy text-navy">
                          <tr>
                            <td className="py-3.5 px-4 font-extrabold text-sm" colSpan={3}>
                              GRAND TOTAL
                            </td>
                            <td className="py-3.5 px-4 text-center font-extrabold text-base text-navy font-mono">
                              {searchedResult.totalMarksObtained}
                            </td>
                            <td className="py-3.5 px-4 text-center font-extrabold text-muted-foreground font-mono">
                              {searchedResult.totalMaxMarks}
                            </td>
                            <td className="py-3.5 px-4 text-center font-extrabold text-saffron text-sm">
                              {searchedResult.overallGrade}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Result Summary & Badges */}
                    <div className="mt-6 grid sm:grid-cols-3 gap-4 rounded-2xl bg-gradient-to-r from-navy-deep to-navy p-5 text-primary-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-saffron/20 text-saffron">
                          <TrendingUp className="size-6" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-primary-foreground/70">Aggregate Percentage</p>
                          <p className="text-2xl font-black text-saffron-light font-display">
                            {(searchedResult.percentage ?? 0).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                          <CheckCircle2 className="size-6" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-primary-foreground/70">Final Result Status</p>
                          <p className="text-sm font-bold text-white">{searchedResult.resultStatus || "Passed"}</p>
                          {(searchedResult as any).rank && (
                            <p className="text-[10px] text-saffron">{(searchedResult as any).rank}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                          <Award className="size-6" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-primary-foreground/70">Overall Grade</p>
                          <p className="text-xl font-bold text-white">{searchedResult.overallGrade || "A1"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Remarks and Signatures */}
                    <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-muted-foreground">
                      <div className="max-w-md">
                        <span className="font-bold text-navy block text-[11px]">Teacher / Principal's Remarks:</span>
                        <p className="italic mt-0.5">
                          "{searchedResult.remarks || (searchedResult as any).teacherRemarks || "Outstanding academic performance throughout the session. Exemplary conduct."}"
                        </p>
                      </div>

                      <div className="flex items-center gap-8 self-end sm:self-center text-center">
                        <div>
                          <div className="h-10 border-b border-navy/40 w-28 flex items-end justify-center font-display text-[10px] font-bold text-navy">
                            Sh. B. S. Negi
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mt-1 text-navy">
                            Principal
                          </span>
                        </div>
                        <div>
                          <div className="h-10 border-b border-navy/40 w-28 flex items-end justify-center font-display text-[10px] font-bold text-navy">
                            Class Mentor
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mt-1 text-navy">
                            Exam Controller
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Verification Strip */}
                    <div className="mt-6 pt-3 border-t border-dashed border-border/80 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Certified electronic record generated by GSSS Sangla ERP Portal.</span>
                      <span className="font-mono">VERIFIED CODE: HP-KIN-SANGLA-{searchedResult.rollNo}-2026</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: STUDENT & PARENT LOGIN PORTAL */}
          {/* ========================================================================= */}
          {activeTab === "login" && (
            <div className="mt-8 animate-fade-in">
              {loggedInStudent ? (
                /* Logged-In Student Dashboard */
                <div className="space-y-6">
                  <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex size-16 items-center justify-center rounded-2xl bg-navy text-primary-foreground font-display text-2xl font-bold">
                        {(loggedInStudent.name || "ST").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-display text-2xl font-bold text-navy">{loggedInStudent.name}</h2>
                          <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                            {loggedInStudent.status || "Active"} Student
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Roll No: <strong className="text-navy">{loggedInStudent.rollNo}</strong> •{" "}
                          {loggedInStudent.className || (loggedInStudent as any).studentClass || "Class XII"} (
                          {loggedInStudent.stream || "General"})
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLoggedInStudent(null)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut className="size-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>

                  {/* Student Overview Cards */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Attendance Record</p>
                      <p className="font-display text-3xl font-extrabold text-navy mt-1">
                        {loggedInStudent.attendancePercent ?? (loggedInStudent as any).attendancePercentage ?? 94}%
                      </p>
                      <p className="text-[11px] text-emerald-600 mt-1">✓ Regular & Meets CBSE Norms</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Admission Number</p>
                      <p className="font-display text-xl font-bold text-navy mt-2 font-mono">
                        {loggedInStudent.admissionNo || "GSSS-SANGLA-2025"}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">Govt. Registered Candidate</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Father's Name</p>
                      <p className="font-display text-base font-bold text-navy mt-2">
                        {loggedInStudent.fatherName || "N/A"}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Contact: {loggedInStudent.phone || "+91 82193-98898"}
                      </p>
                    </div>
                  </div>

                  {/* Quick Action: View Marksheet */}
                  <div className="rounded-2xl bg-gradient-to-r from-navy to-navy-deep p-6 text-primary-foreground flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">Annual Examination Marksheet Available</h3>
                      <p className="text-xs text-primary-foreground/80 mt-1">
                        Your official certified report card for Session 2025-26 is ready for viewing and printing.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleQuickSelect(loggedInStudent.rollNo);
                        setActiveTab("results");
                      }}
                      className="shimmer-btn rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-6 py-2.5 text-xs font-black text-navy-deep shadow-gold hover:scale-105 transition-all shrink-0"
                    >
                      View & Print Marksheet →
                    </button>
                  </div>
                </div>
              ) : (
                /* Student Login Form */
                <div className="mx-auto max-w-md">
                  <div className="rounded-3xl border border-border bg-card p-7 sm:p-8 shadow-soft space-y-6">
                    <div className="text-center space-y-1">
                      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-navy text-saffron shadow-sm">
                        <GraduationCap className="size-7" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-navy pt-2">Student & Parent Sign In</h2>
                      <p className="text-xs text-muted-foreground">
                        Enter your Roll Number or Admission ID to access your profile.
                      </p>
                    </div>

                    <form onSubmit={handleStudentLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy/80">
                          Roll Number / Admission No:
                        </label>
                        <input
                          required
                          type="text"
                          value={studentAuthRoll}
                          onChange={(e) => setStudentAuthRoll(e.target.value)}
                          placeholder="e.g. 1201, 1202, 1001"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy/80">
                          Date of Birth (Optional Password):
                        </label>
                        <input
                          type="text"
                          value={studentAuthDob}
                          onChange={(e) => setStudentAuthDob(e.target.value)}
                          placeholder="DD/MM/YYYY"
                          className={inputCls}
                        />
                      </div>

                      <button
                        type="submit"
                        className="shimmer-btn w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-bold text-primary-foreground shadow-soft hover:bg-navy-deep transition-all"
                      >
                        <Lock className="size-4 text-saffron" />
                        <span>Sign In to Student Account</span>
                      </button>
                    </form>

                    {/* Quick Demo Sign In Buttons */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs font-bold text-navy mb-2 text-center">1-Click Test Sign In:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const found = content.studentsList.find((s) => s.rollNo === "1201");
                            if (found) setLoggedInStudent(found);
                          }}
                          className="rounded-xl bg-muted p-2 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-all text-center"
                        >
                          Arun (Roll 1201)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const found = content.studentsList.find((s) => s.rollNo === "1001");
                            if (found) setLoggedInStudent(found);
                          }}
                          className="rounded-xl bg-muted p-2 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-all text-center"
                        >
                          Sneha (Roll 1001)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

