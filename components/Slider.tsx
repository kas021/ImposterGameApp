import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, onChange }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-lg font-semibold text-[var(--color-text-muted)]">{label}</label>
        <span className="text-2xl font-bold text-[var(--color-accent)]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-3 bg-black/10 rounded-lg appearance-none cursor-pointer slider-thumb"
      />
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          background: var(--color-accent);
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid var(--color-slider-thumb-border);
          box-shadow: 0 0 8px var(--color-accent-glow);
        }
        .slider-thumb::-moz-range-thumb {
          width: 25px;
          height: 25px;
          background: var(--color-accent);
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid var(--color-slider-thumb-border);
          box-shadow: 0 0 8px var(--color-accent-glow);
        }
      `}</style>
    </div>
  );
};

export default Slider;
