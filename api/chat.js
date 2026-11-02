import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodă nepermisă." });
  }

  try {
    const { message } = req.body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Mesaj gol." });
    }

    const response = await client.responses.create({
      model: "gpt-6-astra",
      input: message.trim(),
    });

    return res.status(200).json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Nu am putut genera răspunsul.",
    });
  }
}
