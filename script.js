
let display = document.getElementById('display');
let previousOperator = null;
let previousOperand = null;
let darkMode = false;
let darkModeToggle = document.getElementById('darkModeToggle');
let title = document.getElementById('title');

function appendNumber(num) {
  display.value += num;
}

function appendOperator(operator) {
  if (previousOperator) {
    calculate();
  }
  previousOperator = operator;
  previousOperand = parseFloat(display.value);
  display.value += operator;
}

function calculate() {
  let currentOperand = parseFloat(display.value.substring(display.value.lastIndexOf(previousOperator) + 1));
  let result;

  switch (previousOperator) {
    case '+':
      result = previousOperand + currentOperand;
      break;
    case '-':
      result = previousOperand - currentOperand;
      break;
    case '*':
      result = previousOperand * currentOperand;
      break;
    case '/':
      if (currentOperand === 0) {
        result = "Hata";
      } else {
        result = previousOperand / currentOperand;
      }
      break;
  }
  display.value = result;
  previousOperator = null;
  previousOperand = null;
}

function clearDisplay() {
  display.value = "";
  previousOperator = null;
  previousOperand = null;
}

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode');
  document.querySelector('.calculator').classList.toggle('dark-mode');
  document.getElementById('display').classList.toggle('dark-mode');
  document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));

  if (darkMode) {
    title.textContent = "Basit Hesap Makinesi (Karanlık Mod)";
    darkModeToggle.textContent = "Karanlık Modu Kapat";
  } else {
    title.textContent = "Basit Hesap Makinesi";
    darkModeToggle.textContent = "Karanlık Modu Aç";
  }
}

// Klavye ile giriş
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (key >= '0' && key <= '9' || key === '.') {
    appendNumber(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendOperator(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'c' || key === 'C') {
    clearDisplay();
  }
});

darkModeToggle.addEventListener('click', toggleDarkMode);
        