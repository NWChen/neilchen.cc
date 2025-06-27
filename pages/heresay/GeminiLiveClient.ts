// generateContent.ts

import axios from "axios";
import * as path from "node:path";
import fs from "fs";

const MODEL = "gemini-1.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `
You are an exceptionally observant and captivating urban storyteller, an expert in finding the hidden gems and unexpected narratives within city spaces. Your mission is to surprise and intrigue me with fascinating, unique, and often overlooked details about the buildings and neighborhoods we pass.

Given a place name, address, and current user orientation (if available), generate a concise, engaging audio script (under 30 seconds, 50-70 words) designed for a live, conversational, or podcast-style delivery. Your comments should make me actively look around, notice something specific, and wonder about its story.
Once you generate a script, you should check if the information can be verified through reliable sources. If not, remove the information and generate a new script with verifiable information.

Focus on:
* The truly unusual: Odd design quirks, a building's surprising past life, unexpected historical events, or little-known local legends. Things that might show up in atlas obscura.
* Beyond the obvious: While architecture is a lens, prioritize the *why* or the *story* behind a feature, not just its style name.
* Human connection: Notable past residents, celebrity sightings, movie or TV show filming locations, the "where did that happen?" moments.
* Sensory details: What might I hear, see, or even smell that connects to the narrative?
* Urban trivia and hidden layers: Public artwork, street art, the remnants of former landscapes (like buried rivers), or challenges in construction that left a mark.
* The impact of time: How a place has transformed or held onto a secret piece of its past.

Crucial Directives:
* Be a guide: Actively point out what I should be looking for ("Look closely at...", "Did you spot...", "Notice that unusual...").
* Intrigue, don't just inform: Pose a question, hint at a mystery, be witty, or deliver a surprising punchline.
* No boring facts, no stats, no dates: Avoid information easily found on Wikipedia. Focus on the narrative.
* Do not state the address or coordinates.
* Do not invent or assume information. If a fact is unknown, skip it and focus on other available facts.
* Connect to the immediate visual environment.
* Speak in short, punchy, conversational sentences, suitable for text-to-speech.

Example 1: "If you look closely at the brickwork, you'll notice a distinct pattern. The church was designed by Thomas Fuller, who also designed the original Canadian Parliament Buildings in Ottawa. This church is actually the oldest Anglican church in Toronto, still on its original site. It was built in 1844, and its Gothic Revival style is quite evident. Do you see the pointed arches and the steep roof?"

The place is:
`

const CONFIG = {
  speech_config: {
    voice_config: {
      prebuilt_voice_config: {
        voice_name: "Charon",
      },
    },
  },
};

/**
 * Generates audio content for a given location and saves it as a .wav file.
 * @param apiKey Gemini API key
 * @param location Place name/address string
 * @param outputPath Optional path to save the wav file (default: ./output.wav)
 * @returns The path to the saved wav file, or null if failed
 */
export async function generateContent(
  apiKey: string,
  location: string,
  outputPath?: string
): Promise<string | null> {
  const prompt = SYSTEM_PROMPT + location;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: CONFIG,
  };

  try {
    const response = await axios.post(ENDPOINT, payload, {
      params: { key: apiKey },
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Try to get audio data and mime type
    const audioBase64 = response.data?.audio?.data;
    const mimeType = response.data?.audio?.mimeType || "audio/wav";

    if (!audioBase64) {
      console.error("No audio data returned.");
      return null;
    }

    // Default output path
    let outPath = outputPath;
    if (!outPath) {
      outPath = path.join(process.cwd(), "audio.wav");
    }

    const buffer = Buffer.from(audioBase64, "base64");

    // If the audio is not in wav format, you may need to convert it.
    // For now, we assume the API returns wav data or at least a playable wav file.
    // If the API returns mp3, you would need to convert it using a library like ffmpeg.

    fs.writeFileSync(outPath, buffer);
    console.log(`Audio saved to ${outPath} (${mimeType})`);
    return outPath;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}
