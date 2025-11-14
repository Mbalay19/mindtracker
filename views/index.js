const moodForm = document.getElementById('mood-form')
const dateInput = document.getElementById('date')

// Fecha actual como fecha por defecto para el formulario
dateInput.valueAsDate = new Date()

// para hacer submit al mood

moodForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = {
    mood: document.getElementById('mood').value,
    notes: document.getElementById('notes').value,
    date: document.getElementById('date').value
  }

  try {
    const res = await fetch('/users/:id/moods', { // ajusta endpoint en tu router
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include' // Esto envía la cookie de sesión
    })

    const result = await res.json()
    if (res.ok) {
      // eslint-disable-next-line no-undef
      alert('Mood added suuccesfully!')
      moodForm.reset()
      dateInput.valueAsDate = new Date()
    } else {
      // eslint-disable-next-line no-undef
      alert(result.error || 'Error adding mood, you must complete all fields!')
    }
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line no-undef
    alert('Conection to server failed')
  }
})

document.querySelectorAll('.dashboard-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-2px)' })
  card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)' })
})
