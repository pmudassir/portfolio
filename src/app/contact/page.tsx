"use client";

import type { Metadata } from "next";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType || "General"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:mudassir@mudassirmhd.in?subject=${subject}&body=${body}`);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("mudassir@mudassirmhd.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[var(--color-text-primary)]">
          Let&apos;s collaborate
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
          Currently accepting high-impact projects and architectural consulting.
        </p>
      </section>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-3">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-[var(--color-border)] pb-3 text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-2 border-[var(--color-border)] pb-3 text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-3">
            Project Type
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full bg-transparent border-b-2 border-[var(--color-border)] pb-3 text-lg text-[var(--color-text-primary)] focus:border-[var(--color-primary)] outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-[var(--color-surface)]">Select an option</option>
            <option value="Web Application" className="bg-[var(--color-surface)]">Web Application</option>
            <option value="Mobile Application" className="bg-[var(--color-surface)]">Mobile Application</option>
            <option value="Full-Stack Project" className="bg-[var(--color-surface)]">Full-Stack Project</option>
            <option value="Architecture Consulting" className="bg-[var(--color-surface)]">Architecture Consulting</option>
            <option value="Other" className="bg-[var(--color-surface)]">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-3">
            Message
          </label>
          <textarea
            placeholder="Tell me about your project scope and goals..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full bg-transparent border-b-2 border-[var(--color-border)] pb-3 text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none transition-colors resize-none"
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4">
          <button
            type="submit"
            className="px-10 py-4 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Send Inquiry
          </button>
          <a
            href="mailto:mudassir@mudassirmhd.in"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Schedule a quick call
          </a>
        </div>
      </form>

      {/* Direct Links */}
      <section className="pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-6">
          Or reach me directly
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="mailto:mudassir@mudassirmhd.in"
            className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors"
          >
            <svg className="size-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="text-sm text-[var(--color-text-secondary)]">Email</span>
          </a>
          <a
            href="https://linkedin.com/in/mudassir-mohammed"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors"
          >
            <svg className="size-5 text-[var(--color-primary)] fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-sm text-[var(--color-text-secondary)]">LinkedIn</span>
          </a>
          <a
            href="https://github.com/mudassir-mohammed"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors"
          >
            <svg className="size-5 text-[var(--color-primary)] fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm text-[var(--color-text-secondary)]">GitHub</span>
          </a>
        </div>

        {/* Copy Email */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={copyEmail}
            className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
          >
            {copied ? "Copied!" : "Copy Email"}
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
