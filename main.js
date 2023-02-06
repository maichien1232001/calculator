let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.querySelector('.clear-btn')
const deleteButton = document.querySelector('.delete-btn')
const pointButton = document.getElementById('pointBtn')
const input = document.querySelector('.input')
const output = document.querySelector('.output')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (output.textContent === '0' || shouldResetScreen)
    resetScreen()
  output.textContent += number
}

function resetScreen() {
  output.textContent = ''
  shouldResetScreen = false
}

function clear() {
  output.textContent = '0'
  input.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (output.textContent === '')
    output.textContent = '0'
  if (output.textContent.includes('.')) return
  output.textContent += '.'
}

function deleteNumber() {
  output.textContent = output.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = output.textContent
  currentOperation = operator
  input.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && output.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = output.textContent
  output.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  input.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}
