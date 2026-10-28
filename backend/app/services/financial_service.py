def calculate_emi(principal: float, rate: float, term: int) -> dict:
    """
    Calculate EMI (Equated Monthly Installment)
    principal: Loan amount
    rate: Annual interest rate in percentage
    term: Loan term in months
    """
    monthly_rate = rate / 100 / 12
    
    if monthly_rate == 0:
        emi = principal / term
    else:
        emi = principal * monthly_rate * (1 + monthly_rate) ** term / ((1 + monthly_rate) ** term - 1)
    
    total_payment = emi * term
    total_interest = total_payment - principal
    
    return {
        "emi": round(emi, 2),
        "total_payment": round(total_payment, 2),
        "total_interest": round(total_interest, 2)
    }

def calculate_interest(principal: float, rate: float, time: float, interest_type: str) -> dict:
    """
    Calculate simple or compound interest
    principal: Principal amount
    rate: Annual interest rate in percentage
    time: Time period in years
    interest_type: 'simple' or 'compound'
    """
    rate_decimal = rate / 100
    
    if interest_type == "simple":
        interest = principal * rate_decimal * time
        total_amount = principal + interest
    else:  # compound
        total_amount = principal * (1 + rate_decimal) ** time
        interest = total_amount - principal
    
    return {
        "interest": round(interest, 2),
        "total_amount": round(total_amount, 2)
    }

def calculate_mortgage(price: float, down_payment: float, rate: float, term: int) -> dict:
    """
    Calculate mortgage monthly payment
    price: Home price
    down_payment: Down payment amount
    rate: Annual interest rate in percentage
    term: Loan term in years
    """
    principal = price - down_payment
    monthly_rate = rate / 100 / 12
    term_months = term * 12
    
    if monthly_rate == 0:
        monthly_payment = principal / term_months
    else:
        monthly_payment = principal * monthly_rate * (1 + monthly_rate) ** term_months / ((1 + monthly_rate) ** term_months - 1)
    
    total_payment = monthly_payment * term_months
    total_interest = total_payment - principal
    
    return {
        "monthly_payment": round(monthly_payment, 2),
        "total_payment": round(total_payment, 2),
        "total_interest": round(total_interest, 2)
    }

def calculate_roi(initial_investment: float, final_value: float) -> dict:
    """
    Calculate Return on Investment (ROI)
    initial_investment: Initial investment amount
    final_value: Final value of investment
    """
    profit = final_value - initial_investment
    roi_percentage = (profit / initial_investment) * 100 if initial_investment != 0 else 0
    
    return {
        "profit": round(profit, 2),
        "roi_percentage": round(roi_percentage, 2)
    }
