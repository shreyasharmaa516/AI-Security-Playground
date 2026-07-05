import "./StatCard.css";

export default function StatCard({
  title,
  value,
  subtitle,
  accent,
}) {
  return (
    <div className="stat-card">
      <div
        className="stat-accent"
        style={{ background: accent }}
      />

      <div className="stat-main">
        <div className="stat-top">
          <h2>{value}</h2>
          <span>{subtitle}</span>
        </div>

        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
}