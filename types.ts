
export interface JobDescription {
  title: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  rawMarkdown: string;
}

export interface InterviewQuestion {
  question: string;
  targetCompetency: string;
  idealResponseIndicators: string[];
}

export interface RecruitmentOutput {
  jobDescription: JobDescription;
  interviewGuide: InterviewQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
