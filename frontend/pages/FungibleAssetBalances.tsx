import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FungibleAssetBalance, useGetFungibleAssetBalances } from "@/hooks/useGetFungibleAssetBalances";
import { convertAmountFromOnChainToHumanReadable } from "@/utils/helpers";
import { useToast } from "@/components/ui/use-toast";
import useEnterKey from "@/hooks/useEnterKey";

function FungibleAssetBalances() {
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState<FungibleAssetBalance[]>([]);
  const balancesQuery = useGetFungibleAssetBalances(address);
  const { toast } = useToast();

  useEffect(() => {
    if (balancesQuery.isSuccess && balancesQuery.data) {
      setBalances(balancesQuery.data);
    }
    if (balancesQuery.data && !balancesQuery.data.length) {
      toast({
        variant: "default",
        title: "No balances found",
        description: `This account(${address}) has no fungible assets. Try another account address!`,
      });
    }
  }, [balancesQuery.isLoading]);

  const searchOnClick = async () => {
    if (address) {
      await balancesQuery.refetch();
    } else {
      toast({
        variant: "destructive",
        title: "Missing address",
        description: "Please enter an account address in the search bar",
      });
    }
  };

  useEnterKey(searchOnClick);

  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap gap-4">
      {/* Search Bar */}
      <div className="w-full flex gap-2 justify-center">
        <Input onChange={(e) => setAddress(e.target.value)} className="w-full" />
        <Button onClick={searchOnClick}>
          <Search />
        </Button>
      </div>

      {/* Search Result Table */}
      <div className="w-full">
        <Table className="max-w-screen-xl mx-auto">
          {!balances.length && <TableCaption>A list of fungible assets owned by account</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Coin Type</TableHead>
              <TableHead>Decimal</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balances.length > 0 &&
              balances.map((item: FungibleAssetBalance, index) => {
                return (
                  <TableRow
                    key={item.metadata.name + item.metadata.symbol + index}
                    className="items-center content-center"
                  >
                    <TableCell>{item.metadata.name}</TableCell>
                    <TableCell>{item.metadata.symbol}</TableCell>
                    <TableCell>{item.metadata.token_standard}</TableCell>
                    <TableCell>
                      <Link
                        to={`https://explorer.aptoslabs.com/object/${
                          item.metadata.asset_type
                        }?network=${import.meta.env.VITE_APP_NETWORK}`}
                        target="_blank"
                        style={{ textDecoration: "underline" }}
                      >
                        {item.metadata.asset_type}
                      </Link>
                    </TableCell>
                    <TableCell>{item.metadata.decimals}</TableCell>
                    <TableCell>
                      {convertAmountFromOnChainToHumanReadable(item.amount, item.metadata.decimals)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default FungibleAssetBalances;
