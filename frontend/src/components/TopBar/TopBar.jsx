import "./TopBar.css";

export default function TopBar() {
  return (
    <header className="topbar">

      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="topbar-right">

        <button className="notification-btn">
          🔔
        </button>

        <div className="profile">

          <div className="avatar">
            S
          </div>

          <div>
            <h4>Shreya</h4>
            <p>Security Analyst</p>
          </div>

        </div>

      </div>

    </header>
  );
}