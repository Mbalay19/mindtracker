# MindTracker

MindTracker es una aplicación web diseñada para permitir a los usuarios registrar, visualizar y gestionar su estado de ánimo diario. Con un enfoque en la simplicidad y la seguridad, MindTracker ofrece autenticación mediante OAuth (Google) y protege las sesiones con JWT. La app está construida sobre un stack moderno: Node.js, Express y MongoDB.

---

## 🔹 Características principales

* **Autenticación segura:** Login mediante Google OAuth y manejo de sesiones con JWT.
* **Registro de moods:** Los usuarios pueden registrar su estado de ánimo diario con notas y fecha.
* **Visualización de logs:** Consulta histórica de moods, filtrable por fecha y con límite de registros.
* **Gestión de usuarios:** Los datos del usuario se gestionan de forma segura en MongoDB.
* **Interfaz sencilla y accesible:** Forms claros para registro, login y gestión de moods.
* **Validaciones:** Validación de emails y contraseñas tanto en frontend como backend para mejorar la integridad de los datos.

---

## 🔹 Tecnologías utilizadas

| Tecnología                     | Uso en el proyecto                                  |
| ------------------------------ | --------------------------------------------------- |
| Node.js                        | Backend y lógica de negocio                         |
| Express.js                     | Framework para gestionar rutas y middlewares        |
| MongoDB                        | Base de datos NoSQL para almacenar usuarios y moods |
| Passport.js (Google OAuth 2.0) | Autenticación de usuarios                           |
| JWT (JSON Web Tokens)          | Gestión segura de sesiones                          |
| Fetch API                      | Comunicación frontend-backend                       |
| HTML/CSS/JS                    | Interfaz del usuario                                |

---

## 🔹 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <REPO_URL>
cd mindtracker
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno en un archivo `.env`:

```env
PORT=3000
MONGO_URI=<tu_uri_mongodb>
GOOGLE_CLIENT_ID=<tu_google_client_id>
GOOGLE_CLIENT_SECRET=<tu_google_client_secret>
JWT_SECRET=<tu_secreto_jwt>
```

4. Ejecutar la aplicación:

```bash
npm run dev
```

5. Abrir el navegador en [http://localhost:2345](http://localhost:2345)

---

## 🔹 Uso

1. **Registro/Login:**

   * Puedes registrarte manualmente o iniciar sesión con tu cuenta de Google.
2. **Registrar Mood:**

   * Ingresa tu estado de ánimo diario, agrega notas y guarda la fecha.
3. **Ver Logs:**

   * Consulta tu historial de estados de ánimo, filtrando por fechas o limitando la cantidad de registros mostrados.
4. **Seguridad:**

   * Todas las operaciones requieren autenticación, protegiendo tus datos con JWT y sesiones seguras.

---

## 🔹 Buenas prácticas implementadas

* **Validación de datos:** Emails y passwords validados en frontend y backend.
* **Seguridad:** JWT para sesiones, OAuth para login seguro y `.env` para secretos.
* **Separación de capas:** MVC (Model-View-Controller) para mantener el código limpio y modular.
* **Control de errores:** Manejo de errores y respuestas claras al cliente.

---

## 🔹 Licencia

Este proyecto está bajo licencia MIT.

---

> MindTracker es ideal para cualquier persona que quiera llevar un registro personal de su estado de ánimo de manera segura, simple y profesional.
