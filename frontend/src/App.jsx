import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AddMoodForm from "./components/AddMoodForm";
import MoodLogs from "./components/MoodLogs";
import "./index.css";

export default function App({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("addMood");

  const toggleSidebar = () => setCollapsed((s) => !s);

  const addMood = (data) => {
    console.log("Nuevo mood", data);
    // Aquí harás el fetch al backend después
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        setCurrentView={setCurrentView}
        onLogout={onLogout}
      />

      <main className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        <div style={{ marginBottom: "1rem", color: "#fff" }}>
          Bienvenid@, {user.username || user.name || "Usuario"}
        </div>
        
        {currentView === "addMood" && <AddMoodForm addMood={addMood} />}
        {currentView === "logs" && <MoodLogs />}
        {currentView === "dashboard" && (
          <div className="form-card">
            <h2>Dashboard Metrics</h2>
            <p>Próximamente: gráficos y estadísticas de tus moods</p>
          </div>
        )}
      </main>
    </div>
  );
}
