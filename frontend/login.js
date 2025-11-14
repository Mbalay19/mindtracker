/* eslint-disable no-undef */
const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = {
    email: document.getElementById('email-login').value,
    password: document.getElementById('password-login').value
  }

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    if (res.ok) {
      // Redirigimos a index.html, ya no necesitamos token en localStorage
      window.location.href = '/'
    } else {
      alert(result.message || 'Error en login')
    }
  } catch (err) {
    console.error(err)
    alert('Error de conexión con el servidor')
  }
})

const registerForm = document.getElementById('register-form')
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const password = document.getElementById('password-reg').value
  const password2 = document.getElementById('password2').value
  if (password !== password2) {
    alert('Las contraseñas no coinciden')
    return
  }
  const data = {
    nombre: document.getElementById('nombre').value,
    apellidos: document.getElementById('apellidos').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email-reg').value,
    password
  }
  try {
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    if (res.ok) {
      alert('Usuario creado correctamente. Ahora puedes iniciar sesión.')
      registerForm.reset()
    } else {
      alert(result.message || 'Error al crear usuario')
    }
  } catch (err) {
    console.error(err)
    alert('Error de conexión con el servidor')
  }
})
