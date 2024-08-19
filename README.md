# Building a Dapp with Nodit

This tutorial will guide you through creating a simple Dapp using Nodit, leveraging [Aptos Lab's boilerplate](https://aptos.dev/en/build/create-aptos-dapp/templates/boilerplate).
You can customize and adapt this template to fit your project needs!

## Pre-requisites

Before starting this tutorial, please ensure you have completed the following steps:

1. [Sign up for Nodit](https://id.lambda256.io/signup) and create your project. (The first project will be created automatically upon completing the onboarding process.)
2. Ensure your project is connected to the Aptos Nodes (Mainnet and Testnet).
3. Copy your project’s API key.

## How to use Nodit

### Configure the `.env` File

The .env file holds the necessary configuration for this tutorial.
You can choose the Aptos network, which must be either **mainnet** or **testnet**. (Note that devnet is not supported in Nodit.)
Insert your Nodit API key into this file as `VITE_API_KEY`.

```
PROJECT_NAME=build-dapp-using-nodit

# NOTE: Select Aptos network(miannet or testnet)
VITE_APP_NETWORK=

# NOTE: Input your NODIT API key here
VITE_API_KEY=
```

### Modify `/frontend/utils/aptosClient.ts`

If you are using the Aptos SDK, you need to configure the Aptos instance settings.
Update the fullnode and indexer endpoints in this configuration file.
By doing this, you can seamlessly integrate Nodit while using the Aptos SDK.

In this tutorial, once the environment variables are set in .env, no further changes are required in this file.

```ts
...

// NOTE: Set fullnode endpoint and indexer endpoint here
const aptos = new Aptos(
  new AptosConfig({
    network: NETWORK,
    fullnode: `https://aptos-${NETWORK}.nodit.io/${API_KEY}/v1`,
    indexer: `https://aptos-${NETWORK}.nodit.io/${API_KEY}/v1/graphql`,
  }),
);

...
```

### Example: Querying Fungible Asset Balances using Indexer API, `/frontend/hooks/useGetFungibleAssetBalances.ts`

This tutorial includes an example of querying fungible asset balances for a specific account using the indexer API.
The provided hook, `useGetFungibleAssetBalances.ts`, demonstrates how to utilize the indexer API in your project.

```ts
...
        // NOTE: You can change "query" field as you want
        const res = await aptosClient().queryIndexer<QueryResult>({
          query: {
            variables: {
              accountAddress: accountAddress,
            },
            query: `
              query FA_Balances($accountAddress: String) {
                current_fungible_asset_balances(
                  limit: 10
                  offset: 0
                  where: {
                    owner_address: {
                      _eq: $accountAddress
                    }
                  }
                ) {
                  owner_address
                  amount
                  storage_id
                  last_transaction_version
                  last_transaction_timestamp
                  is_frozen
                  metadata {
                    asset_type
                    creator_address
                    decimals
                    icon_uri
                    name
                    project_uri
                    symbol
                    token_standard
                    maximum_v2
                    supply_v2
                  }
                }
              }`,
          },
        });
```

### Pages

- **FungibleAssetBalances** - A page to search all the fungible assets balances owned by specific account.

### Commands

- `npm run dev` - a command to run dapp in the local environment
