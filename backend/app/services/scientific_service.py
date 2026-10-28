import math

def calculate_scientific(expression: str, is_degree: bool = True) -> float:
    """
    Evaluate scientific mathematical expression.
    Supports: trigonometric functions, logarithms, powers, roots, etc.
    """
    try:
        # Replace mathematical symbols with Python equivalents
        expr = expression
        
        # Constants
        expr = expr.replace('π', str(math.pi))
        expr = expr.replace('e', str(math.e))
        
        # Trigonometric functions
        if is_degree:
            expr = expr.replace('sin(', 'math.sin(math.radians(')
            expr = expr.replace('cos(', 'math.cos(math.radians(')
            expr = expr.replace('tan(', 'math.tan(math.radians(')
        else:
            expr = expr.replace('sin(', 'math.sin(')
            expr = expr.replace('cos(', 'math.cos(')
            expr = expr.replace('tan(', 'math.tan(')
        
        # Logarithmic functions
        expr = expr.replace('log(', 'math.log10(')
        expr = expr.replace('ln(', 'math.log(')
        
        # Other functions
        expr = expr.replace('sqrt(', 'math.sqrt(')
        expr = expr.replace('abs(', 'math.abs(')
        expr = expr.replace('^', '**')
        
        # Safety check - only allow safe mathematical operations
        dangerous = ['import', 'exec', 'eval', 'open', 'file', '__']
        if any(d in expr.lower() for d in dangerous):
            raise ValueError("Invalid characters in expression")
        
        result = eval(expr)
        
        if not isinstance(result, (int, float)):
            raise ValueError("Invalid result type")
        
        if result == float('inf') or result == float('-inf'):
            raise ValueError("Infinite result")
        
        if math.isnan(result):
            raise ValueError("Invalid result (NaN)")
        
        return float(result)
    except ZeroDivisionError:
        raise ValueError("Division by zero")
    except Exception as e:
        raise ValueError(f"Calculation error: {str(e)}")
