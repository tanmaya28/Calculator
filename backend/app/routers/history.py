from fastapi import APIRouter, Depends
from app.models.schemas import HistoryItem, HistoryResponse
from app.models.database import get_db, CalculationHistory
from sqlalchemy.orm import Session
from sqlalchemy import desc

router = APIRouter()

@router.get("/", response_model=HistoryResponse)
async def get_history(db: Session = Depends(get_db), limit: int = 50):
    """Get calculation history"""
    history = db.query(CalculationHistory).order_by(desc(CalculationHistory.timestamp)).limit(limit).all()
    
    history_items = [
        HistoryItem(
            id=item.id,
            expression=item.expression,
            result=item.result,
            timestamp=item.timestamp.isoformat()
        )
        for item in history
    ]
    
    return HistoryResponse(history=history_items)

@router.delete("/")
async def clear_history(db: Session = Depends(get_db)):
    """Clear all calculation history"""
    db.query(CalculationHistory).delete()
    db.commit()
    return {"message": "History cleared successfully"}
