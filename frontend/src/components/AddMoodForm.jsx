import { useState } from "react";

export default function AddMoodForm({ addMood }) {
  const [formData, setFormData] = useState({
    mood: "",
    notes: "",
    date: "",
    bowelRhythm: "Normal",
    libido: "",
    exerciseHours: "",
    healthyFood: "Normal",
    junkFood: "Nada",
    painLocation: "Nada",
    sleepHours: "8 horas"
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMood(formData);
  };

  return (
    <div className="form-card">
      <h2>¿Qué tal el día?</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mood (1-10)</label>
          <input type="number" name="mood" min="1" max="10" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Notas</label>
          <input type="text" name="notes" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Fecha</label>
          <input type="date" name="date" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Caca</label>
          <select name="bowelRhythm" required onChange={handleChange}>
            <option>Muy bien</option>
            <option>Bien</option>
            <option>Normal</option>
            <option>Mal</option>
            <option>Muy mal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Libido (1-10)</label>
          <input type="number" min="1" max="10" name="libido" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Ejercicio</label>
          <input type="number" min="0" max="24" name="exerciseHours" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Comida sana</label>
          <select name="healthyFood" required onChange={handleChange}>
            <option>Muy bien</option>
            <option>Bien</option>
            <option>Normal</option>
            <option>Mal</option>
            <option>Muy mal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Comida Basura</label>
          <select name="junkFood" required onChange={handleChange}>
            <option>Nada</option>
            <option>Poco</option>
            <option>Me he pasado</option>
          </select>
        </div>

        <div className="form-group">
          <label>Dolores</label>
          <select name="painLocation" required onChange={handleChange}>
            <option>Nada</option>
            <option>Head</option>
            <option>Back</option>
            <option>Stomach</option>
            <option>Legs</option>
            <option>Arms</option>
          </select>
        </div>

        <div className="form-group">
          <label>Horas de sueño</label>
          <select name="sleepHours" required onChange={handleChange}>
            <option>8 horas</option>
            <option>Más de 8 horas</option>
            <option>Menos de 8 horas</option>
          </select>
        </div>

        <button className="btn-submit">Guardar</button>
      </form>
    </div>
  );
}
