// Financial Calculator Functions with API Integration

// Financial tab switching
document.querySelectorAll('.financial-tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const calc = button.dataset.calc;
        
        // Update active tab
        document.querySelectorAll('.financial-tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding calculator
        document.querySelectorAll('.financial-calc').forEach(c => c.classList.remove('active'));
        document.getElementById(`${calc}-calc`).classList.add('active');
    });
});

// Loan Calculator (EMI)
document.querySelector('.btn-calculate[data-calc="loan"]').addEventListener('click', async () => {
    const principal = parseFloat(document.getElementById('loan-principal').value);
    const rate = parseFloat(document.getElementById('loan-rate').value);
    const term = parseFloat(document.getElementById('loan-term').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(term)) {
        document.getElementById('loan-result').textContent = 'Please enter valid numbers';
        return;
    }
    
    try {
        const result = await calculateLoan(principal, rate, term);
        
        const resultHTML = `
            <div>EMI: $${result.emi}</div>
            <div>Total Payment: $${result.total_payment}</div>
            <div>Total Interest: $${result.total_interest}</div>
        `;
        
        document.getElementById('loan-result').innerHTML = resultHTML;
        loadHistory(); // Reload history from backend
    } catch (error) {
        document.getElementById('loan-result').textContent = 'Error: ' + error.message;
    }
});

// Interest Calculator
document.querySelector('.btn-calculate[data-calc="interest"]').addEventListener('click', async () => {
    const principal = parseFloat(document.getElementById('interest-principal').value);
    const rate = parseFloat(document.getElementById('interest-rate').value);
    const time = parseFloat(document.getElementById('interest-time').value);
    const type = document.getElementById('interest-type').value;
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        document.getElementById('interest-result').textContent = 'Please enter valid numbers';
        return;
    }
    
    try {
        const result = await calculateInterest(principal, rate, time, type);
        
        const resultHTML = `
            <div>Interest: $${result.interest}</div>
            <div>Total Amount: $${result.total_amount}</div>
        `;
        
        document.getElementById('interest-result').innerHTML = resultHTML;
        loadHistory(); // Reload history from backend
    } catch (error) {
        document.getElementById('interest-result').textContent = 'Error: ' + error.message;
    }
});

// Mortgage Calculator
document.querySelector('.btn-calculate[data-calc="mortgage"]').addEventListener('click', async () => {
    const price = parseFloat(document.getElementById('mortgage-price').value);
    const downPayment = parseFloat(document.getElementById('mortgage-down').value);
    const rate = parseFloat(document.getElementById('mortgage-rate').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    
    if (isNaN(price) || isNaN(downPayment) || isNaN(rate) || isNaN(term)) {
        document.getElementById('mortgage-result').textContent = 'Please enter valid numbers';
        return;
    }
    
    try {
        const result = await calculateMortgage(price, downPayment, rate, term);
        
        const resultHTML = `
            <div>Monthly Payment: $${result.monthly_payment}</div>
            <div>Total Payment: $${result.total_payment}</div>
            <div>Total Interest: $${result.total_interest}</div>
        `;
        
        document.getElementById('mortgage-result').innerHTML = resultHTML;
        loadHistory(); // Reload history from backend
    } catch (error) {
        document.getElementById('mortgage-result').textContent = 'Error: ' + error.message;
    }
});

// ROI Calculator
document.querySelector('.btn-calculate[data-calc="roi"]').addEventListener('click', async () => {
    const initial = parseFloat(document.getElementById('roi-initial').value);
    const final = parseFloat(document.getElementById('roi-final').value);
    
    if (isNaN(initial) || isNaN(final)) {
        document.getElementById('roi-result').textContent = 'Please enter valid numbers';
        return;
    }
    
    try {
        const result = await calculateROI(initial, final);
        
        const resultHTML = `
            <div>Profit: $${result.profit}</div>
            <div>ROI: ${result.roi_percentage}%</div>
        `;
        
        document.getElementById('roi-result').innerHTML = resultHTML;
        loadHistory(); // Reload history from backend
    } catch (error) {
        document.getElementById('roi-result').textContent = 'Error: ' + error.message;
    }
});
