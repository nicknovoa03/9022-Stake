import { BigNumber, ethers } from 'ethers';
import { usePrepareContractWrite, useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';
import TruthGPTStake from './ABI/truthGPTStake.json'
import Pool1 from './ABI/iAIPool1.json';
import TokenEth from './ABI/TokenEth.json'
import {
  ReadPoolContractProps,
  ReadPoolDetailsContractProps,
  PoolContractProps,
  UnpoolingContractProps,
  erc20ContractAddressApproveProps,
  AllowanceBalanceProps,
  iAI_ContractAddress
} from './wagmiContracts';

export let Pool1ContractAddress: `0x${string}` = '0x15174101b46CA51dec6fceEA3475A8802a168c9C';

export const testPoolContract: `0x${string}` = '0xd1cc357af989564b251104b671eb6a58bf00dc06';

//Pool1ContractAddress = testPoolContract;

// Approve token for tokenTransfer
export const Pool1PreparedContractApprove = (props: erc20ContractAddressApproveProps) => {
  const { config } = usePrepareContractWrite({
    address: iAI_ContractAddress,
    abi: TokenEth.abi,
    functionName: 'approve',
    args: [Pool1ContractAddress!, props.tokenAmount]
  });
  return config;
};

// Get Allowance for token owner and spender
export const ERC20Allowance = (props: AllowanceBalanceProps) => {
  const { data } = useContractRead({
    address: iAI_ContractAddress,
    abi: TokenEth.abi,
    functionName: 'allowance',
    args: [props.ownerAddress, Pool1ContractAddress]
  });
  return data as BigNumber;
};

// Initiate Stake
export const Pool1PreparedContract = (props: PoolContractProps) => {
  const { config } = usePrepareContractWrite({
    address: Pool1ContractAddress,
    abi: TruthGPTStake.abi,
    functionName: 'stake',
    args: [props.poolAmount]
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
    address: "0x15174101b46CA51dec6fceEA3475A8802a168c9C",
    abi: TruthGPTStake.abi,
    functionName: 'allStaked',
    args: ["0x560A3D62d41be2639f3D660036E1d7b857967197"]
  });
  return data;
};
