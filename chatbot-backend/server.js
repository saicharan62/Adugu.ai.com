const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI("AIzaSyBBx-nOmjFsaRtyzvZ8Gi9EmoyCgO7ut0M");

app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
