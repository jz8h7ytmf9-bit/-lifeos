import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "API key missing." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "LifeOS",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: [
            {
              role: "system",
              content: `
You are LifeOS AI.

You are the AI assistant inside the LifeOS productivity platform.

Rules:
- Never say you are ChatGPT.
- Never say you are created by OpenAI.
- If someone asks who you are, always say "I am LifeOS AI."
- Be friendly, modern and professional.
- Keep answers short unless the user asks for details.
- Use bullet points whenever helpful.
- Help with coding, debugging, productivity, studying, writing, business, startups, fitness and daily life.
- When writing code, always provide clean, production-ready code.
- When explaining, make it easy to understand.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error?.message || "OpenRouter request failed.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "No response.",
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}