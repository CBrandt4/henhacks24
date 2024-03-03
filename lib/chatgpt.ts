import OpenAI from "openai";

const openai = new OpenAI();

export async function completeSentence(sentence: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an assistant to a person who struggles with grammar and sentence structure. Given a prompt, return the same prompt with any grammatical errors corrected. Do not ask questions or respond with information not in the original sentence. Do not engage in conversation, you are a translator.",
      },
      {
        role: "user",
        content: sentence,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content!;
}

export async function textToSpeech(sentence: string) {
  const audio = await openai.audio.speech.create({
    input: sentence,
    model: "tts-1",
    voice: "alloy",
  });

  const obj =
    "data:audio/mpeg;base64," +
    Buffer.from(await audio.arrayBuffer()).toString("base64");

  return obj;
}
