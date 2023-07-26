import { BigNumber,  } from 'ethers';
import {  useContractRead } from 'wagmi';
import TokenEth from './ABI/TokenEth.json';
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

export type AllowanceBalanceProps = {
  ownerAddress: `0x${string}` | undefined;
};

export type erc20ContractAddressApproveProps = {
  tokenAmount: BigNumber;
};

export let iAI_ContractAddress: `0x${string}` = '0x6dDe4fFD6dB302Bc9a46850f61399e082f6c2122';
export let NFT_ContractAddress: `0x${string}` = '0x853806fCa5Ee8a6Ac99Dc84a8e3596A4F6541796';

export const testERC20: `0x${string}` = '0xB83cA21FED7054bAE76613cEd0215FaA06706361';
export const testNFT: `0x${string}` = '0x98F889e00f2AA49c5c30938f555B0488d4f59B8b';

//iAI_ContractAddress = testERC20;
//NFT_ContractAddress = testNFT;

// Get balance of for token owner
export const ERC20BalanceOf = (props: AllowanceBalanceProps) => {
  const { data } = useContractRead({
    address: iAI_ContractAddress,
    abi: TokenEth.abi,
    functionName: 'balanceOf',
    args: [props.ownerAddress!]
  });
  return data as BigNumber;
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
