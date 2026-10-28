from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import (
    LoanRequest, LoanResponse,
    InterestRequest, InterestResponse,
    MortgageRequest, MortgageResponse,
    ROIRequest, ROIResponse
)
from app.services.financial_service import (
    calculate_emi, calculate_interest,
    calculate_mortgage, calculate_roi
)
from app.models.database import get_db, CalculationHistory
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/loan", response_model=LoanResponse)
async def loan(request: LoanRequest, db: Session = Depends(get_db)):
    """Calculate EMI for a loan"""
    try:
        result = calculate_emi(request.principal, request.rate, request.term)
        
        # Save to history
        expression = f"Loan: ${request.principal} at {request.rate}% for {request.term} months"
        history_item = CalculationHistory(
            expression=expression,
            result=f"EMI: ${result['emi']}",
            calculator_type="financial"
        )
        db.add(history_item)
        db.commit()
        
        return LoanResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/interest", response_model=InterestResponse)
async def interest(request: InterestRequest, db: Session = Depends(get_db)):
    """Calculate simple or compound interest"""
    try:
        result = calculate_interest(request.principal, request.rate, request.time, request.type)
        
        # Save to history
        expression = f"{request.type.capitalize()} Interest: ${request.principal} at {request.rate}% for {request.time} years"
        history_item = CalculationHistory(
            expression=expression,
            result=f"Interest: ${result['interest']}",
            calculator_type="financial"
        )
        db.add(history_item)
        db.commit()
        
        return InterestResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/mortgage", response_model=MortgageResponse)
async def mortgage(request: MortgageRequest, db: Session = Depends(get_db)):
    """Calculate mortgage monthly payment"""
    try:
        result = calculate_mortgage(request.price, request.down_payment, request.rate, request.term)
        
        # Save to history
        expression = f"Mortgage: ${request.price} with ${request.down_payment} down at {request.rate}% for {request.term} years"
        history_item = CalculationHistory(
            expression=expression,
            result=f"Monthly: ${result['monthly_payment']}",
            calculator_type="financial"
        )
        db.add(history_item)
        db.commit()
        
        return MortgageResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/roi", response_model=ROIResponse)
async def roi(request: ROIRequest, db: Session = Depends(get_db)):
    """Calculate Return on Investment"""
    try:
        result = calculate_roi(request.initial_investment, request.final_value)
        
        # Save to history
        expression = f"ROI: Invested ${request.initial_investment}, Final ${request.final_value}"
        history_item = CalculationHistory(
            expression=expression,
            result=f"ROI: {result['roi_percentage']}%",
            calculator_type="financial"
        )
        db.add(history_item)
        db.commit()
        
        return ROIResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
