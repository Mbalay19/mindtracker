import { useState } from "react";
import "./login.css";

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    lastName: "",
    telephone: "",
    email: "",
    password: "",
    password2: ""
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2345/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
      });

      const result = await res.json();

      if (res.ok) {
        onLoginSuccess(result.user);
      } else {
        alert(result.message || "Error en login");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al servidor");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:2345/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          lastName: registerData.lastName,
          telephone: registerData.telephone,
          email: registerData.email,
          password: registerData.password
        })
      });

      const result = await res.json();

      if (res.ok) {
        alert("Usuario creado correctamente. Ahora puedes iniciar sesión.");
        setRegisterData({
          name: "",
          lastName: "",
          telephone: "",
          email: "",
          password: "",
          password2: ""
        });
        setIsLogin(true);
      } else {
        alert(result.message || "Error al crear usuario");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al servidor");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <i className="fa-solid fa-brain"></i>
        <h1>MindTracker App</h1>
        <p>Bienvenid@, inicia sesión para continuar</p>
      </header>

      <main className="login-main">
        {/* LOGIN FORM */}
        <div className="login-card">
          <h2>Inicia sesión</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email-login">Email</label>
              <input
                type="email"
                id="email-login"
                name="email"
                placeholder="Tu email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-login">Contraseña</label>
              <input
                type="password"
                id="password-login"
                name="password"
                placeholder="Tu contraseña"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Iniciar sesión
            </button>
          </form>

          {/* Google OAuth */}
          <a href="http://localhost:2345/auth/google" className="btn-google">
            <span className="google-logo">
              <svg width="18" height="18" viewBox="0 0 533.5 544.3">
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.3-1.4-34-4.1-50.3H272v95.1h146.9c-6.3 33.7-25 62.2-53.3 81.5v67h86.3c50.6-46.7 80.6-115.5 80.6-193.3z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c72.8 0 133.9-24.1 178.5-65.3l-86.3-67c-24 16.1-54.8 25.6-92.2 25.6-70.8 0-130.7-47.8-152.1-112.2H32.1v70.4c44.7 88 135.7 148.5 239.9 148.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M119.9 314.8c-10.5-31.3-10.5-65 0-96.3V148.1H32.1c-41.8 82.5-41.8 181.2 0 263.7l87.8-70.4z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.3c38.9-.6 75.8 14.2 103.7 41.6l77.7-77.7C405.9 23.1 343.7-1 272 0 167.8 0 76.8 60.5 32.1 148.1l87.8 70.4c21.4-64.4 81.3-112.2 152.1-111.2z"
                />
              </svg>
            </span>
            Sign in with Google
          </a>
        </div>

        {/* REGISTER FORM */}
        <div className="login-card">
          <h2>Si no tienes usuario, ¡Regístrate!</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="name"
                placeholder="Tu nombre"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="lastName"
                placeholder="Tus apellidos"
                value={registerData.lastName}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Número de teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telephone"
                placeholder="Tu número de teléfono"
                value={registerData.telephone}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email-reg">Email</label>
              <input
                type="email"
                id="email-reg"
                name="email"
                placeholder="Tu email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-reg">Contraseña</label>
              <input
                type="password"
                id="password-reg"
                name="password"
                placeholder="Contraseña"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Repetir contraseña</label>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Repite la contraseña"
                value={registerData.password2}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Crear usuario
            </button>
          </form>
        </div>
      </main>

      <footer className="login-footer">
        <p>
          © 2025 MindTracker App. Todos los derechos reservados.{" "}
          <a href="#">Política de privacidad</a>
        </p>
      </footer>
    </div>
  );
}
