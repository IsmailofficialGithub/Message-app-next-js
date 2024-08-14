import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
       prompt ,
      max_tokens: 150,
    });

    return NextResponse.json(response.choices[0].text);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
