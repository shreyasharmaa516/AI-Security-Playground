import "./ActivityCard.css";

export default function ActivityCard() {
  return (
    <div className="activity-card">

      <div className="activity-header">
        <h2>Recent Activity</h2>
      </div>

      <div className="timeline">

        <div className="activity-item">
          <span className="dot critical"></span>

          <div>
            <h4>Critical prompt detected</h4>
            <p>2 minutes ago</p>
          </div>
        </div>

        <div className="activity-item">
          <span className="dot warning"></span>

          <div>
            <h4>High risk prompt analyzed</h4>
            <p>18 minutes ago</p>
          </div>
        </div>

        <div className="activity-item">
          <span className="dot success"></span>

          <div>
            <h4>Safe prompt processed</h4>
            <p>34 minutes ago</p>
          </div>
        </div>

        <div className="activity-item">
          <span className="dot success"></span>

          <div>
            <h4>Analysis completed</h4>
            <p>1 hour ago</p>
          </div>
        </div>

      </div>

    </div>
  );
}