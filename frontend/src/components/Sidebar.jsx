import React from "react";
import { FaBars, FaHome, FaPlus, FaFolder } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";

export default function Sidebar({ collapsed, toggleSidebar, setCurrentView }) {
  console.log("Sidebar props:", { collapsed, toggleSidebar, setCurrentView });

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li onClick={() => setCurrentView("dashboard")}>
            <FaHome className="icon" />
            {!collapsed && <span className="text">Dashboard</span>}
          </li>
          <li onClick={() => setCurrentView("logs")}>
            <FaFolder className="icon" />
            {!collapsed && <span className="text">Mood Logs</span>}
          </li>
          <li onClick={() => setCurrentView("addMood")}>
            <FaPlus className="icon" />
            {!collapsed && <span className="text">Add Mood</span>}
          </li>
        </ul>
      </nav>

      <div className="logout" onClick={() => (window.location.href = "/logout")}>
        <FaRightFromBracket className="icon" />
        {!collapsed && <span>Logout</span>}
      </div>
    </aside>
  );
}
