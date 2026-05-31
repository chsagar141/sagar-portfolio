import fs from 'fs';

async function testApi() {
  console.log("Testing API...");
  const res1 = await fetch("https://openrouter.ai/api/v1/models");
  const data = await res1.json();
  const found = data.data.find(m => m.id.includes("gpt-oss-20b"));
  console.log(found ? found.id : "Not found");
}

testApi();
