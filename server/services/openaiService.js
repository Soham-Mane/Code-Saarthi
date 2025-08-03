import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TOKEN; // 🔐 Azure Inference token
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1"; // ✅ Use any supported model

export async function getAIResponse(userText) {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token)
  );

  const prompt = `Explain the following code or concept in simple terms:\n\n${userText}`;

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt }
      ],
      temperature: 1,
      top_p: 1,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  return response.body.choices[0].message.content.trim();
}
