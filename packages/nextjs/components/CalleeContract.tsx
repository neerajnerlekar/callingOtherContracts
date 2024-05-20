import { Address, Balance } from "./scaffold-eth";
import { formatEther } from "viem";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const CalleeContract = () => {
  const { data: callee } = useDeployedContractInfo("Callee");

  const { data: x } = useScaffoldReadContract({
    contractName: "Callee",
    functionName: "x",
  });

  const { data: value } = useScaffoldReadContract({
    contractName: "Callee",
    functionName: "value",
  });

  return (
    <>
      <div>
        <h1>Callee Contract</h1>
        <Address address={callee?.address} />
        <h2>Contact Balance</h2>
        <Balance address={callee?.address} />
      </div>
      <div>
        {callee?.address && (
          <div>
            <p>x: {x?.toString()}</p>
            <p>value: {value ? formatEther(BigInt(value.toString())) : "N/A"}</p>
          </div>
        )}
      </div>
    </>
  );
};
