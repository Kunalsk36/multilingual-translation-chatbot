import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { text } = await request.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API KEY MISSING");
      return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Translate the following text into Marathi and Hindi. 
    
Original Text: "${text}"

Please provide the response in this exact format:
MARATHI: [translated text in marathi]
HINDI: [translated text in hindi]

Only provide the translations, nothing else.`;

    console.log("Sending prompt to Gemini API for text:", text);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Parse the response
    const lines = responseText.split("\n").filter(line => line.trim());
    let marathi = "";
    let hindi = "";

    lines.forEach(line => {
      if (line.includes("MARATHI:")) {
        marathi = line.replace("MARATHI:", "").trim();
      }
      if (line.includes("HINDI:")) {
        hindi = line.replace("HINDI:", "").trim();
      }
    });

    return new Response(
      JSON.stringify({
        original: text,
        marathi,
        hindi,
        success: true
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Translation failed",
        details: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
