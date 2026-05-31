import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API proxy route for Lightning AI chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      // We prepend the system prompt if not present, but for now we expect it from the frontend or inject it here.
      const systemPrompt = {
        role: "system",
        content: "You are CH Sagar's AI assistant. You help visitors navigate his portfolio, answer questions about his skills (Backend development, AI integraton, F&D at IntouchCX, etc.), and provide a polite, professional conversational experience."
      };

      const apiMessages = [systemPrompt, ...messages];

      const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

      const fetchRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://aistudio.google.com",
          "X-Title": "CH Sagar Portfolio"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: apiMessages,
        }),
      });

      if (!fetchRes.ok) {
        const errText = await fetchRes.text();
        console.error("OpenRouter API Error:", errText);
        let errorMsg = "Failed to communicate with AI provider";
        
        try {
          const errObj = JSON.parse(errText);
          if (errObj.error && errObj.error.message) {
            errorMsg = errObj.error.message;
          }
        } catch (e) {
          // ignore parsing error
        }

        return res.status(fetchRes.status).json({ error: errorMsg, details: errText });
      }

      const data = await fetchRes.json();
      res.json(data);
    } catch (error) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
