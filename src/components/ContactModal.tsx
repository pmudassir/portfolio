"use client";

import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, construct a mailto link
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType || "General"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:mudassir@mudassirmhd.in?subject=${subject}&body=${body}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Close modal"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Let&apos;s collaborate
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Currently accepting high-impact projects and architectural consulting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-2">
              Project Type
            </label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-[var(--color-surface)]">Select an option</option>
              <option value="web-app" className="bg-[var(--color-surface)]">Web Application</option>
              <option value="mobile-app" className="bg-[var(--color-surface)]">Mobile Application</option>
              <option value="full-stack" className="bg-[var(--color-surface)]">Full-Stack Project</option>
              <option value="consulting" className="bg-[var(--color-surface)]">Architecture Consulting</option>
              <option value="other" className="bg-[var(--color-surface)]">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-2">
              Message
            </label>
            <textarea
              placeholder="Tell me about your project scope and goals..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none transition-colors resize-none"
              required
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
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

        <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex justify-end">
          <button
            onClick={() => {
              navigator.clipboard.writeText("mudassir@mudassirmhd.in");
            }}
            className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
          >
            Copy Email
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
