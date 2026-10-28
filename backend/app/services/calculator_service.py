def calculate_basic(expression: str) -> float:
    """
    Evaluate basic mathematical expression.
    Supports: +, -, *, /, %, parentheses
    """
    try:
        # Safety check: only allow mathematical characters
        allowed_chars = set('0123456789+-*/.() %')
        if not all(c in allowed_chars for c in expression):
            raise ValueError("Invalid characters in expression")
        
        result = eval(expression)
        
        if not isinstance(result, (int, float)):
            raise ValueError("Invalid result type")
        
        if result == float('inf') or result == float('-inf'):
            raise ValueError("Infinite result")
        
        return float(result)
    except ZeroDivisionError:
        raise ValueError("Division by zero")
    except Exception as e:
        raise ValueError(f"Calculation error: {str(e)}")
