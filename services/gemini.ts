
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { RecruitmentOutput, ChatMessage } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';

export const generateRecruitmentMaterials = async (notes: string): Promise<RecruitmentOutput> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Transform these raw recruitment notes into two distinct professional outputs:
    1. A polished, LinkedIn-optimized Job Description.
    2. An Interview Guide with 10 behavioral questions targeting the skills in the JD.

    RAW NOTES:
    ${notes}

    Format the response as a JSON object strictly following this schema:
    {
      "jobDescription": {
        "title": "string",
        "summary": "string",
        "responsibilities": ["string"],
        "qualifications": ["string"],
        "benefits": ["string"],
        "rawMarkdown": "A full, beautifully formatted markdown version of the JD for LinkedIn"
      },
      "interviewGuide": [
        {
          "question": "string",
          "targetCompetency": "string",
          "idealResponseIndicators": ["string"]
        }
      ]
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 32768 },
      // Note: Not setting maxOutputTokens as per requirements
    },
  });

  const text = response.text || "{}";
  try {
    return JSON.parse(text) as RecruitmentOutput;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI");
  }
};

export const chatWithGemini = async (messages: ChatMessage[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Transform history for the API
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));

  const chat = ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: "You are an expert Recruitment Consultant and HR Strategist. You help users refine job descriptions, prepare for interviews, and improve their hiring processes. Be concise, professional, and insightful."
    },
  });

  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage({ message: lastMessage });
  
  return result.text || "I'm sorry, I couldn't process that request.";
};
