from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import ScientificCalculateRequest, ScientificCalculateResponse
from app.services.scientific_service import calculate_scientific
from app.models.database import get_db, CalculationHistory
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/calculate", response_model=ScientificCalculateResponse)
async def calculate(request: ScientificCalculateRequest, db: Session = Depends(get_db)):
    """Calculate scientific mathematical expression"""
    try:
        result = calculate_scientific(request.expression, request.is_degree)
        
        # Save to history
        history_item = CalculationHistory(
            expression=request.expression,
            result=str(result),
            calculator_type="scientific"
        )
        db.add(history_item)
        db.commit()
        
        return ScientificCalculateResponse(result=result, expression=request.expression)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
