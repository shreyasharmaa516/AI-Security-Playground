import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { ATTACK_LIBRARY } from "../attackLibrary";
import "./AttackSimulationLab.css";

export default function AttackSimulationLab({ onSelect, onRun }) {
  return (
    <Card className="attack-lab">
      <div className="attack-lab__header">
        <div>
          <h2>🧪 Attack Simulation Lab</h2>
          <p>Test Sentra against real-world OWASP LLM attack scenarios.</p>
        </div>
      </div>

      <div className="attack-grid">
        {ATTACK_LIBRARY.map((attack) => (
          <div key={attack.id} className="attack-card">
            <h3>{attack.name}</h3>

            <span
              className={`severity severity-${attack.severity.toLowerCase()}`}
            >
              {attack.severity}
            </span>

            <p>{attack.category}</p>

            <Button variant="primary" onClick={() => onRun?.(attack.prompt)}>
              Run Attack
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
