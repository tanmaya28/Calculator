from pydantic import BaseModel, Field
from typing import Optional

# Basic Calculator Models
class CalculateRequest(BaseModel):
    expression: str = Field(..., description="Mathematical expression to evaluate")

class CalculateResponse(BaseModel):
    result: float
    expression: str

# Scientific Calculator Models
class ScientificCalculateRequest(BaseModel):
    expression: str = Field(..., description="Scientific expression to evaluate")
    is_degree: bool = Field(True, description="Use degrees (True) or radians (False)")

class ScientificCalculateResponse(BaseModel):
    result: float
    expression: str

# Financial Calculator Models
class LoanRequest(BaseModel):
    principal: float = Field(..., gt=0, description="Loan amount")
    rate: float = Field(..., gt=0, description="Annual interest rate in percentage")
    term: int = Field(..., gt=0, description="Loan term in months")

class LoanResponse(BaseModel):
    emi: float
    total_payment: float
    total_interest: float

class InterestRequest(BaseModel):
    principal: float = Field(..., gt=0, description="Principal amount")
    rate: float = Field(..., gt=0, description="Annual interest rate in percentage")
    time: float = Field(..., gt=0, description="Time period in years")
    type: str = Field("simple", description="Type: 'simple' or 'compound'")

class InterestResponse(BaseModel):
    interest: float
    total_amount: float

class MortgageRequest(BaseModel):
    price: float = Field(..., gt=0, description="Home price")
    down_payment: float = Field(..., ge=0, description="Down payment amount")
    rate: float = Field(..., gt=0, description="Annual interest rate in percentage")
    term: int = Field(..., gt=0, description="Loan term in years")

class MortgageResponse(BaseModel):
    monthly_payment: float
    total_payment: float
    total_interest: float

class ROIRequest(BaseModel):
    initial_investment: float = Field(..., gt=0, description="Initial investment amount")
    final_value: float = Field(..., description="Final value of investment")

class ROIResponse(BaseModel):
    profit: float
    roi_percentage: float

# History Models
class HistoryItem(BaseModel):
    id: int
    expression: str
    result: str
    timestamp: str

class HistoryResponse(BaseModel):
    history: list[HistoryItem]
