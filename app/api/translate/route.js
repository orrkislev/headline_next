import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;
const model = google("gemini-2.5-flash-lite");


export async function POST(req) {
    const { headline, subtitle, locale} = await req.json();

    const targetLang = locale == 'heb' ? 'hebrew' : 'english';

    const prompt = `Translate the following news headline and subtitle into natural-sounding ${targetLang}. 
    Prioritize fluency over word-for-word accuracy, and ensure proper grammar. 
    Don't change names, places or any other specific information. 
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