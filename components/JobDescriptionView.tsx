
import React from 'react';
import { JobDescription } from '../types';

interface Props {
  data: JobDescription;
}

const JobDescriptionView: React.FC<Props> = ({ data }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.rawMarkdown);
    alert('LinkedIn Job Description copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{data.title}</h2>
          <p className="text-sm text-slate-500">LinkedIn Optimized Draft</p>
        </div>
        <button 
          onClick={copyToClipboard}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm shadow-indigo-100"
        >
          <i className="fa-solid fa-copy"></i> Copy Content
        </button>
      </div>
      
      <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-align-left text-indigo-500"></i>
            About the Role
          </h3>
          <p className="text-slate-700 leading-relaxed">{data.summary}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-list-check text-indigo-500"></i>
            Key Responsibilities
          </h3>
          <ul className="space-y-2">
            {data.responsibilities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-indigo-500"></i>
            What You'll Need
          </h3>
          <ul className="space-y-2">
            {data.qualifications.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {data.benefits.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-gift text-indigo-500"></i>
              Why Join Us?
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.benefits.map((benefit, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                  {benefit}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default JobDescriptionView;
