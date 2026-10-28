# All-in-One Calculator - Full Stack Application

A comprehensive calculator web application with basic arithmetic, scientific functions, and financial calculations, built with FastAPI backend and vanilla JavaScript frontend.

## Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database for history storage
- **Pydantic** - Data validation using Python type annotations

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **HTML5/CSS3** - Modern, responsive design
- **Fetch API** - For backend communication

## Project Structure

```
calculator-fullstack/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── schemas.py      # Pydantic models for request/response
│   │   │   └── database.py     # SQLAlchemy database models
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── calculator.py    # Basic calculator routes
│   │   │   ├── scientific.py    # Scientific calculator routes
│   │   │   ├── financial.py     # Financial calculator routes
│   │   │   └── history.py       # History management routes
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── calculator_service.py    # Basic calculation logic
│   │       ├── scientific_service.py    # Scientific calculation logic
│   │       └── financial_service.py     # Financial calculation logic
│   └── requirements.txt
└── frontend/
    ├── index.html    # Main HTML structure
    ├── styles.css    # Styling and layout
    ├── api.js        # API integration functions
    ├── calculator.js # Basic calculator logic
    ├── scientific.js # Scientific calculator logic
    ├── financial.js  # Financial calculator logic
    └── history.js    # History management
```

## Features

### Basic Calculator
- Standard arithmetic operations (+, -, *, /, %)
- Decimal point support
- Clear and backspace functionality
- Keyboard support

### Scientific Calculator
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Square root and power functions
- Constants (π, e)
- Parentheses support
- Degree/Radian mode toggle

### Financial Calculator
- **Loan Calculator**: EMI calculation
- **Interest Calculator**: Simple and compound interest
- **Mortgage Calculator**: Monthly payment calculation
- **ROI Calculator**: Return on investment

### History Tracking
- Persistent storage in SQLite database
- Click history items to recall results
- Clear history functionality
- Export history to JSON

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Initialize the database:
```bash
python -c "from app.models.database import init_db; init_db()"
```

6. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Open `index.html` in your web browser

Or use a simple HTTP server:
```bash
# Python 3
python -m http.server 8080

# Node.js (if installed)
npx http-server -p 8080
```

The frontend will be available at `http://localhost:8080`

## API Endpoints

### Basic Calculator
- `POST /api/calculator/calculate` - Calculate basic expression
  - Body: `{ "expression": "2 + 3 * 4" }`
  - Response: `{ "result": 14, "expression": "2 + 3 * 4" }`

### Scientific Calculator
- `POST /api/scientific/calculate` - Calculate scientific expression
  - Body: `{ "expression": "sin(45)", "is_degree": true }`
  - Response: `{ "result": 0.7071, "expression": "sin(45)" }`

### Financial Calculator
- `POST /api/financial/loan` - Calculate EMI
  - Body: `{ "principal": 10000, "rate": 5, "term": 36 }`
  - Response: `{ "emi": 299.71, "total_payment": 10789.56, "total_interest": 789.56 }`

- `POST /api/financial/interest` - Calculate interest
  - Body: `{ "principal": 10000, "rate": 5, "time": 5, "type": "compound" }`
  - Response: `{ "interest": 2762.82, "total_amount": 12762.82 }`

- `POST /api/financial/mortgage` - Calculate mortgage
  - Body: `{ "price": 300000, "down_payment": 60000, "rate": 4.5, "term": 30 }`
  - Response: `{ "monthly_payment": 1215.57, "total_payment": 437605.2, "total_interest": 197605.2 }`

- `POST /api/financial/roi` - Calculate ROI
  - Body: `{ "initial_investment": 10000, "final_value": 15000 }`
  - Response: `{ "profit": 5000, "roi_percentage": 50.0 }`

### History
- `GET /api/history/` - Get calculation history
  - Response: `{ "history": [...] }`

- `DELETE /api/history/` - Clear all history
  - Response: `{ "message": "History cleared successfully" }`

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Adding New Features

1. **Backend**: Add new service in `backend/app/services/`, create route in `backend/app/routers/`, and update schemas in `backend/app/models/schemas.py`

2. **Frontend**: Add API function in `frontend/api.js`, implement logic in respective JS file, and update HTML if needed

### Database

The application uses SQLite for simplicity. The database file (`calculator.db`) is created automatically on first run.

To reset the database:
```bash
rm backend/calculator.db
python -c "from app.models.database import init_db; init_db()"
```

## License

MIT License
