import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiModel = "gemini-3.1-pro-preview";

export async function generateStudyContent(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are EduPilot, a world-class AI Study Assistant. Help the student with their request in a professional, encouraging, and clear manner.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function generateImagePrompt(topic: string) {
  const prompt = `Generate a highly detailed educational diagram description for: ${topic}. Focus on clarity and scientific accuracy.`;
  return generateStudyContent(prompt, "You are an expert educational illustrator.");
}
