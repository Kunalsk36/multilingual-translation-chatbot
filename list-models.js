const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API Key not found in .env.local");
    return;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("Models available:", JSON.stringify(data.models?.map(m => m.name), null, 2));
  } catch (e) {
    console.error("Error listing models:", e);
  }
}

listModels();
