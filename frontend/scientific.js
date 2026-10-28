// Scientific Calculator Functions with API Integration
let isDegreeMode = true;

// Scientific function handlers
document.querySelectorAll('.btn-scientific').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        
        if (value === 'π') {
            calculator.currentInput = Math.PI.toString();
        } else if (value === 'e') {
            calculator.currentInput = Math.E.toString();
        } else if (value === '^') {
            calculator.setOperator('^');
        } else if (button.dataset.action === 'deg-rad') {
            toggleDegreeRadian();
        } else {
            calculator.currentInput += value;
        }
        
        calculator.shouldResetScreen = false;
        calculator.updateDisplay();
    });
});

// Toggle between degree and radian mode
function toggleDegreeRadian() {
    isDegreeMode = !isDegreeMode;
    const btn = document.querySelector('.btn-scientific[data-action="deg-rad"]');
    btn.textContent = isDegreeMode ? 'DEG' : 'RAD';
}

// Extended calculate function for scientific operations
const originalCalculate = calculator.calculate.bind(calculator);

calculator.calculate = async function() {
    const expression = this.currentInput;
    
    try {
        const result = await calculateScientific(expression, isDegreeMode);
        
        this.currentInput = result.result.toString();
        this.operator = null;
        this.previousInput = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
        loadHistory(); // Reload history from backend
    } catch (error) {
        this.currentInput = 'Error';
        this.updateDisplay();
        alert(error.message);
    }
};

// Handle parentheses in basic calculator
document.querySelectorAll('.btn-scientific[data-value="("], .btn-scientific[data-value=")"]').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        calculator.currentInput += value;
        calculator.updateDisplay();
    });
});
