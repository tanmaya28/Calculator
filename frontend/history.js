// History Management with Backend API

// Load history from backend
async function loadHistory() {
    try {
        const data = await getHistory();
        renderHistory(data.history);
    } catch (error) {
        console.error('Failed to load history:', error);
    }
}

// Render history list
function renderHistory(history) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    history.forEach((item) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${item.result}</div>
        `;
        
        // Click to recall calculation
        historyItem.addEventListener('click', () => {
            calculator.currentInput = item.result;
            calculator.updateDisplay();
        });
        
        historyList.appendChild(historyItem);
    });
}

// Clear history
document.getElementById('clear-history').addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all history?')) {
        try {
            await clearHistory();
            loadHistory();
        } catch (error) {
            alert('Failed to clear history: ' + error.message);
        }
    }
});

// Export history to JSON
document.getElementById('export-history').addEventListener('click', async () => {
    try {
        const data = await getHistory();
        
        if (data.history.length === 0) {
            alert('No history to export');
            return;
        }
        
        const dataStr = JSON.stringify(data.history, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'calculator_history.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    } catch (error) {
        alert('Failed to export history: ' + error.message);
    }
});

// Load history on page load
document.addEventListener('DOMContentLoaded', loadHistory);
