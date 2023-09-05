import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [firstOperand, setFirstOperand] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setOperator(null);
    setWaitingForOperand(false);
    setFirstOperand(null);
  };

  const performOperation = (nextOperator) => {
    const nextValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(nextValue);
      setWaitingForOperand(true);
      setOperator(nextOperator);
    } else {
      const result = calculateResult(firstOperand, nextValue, operator);
      setDisplayValue(String(result));
      setWaitingForOperand(true);
      setOperator(nextOperator);
      setFirstOperand(result);
    }
  };

  const calculateResult = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="calculator" id="calculator">
      <div className="display" id="display">
        {displayValue}
      </div>
      <div className="buttons">
        <button onClick={() => inputDigit(7)} id="seven">
          7
        </button>
        <button onClick={() => inputDigit(8)} id="eight">
          8
        </button>
        <button onClick={() => inputDigit(9)} id="nine">
          9
        </button>
        <button onClick={() => performOperation('+')} id="add">
          +
        </button>
        <button onClick={() => inputDigit(4)} id="four">
          4
        </button>
        <button onClick={() => inputDigit(5)} id="five">
          5
        </button>
        <button onClick={() => inputDigit(6)} id="six">
          6
        </button>
        <button onClick={() => performOperation('-')} id="subtract">
          -
        </button>
        <button onClick={() => inputDigit(1)} id="one">
          1
        </button>
        <button onClick={() => inputDigit(2)} id="two">
          2
        </button>
        <button onClick={() => inputDigit(3)} id="three">
          3
        </button>
        <button onClick={() => performOperation('*')} id="multiply">
          *
        </button>
        <button onClick={() => inputDigit(0)} id="zero">
          0
        </button>
        <button onClick={inputDecimal} id="decimal">
          .
        </button>
        <button onClick={() => performOperation('/')} id="divide">
          /
        </button>
        <button onClick={clearDisplay} id="clear">
          AC
        </button>
        <button onClick={() => performOperation('=')} id="equals">
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
