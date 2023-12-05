'use client'
import { type ChangeEventHandler } from 'react';

const Slider = () => {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Company"
        />
      </div>
    </div>
  );
};

export default Slider;
