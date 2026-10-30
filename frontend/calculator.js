
// =========================================
// Core Calculator Logic with API Integration
// =========================================
class Calculator {
    constructor() {
        this.inputDisplay = document.getElementById("input-display");
        this.resultDisplay = document.getElementById("result-display");

        this.currentInput = "0";
        this.previousInput = "";
        this.operator = null;
        this.shouldResetScreen = false;
        this.isCalculating = false;

        this.updateDisplay();
    }

    clear() {
        if (this.isCalculating) return;

        this.currentInput = "0";
        this.previousInput = "";
        this.operator = null;
        this.shouldResetScreen = false;

        this.updateDisplay();
    }

    backspace() {
        if (this.isCalculating) return;

        if (this.shouldResetScreen || this.currentInput === "Error") {
            this.currentInput = "0";
            this.shouldResetScreen = false;
        } else if (
            this.currentInput.length <= 1 ||
            (this.currentInput.length === 2 &&
                this.currentInput.startsWith("-"))
        ) {
            this.currentInput = "0";
        } else {
            this.currentInput = this.currentInput.slice(0, -1);
        }

        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.isCalculating) return;

        const digit = String(number);

        if (!/^\d$/.test(digit)) return;

        // Start a new number after selecting an operator.
        if (this.shouldResetScreen || this.currentInput === "Error") {
            this.currentInput = digit;
            this.shouldResetScreen = false;
        } else if (this.currentInput === "0") {
            this.currentInput = digit;
        } else {
            this.currentInput += digit;
        }

        this.updateDisplay();
    }

    appendDecimal() {
        if (this.isCalculating) return;

        if (this.shouldResetScreen || this.currentInput === "Error") {
            this.currentInput = "0.";
            this.shouldResetScreen = false;
        } else if (!this.currentInput.includes(".")) {
            this.currentInput += ".";
        }

        this.updateDisplay();
    }

    async setOperator(operator) {
        if (
            this.isCalculating ||
            this.currentInput === "Error"
        ) {
            return;
        }

        if (!["+", "-", "*", "/"].includes(operator)) return;

        // Allow the operator to be changed before entering
        // the second number.
        if (this.operator !== null && this.shouldResetScreen) {
            this.operator = operator;
            this.updateDisplay();
            return;
        }

        // Calculate a pending expression first.
        if (this.operator !== null) {
            await this.calculate();

            if (this.currentInput === "Error") return;
        }

        this.previousInput = this.currentInput;
        this.operator = operator;

        // The next digit must start a new number.
        this.shouldResetScreen = true;

        this.updateDisplay();
    }

    async calculate() {
        if (
            this.operator === null ||
            this.isCalculating ||
            this.currentInput === "Error" ||
            this.shouldResetScreen
        ) {
            return;
        }

        const left = Number(this.previousInput);
        const right = Number(this.currentInput);
        const operator = this.operator;

        const expression =
            `${this.previousInput} ${operator} ${this.currentInput}`;

        if (!Number.isFinite(left) || !Number.isFinite(right)) {
            this.showError("Please enter valid numbers.");
            return;
        }

        if (operator === "/" && right === 0) {
            this.showError("Cannot divide by zero.");
            return;
        }

        this.isCalculating = true;

        try {
            if (typeof calculateBasic !== "function") {
                throw new Error(
                    "calculateBasic() API function is missing."
                );
            }

            const response = await calculateBasic(expression);

            if (
                !response ||
                response.result === undefined ||
                response.result === null ||
                response.result === ""
            ) {
                throw new Error(
                    "The API returned no calculation result."
                );
            }

            const result = Number(response.result);

            if (!Number.isFinite(result)) {
                throw new Error(
                    "The API returned an invalid result."
                );
            }

            this.currentInput = String(result);
            this.previousInput = "";
            this.operator = null;
            this.shouldResetScreen = true;

            this.updateDisplay();

            // Refresh history after a successful calculation.
            if (typeof loadHistory === "function") {
                try {
                    await loadHistory();
                } catch (historyError) {
                    console.error(
                        "Could not refresh calculation history:",
                        historyError
                    );
                }
            }
        } catch (error) {
            console.error("Calculation failed:", error);

            this.showError(
                error.message ||
                "Calculation failed. Check your API."
            );
        } finally {
            this.isCalculating = false;
        }
    }

    showError(message) {
        this.currentInput = "Error";
        this.previousInput = "";
        this.operator = null;
        this.shouldResetScreen = true;

        this.updateDisplay();
        alert(message);
    }

    updateDisplay() {
        if (!this.inputDisplay || !this.resultDisplay) {
            console.error(
                "Display elements missing. Check input-display and result-display."
            );
            return;
        }

        // Large display: current input or final result.
        this.resultDisplay.textContent = this.currentInput;

        // Small display: show the complete expression.
        if (this.operator !== null) {
            const secondNumber = this.shouldResetScreen
                ? ""
                : this.currentInput;

            this.inputDisplay.textContent =
                `${this.previousInput} ${this.operator} ${secondNumber}`.trim();
        } else {
            this.inputDisplay.textContent = "";
        }
    }
}


