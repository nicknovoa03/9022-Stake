import { BigNumber, ethers } from 'ethers';
import { usePrepareContractWrite, useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';
import Pool1 from './ABI/iAIPool1.json';
import Collection9022 from './ABI/Collection9022.json';

export type ReadPoolContractProps = {
  ownerAddress: `0x${string}` | string | undefined;
};

export type ReadPoolDetailsContractProps = {
  ownerAddress: `0x${string}` | undefined;
  index: number;
};

export type UnpoolingContractProps = {
  index: number;
};

export type PoolContractProps = {
  poolAmount: BigNumber;
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
