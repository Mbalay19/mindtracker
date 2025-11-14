import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AddMoodForm from "./components/AddMoodForm";
import "./index.css";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed((s) => !s);

  const addMood = (data) => {
    console.log("Nuevo mood", data);
  };

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <main className={`main-area ${collapsed ? "expand" : ""}`}>
        <AddMoodForm addMood={addMood} />
      </main>
    </div>
  );
}
