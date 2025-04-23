import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const ai = new GoogleGenAI({
            apiKey: "AIzaSyC4gezGtvYAYnH5bMLAy2TQv3vVqDUmFrs",
        });

        const config = {
            thinkingConfig: {
                thinkingBudget: 0,
            },
            responseMimeType: 'text/plain',
        };

        const model = 'gemini-2.0-flash';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ];

        
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        const result: string[] = [];
        for await (const chunk of response) {
            if (chunk.text !== undefined) {
                result.push(chunk.text);
            }
        }

        return NextResponse.json({ result: result.join('') });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
    }
}
