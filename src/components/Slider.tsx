'use client'
import { type ChangeEventHandler } from 'react';

const Slider = ({ value, onChange }: { value: number; onChange: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <div className="relative">
        <label htmlFor="labels-range-input" className="sr-only">Threshold</label>
        <input id="labels-range-input" type="range" value={value} min="0" max="1" step="0.05" onChange={onChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0%</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">{(Number(value) * 100).toFixed(0)}%</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">100%</span>
    </div>
  );
};

export default Slider;
