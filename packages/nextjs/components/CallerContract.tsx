import { useState } from "react";
import { Address, EtherInput } from "./scaffold-eth";
import { parseEther } from "viem";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const CallerContract = () => {
  const [x, setX] = useState(0);
  const [ethAmount, setEthAmount] = useState("");
  const { data: caller } = useDeployedContractInfo("YourContract");
  const { data: callee } = useDeployedContractInfo("Callee");
  const { writeContractAsync: changeX } = useScaffoldWriteContract("YourContract");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  return (
    <>
      <div>
        <h1>Caller Contract</h1>
        <Address address={caller?.address} />
      </div>
      <div>
        <h2>Set value of X on </h2>
        <input
          type="number"
          placeholder="Enter number"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={e => setX(Number(e.target.value))}
        />
        <button
          className="btn btn-primary"
          onClick={async () => {
            try {
              await changeX({
                functionName: "setX",
                args: [callee?.address, BigInt(x.toString())],
              });
            } catch (e) {
              console.error("Error changing the number:", e);
            }
          }}
        >
          Set Number
        </button>
      </div>
      <div>
        <h2>Set value of X and send Ether </h2>
        <input
          type="number"
          placeholder="Enter number"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={e => setX(Number(e.target.value))}
        />
        <EtherInput value={ethAmount} onChange={amount => setEthAmount(amount)} />
        {x && ethAmount ? (
          <button
            className="btn btn-primary"
            onClick={async () => {
              try {
                await writeYourContractAsync({
                  functionName: "setXAndSendEther",
                  args: [callee?.address, BigInt(x.toString())],
                  value: parseEther(ethAmount),
                });
              } catch (e) {
                console.error("Error changing the number:", e);
              }
            }}
          >
            Set X and Send Ether
          </button>
        ) : (
          <button className="btn btn-primary" disabled>
            Set X and Send Ether
          </button>
        )}
      </div>
    </>
  );
};
