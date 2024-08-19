import { aptosClient } from "@/utils/aptosClient";
import { useQuery } from "@tanstack/react-query";

interface QueryResult {
  current_fungible_asset_balances_aggregate: FungibleAssetBalanceAggregate;
  current_fungible_asset_balances: FungibleAssetBalance[];
}

export interface FungibleAssetBalanceAggregate {
  count: number;
}

export interface FungibleAssetBalance {
  owner_address: string;
  amount: number;
  storage_id: string;
  last_transaction_timestamp: string;
  last_transaction_version: string;
  is_frozen: boolean;
  metadata: FungibleAssetMetadata;
}

interface FungibleAssetMetadata {
  asset_type: string;
  creator_address: string;
  decimals: number;
  icon_uri: string;
  name: string;
  project_uri: string;
  symbol: string;
  token_standard: string;
  maximum_v2: number;
  supply_v2: number;
}

export function useGetFungibleAssetBalances(accountAddress: string) {
  return useQuery({
    queryKey: ["nodit-indexer-api", accountAddress],
    refetchInterval: false,
    enabled: !accountAddress,
    queryFn: async () => {
      try {
        if (!accountAddress) return null;

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

        const balances = res.current_fungible_asset_balances;
        if (!balances) return null;

        return [...balances] satisfies FungibleAssetBalance[];
      } catch (error) {
        console.error(error);
      }
    },
  });
}
