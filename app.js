//Получаем необходимые элементы страницы
const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

// создаём переменные таймер и счёт
let time = 0
let score = 0

// устанавливем события на полученные элементы
startBtn.addEventListener('click', (event) => {
    screens[0].classList.add('up') // добавляет класс up первому экрану для анимации слайдера
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time')) // Получаем время из аттрибута data-time
        screens[1].classList.add('up')// Переходим на другой экран
        startGame() // Начинаем игру
    }
})


board.addEventListener('click', event => {
    // Изменение счёта, удаление кружков и создание новых
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})
//

// Фукция начала игры
function startGame() {
    setInterval(decreaseTime, 1000) // Вызываем переданную функцию decreaseTime каждую секунду
    createRandomCircle() // Создаём первый кружок
    setTime(time) // Создаём таймер
}

// функция окончания игры и обновления счётчика
function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

// функция отвечающая за корректное отображение времени
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

// функция вывода экрана со счётом
function finishGame() {
    timeEl.classList.add('hide')
    board.innerHTML = `
    <h1 class="primary">Счёт: ${score}</h1>
    `
}

// функция отрисовки кружков
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(20, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

// функция для получения слоучайного размера кружка
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
