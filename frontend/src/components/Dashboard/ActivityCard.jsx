import "./ActivityCard.css";

import { useHistory } from "../../context/HistoryContext";

export default function ActivityCard() {

  const { history } = useHistory();

  const recent = history.slice(0, 5);

  function dotClass(severity) {

    switch (severity.toLowerCase()) {

      case "critical":
        return "critical";

      case "high":
        return "warning";

      default:
        return "success";
    }
  }

  return (
    <div className="activity-card">

      <div className="activity-header">
        <h2>Recent Activity</h2>
      </div>

      <div className="timeline">

        {recent.map((item) => (

          <div
            className="activity-item"
            key={item.id}
          >

            <span
              className={`dot ${dotClass(item.severity)}`}
            ></span>

            <div>

              <h4>

                {item.prompt.length > 45
                  ? item.prompt.substring(0, 45) + "..."
                  : item.prompt}

              </h4>

              <p>

                {item.severity} Risk •{" "}

                {new Date(item.created_at).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}