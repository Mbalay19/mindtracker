import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MoodForm from "./AddMoodForm";
import MoodLogs from "./MoodLogs";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("addMood");

  const toggleSidebar = () => setCollapsed(!collapsed);

  console.log("DashboardLayout setCurrentView:", setCurrentView);

  return (
    <div className="dashboard-container">
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        setCurrentView={setCurrentView} // esto es clave
      />

      <main className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        {currentView === "addMood" && <MoodForm />}
        {currentView === "logs" && <MoodLogs />}
        {currentView === "dashboard" && (
          <div style={{ padding: "20px" }}>
            <h2>Dashboard Metrics (coming soon)</h2>
          </div>
        )}
      </main>
    </div>
  );
}
