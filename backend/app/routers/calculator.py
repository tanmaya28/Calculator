from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import CalculateRequest, CalculateResponse
from app.services.calculator_service import calculate_basic
from app.models.database import get_db, CalculationHistory
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/calculate", response_model=CalculateResponse)
async def calculate(request: CalculateRequest, db: Session = Depends(get_db)):
    """Calculate basic mathematical expression"""
    try:
        result = calculate_basic(request.expression)
        
        # Save to history
        history_item = CalculationHistory(
            expression=request.expression,
            result=str(result),
            calculator_type="basic"
        )
        db.add(history_item)
        db.commit()
        
        return CalculateResponse(result=result, expression=request.expression)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
