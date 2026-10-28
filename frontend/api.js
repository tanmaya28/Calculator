// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Basic Calculator API
async function calculateBasic(expression) {
    console.log('API call to:', `${API_BASE_URL}/calculator/calculate`);
    console.log('Request body:', { expression });
    
    const response = await fetch(`${API_BASE_URL}/calculator/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
        const error = await response.json();
        console.error('API error:', error);
        throw new Error(error.detail || 'Calculation failed');
    }
    
    const result = await response.json();
    console.log('API result:', result);
    return result;
}

// Scientific Calculator API
async function calculateScientific(expression, isDegree = true) {
    const response = await fetch(`${API_BASE_URL}/scientific/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression, is_degree: isDegree }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

// Financial Calculator APIs
async function calculateLoan(principal, rate, term) {
    const response = await fetch(`${API_BASE_URL}/financial/loan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ principal, rate, term }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

async function calculateInterest(principal, rate, time, type) {
    const response = await fetch(`${API_BASE_URL}/financial/interest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ principal, rate, time, type }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

async function calculateMortgage(price, downPayment, rate, term) {
    const response = await fetch(`${API_BASE_URL}/financial/mortgage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, down_payment: downPayment, rate, term }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

async function calculateROI(initialInvestment, finalValue) {
    const response = await fetch(`${API_BASE_URL}/financial/roi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initial_investment: initialInvestment, final_value: finalValue }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

// History API
async function getHistory() {
    const response = await fetch(`${API_BASE_URL}/history/`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch history');
    }
    
    return await response.json();
}

async function clearHistory() {
    const response = await fetch(`${API_BASE_URL}/history/`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to clear history');
    }
    
    return await response.json();
}
