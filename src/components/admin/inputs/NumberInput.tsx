import { useState, useEffect } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  labelEn?: string;
  className?: string;
}

export function NumberInput({ value, onChange, label, labelEn, className = '' }: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState(formatWithCommas(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatWithCommas(value));
    }
  }, [value, isFocused]);

  function formatWithCommas(num: number): string {
    return num.toLocaleString('en-US');
  }

  function parseNumber(str: string): number {
    const cleaned = str.replace(/,/g, '').replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const num = parseNumber(displayValue);
    onChange(num);
    setDisplayValue(formatWithCommas(num));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value.toString());
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {labelEn && <span className="text-gray-400 text-xs mr-2">({labelEn})</span>}
      </label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   text-left font-mono text-sm"
        dir="ltr"
      />
    </div>
  );
}
