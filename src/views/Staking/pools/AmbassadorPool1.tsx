import { useEffect, useState } from 'react'
import { Box, Typography, Link, Grid, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import Main from '../../../layouts/Main'
import Container from '../../../components/Container'
import { BigNumber, ethers } from 'ethers'
import { Web3Button } from '@web3modal/react'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { StakeAmountField, MintButton } from '../components/form/formElements'
import IAiLogo from '../components/logos/IAiLogo'
import theme from '../../../theme'
import StakeTable from '../components/table/StakeTable'
import { ContractAddress, WalletAddress } from '../components/form/stakeElements'
import {
  ERC20Allowance,
  ERC20BalanceOf,
  ERC20PreparedContractApprove,
  StakePreparedContract,
  StakingContractAddress
} from '../components/contracts/wagmiContracts'

function AmbassadorPool1() {
  let [poolBalance, setPoolBalance] = useState<String>('0')
  let [balanceSet, setBalance] = useState(false)
  let [balanceAmount, setBalanceAmount] = useState<BigNumber>(BigNumber.from(0))
  let [allowanceSet, setAllowance] = useState(false)
  let [allowanceAmount, setAllowanceAmount] = useState<number>(0)
  let [stakeAmount, setStakeAmount] = useState<BigNumber>(BigNumber.from(0))
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>()
  let { address, isConnected } = useAccount()

  const blockExplorer = 'https://bscscan.com'

  // Approve
  const erc20Config = ERC20PreparedContractApprove({
    tokenAmount: ethers.utils.parseEther((100000000).toString())
  })
  const { data: dataERC20Approve, write: writeERC20Approve } = useContractWrite(erc20Config)

  const { isLoading: isLoadingERC20Approve } = useWaitForTransaction({
    hash: dataERC20Approve?.hash
  })

  // Allowance
  const allowanceData = ERC20Allowance({
    ownerAddress: address
  })

  // User Balance
  const balanceData = ERC20BalanceOf({ ownerAddress: address! })

  // Staking

  // Pool Balance
  const poolBalanceData = ERC20BalanceOf({ ownerAddress: StakingContractAddress! })

  // Stake
  const stakeConfig = StakePreparedContract({
    stakeAmount: stakeAmount
  })

  const { data: stakeData, write: stakeWrite } = useContractWrite(stakeConfig)

  const { isLoading: stakeIsLoading, isSuccess: stakeIsSuccessful } = useWaitForTransaction({
    hash: stakeData?.hash
  })

  useEffect(() => {
    setConnectedAddress(address)
  }, [isConnected])

  useEffect(() => {
    if (allowanceData) {
      setAllowanceAmount(parseFloat(ethers.utils.formatEther(allowanceData)))
      if (allowanceAmount > 0) {
        setAllowance(true)
      }
    }
  }, [allowanceData, allowanceAmount])

  useEffect(() => {
    if (poolBalanceData) {
      setPoolBalance(ethers.utils.formatEther(poolBalanceData))
    }
  }, [])

  useEffect(() => {
    if (balanceData) {
      setBalanceAmount(balanceData)
      if (Number(ethers.utils.formatEther(balanceAmount)) > 1) {
        setBalance(true)
      } else {
        setBalance(false)
      }
    }
  }, [balanceData, stakeAmount, balanceAmount])

  const handleStakeChange = (event: { target: { value: any } }) => {
    const { value } = event.target
    if (isPositiveFloat(value)) {
      const stakeAmount = ethers.utils.parseEther(value)
      setStakeAmount(stakeAmount)
    } else {
      setStakeAmount(ethers.BigNumber.from(0))
    }
  }

  function isPositiveFloat(value: any) {
    return /^\d+(\.\d+)?$/.test(value) && Number(value) >= 1
  }

  return (
    <>
      <Container>
        <Box display="flex" flexDirection={'column'} alignItems={'center'} data-aos={'fade-in'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,.9);',
              px: 5,
              py: 3,
              borderRadius: 3,
              border: '1px solid white'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Grid item container justifyContent={'center'} display="flex">
                <Grid item container justifyContent={'center'} sm={3} xs={3} marginBottom={-2}>
                  <Box maxWidth={{ xs: 50, md: 70 }} data-aos={'zoom-in-right'}>
                    <IAiLogo />
                  </Box>
                </Grid>
                <Grid item container sm={9} xs={9} marginTop={{ md: 1 }} data-aos={'zoom-in-left'}>
                  <Grid item sm={12}>
                    <Typography fontSize={22} align="left" color="white" fontWeight={'bold'} textTransform="uppercase">
                      9022 Staking
                    </Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography fontSize={11} align="left" color="white">
                      Stake $iAi and earn $iAi rewards
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2
              }}
              data-aos={'zoom-out'}
            >
              <Box marginY={2} width={'100%'}>
                <Divider
                  flexItem
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    height: '1px'
                  }}
                />
              </Box>
              {balanceSet && (
                <Typography fontSize={16} sx={{ mb: 1 }} color={grey[100]} textTransform="uppercase">
                  Balance: {Number(ethers.utils.formatEther(balanceAmount)).toFixed(3)} $iAi
                </Typography>
              )}
              <Box width={{ sm: 450 }}>
                <StakeAmountField
                  fullWidth
                  className="inputRounded"
                  variant={'outlined'}
                  label="Stake Amount"
                  onChange={handleStakeChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              data-aos={'flip-down'}
            >
              <Typography variant="subtitle1" sx={{ mt: 1 }} color={grey[100]} textTransform="uppercase">
                Minimum 1.000 $iAi
              </Typography>
            </Box>

            <Box display={'flex'} flexDirection={'column'} marginTop={3}>
              <Typography
                align="left"
                color="white"
                fontWeight={'bold'}
                data-aos={'flip-right'}
                textTransform="uppercase"
              >
                Staking Information:
              </Typography>
              <Typography fontSize={12} align="left" color="white" data-aos={'flip-left'}>
                To stake your $iAi, connect your wall to our staking dapp here, sign the transaction and confirm it in
                your wallet.
                <br /> - Earn 7.5% APR on your tokens
                <br /> - No minimum staking period
                <br />
                <br />
                After successfully staking, simply return to this page to monitor your staked $iAi.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 300,
                mt: 3
              }}
              data-aos="fade-up"
            >
              {connectedAddress ? (
                <>
                  {!allowanceSet ? (
                    <MintButton
                      fullWidth
                      variant="contained"
                      disabled={!writeERC20Approve || isLoadingERC20Approve}
                      onClick={() => writeERC20Approve?.()}
                    >
                      {isLoadingERC20Approve ? 'Approving...' : `Approve $iAi`}
                    </MintButton>
                  ) : (
                    <MintButton fullWidth variant="contained" disabled={!stakeWrite || stakeIsLoading}>
                      {stakeIsLoading ? 'Staking... ' : `Staking Disabled`}
                    </MintButton>
                  )}
                  {stakeIsSuccessful && (
                    <>
                      <Typography variant="h6" align="center" sx={{ mt: 1 }} color="white">
                        Successfully Staked $iAi!
                      </Typography>
                      <Link href={`${blockExplorer}/tx/${stakeData?.hash}`} target="_blank" underline="hover">
                        <Typography fontSize={20} align="center" color="white">
                          View Transaction
                        </Typography>
                      </Link>
                    </>
                  )}
                  <ContractAddress />
                  <Web3Button />
                  <WalletAddress address={address!} />
                </>
              ) : (
                <>
                  <Web3Button />
                </>
              )}
            </Box>
            <Typography align="center" fontSize={22} sx={{ mt: 3 }} color={grey[100]} textTransform="uppercase">
              Pool Balance: {Number(poolBalance).toLocaleString('en-US')} $iAi
            </Typography>
          </Box>
        </Box>
      </Container>
      <StakeTable address={address} />
    </>
  )
}

export default AmbassadorPool1
