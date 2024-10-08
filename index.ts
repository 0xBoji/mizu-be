import { serve } from "bun";

const server = serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api/transactions" && req.method === "GET") {
      const accountId = url.searchParams.get("accountId");
      const timestamp = url.searchParams.get("timestamp");

      if (!accountId) {
        return new Response("Missing account ID", { status: 400 });
      }
      
      return fetchAccountInfo(accountId, timestamp || "");
    } else if (url.pathname === "/api/latest-transaction" && req.method === "GET") {
      const accountId = url.searchParams.get("accountId");

      if (!accountId) {
        return new Response("Missing account ID", { status: 400 });
      }

      return fetchLatestTransaction(accountId);
    }
    return new Response("Not Found", { status: 404 });
  },
});

async function fetchAccountInfo(accountId: string, timestamp?: string) {
  const apiUrl = `https://aptos-testnet.nodit.io/v1/accounts/${accountId}/transactions`;
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': '2JFAPy5jyqdf4B2UgShVi821VkJWnirq'}
  };

  try {
    const response = await fetch(apiUrl, options);
    const json = await response.json();
    
    const filteredData = json
      .filter((transaction: any) => {
        if (timestamp) {
          return BigInt(transaction.timestamp) >= BigInt(timestamp);
        }
        return true;
      })
      .map((transaction: any) => {
        const depositEvent = transaction.events.find((event: any) => 
          event.type === "0x1::coin::DepositEvent"
        );
        
        return {
          amount: depositEvent?.data?.amount || "0",
          transaction_hash: transaction.hash,
          account_address: depositEvent?.guid?.account_address || "",
          timestamp: transaction.timestamp
        };
      });

    return new Response(JSON.stringify(filteredData), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(`Error: ${err}`, { status: 500 });
  }
}

async function fetchLatestTransaction(accountId: string) {
  const apiUrl = `https://aptos-testnet.nodit.io/v1/accounts/${accountId}/transactions`;
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': '2JFAPy5jyqdf4B2UgShVi821VkJWnirq'}
  };

  try {
    const response = await fetch(apiUrl, options);
    const json = await response.json();
    
    if (json.length > 0) {
      const latestTransaction = json[json.length - 1];
      const depositEvent = latestTransaction.events.find((event: any) => 
        event.type === "0x1::coin::DepositEvent"
      );

      const formattedTransaction = [{
        amount: depositEvent?.data?.amount || "0",
        transaction_hash: latestTransaction.hash,
        account_address: depositEvent?.guid?.account_address || "",
        timestamp: latestTransaction.timestamp
      }];

      return new Response(JSON.stringify(formattedTransaction), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify([]), {
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (err) {
    return new Response(`Error: ${err}`, { status: 500 });
  }
}

console.log(`Server running at http://localhost:${server.port}`);