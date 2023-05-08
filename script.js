const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-button');

let previousOperand = '';
let currentOperand = '';
let operation = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText === 'C') {
      clear();
    } else if (button.innerText === '=') {
      compute();
    } else if (button.innerText === '+' || button.innerText === '-' || button.innerText === '*' || button.innerText === '/') {
      handleOperation(button.innerText);
    } else {
      appendNumber(button.innerText);
    }
    updateDisplay();
  });
});

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
}

function handleOperation(operator) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = previous + current;
      break;
    case '-':
      computation = previous - current;
      break;
    case '*':
      computation = previous * current;
      break;
    case '/':
      computation = previous / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = '';
  previousOperand = '';
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = '';
}

function updateDisplay() {
  display.value = currentOperand;
}

const clearButton = document.querySelector('.calculator-button-clear');

clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});
