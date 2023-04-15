import { useState, useRef, useEffect } from 'react';
import styles from './CalculatorWidget.module.scss';
import React from 'react';

interface CalculatorWidgetProps {
  autoFocusInput?: boolean;
}

export default function CalculatorWidget({
  autoFocusInput = false,
}: CalculatorWidgetProps) {
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [radians, setRadians] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocusInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocusInput]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasCalculated) {
      setResult(e.currentTarget.name);
      setHasCalculated(false);
    } else {
      setResult(result.concat(e.currentTarget.name));
    }
  };

  const clear = () => {
    setResult('');
    setHistory([]);
    setHasCalculated(false);
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      const res = eval(result).toString();
      setResult(res);
      updateHistory(result, parseFloat(res));
      setHasCalculated(true);
    } catch (err) {
      setResult('Error');
      setHasCalculated(false);
    }
  };

  const handleTrigClick = (
    func: (angle: number) => number,
    funcName: string
  ) => {
    const angle = radians
      ? parseFloat(result)
      : parseFloat(result) * (Math.PI / 180);
    const res = func(angle).toString();
    setResult(res);
    updateHistory(`${funcName}(${result})`, parseFloat(res));
  };

  const handleLog = () => {
    let res;
    if (result.includes(',')) {
      const [base, value] = result.split(',').map(Number);
      res = Math.log(value) / Math.log(base);
    } else {
      res = Math.log(parseFloat(result));
    }
    setResult(res.toString());
    updateHistory(`log(${result})`, res);
  };

  const handleSqrt = () => {
    const res = Math.sqrt(parseFloat(result)).toString();
    setResult(res);
    updateHistory(`sqrt(${result})`, parseFloat(res));
  };

  const toggleRadDeg = () => {
    setRadians(!radians);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      calculate();
    } else if (e.key === 'Escape') {
      clear();
    }
  };

  const updateHistory = (expression: string, result: number) => {
    setHistory([...history, `${expression} = ${result}`]);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.result}>
        <input
          ref={inputRef}
          type="text"
          value={result}
          onKeyDown={handleKeyDown}
          onChange={(e) => setResult(e.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <button className={styles.clear} onClick={clear}>
          Clear
        </button>
        <button className={styles.backspace} onClick={backspace}>
          C
        </button>
        <button className={styles.radDeg} onClick={toggleRadDeg}>
          {radians ? 'Rad' : 'Deg'}
        </button>
        <button onClick={handleSqrt}>sqrt</button>
        <button name="cos(" onClick={() => handleTrigClick(Math.cos, 'cos')}>
          cos
        </button>
        <button name="sin(" onClick={() => handleTrigClick(Math.sin, 'sin')}>
          sin
        </button>
        <button name="tan(" onClick={() => handleTrigClick(Math.tan, 'tan')}>
          tan
        </button>
        <button name="log(" onClick={handleLog}>
          log
        </button>
        <button name="**" onClick={handleClick}>
          ^
        </button>
        <button name="1" onClick={handleClick}>
          1
        </button>
        <button name="2" onClick={handleClick}>
          2
        </button>
        <button name="3" onClick={handleClick}>
          3
        </button>
        <button name="+" onClick={handleClick}>
          +
        </button>
        <button name="*" onClick={handleClick}>
          &times;
        </button>
        <button name="4" onClick={handleClick}>
          4
        </button>
        <button name="5" onClick={handleClick}>
          5
        </button>
        <button name="6" onClick={handleClick}>
          6
        </button>
        <button name="-" onClick={handleClick}>
          &ndash;
        </button>
        <button name="/" onClick={handleClick}>
          &divide;
        </button>
        <button name="7" onClick={handleClick}>
          7
        </button>
        <button name="8" onClick={handleClick}>
          8
        </button>
        <button name="9" onClick={handleClick}>
          9
        </button>
        <button name="0" onClick={handleClick}>
          0
        </button>
        <button name="." onClick={handleClick}>
          .
        </button>
        <button className={styles.calculate} onClick={calculate}>
          =
        </button>
        <button
          className={styles.history}
          onClick={() => alert(history.join('\n'))}
        >
          History
        </button>
      </div>
    </div>
  );
}
