export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // API Route for chat
    if (url.pathname === '/api/chat') {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders, status: 204 });
      }

      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: corsHeaders });
      }

      try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
          return new Response(JSON.stringify({ error: "Invalid message format" }), { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          });
        }

        const systemPrompt = {
          role: "system",
          content: "You are CH Sagar's AI assistant. You help visitors navigate his portfolio, answer questions about his skills (Backend development, AI integraton, F&D at IntouchCX, etc.), and provide a polite, professional conversational experience."
        };

        const apiMessages = [systemPrompt, ...messages];
        
        // Cloudflare Workers access environment variables via the `env` object
        const OPENROUTER_API_KEY = env.OPENROUTER_API_KEY;

        if (!OPENROUTER_API_KEY) {
          return new Response(JSON.stringify({ error: "OpenRouter API Key is not configured." }), { 
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          });
        }

        const fetchRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://chsagar.work",
            "X-Title": "CH Sagar Portfolio"
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b:free",
            messages: apiMessages,
          }),
        });

        if (!fetchRes.ok) {
          const errText = await fetchRes.text();
          let errorMsg = "Failed to communicate with AI provider";
          try {
            const errObj = JSON.parse(errText);
            if (errObj.error && errObj.error.message) {
              errorMsg = errObj.error.message;
            }
          } catch (e) {}
          return new Response(JSON.stringify({ error: errorMsg, details: errText }), { 
            status: fetchRes.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const data = await fetchRes.json();
        return new Response(JSON.stringify(data), { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // Serve static assets for all other requests
    return env.ASSETS.fetch(request);
  }
};
