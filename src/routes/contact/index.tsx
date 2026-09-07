import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: [
      { title: "Contact Us | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Address, phone, email and enquiry form for Govt. Sr. Sec. School Sangla, Kinnaur District, Himachal Pradesh.",
      },
      { property: "og:title", content: "Contact GSSS Sangla" },
      {
        property: "og:description",
        content: "Reach the school office — address, phone, email and office hours.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/contact" }],
  }),
  component: Contact,
});

const DETAILS = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Govt. Sr. Sec. School Sangla", "Sangla, Kinnaur District", "Himachal Pradesh - 172106"],
  },
  { icon: Phone, title: "Phone", lines: ["+91 1786-XXXXXX"] },
  { icon: Mail, title: "Email", lines: ["gssssangla@gmail.com"] },
  { icon: Clock, title: "Office Hours", lines: ["Monday - Saturday", "9:00 AM - 4:00 PM"] },
];

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're happy to answer your questions about admissions, academics and campus life."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Get in Touch</h2>
            <div className="mt-6 space-y-4">
              {DETAILS.map((d) => (
                <div
                  key={d.title}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-soft"
                >
                  <d.icon className="mt-1 size-5 shrink-0 text-saffron" />
                  <div>
                    <h3 className="font-semibold">{d.title}</h3>
                    {d.lines.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fd = new FormData(form);
              setSending(true);
              const { error } = await supabase.from("contact_messages").insert({
                name: String(fd.get("name") ?? "").trim(),
                email: String(fd.get("email") ?? "").trim(),
                phone: String(fd.get("phone") ?? "").trim() || null,
                subject: String(fd.get("subject") ?? "").trim() || null,
                message: String(fd.get("message") ?? "").trim(),
              });
              setSending(false);
              if (error) {
                toast.error("Message could not be sent. Please try again.");
                return;
              }
              form.reset();
              toast.success("Message sent. We'll get back to you shortly.");
            }}
            className="rounded-xl border border-border bg-card p-6 shadow-soft"
          >
            <h2 className="font-display text-2xl font-bold text-navy">Send a Message</h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm font-medium">
                Your Name *<input required name="name" className={inputCls} />
              </label>
              <label className="text-sm font-medium">
                Email *<input required type="email" name="email" className={inputCls} />
              </label>
              <label className="text-sm font-medium">
                Phone
                <input type="tel" name="phone" className={inputCls} />
              </label>
              <label className="text-sm font-medium">
                Subject
                <input name="subject" className={inputCls} />
              </label>
              <label className="text-sm font-medium">
                Message *<textarea required name="message" rows={5} className={inputCls} />
              </label>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-5 w-full rounded-md bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4">
          <div className="overflow-hidden rounded-xl border border-border shadow-soft">
            <iframe
              title="Map showing Sangla, Kinnaur"
              src="https://www.openstreetmap.org/export/embed.html?bbox=78.24%2C31.39%2C78.32%2C31.45&layer=mapnik&marker=31.4234%2C78.2664"
              className="h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
