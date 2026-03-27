"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, MapPin, Clock } from "lucide-react";

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  multiline = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const inputProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    placeholder: " ",
    className: `w-full pt-6 pb-2 px-3 text-[14px] border rounded-[3px] outline-none transition-colors resize-none`,
    style: {
      borderColor: focused ? "#C5A572" : "var(--border-color)",
      backgroundColor: "var(--bg)",
      color: "var(--text)",
    },
  };

  return (
    <div className="relative">
      {multiline ? (
        <textarea {...inputProps} rows={4} />
      ) : (
        <input type={type} {...inputProps} />
      )}
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none"
        style={{
          top: focused || hasValue ? "6px" : "50%",
          transform: focused || hasValue ? "translateY(0) scale(0.8)" : "translateY(-50%)",
          transformOrigin: "left",
          color: focused ? "#C5A572" : "var(--muted)",
          fontSize: focused || hasValue ? "11px" : "14px",
        }}
      >
        {label} {required && "*"}
      </label>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-[40px] md:text-[56px] font-normal mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Get in Touch
          </h1>
          <p className="text-[15px]" style={{ color: "var(--muted)" }}>
            We&apos;d love to hear from you — whether it&apos;s a question about an order, artwork advice, or a business enquiry.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput
                      label="Your name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <FloatingInput
                      label="Email address"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                  </div>
                  <FloatingInput
                    label="Subject"
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                    required
                  />
                  <FloatingInput
                    label="Message"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    required
                    multiline
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 text-[13px] uppercase tracking-[0.2em] font-medium transition-all hover:brightness-110"
                    style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                  >
                    Send Message
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-4 py-8"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(197,165,114,0.15)" }}
                  >
                    <Check size={24} style={{ color: "#C5A572" }} />
                  </div>
                  <h3
                    className="text-[26px]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    Message sent!
                  </h3>
                  <p style={{ color: "var(--muted)" }}>
                    We&apos;ll get back to you within 1–2 business days.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail size={18} style={{ color: "#C5A572", marginTop: "2px" }} />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.15em] mb-1" style={{ color: "var(--muted)" }}>Email</p>
                  <a href="mailto:hello@arthaus.com" className="text-[15px] hover:text-[#C5A572] transition-colors" style={{ color: "var(--text)" }}>
                    hello@arthaus.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} style={{ color: "#C5A572", marginTop: "2px" }} />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.15em] mb-1" style={{ color: "var(--muted)" }}>Studio</p>
                  <p className="text-[15px]" style={{ color: "var(--text)" }}>
                    14 Rue des Artistes<br />
                    Paris, France 75014
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={18} style={{ color: "#C5A572", marginTop: "2px" }} />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.15em] mb-1" style={{ color: "var(--muted)" }}>Hours</p>
                  <p className="text-[15px]" style={{ color: "var(--text)" }}>
                    Mon–Fri: 9am–6pm CET<br />
                    Weekends: By appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
