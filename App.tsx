
import React, { useState } from 'react';
import { RecruitmentOutput } from './types';
import { generateRecruitmentMaterials } from './services/gemini';
import ThinkingIndicator from './components/ThinkingIndicator';
import JobDescriptionView from './components/JobDescriptionView';
import InterviewGuideView from './components/InterviewGuideView';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [output, setOutput] = useState<RecruitmentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'jd' | 'guide'>('jd');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateRecruitmentMaterials(notes);
      setOutput(data);
    } catch (err) {
      setError("Something went wrong while generating materials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <i className="fa-solid fa-user-plus text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">RecruitAI Sandbox</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Powered by Gemini 3 Pro</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Hiring Pipeline</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Talent Insights</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Section */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-pen-nib text-indigo-500"></i>
                <h2 className="text-lg font-bold text-slate-800">Desired Role Notes</h2>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Paste your messy hiring notes, bullet points, or role brainstorming here. We'll turn them into professional documents.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Example: Senior Frontend Dev. Needs React, TS, Tailwind. 5+ years experience. Hybrid role. Must be good at mentoring juniors. Fast-paced startup vibe..."
                className="w-full h-80 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none font-medium leading-relaxed"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !notes.trim()}
                className="w-full mt-6 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-slate-300 disabled:shadow-none transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    Thinking Deeply...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    Generate Professional Materials
                  </>
                )}
              </button>
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {error}
                </div>
              )}
            </div>

            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb text-indigo-500"></i>
                Pro Tip
              </h3>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Be specific about company culture and unique perks. Gemini 3 Pro can weave these into the "Why Join Us" section for better candidate attraction.
              </p>
            </div>
          </section>

          {/* Output Section */}
          <section className="lg:col-span-7">
            {!output && !loading ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center p-12">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                  <i className="fa-solid fa-file-export text-4xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-400">Sandbox Empty</h2>
                <p className="text-slate-400 mt-2 max-w-sm">
                  Input your notes on the left to see your generated Job Description and Interview Guide.
                </p>
              </div>
            ) : loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px] flex items-center justify-center">
                <ThinkingIndicator />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setActiveTab('jd')}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'jd' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <i className="fa-solid fa-briefcase"></i>
                    Job Description
                  </button>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'guide' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <i className="fa-solid fa-clipboard-question"></i>
                    Interview Guide
                  </button>
                </div>

                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  {activeTab === 'jd' ? (
                    <JobDescriptionView data={output.jobDescription} />
                  ) : (
                    <InterviewGuideView questions={output.interviewGuide} />
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default App;
