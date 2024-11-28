import React, { useEffect } from "react";

interface DoubleRangeSliderProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  setMinRange?: number;
  setMaxRange?: number;
}

export default function DoubleRangeSlider({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  setMinRange = 0,
  setMaxRange = 100,
}: DoubleRangeSliderProps) {
  useEffect(() => {
    // Set nilai awal ketika komponen dimount
    onMinChange(setMinRange);
    onMaxChange(setMaxRange);
  }, []);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), setMinRange),
      maxValue - 1
    );
    onMinChange(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      Math.min(Number(e.target.value), setMaxRange),
      minValue + 1
    );
    onMaxChange(value);
  };

  const getPercentage = (value: number) => {
    return ((value - setMinRange) / (setMaxRange - setMinRange)) * 100;
  };

  return (
    <div className="w-full max-w-md p-4 mx-auto">
      <div className="relative">
        <div className="relative h-2 mt-8">
          <div className="absolute w-full h-2 bg-gray-200 rounded"></div>
          <div
            className="absolute h-2 bg-blue-500 rounded"
            style={{
              left: `${getPercentage(minValue)}%`,
              width: `${getPercentage(maxValue) - getPercentage(minValue)}%`,
            }}
          ></div>
          <input
            type="range"
            min={setMinRange}
            max={setMaxRange}
            value={minValue}
            onChange={handleMinChange}
            className="absolute w-full h-2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={setMinRange}
            max={setMaxRange}
            value={maxValue}
            onChange={handleMaxChange}
            className="absolute w-full h-2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
        <div className="flex justify-between mt-4">
          <input type="number" value={minValue} onChange={handleMinChange} />
          <input type="number" value={maxValue} onChange={handleMaxChange} />
          {/* <span className="text-sm text-gray-600">Min: {minValue}</span>
          <span className="text-sm text-gray-600">Max: {maxValue}</span> */}
        </div>
      </div>
    </div>
  );
}