// =========================================
// Initialize Calculator and Event Listeners
// =========================================

let calculator;

function setupEventListeners() {
    if (calculator) return;

    calculator = new Calculator();

    // NUMBER AND DECIMAL BUTTONS
    // Each button receives one click handler.
    document.querySelectorAll(".btn-number").forEach(button => {
        const value = button.dataset.value;

        if (value === ".") {
            button.addEventListener("click", () => {
                calculator.appendDecimal();
            });
        } else {
            button.addEventListener("click", () => {
                calculator.appendNumber(value);
            });
        }
    });

    // OPERATOR BUTTONS
    document.querySelectorAll(".btn-operator").forEach(button => {
        button.addEventListener("click", () => {
            calculator.setOperator(button.dataset.value);
        });
    });

    // CLEAR AND BACKSPACE BUTTONS
    document.querySelectorAll(".btn-clear").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;

            if (action === "clear") {
                calculator.clear();
            } else if (action === "backspace") {
                calculator.backspace();
            }
        });
    });

    // EQUALS BUTTON
    document.querySelectorAll(".btn-equals").forEach(button => {
        button.addEventListener("click", () => {
            calculator.calculate();
        });
    });

    // BASIC / SCIENTIFIC / FINANCIAL MODE SWITCHING
    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", () => {
            const mode = button.dataset.mode;
            const targetMode =
                document.getElementById(`${mode}-mode`);

            if (!targetMode) {
                console.error(
                    `Calculator mode not found: ${mode}-mode`
                );
                return;
            }

            document.querySelectorAll(".tab-btn").forEach(btn => {
                btn.classList.toggle("active", btn === button);
            });

            document.querySelectorAll(".calculator-mode").forEach(
                modeElement => {
                    modeElement.classList.toggle(
                        "active",
                        modeElement === targetMode
                    );
                }
            );

            calculator.clear();
        });
    });

    // KEYBOARD SUPPORT
    document.addEventListener("keydown", event => {
        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey ||
            event.target.matches("input, textarea, select") ||
            event.target.isContentEditable
        ) {
            return;
        }

        if (/^\d$/.test(event.key)) {
            calculator.appendNumber(event.key);
        } else if (event.key === ".") {
            calculator.appendDecimal();
        } else if (["+", "-", "*", "/"].includes(event.key)) {
            calculator.setOperator(event.key);
        } else if (event.key === "Enter" || event.key === "=") {
            event.preventDefault();
            calculator.calculate();
        } else if (event.key === "Backspace") {
            calculator.backspace();
        } else if (event.key === "Escape") {
            calculator.clear();
        }
    });

    window.calculator = calculator;

    console.log("Calculator initialized successfully.");
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        setupEventListeners,
        { once: true }
    );
} else {
    setupEventListeners();
}
