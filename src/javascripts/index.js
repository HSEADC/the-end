buttonIndicator()
openCard()
threedCards()

// ______________Индикатор дня смерти______________
function buttonIndicator() {
  const button = document.getElementById('buttonTime')
  const numbersDisplay = document.getElementById('numbers')

  button.addEventListener('click', function (event) {
    event.preventDefault()

    const min = 1
    const max = 99
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    const numString = String(randomNumber).padStart(2, '0')

    numbersDisplay.innerHTML = ''

    const digit1 = document.createElement('span')
    digit1.className = 'digit'
    digit1.textContent = numString[0]

    const digit2 = document.createElement('span')
    digit2.className = 'digit'
    digit2.textContent = numString[1]

    numbersDisplay.appendChild(digit1)
    numbersDisplay.appendChild(digit2)
  })
}

// ____________________Окно с карточкой по кнопке____________________
function openCard() {
  const buttons = document.querySelectorAll('.button[href^="#"]')
  const panels = document.querySelectorAll('.panel')

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()

      const targetPanelId = button.getAttribute('href')
      const targetPanel = document.querySelector(targetPanelId)

      if (targetPanel) {
        panels.forEach((panel) => panel.classList.remove('active'))
        targetPanel.classList.add('active')
      }
    })
  })
}

// __________________3D-наклон карточки за курсором__________________
function threedCards() {
  const cards = document.querySelectorAll('.tilt')
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!reduceMotion) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect()

        // положение курсора на карточке: от -0.5 (левый/верхний край) до 0.5
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        card.style.transform = `perspective(1000px) rotateX(${-y * 16}deg) rotateY(${x * 16}deg) scale(1.03)`
      })

      card.addEventListener('mouseleave', () => {
        card.style.transform = ''
      })
    })
  }
}
