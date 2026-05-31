export async function onRequest(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { messages } = await context.request.json();

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
    
    // Cloudflare Pages accesses environment variables via context.env
    const OPENROUTER_API_KEY = context.env.OPENROUTER_API_KEY;

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
    return new Response(JSON.stringify({ error: "Internal server error" }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
