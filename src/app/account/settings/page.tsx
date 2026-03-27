"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import Link from "next/link";

export default function SettingsPage() {
  const { user, isLoggedIn } = useUser();
  const [saved, setSaved] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center py-20">
        <p style={{ color: "var(--muted)" }}>
          Please <Link href="/account" style={{ color: "#C5A572" }}>sign in</Link> to access settings.
        </p>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2
        className="text-[28px] font-normal mb-8"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Account Settings
      </h2>

      <div className="space-y-10">
        {/* Personal info */}
        <section>
          <h3 className="text-[16px] mb-4 pb-3 border-b" style={{ color: "var(--text)", borderColor: "var(--border-color)" }}>
            Personal Information
          </h3>
          <form onSubmit={handleSave} className="space-y-4 max-w-[480px]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] block mb-1" style={{ color: "var(--muted)" }}>First Name</label>
                <input
                  defaultValue={user.name.split(" ")[0]}
                  className="w-full px-3 py-2.5 border text-[14px] outline-none rounded-[3px]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text)", backgroundColor: "var(--bg)" }}
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] block mb-1" style={{ color: "var(--muted)" }}>Last Name</label>
                <input
                  defaultValue={user.name.split(" ")[1] ?? ""}
                  className="w-full px-3 py-2.5 border text-[14px] outline-none rounded-[3px]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text)", backgroundColor: "var(--bg)" }}
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.1em] block mb-1" style={{ color: "var(--muted)" }}>Email</label>
              <input
                defaultValue={user.email}
                type="email"
                className="w-full px-3 py-2.5 border text-[14px] outline-none rounded-[3px]"
                style={{ borderColor: "var(--border-color)", color: "var(--text)", backgroundColor: "var(--bg)" }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 text-[12px] uppercase tracking-[0.15em] transition-all"
              style={{ backgroundColor: saved ? "#2D5A27" : "#C5A572", color: "#0A0A0A" }}
            >
              {saved ? "✓ Saved" : "Save Changes"}
            </button>
          </form>
        </section>

        {/* Password */}
        <section>
          <h3 className="text-[16px] mb-4 pb-3 border-b" style={{ color: "var(--text)", borderColor: "var(--border-color)" }}>
            Change Password
          </h3>
          <div className="space-y-4 max-w-[480px]">
            {["Current Password", "New Password", "Confirm New Password"].map((label) => (
              <div key={label}>
                <label className="text-[11px] uppercase tracking-[0.1em] block mb-1" style={{ color: "var(--muted)" }}>{label}</label>
                <input
                  type="password"
                  className="w-full px-3 py-2.5 border text-[14px] outline-none rounded-[3px]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text)", backgroundColor: "var(--bg)" }}
                />
              </div>
            ))}
            <button
              className="px-6 py-2.5 text-[12px] uppercase tracking-[0.15em] border transition-all hover:border-[#C5A572] hover:text-[#C5A572]"
              style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
            >
              Update Password
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-[16px] mb-4 pb-3 border-b" style={{ color: "var(--text)", borderColor: "var(--border-color)" }}>
            Email Preferences
          </h3>
          <div className="space-y-3">
            {[
              { label: "New artwork alerts", desc: "Be notified when new works by your favourite artists arrive" },
              { label: "Limited edition drops", desc: "First access to limited edition releases" },
              { label: "Monthly gallery letter", desc: "Curator picks, artist features, and art world news" },
            ].map((pref) => (
              <label key={pref.label} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1" style={{ accentColor: "#C5A572" }} />
                <div>
                  <p className="text-[14px]" style={{ color: "var(--text)" }}>{pref.label}</p>
                  <p className="text-[12px]" style={{ color: "var(--muted)" }}>{pref.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
