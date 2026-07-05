import "./TopBar.css";

import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext/SearchContext";

export default function TopBar() {

  const navigate = useNavigate();

  const { search, setSearch } = useSearch();

  function handleKeyDown(event) {

    if (event.key === "Enter") {

      navigate("/history");

    }

  }

  return (
    <header className="topbar">

      <div className="search-box">

        <input
          type="text"
          placeholder="Search analyses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
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