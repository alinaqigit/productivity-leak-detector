import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    // 1. Get the user's input from the request body
    const { routine } = await req.json();

    if (!routine) {
      return NextResponse.json(
        { error: "Routine is required" }, 
        { status: 400 }
      );
    }

    

    // 2. Define the System Prompt (The Brains)
    // This instructs the AI to return strict JSON for your charts
    const systemPrompt = `
      You are a ruthless, sarcastic productivity expert and data analyst. 
      Your goal is to analyze a user's unstructured daily routine, find "Time Leaks" (wasted time), and roast them for it while providing helpful data.

      You must return ONLY a valid JSON object. Do not add markdown formatting like \`\`\`json.
      
      Follow these rules:
      1. Parse the input text to identify specific activities and their durations. If durations are vague, estimate them based on context.
      2. Categorize every activity into: "Productive" (Work, Study), "Wasted" (Social Media, Procrastination, Gaming), or "Neutral" (Sleep, Eating, Commute).
      3. Calculate a "Productivity Score" from 0 to 100 based on the ratio of Productive vs. Wasted time.
      4. Calculate "Financial Loss": Assume the user's time is worth $50/hour. Calculate money lost during "Wasted" time.
      5. Generate a "Roast": A short, funny, slightly mean comment about their worst habit.
      6. Generate "Actionable Fixes": 3 specific, short tips to fix the leaks.

      this is the routine: ${routine}
      The JSON schema must be exactly:
      {
        "productivity_score": number (0-100),
        "total_wasted_hours": number (float, e.g., 2.5),
        "money_wasted": number (integer, e.g., 125),
        "timeline": [
          { 
            "activity": string, 
            "duration_minutes": number, 
            "category": "Productive" | "Wasted" | "Neutral" 
          }
        ],
        "leaks": [
          { "name": string, "time_lost": string } 
        ],
        "roast": string,
        "fixes": [ string, string, string ],
        "suggestions": [ string, string, string ]
      }
    `;

    // 3. Call OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o-mini"), // 'gpt-4o-mini' is fast and good for JSON
      system: systemPrompt,
      prompt: `Here is my routine for today:\n${routine}`,
      temperature: 0.7, // Adds a little creativity to the roast
    });

    // 4. Clean and Parse the Response
    // Sometimes AI adds ```json ... ``` wrappers. We remove them to prevent JSON.parse errors.
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const data = JSON.parse(cleanedText);

    // 5. Return the structured data to the Frontend
    return NextResponse.json(data);

  } catch (error) {
    console.error("AI Analysis Failed:", error);
    return NextResponse.json(
      { error: "Failed to analyze productivity." }, 
      { status: 500 }
    );
  }
}