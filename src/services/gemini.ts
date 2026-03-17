import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

export const chatModel = "gemini-3-flash-preview";
export const imageModel = "gemini-2.5-flash-image";

export async function generateText(prompt: string) {
  try {
    const response = await genAI.models.generateContent({
      model: chatModel,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await genAI.models.generateContent({
      model: imageModel,
      contents: [{ parts: [{ text: prompt }] }],
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
