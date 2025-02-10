import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/feed", async ({ params, headers }) => {
    const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
    const accountId = mbMetadata?.accountData?.accountId || null;

    // mimic console.log
    await fetch("https://webhook.site/d8af5d7e-7fb2-4af5-aece-1d0087f2c021", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mbMetadata),
    })

    const request = await fetch("https://api.growthmate.xyz/public/v0/rec/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: accountId,
        unit_id: "VCRmsOnwUcrj4gB0pby2qQ==",
        referrer: "https://wallet.bitte.ai"
      })
    })

    const response = await request.json();

    console.log(response);

    return response;
  })
  // .get("/transactions", async ({ params, headers }) => {
  //   const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
  //   const accountId = mbMetadata?.accountData?.accountId || null;

  //   const request = await fetch("https://api.growthmate.xyz/public/v0/rec/feed", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       account_id: accountId,
  //       unit_id: "VCRmsOnwUcrj4gB0pby2qQ==",
  //       referrer: "https://wallet.bitte.ai"
  //     })
  //   })

  //   const response = await request.json();

  //   console.log(response);

  //   return response;
  // })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
