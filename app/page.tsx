"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { AppDownloadCard } from "./app-download-card";

export default function HomePage() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = value.trim();
    if (!raw) return;
    const match = raw.match(/([A-Za-z0-9]{6,12})\s*$/);
    const code = (match?.[1] ?? raw).toUpperCase();
    router.push(`/import/${encodeURIComponent(code)}`);
  }

  return (
    <main className="shell">
      <header className="brand">
        <div className="logo">LINKAT</div>
      </header>
      <AppDownloadCard />
      <section className="card">
        <h1>Open a shared folder</h1>
        <p className="meta">
          Paste a Linkat share link or short code to view the folder links.
        </p>
        <form className="home-form" onSubmit={onSubmit}>
          <input
            className="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Share link or code"
            autoFocus
          />
          <button className="btn btn-primary" type="submit">
            View folder
          </button>
        </form>
      </section>
    </main>
  );
}
