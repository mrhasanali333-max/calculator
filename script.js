let display = document.getElementById('display');

function addToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

function calculate() {
    try {
        // Replace display symbols with JavaScript operators
        let expression = display.value
            .replace('×', '*')
            .replace('÷', '/')
            .replace('−', '-');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle floating point precision
        display.value = Math.round(result * 100000000) / 100000000;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        addToDisplay(key);
    } else if (key === '.') {
        addToDisplay('.');
    } else if (key === '+' || key === '-') {
        addToDisplay(key);
    } else if (key === '*') {
        event.preventDefault();
        addToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        addToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
