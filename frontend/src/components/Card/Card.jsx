import "./Card.css";

export default function Card({
  title,
  value,
  color = "#3b82f6",
}) {
  return (
    <div className="card">
      <h4>{title}</h4>

      <h2 style={{ color }}>
        {value}
      </h2>
    </div>
  );
}