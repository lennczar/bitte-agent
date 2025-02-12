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
    //   "evmAddress": "", // Optional
    //   "accountId": "",
    //   "network": "mainnet", // EVM only??
    //   "agentId": "bitte-agent.vercel.app"
    // }

    const account_id = 
      !!accountId && accountId !== "" ? accountId :
      !!evmAddress && evmAddress !== "" ? evmAddress :
      null // guest 

    const network = 
      !!accountId && accountId !== "" ? "Near" :
      !!evmAddress && evmAddress !== "" ? "Ethereum" :
      null // guest

    const request = await fetch("https://api.growthmate.xyz/public/v0/rec/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id,
        network,
        unit_id: "VCRmsOnwUcrj4gB0pby2qQ==",
        referrer: "https://wallet.bitte.ai"
      })
    })

    const response = await request.json();

    console.log(response);

    return response;
  })
  .get("/transactions", async ({ params, headers }) => {
    const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
    const accountId = mbMetadata?.accountData?.accountId || null;
    const evmAddress = mbMetadata?.accountData?.evmAddress || null;

    const account_id = 
      !!accountId && accountId !== "" ? accountId :
      !!evmAddress && evmAddress !== "" ? evmAddress :
      null // guest 

    const network = 
      !!accountId && accountId !== "" ? "Near" :
      !!evmAddress && evmAddress !== "" ? "Ethereum" :
      null // guest

    return {
        accountId,
        evmAddress,
        network,
    }

    if (network !== "Ethereum")
      return {
        error: "non EVM chains are not yet supported."
      }

    const request = await fetch(`https://api.growthmate.xyz/public/v0/data/transactions/${network}/${account_id}`, {
      method: "GET"
    })

    const response = await request.json();

    console.log(response);

    return response;
  })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
