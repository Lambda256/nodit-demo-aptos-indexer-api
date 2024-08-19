import { NETWORK } from "@/constants";
import { WalletSelector } from "./WalletSelector";

export function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      <div className="flex flex-row gap-2">
        <h1 className="display">Build Dapp using</h1>
        <h1 className="display text-[#03D179]">NODIT</h1>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <div className="bg-[#03D179] text-primary h-10 px-4 py-2 rounded-md uppercase">{NETWORK}</div>
        {/* <WalletSelector /> */}
      </div>
    </div>
  );
}
