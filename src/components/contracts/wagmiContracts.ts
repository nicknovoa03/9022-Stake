import { BigNumber, ethers } from 'ethers';
import { usePrepareContractWrite, useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';
import truthGPTStaking from './truthGPTStake.json';
import Collection9022 from './Collection9022.json';

type ReadStakingContractProps = {
  ownerAddress: `0x${string}` | string | undefined;
};

type ReadStakingDetailsContractProps = {
  ownerAddress: `0x${string}` | undefined;
  index: number;
};

type UnstakingContractProps = {
  index: number;
};

type StakingContractProps = {
  stakeAmount: BigNumber;
};

type AllowanceBalanceProps = {
  ownerAddress: `0x${string}` | undefined;
};

type erc20ContractAddressApproveProps = {
  tokenAmount: BigNumber;
};

export let iAI_ContractAddress: `0x${string}` | undefined = '0x6dDe4fFD6dB302Bc9a46850f61399e082f6c2122';
export let NFT_ContractAddress: `0x${string}` | undefined = '0x853806fCa5Ee8a6Ac99Dc84a8e3596A4F6541796';
export let StakingContractAddress: `0x${string}` | undefined = '0x60db3b3fef8aee5e1dfb0db9a5db4d4ade8f99a1';

let testERC20: `0x${string}` | undefined = '0x81cBE2317289Aa4d8B3c1e363046619317F63ff6';
let testNFT: `0x${string}` | undefined = '0x98F889e00f2AA49c5c30938f555B0488d4f59B8b';
let testStakingContract: `0x${string}` | undefined = '0x60db3b3fef8aee5e1dfb0db9a5db4d4ade8f99a1';

iAI_ContractAddress = testERC20;
NFT_ContractAddress = testNFT;
StakingContractAddress = testStakingContract;

// Get Allowance for token owner and spender
export const ERC20Allowance = (props: AllowanceBalanceProps) => {
  const { data } = useContractRead({
    address: iAI_ContractAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [props.ownerAddress!, StakingContractAddress!]
  });
  return data;
};

// Get balance of for token owner
export const ERC20BalanceOf = (props: AllowanceBalanceProps) => {
  const { data } = useContractRead({
    address: iAI_ContractAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [props.ownerAddress!]
  });
  return data;
};

// Get balance of for token owner
export const ERC721BalanceOf = (props: AllowanceBalanceProps) => {
  const { data } = useContractRead({
    address: NFT_ContractAddress,
    abi: Collection9022.abi,
    functionName: 'balanceOf',
    args: [props.ownerAddress!]
  });
  return data as BigNumber;
};

// Get staking balance for an address
export const StakingBalance = (props: ReadStakingContractProps) => {
  const { data } = useContractRead({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'stakingbalance',
    args: [props.ownerAddress]
  });
  return data;
};

// Get staking detials for specifc stake with an index
export const StakingDetails = (props: ReadStakingDetailsContractProps) => {
  const { data } = useContractRead({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'stakingbalance',
    args: [props.ownerAddress, props.index]
  });
  return data;
};

// Get staking detials for specifc stake with an index
export const AllStaked = (props: ReadStakingContractProps) => {
  const { data } = useContractRead({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'allStaked',
    args: [props.ownerAddress]
  });
  return data;
};

// Initiate Stake
export const StakePreparedContract = (props: StakingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'stake',
    args: [props.stakeAmount]
  });
  return config;
};

// Unstake without penalty
export const UnstakePreparedContract = (props: UnstakingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'unstake',
    args: [props.index]
  });
  return config;
};

//Unstake with penalty
export const WithdrawPreparedContract = (props: UnstakingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'withdrawpenalty',
    args: [props.index]
  });
  return config;
};

// Claim Reward
export const ClaimRewardPreparedContract = () => {
  const { config } = usePrepareContractWrite({
    address: StakingContractAddress,
    abi: truthGPTStaking.abi,
    functionName: 'claimReward'
  });
  return config;
};

// Approve token for tokenTransfer
export const ERC20PreparedContractApprove = (props: erc20ContractAddressApproveProps) => {
  const { config } = usePrepareContractWrite({
    address: iAI_ContractAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [StakingContractAddress!, props.tokenAmount],
    overrides: {
      gasPrice: ethers.utils.parseUnits('50', 'gwei'),
      gasLimit: ethers.utils.parseUnits((210000).toString(), 'wei')
    }
  });
  return config;
};
