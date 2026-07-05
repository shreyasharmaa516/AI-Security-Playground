import "./TopBar.css";

import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSearch } from "../../context/SearchContext/SearchContext";

export default function TopBar() {

  const navigate = useNavigate();

  const { search, setSearch } = useSearch();

  function handleKeyDown(e) {

    if (e.key === "Enter") {

      navigate("/history");

    }

  }

  return (

    <header className="topbar">

      <div className="search">

        <Search size={18} />

        <input
          placeholder="Search analyses..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

      </div>

      <div className="topbar-right">

        <button className="notification">

          <Bell size={18}/>

        </button>

        <div className="profile">

          <div className="avatar">

            S

          </div>

          <div>

            <h4>Shreya</h4>

            <small>Security Analyst</small>

          </div>

        </div>

      </div>

    </header>

  );

}