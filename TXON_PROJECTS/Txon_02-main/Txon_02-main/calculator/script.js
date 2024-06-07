const screen = document.querySelector('#result');
const keys = document.querySelector('.keys');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let result = '';

function clear() {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  result = '';
  updateScreen();
}

function backspace() {
  if (result) {
    result = result.slice(0, -1);
  } else if (operator) {
    operator = '';
  } else if (secondOperand) {
    secondOperand = secondOperand.slice(0, -1);
  } else if (firstOperand) {
    firstOperand = firstOperand.slice(0, -1);
  }
  updateScreen();
}

function appendNumber(number) {
  if (result) {
    clear();
  }
  if (operator) {
    secondOperand += number;
  } else {
    firstOperand += number;
  }
  updateScreen();
}

function chooseOperator(selectedOperator) {
  if (result) {
    firstOperand = result;
    result = '';
  }
  operator = selectedOperator;
  updateScreen();
}

function calculate() {
  let first = parseFloat(firstOperand);
  let second = parseFloat(secondOperand);
  switch (operator) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '×':
      result = first * second;
      break;
    case '÷':
      result = first / second;
      break;
  }
  firstOperand = '';
  secondOperand = '';
  operator = '';
  updateScreen();
}

function updateScreen() {
  if (result) {
    screen.value = result;
  } else if (secondOperand) {
    screen.value = `${firstOperand} ${operator} ${secondOperand}`;
  } else if (operator) {
    screen.value = `${firstOperand} ${operator}`;
  } else {
    screen.value = firstOperand;
  }
}

keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.id === 'clear') {
    clear();
    return;
  }

  if (target.id === 'backspace') {
    backspace();
    return;
  }

  if (target.id === 'add' || target.id === 'subtract' || target.id === 'multiply' || target.id === 'divide') {
    chooseOperator(target.textContent);
    return;
  }

  if (target.id === 'equals') {
    calculate();
    return;
  }

  if (target.id === 'decimal') {
    if (result) {
      clear();
    }
    if (operator && !secondOperand.includes('.')) {
      secondOperand += '.';
    } else if (!operator && !firstOperand.includes('.')) {
      firstOperand += '.';
    }
    updateScreen();
    return;
  }

  appendNumber(target.textContent);
});
