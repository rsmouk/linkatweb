import type { SharedFolder } from "@/lib/share";

function faviconFor(link: SharedFolder["links"][number]): string {
  if (link.favicon_url) return link.favicon_url;
  const host = link.domain || safeHost(link.url);
  if (!host) return "";
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
}

function safeHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function formatExpiry(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function linkLabel(count: number): string {
  return count === 1 ? "1 link" : `${count} links`;
}

export function FolderView({ folder }: { folder: SharedFolder }) {
  const appLink = `linkat://import/${folder.short_code}`;

  return (
    <section className="card">
      <h1>{folder.name}</h1>
      <p className="meta">
        {linkLabel(folder.links.length)} · expires {formatExpiry(folder.expires_at)} ·{" "}
        {folder.short_code}
      </p>
      <div className="actions">
        <a className="btn btn-primary" href={appLink}>
          Open in Linkat
        </a>
      </div>
      <div className="list">
        {folder.links.map((link) => (
          <a
            key={link.id}
            className="link-row"
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="favicon"
              src={faviconFor(link)}
              alt=""
              width={36}
              height={36}
            />
            <span>
              <span className="title">{link.title || link.domain || link.url}</span>
              <span className="domain">{link.domain || safeHost(link.url)}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
