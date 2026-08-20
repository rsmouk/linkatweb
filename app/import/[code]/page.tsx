import type { Metadata } from "next";
import { getSharedFolder } from "@/lib/share";
import { FolderView } from "./folder-view";

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const folder = await getSharedFolder(code).catch(() => null);
  if (!folder) {
    return { title: "Folder unavailable — Linkat" };
  }
  return {
    title: `${folder.name} — Linkat`,
    description: `${folder.links.length} shared links from Linkat`,
  };
}

export default async function ImportPage({ params }: Props) {
  const { code } = await params;
  let folder = null;
  let configError = false;
  try {
    folder = await getSharedFolder(code);
  } catch {
    configError = true;
  }

  return (
    <main className="shell">
      <header className="brand">
        <a className="logo" href="/">
          LINKAT
        </a>
      </header>
      {configError ? (
        <section className="card empty">
          <h1>Could not connect to the database</h1>
          <p className="meta">Check the SUPABASE_URL and SUPABASE_ANON_KEY environment variables.</p>
        </section>
      ) : folder ? (
        <FolderView folder={folder} />
      ) : (
        <section className="card empty">
          <h1>This folder is missing or expired</h1>
          <p className="meta">Share links are valid for 24 hours only.</p>
          <a className="btn btn-ghost" href="/">
            Back
          </a>
        </section>
      )}
    </main>
  );
}
