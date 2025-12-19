
import { GoogleGenAI } from "@google/genai";

// Function to generate test advice using Gemini AI
export const generateTestAdvice = async (code: string, errorLog: string): Promise<string> => {
  try {
    // Initializing Gemini API with the provided API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Using 'gemini-3-pro-preview' as it is recommended for complex text tasks like coding and reasoning
    const model = 'gemini-3-pro-preview';

    const prompt = `
      You are an expert Senior QA Automation Engineer specializing in Playwright and AI Testing.
      
      User Code:
      \`\`\`typescript
      ${code}
      \`\`\`

      Error Log (simulated):
      ${errorLog}

      Please provide:
      1. A brief explanation of why this test might fail or how to improve it.
      2. Corrected code snippet if applicable.
      3. A tip on how to make this test more "AI-resilient" (e.g., using better selectors).
      
      Keep the response concise and formatted in Markdown.
    `;

    // Always use ai.models.generateContent with both the model name and prompt
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    // Extracting generated text directly from the text property as per current SDK guidelines
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to contact AI service. Please check your connection or API key.";
  }
};
