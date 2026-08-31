import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/admissions/form")({
  head: () => ({
    meta: [
      { title: "Online Admission Form | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Fill the online admission enquiry form for Govt. Sr. Sec. School Sangla, Kinnaur for the 2026-27 session.",
      },
      { property: "og:title", content: "Online Admission Form — GSSS Sangla" },
      {
        property: "og:description",
        content: "Apply online for admission to Govt. Sr. Sec. School Sangla.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/admissions/form" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/admissions/form" }],
  }),
  component: AdmissionForm,
});

const CLASSES = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 (Science)",
  "Class 11 (Commerce)",
  "Class 11 (Arts)",
];

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

function AdmissionForm() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <PageHero
        title="Online Admission Form"
        subtitle="Submit your details and our admission office will contact you with the next steps."
      />

      <section className="py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
              (e.target as HTMLFormElement).reset();
              toast.success("Admission enquiry submitted. Our office will contact you soon.");
            }, 600);
          }}
          className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          <h2 className="font-display text-xl font-bold text-navy">Student Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Student Full Name *">
              <input required name="name" className={inputCls} placeholder="Full name" />
            </Field>
            <Field label="Date of Birth *">
              <input required type="date" name="dob" className={inputCls} />
            </Field>
            <Field label="Gender">
              <select name="gender" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Class Applying For *">
              <select required name="class" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select class
                </option>
                {CLASSES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Previous School">
              <input name="prevSchool" className={inputCls} placeholder="Name of last school" />
            </Field>
            <Field label="Category">
              <select name="category" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>General</option>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>
                <option>EWS</option>
              </select>
            </Field>
          </div>

          <h2 className="mt-8 font-display text-xl font-bold text-navy">Parent / Guardian</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Father's Name *">
              <input required name="father" className={inputCls} />
            </Field>
            <Field label="Mother's Name *">
              <input required name="mother" className={inputCls} />
            </Field>
            <Field label="Mobile Number *">
              <input
                required
                type="tel"
                pattern="[0-9]{10}"
                name="phone"
                className={inputCls}
                placeholder="10-digit mobile number"
              />
            </Field>
            <Field label="Email">
              <input type="email" name="email" className={inputCls} />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Residential Address *">
              <textarea required name="address" rows={3} className={inputCls} />
            </Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-md bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            This is an admission enquiry. Final admission is confirmed only after document
            verification at the school office.
          </p>
        </form>
      </section>
    </>
  );
}
