/* eslint-disable no-undef */

// meter validacion de email mediante regex. Ahora ver como la query no viaje por la url
function isValidEmail (email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
  return regex.test(email)
}

const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email-login').value
  const password = document.getElementById('password-login').value

  // --- VALIDACIÓN DEL EMAIL ---
  if (!isValidEmail(email)) {
    alert('El email no es válido')
    return
  }

  const data = { email, password }

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    const result = await response.json()

    if (response.ok) {
      window.location.href = '/'
    } else {
      alert(result.message || 'Login error')
    }
  } catch (error) {
    console.error(error)
    alert('Failed connecting to server')
  }
})

// ------------------------
//  REGISTER FORM
// ------------------------

const registerForm = document.getElementById('register-form') // <- ARREGLADO
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const password = document.getElementById('password-reg').value
  const password2 = document.getElementById('password2').value

  if (password !== password2) {
    alert('Passwords don\'t match!')
    return
  }

  const email = document.getElementById('email-reg').value

  // --- VALIDACIÓN DEL EMAIL EN REGISTRO ---
  if (!isValidEmail(email)) {
    alert('El email no es válido')
    return
  }

  const data = {
    name: document.getElementById('nombre').value,
    lastName: document.getElementById('apellidos').value,
    telephone: document.getElementById('telefono').value,
    email,
    password
  }

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json()

    if (response.ok) { // <- ARREGLADO
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
