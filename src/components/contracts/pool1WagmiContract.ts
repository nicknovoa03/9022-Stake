import { BigNumber, ethers } from 'ethers';
import { usePrepareContractWrite, useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';
import Pool1 from './ABI/iAIPool1.json';
import Collection9022 from './ABI/Collection9022.json';
import {
  ReadPoolContractProps,
  ReadPoolDetailsContractProps,
  PoolContractProps,
  UnpoolingContractProps
} from './wagmiContracts';

export let iAI_ContractAddress: `0x${string}` | undefined = '0x6dDe4fFD6dB302Bc9a46850f61399e082f6c2122';
export let NFT_ContractAddress: `0x${string}` | undefined = '0x853806fCa5Ee8a6Ac99Dc84a8e3596A4F6541796';
export let Pool1ContractAddress: `0x${string}` | undefined = '0x60db3b3fef8aee5e1dfb0db9a5db4d4ade8f99a1';

let testERC20: `0x${string}` | undefined = '0x81cBE2317289Aa4d8B3c1e363046619317F63ff6';
let testNFT: `0x${string}` | undefined = '0x98F889e00f2AA49c5c30938f555B0488d4f59B8b';
let testPoolContract: `0x${string}` | undefined = '0x60db3b3fef8aee5e1dfb0db9a5db4d4ade8f99a1';

iAI_ContractAddress = testERC20;
NFT_ContractAddress = testNFT;
Pool1ContractAddress = testPoolContract;

// Initiate Stake
export const Pool1PreparedContract = (props: PoolContractProps) => {
  const { config } = usePrepareContractWrite({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'pool1',
    args: [props.poolAmount],
    overrides: {
      value: ethers.utils.parseEther('.01')
    }
  });
  return config;
};

// Unstake without penalty
export const Unpool1PreparedContract = (props: UnpoolingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'unpool1',
    args: [props.index]
  });
  return config;
};

//Unstake with penalty
export const WithdrawPool1PreparedContract = (props: UnpoolingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'withdrawPool1',
    args: [props.index]
  });
  return config;
};

// Claim Reward
export const ClaimRewardPool1PreparedContract = () => {
  const { config } = usePrepareContractWrite({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'claimRewardPool1'
  });
  return config;
};

// Get staking balance for an address
export const Pool1Balance = (props: ReadPoolContractProps) => {
  const { data } = useContractRead({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'stakingbalance',
    args: [props.ownerAddress]
  });
  return data;
};

// Get staking detials for specifc stake with an index
export const Pool1Details = (props: ReadPoolDetailsContractProps) => {
  const { data } = useContractRead({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'stakingbalance',
    args: [props.ownerAddress, props.index]
  });
  return data;
};

// Get staking detials for specifc stake with an index
export const AllPooled1 = (props: ReadPoolContractProps) => {
  const { data } = useContractRead({
    address: Pool1ContractAddress,
    abi: Pool1.abi,
    functionName: 'allStaked',
    args: [props.ownerAddress]
  });
  return data;
};
