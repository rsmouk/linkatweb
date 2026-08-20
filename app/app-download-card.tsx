const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.linkat.linkat";

export function AppDownloadCard() {
  return (
    <a
      className="download-card"
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className="download-card-text">
        <strong>Download Linkat</strong>
        <span>Get the app from the store</span>
      </span>
      <span className="download-card-cta">Install</span>
    </a>
  );
}
