import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generativeAiModel(prompt : string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text
  } catch (error) {
    console.error("Error in fetchng api result", error);
    
  }
}
