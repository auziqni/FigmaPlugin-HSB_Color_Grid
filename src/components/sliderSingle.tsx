import React, { useEffect } from "react";

interface SingleRangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  minRange?: number;
  maxRange?: number;
  description?: string;
}

export default function Slider({
  value,
  onChange,
  minRange = 0,
  maxRange = 100,
  description = "",
}: SingleRangeSliderProps) {
  useEffect(() => {
    onChange(minRange);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(
      Math.max(Number(e.target.value), minRange),
      maxRange
    );
    onChange(newValue);
  };

  const getPercentage = (value: number) => {
    return ((value - minRange) / (maxRange - minRange)) * 100;
  };

  return (
    <div className="w-full max-w-md p-4 mx-auto">
      <div className="relative">
        <p className="font-bold">{description}</p>
        <div className="relative h-2 mt-4">
          <div className="absolute w-full h-2 bg-gray-200 rounded"></div>
          <div
            className="absolute h-2 bg-blue-500 rounded"
            style={{
              width: `${getPercentage(value)}%`,
            }}
          ></div>
          <input
            type="range"
            min={minRange}
            max={maxRange}
            value={value}
            onChange={handleChange}
            className="absolute w-full h-2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
        <div className="flex justify-center mt-4">
          {/* <span className="text-sm text-gray-600">Value: {value}</span> */}
          <input type="number" value={value} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
