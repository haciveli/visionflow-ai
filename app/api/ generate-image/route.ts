import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const prompt = body.prompt;

    console.log("PROMPT:", prompt);

    const result = await openai.images.generate({

      model: "gpt-image-1",

      prompt: prompt,

      size: "1024x1024",

    });

    console.log(result);

    const image = result.data?.[0]?.b64_json;

    if (!image) {

      return Response.json({

        error: "Görsel üretilemedi",

      });

    }

    return Response.json({

      image: `data:image/png;base64,${image}`,

    });

  } catch (error) {

    console.log("OPENAI ERROR:", error);

    return Response.json({

      error: "OpenAI çalışmadı",

    });

  }

}