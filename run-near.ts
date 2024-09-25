// import * as nearAPI from "near-api-js";

// const NEAR_RPC_API = 'https://rpc.testnet.near.org';
// const provider = new nearAPI.providers.JsonRpcProvider({url:NEAR_RPC_API});

// let latestBlockHeight = 0;

// setInterval(async () => {
//   try {
//     const latestBlock = await provider.block({ finality: 'final' });
//     const height = latestBlock.header.height;

//     if (height === latestBlockHeight) {
//       return;
//     }

//     latestBlockHeight = height;
//     console.log('Latest Block:', height);

//   } catch (error) {
//     console.error('Error Processing Block:', error);
//   }
// }, 1000);
