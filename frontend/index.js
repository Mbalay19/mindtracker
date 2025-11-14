/* eslint-disable no-undef */
const moodForm = document.getElementById('mood-form')
const dateInput = document.getElementById('date')

// Cargar logs al iniciar
async function loadMoodLogs () {
  try {
    const res = await fetch('/api/users/logs', {
      credentials: 'include'
    })

    if (res.ok) {
      const data = await res.json()
      const logsList = document.getElementById('mood-logs-list')

      if (data.log && data.log.length > 0) {
        logsList.innerHTML = data.log.map(log => `
          <li class="mood-log-item">
            <strong>Mood: ${log.mood}/10</strong>
            <p>${log.notes}</p>
            <small>${log.date}</small>
          </li>
        `).join('')
      } else {
        logsList.innerHTML = '<li>No hay registros todavía</li>'
      }
    } else {
      console.error('Error cargando logs')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
loadMoodLogs()

// Fecha actual como fecha por defecto
dateInput.valueAsDate = new Date()

// Submit del mood
moodForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = {
    mood: document.getElementById('mood').value,
    notes: document.getElementById('notes').value,
    date: document.getElementById('date').value
  }

  try {
    const res = await fetch('/api/users/moods', { // CORREGIDO: endpoint correcto
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include' // Envía la cookie
    })
    if (!res.ok) {
      const result = await res.json()
      alert(result.error || 'Error al agregar mood')
    } else {
      alert('Mood agregado exitosamente!')
      moodForm.reset()
      dateInput.valueAsDate = new Date()
      loadMoodLogs()
      // Recargar logs
    }
  } catch (error) {
    console.error(error)
    alert('Error de conexión al servidor')
  }
})

// Logout
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })

    if (res.ok) {
      window.location.href = '/login.html'
    } else {
      alert('Error al cerrar sesión')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error de conexión')
  }
})

// Animaciones de hover
document.querySelectorAll('.dashboard-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-2px)'
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)'
  })
})
