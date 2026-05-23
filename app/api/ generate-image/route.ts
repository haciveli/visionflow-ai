import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const prompt = body.prompt;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    console.log(result);

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {

      return NextResponse.json({
        error: "Görsel oluşmadı",
      });

    }

    return NextResponse.json({
      image: `data:image/png;base64,${imageBase64}`,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      error: "OpenAI hatası",
    });

  }

}