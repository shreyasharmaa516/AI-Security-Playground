import "./Home.css";
import Card from "../../components/Card/Card";

export default function Home() {
  return (
    <div className="home">

      <div className="stats">

        <Card
          title="Total Analyses"
          value="0"
        />

        <Card
          title="High Risk"
          value="0"
          color="#ef4444"
        />

        <Card
          title="Medium Risk"
          value="0"
          color="#f59e0b"
        />

        <Card
          title="Low Risk"
          value="0"
          color="#22c55e"
        />

      </div>

    </div>
  );
}