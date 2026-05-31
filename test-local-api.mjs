import fetch from 'node-fetch';

async function test() {
  const res = await fetch("http://0.0.0.0:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "Hi" }] })
  });

  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
  const text = await res.text();
  console.log("Body:", text);
}
test();
