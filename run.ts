// import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// // This class is the main entry point into Aptos's APIs and separates functionality into different namespaces.
// // To use the SDK, create a new Aptos instance to get access to all the sdk functionality.



// async function ledgerInfo() {
//   // const aptos = new Aptos(); // default to devnet

//   // with custom configuration
//   const aptosConfig = new AptosConfig({ network: Network.TESTNET });
//   const aptos = new Aptos(aptosConfig);
  

//   const ledgerInfo = await aptos.getLedgerInfo();
//   // console.log(ledgerInfo);

//   // const fullNode = await aptos.getAptosFullNode();
//   // console.log(fullNode);

//   const accountAddress = "0xa2aca0f904823552f7cfa2fcd06df10e4e23da86c286ebf7853e850c4ba5dcf5";
//   // const accountInfo = await aptos.getAccountInfo({ accountAddress })
//   // console.log(accountInfo);

//   const accountTransactions = await aptos.getAccountTransactions({ accountAddress })
//   console.log(accountTransactions);

//   // console.log(aptos.staking);
// }

// ledgerInfo();