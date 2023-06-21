import { BigNumber, ethers } from 'ethers'
import { usePrepareContractWrite, useContractRead } from 'wagmi'
import { erc20ABI } from 'wagmi'
import truthGPTStaking from '../../../../components/contracts/truthGPTStake.json'

type ReadStakingContractProps = {
    ownerAddress: `0x${string}` | undefined,
}

type ReadStakingDetailsContractProps = {
    ownerAddress: `0x${string}` | undefined,
    index: number
}

type UnstakingContractProps = {
    index: number
}

type StakingContractProps = {
    stakeAmount: BigNumber
}

type AllowanceProps = {
    ownerAddress: `0x${string}` | undefined,
}

type erc20ContractAddressApproveProps = {
    tokenAmount: BigNumber
}

export let ERC20_ContractAddress: `0x${string}` | undefined = '0x2abDB5903171071ac29cC0779d7EFDF0FaF14228'
export let StakingContractAddress: `0x${string}` | undefined = '0x4b12A3600916f923545786158f3F8569E9B96bE3'

let testERC20: `0x${string}` | undefined = '0x48cA9498b901d34abbfA07a87aB62E56C1F2dF89'
let testStakingContract: `0x${string}` | undefined = '0x60db3b3fef8aee5e1dfb0db9a5db4d4ade8f99a1'

//ERC20_ContractAddress = testERC20
//StakingContractAddress = testStakingContract

// Get Allowance for token owner and spender
export const ERC20Allowance = (props: AllowanceProps) => {
    const { data } = useContractRead({
        address: ERC20_ContractAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [props.ownerAddress!, StakingContractAddress!]
    })
    return data;
}

// Get balance of for token owner 
export const ERC20BalanceOf = (props: AllowanceProps) => {
    const { data } = useContractRead({
        address: ERC20_ContractAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [props.ownerAddress!]
    })
    return data;
}

// Get staking balance for an address
export const StakingBalance = (props: ReadStakingContractProps) => {
    const { data } = useContractRead({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'stakingbalance',
        args: [props.ownerAddress]
    })
    return data;
}

// Get staking detials for specifc stake with an index
export const StakingDetails = (props: ReadStakingDetailsContractProps) => {
    const { data } = useContractRead({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'stakingbalance',
        args: [props.ownerAddress, props.index]
    })
    return data;
}

// Get staking detials for specifc stake with an index
export const AllStaked = (props: ReadStakingContractProps) => {
    const { data } = useContractRead({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'allStaked',
        args: [props.ownerAddress]
    })
    return data;
}

// Initiate Stake
export const StakePreparedContract = (props: StakingContractProps) => {
    const { config } = usePrepareContractWrite({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'stake',
        args: [props.stakeAmount]
    })
    return config;
}

// Unstake without penalty
export const UnstakePreparedContract = (props: UnstakingContractProps) => {
    const { config } = usePrepareContractWrite({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'unstake',
        args: [props.index],
    })
    return config;
}

//Unstake with penalty
export const WithdrawPreparedContract = (props: UnstakingContractProps) => {
    const { config } = usePrepareContractWrite({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'withdrawpenalty',
        args: [props.index],
    })
    return config;
}

// Claim Reward
export const ClaimRewardPreparedContract = () => {
    const { config } = usePrepareContractWrite({
        address: StakingContractAddress,
        abi: truthGPTStaking.abi,
        functionName: 'claimReward',
    })
    return config;
}


// Approve token for tokenTransfer
export const ERC20PreparedContractApprove = (props: erc20ContractAddressApproveProps) => {
    const { config } = usePrepareContractWrite({
        address: ERC20_ContractAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [StakingContractAddress!, props.tokenAmount],
        overrides: {
            gasPrice: ethers.utils.parseUnits('50', 'gwei'),
            gasLimit: ethers.utils.parseUnits((210000).toString(), 'wei')
        }
    })
    return config;
}