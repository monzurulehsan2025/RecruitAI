
import React from 'react';
import { InterviewQuestion } from '../types';

interface Props {
  questions: InterviewQuestion[];
}

const InterviewGuideView: React.FC<Props> = ({ questions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">Behavioral Interview Guide</h2>
        <p className="text-sm text-slate-500">10 AI-Curated questions mapped to role requirements</p>
      </div>

      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {questions.map((item, idx) => (
          <div key={idx} className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-2.5 py-1 bg-white text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100 uppercase tracking-wider">
                Competency: {item.targetCompetency}
              </span>
              <span className="text-slate-400 text-xs font-medium">Q{idx + 1}</span>
            </div>
            <h4 className="text-lg font-medium text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors">
              "{item.question}"
            </h4>
            
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Look for:</p>
              <ul className="space-y-1">
                {item.idealResponseIndicators.map((indicator, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2 text-sm text-slate-600">
                    <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewGuideView;
