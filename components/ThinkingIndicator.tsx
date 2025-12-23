
import React from 'react';

const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-indigo-700 font-semibold animate-pulse text-lg">AI is processing your request...</p>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
          Gemini 3 Pro is applying deep reasoning to structure your hiring materials.
        </p>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
