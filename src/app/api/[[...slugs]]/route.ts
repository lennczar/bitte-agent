import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/feed", async ({ params, headers }) => {
    const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
    const accountId = mbMetadata?.accountData?.accountId || null;

    const request = await fetch("https://api.growthmate.xyz/public/v0/rec/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: accountId,
        unit_id: "VCRmsOnwUcrj4gB0pby2qQ==",
        referrer: window.location.href
      })
    })

    const response = await request.json();

    console.log(response);

    return response;
  })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
