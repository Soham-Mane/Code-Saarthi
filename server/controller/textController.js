import { getAIResponse } from '../services/openaiService.js' // adjust path as needed

export const receiveText = async (req, res) => {
  try {
    const { selectedText } = req.body;

    if (!selectedText || selectedText.trim().length === 0) {
      return res.status(400).json({ error: "No text selected" });
    }

    console.log(`Received text: ${selectedText}`);

    const aiResponse = await getAIResponse(selectedText);
    console.log(`AI Response: ${aiResponse}`);
    return res.status(200).json({
      message: "Text processed successfully",
      aiResponse: aiResponse,
    });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
