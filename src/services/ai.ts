import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getChatResponse(message: string, history: any[] = []) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an elite luxury real estate advisor for SOHI Realty.
    Your tone is sophisticated, professional, and helpful.
    Your goal is to assist clients in finding their dream home while intelligently extracting 4 key data points:
    1. Name & Contact (Email or Phone)
    2. Budget
    3. Target Neighborhood
    4. Timeframe (When they want to buy/move)

    Guidelines:
    - Do not ask for all points at once. Make it a natural conversation.
    - Use luxury real estate terminology.
    - If you have all 4 points, summarize them and tell the client that one of our specialists will reach out shortly with a curated portfolio.
    - Output should be in standard Markdown.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });

  return response.text;
}

export async function extractLeadInfo(history: any[]) {
  const model = "gemini-3-flash-preview";
  const prompt = "Based on the conversation history, extract the following fields in JSON format: name, contact, budget, targetNeighborhood, timeframe. If a field is missing, use null.";

  const response = await ai.models.generateContent({
    model,
    contents: [
      ...history,
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          contact: { type: Type.STRING },
          budget: { type: Type.STRING },
          targetNeighborhood: { type: Type.STRING },
          timeframe: { type: Type.STRING },
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
}
