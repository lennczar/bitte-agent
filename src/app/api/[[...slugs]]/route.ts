import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/feed", async ({ params, headers }) => {
    const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
    const accountId = mbMetadata?.accountData?.accountId || null;
    const evmAddress = mbMetadata?.accountData?.evmAddress || null;

    // mbMetadata
    // {
    //   "evmAddress": "",
    //   "accountId": "",
    //   "network": "mainnet",
    //   "agentId": "bitte-agent.vercel.app"
    // }

    // mimic console.log
    fetch("https://putsreq.com/0yHxhwvIAAbirTg6FkQd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mbMetadata),
    })

    const account_id = 
      !!accountId && accountId !== "" ? accountId :
      !!evmAddress && evmAddress !== "" ? evmAddress :
      "" // guest 

    const request = await fetch("https://api.growthmate.xyz/public/v0/rec/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id,
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
