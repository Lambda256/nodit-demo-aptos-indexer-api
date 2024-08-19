import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FungibleAssetBalance, useGetFungibleAssetBalances } from "@/hooks/useGetFungibleAssetBalances";
import { convertAmountFromOnChainToHumanReadable } from "@/utils/helpers";
import { useToast } from "@/components/ui/use-toast";

function FungibleAssetBalances() {
  const [address, setAddress] = useState("");
  const { data: balancesQuery, isLoading } = useGetFungibleAssetBalances(address);
  const balances = balancesQuery || [];
  const { toast } = useToast();

  useEffect(() => {
    if (address.length > 0 && !isLoading && balances.length === 0) {
      toast({
        variant: "default",
        title: "No balances found",
        description: `This account(${address}) has no fungible assets. Try another account address!`,
      });
    }
  }, [balances, isLoading]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      query: { value: string };
    };
    setAddress(target.query.value);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap gap-4">
      {/* Search Bar */}
      <form className="w-full flex gap-2 justify-center" onSubmit={onSubmit}>
        <Input name="query" className="w-full" />
        <Button type="submit">
          <Search />
        </Button>
      </form>

      {/* Search Result Table */}
      <div className="w-full">
        <Table className="max-w-screen-xl mx-auto">
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
            {!balances.length && (
              <TableRow>
                <TableCell className="text-center" colSpan={6}>
                  A list of fungible assets owned by account
                </TableCell>
              </TableRow>
            )}
            {balances.map((item: FungibleAssetBalance, index) => (
              <TableRow key={item.metadata.name + item.metadata.symbol + index} className="items-center content-center">
                <TableCell>{item.metadata.name}</TableCell>
                <TableCell>{item.metadata.symbol}</TableCell>
                <TableCell>{item.metadata.token_standard}</TableCell>
                <TableCell>
                  <Link
                    to={`https://explorer.aptoslabs.com/object/${
                      item.metadata.asset_type
                    }?network=${import.meta.env.VITE_APP_NETWORK}`}
                    target="_blank"
                    className="underline"
                  >
                    {item.metadata.asset_type}
                  </Link>
                </TableCell>
                <TableCell>{item.metadata.decimals}</TableCell>
                <TableCell>{convertAmountFromOnChainToHumanReadable(item.amount, item.metadata.decimals)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default FungibleAssetBalances;
