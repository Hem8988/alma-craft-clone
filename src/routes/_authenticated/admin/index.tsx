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
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Panel | GSSS Sangla" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

type Tab = "enquiries" | "messages" | "notices" | "news" | "events";

const TABS: { id: Tab; label: string; icon: typeof Bell }[] = [
  { id: "enquiries", label: "Admissions", icon: Inbox },
  { id: "messages", label: "Messages", icon: MailOpen },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "news", label: "News", icon: Newspaper },
  { id: "events", label: "Events", icon: CalendarDays },
];

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
type Row = Record<string, any>;

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
    if (error) return toast.error(error.message);
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
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["admin", kind] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from(cfg.table).delete().eq("id", id);
    if (error) return toast.error(error.message);
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
          className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-navy-deep transition-opacity hover:opacity-90"
        >
          {adding ? "Cancel" : "+ Add New"}
        </button>
      </div>

      {adding && (
        <form
          onSubmit={handleAdd}
          className="mt-4 grid gap-4 rounded-xl border border-border bg-muted/40 p-5 sm:grid-cols-2"
        >
          {cfg.fields.map((f) => (
            <label key={f.name} className={`block text-sm font-medium ${f.textarea ? "sm:col-span-2" : ""}`}>
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
              className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Saving…" : "Publish"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Nothing here yet. Click "Add New" to publish the first one.
          </p>
        )}
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-soft"
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
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-navy"
              >
                {row.is_published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
              <button
                type="button"
                title="Delete"
                onClick={() => remove(row.id)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
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
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("admission_enquiries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted.");
    queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">
        Admission Enquiries ({rows.length})
      </h2>
      <div className="mt-5 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No admission enquiries yet. Submissions from the online form will appear here.
          </p>
        )}
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-navy">
                  {r.student_name} <span className="text-sm font-normal text-muted-foreground">— {r.class_applying}</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
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
                  className="rounded-md border border-input bg-background px-2 py-1.5 text-xs"
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
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
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
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted.");
    queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">Contact Messages ({rows.length})</h2>
      <div className="mt-5 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No messages yet. Messages from the contact page will appear here.
          </p>
        )}
        {rows.map((r) => (
          <div
            key={r.id}
            className={`rounded-xl border bg-card p-4 shadow-soft ${r.is_read ? "border-border" : "border-saffron"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-navy">
                  {r.subject || "General enquiry"}{" "}
                  {!r.is_read && (
                    <span className="ml-1 rounded-full bg-saffron px-2 py-0.5 text-[0.65rem] font-semibold uppercase text-navy-deep">
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
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-navy"
                >
                  {r.is_read ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => remove(r.id)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
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

function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("enquiries");

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="size-8 animate-spin text-saffron" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-md px-4 text-center">
          <ShieldAlert className="mx-auto size-12 text-saffron" />
          <h1 className="mt-4 font-display text-2xl font-bold text-navy">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user?.email}) does not have administrator rights. Please ask the school
            office to grant you access.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {user?.email} · Manage enquiries, notices, news and events.
            </p>
          </div>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/portal";
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LogOut className="size-4" /> Sign Out
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-navy text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-navy"
              }`}
            >
              <t.icon className="size-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "enquiries" && <Enquiries />}
          {tab === "messages" && <Messages />}
          {(tab === "notices" || tab === "news" || tab === "events") && (
            <ContentManager kind={tab} />
          )}
        </div>

        <p className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Megaphone className="size-3.5 text-saffron" />
          Changes made here go live on the website immediately after publishing.
        </p>
      </div>
    </section>
  );
}
