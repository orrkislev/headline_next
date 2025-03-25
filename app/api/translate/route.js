import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;
const model = google("gemini-2.0-flash");


export async function POST(req) {
    const { headline, subtitle, locale} = await req.json();

    const targetLang = locale == 'heb' ? 'hebrew' : 'english';

    const prompt = `Translate the following news headline and subtitle into natural-sounding ${targetLang}. 
    Prioritize fluency over word-for-word accuracy, and ensure proper grammar. 
    Only return the direct translation without any additional text or explanations. "${headline}" - "${subtitle}"`;
    const { object } = await generateObject({
        model,
        schema: z.object({
            headline: z.string(),
            subtitle: z.string(),
        }),
        prompt: prompt, // changed this line to use the constructed prompt
      });

    return Response.json({ headline: object.headline, subtitle: subtitle ? object.subtitle : '' });
}