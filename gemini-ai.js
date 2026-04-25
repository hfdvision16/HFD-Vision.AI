const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(message);
    const reply = result.response.text();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI service busy hai, thoda baad try karo." })
    };
  }
};
