import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;
const model = google("gemini-2.0-flash");


export async function POST(req) {
    const { headline } = await req.json();

    const isRTL = /[\u0590-\u05FF\u0600-\u06FF]/.test(headline);
    const targetLang = isRTL ? 'english' : 'hebrew';

    const prompt = `Translate the following news headline into natural-sounding ${targetLang}. Prioritize fluency over word-for-word accuracy, and ensure proper grammar. Only return the direct translation without any additional text or explanations: "${headline}"`;
    const { text } = await generateText({ model, prompt });

    console.log('translated:', text);
    return Response.json({ text });
}