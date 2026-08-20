"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
      <section className="card">
        <h1>فتح مجلد مشارك</h1>
        <p className="meta">
          الصق رابط المشاركة أو الكود المختصر من تطبيق لينكات لعرض الروابط.
        </p>
        <form className="home-form" onSubmit={onSubmit}>
          <input
            className="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="الرابط أو الكود"
            autoFocus
          />
          <button className="btn btn-primary" type="submit">
            عرض المجلد
          </button>
        </form>
      </section>
    </main>
  );
}
