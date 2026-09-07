import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";

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

const inputCls =
  "mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/20 shadow-sm";

function Contact() {
  const [sending, setSending] = useState(false);
  const { content } = useSiteContent();

  const DETAILS = [
    {
      icon: MapPin,
      title: "School Campus Address",
      lines: [content.schoolName, content.address],
      actionText: "Get Directions",
      actionHref: `https://www.google.com/maps/search/${encodeURIComponent(content.schoolName + " " + content.address)}`,
    },
    {
      icon: Phone,
      title: "Telephone & Admissions Desk",
      lines: [content.phone, "Principal Office & Admissions"],
      actionText: "Call School Office",
      actionHref: `tel:${content.phone.replace(/[^0-9+]/g, "")}`,
    },
    {
      icon: Mail,
      title: "Official Email Addresses",
      lines: [
        `Principal: ${content.email}`,
        "CBSE Official: 44363@cbseshiksha.in",
      ],
      actionText: "Send an Email",
      actionHref: `mailto:${content.email}`,
    },
    {
      icon: Clock,
      title: "Office Working Hours",
      lines: [content.officeHours, "Sunday & Govt Holidays: Closed"],
      actionText: "Office Schedule",
      actionHref: "#",
    },
  ];

  return (
    <>
      <PageHero
        title="Contact & Reach Us"
        subtitle="Have questions about admissions, academics, or school facilities? Get in touch with our administrative office."
        badge="We are Here to Help"
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Contact Information Cards (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <Reveal variant="right">
                <span className="section-label">Direct Communication</span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy mb-6">
                  Administrative Office Details
                </h2>
              </Reveal>

              {DETAILS.map((d, i) => (
                <Reveal key={d.title} delay={i * 80} variant="right">
                  <div className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                      <d.icon className="size-5 text-saffron" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-sm font-bold text-navy">{d.title}</h3>
                      {d.lines.map((l) => (
                        <p key={l} className="text-xs text-muted-foreground mt-0.5">
                          {l}
                        </p>
                      ))}
                      {d.actionHref !== "#" && (
                        <a
                          href={d.actionHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs font-bold text-saffron hover:underline mt-2"
                        >
                          {d.actionText} →
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Interactive Enquiry Form (Right) */}
            <div className="lg:col-span-7">
              <Reveal variant="left" delay={100}>
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
                    toast.success("Thank you! Your enquiry has been submitted. Our office will contact you soon.");
                  }}
                  className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-elevated"
                >
                  <div className="border-b border-border pb-4 mb-6">
                    <span className="section-label">Online Enquiry</span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                      Send a Message to the Administration
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Fill out the details below and we will respond within 1-2 school working days.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-navy">
                        Student / Parent Name *
                        <input required name="name" placeholder="Enter your full name" className={inputCls} />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-navy">
                        Email Address *
                        <input required type="email" name="email" placeholder="example@email.com" className={inputCls} />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-navy">
                        Phone Number
                        <input type="tel" name="phone" placeholder="+91 98765 43210" className={inputCls} />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-navy">
                        Subject / Query Type
                        <input name="subject" placeholder="e.g. Admission / Transfer Certificate" className={inputCls} />
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-navy">
                        Your Message / Enquiry *
                        <textarea
                          required
                          name="message"
                          rows={4}
                          placeholder="How can we assist you?"
                          className={inputCls}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="shimmer-btn mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-navy-deep py-3.5 text-sm font-bold text-primary-foreground shadow-soft hover:bg-navy-light transition-all disabled:opacity-60"
                  >
                    <Send className="size-4 text-saffron" />
                    <span>{sending ? "Transmitting enquiry…" : "Submit Official Enquiry"}</span>
                  </button>
                </form>
              </Reveal>
            </div>
          </div>

          {/* Embedded Map Section */}
          <div className="mt-16">
            <Reveal variant="up" delay={200}>
              <div className="overflow-hidden rounded-3xl border border-border shadow-elevated bg-card">
                <div className="bg-navy p-4 text-primary-foreground flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <MapPin className="size-4 text-saffron" />
                    <span>{content.address}</span>
                  </div>
                  <span className="text-[0.65rem] text-saffron-light">Interactive Map View</span>
                </div>
                <iframe
                  title="Interactive Map showing school location"
                  src={content.mapEmbedUrl || "https://www.openstreetmap.org/export/embed.html?bbox=78.24%2C31.39%2C78.32%2C31.45&layer=mapnik&marker=31.4234%2C78.2664"}
                  className="h-96 w-full border-0"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
