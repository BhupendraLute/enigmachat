/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1000,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function getGeminiResponse(prompt : string) {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const responseText = result.response.text();

  const responseArray = responseText.split('**');
  let newResponseText = '';
  for(let i=0; i< responseArray.length; i++){
    if (i=== 0 || i % 2 !== 1) {
      newResponseText += responseArray[i]
    }else {
      newResponseText += '<b>'+ responseArray[i]+ '</b>'
    }
  }

  let finalResponseText = newResponseText.split('*').join('<br />')
  console.log(finalResponseText);
  

  return finalResponseText;
}

export default getGeminiResponse;