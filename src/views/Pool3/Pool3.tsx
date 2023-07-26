import { useEffect, useState } from 'react';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import Main from '../../layouts/Main';
import Container from '../../components/Container';
import { BigNumber, ethers } from 'ethers';
import { Web3Button } from '@web3modal/react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { StakeAmountField, MainButton } from '../../components/form/formElements';
import IAiLogo from '../../components/logos/IAiLogo';
import theme from '../../theme';
import StakeTable from '../../components/table/StakeTable';
import { ContractAddress, WalletAddress } from '../../components/form/stakeElements';
import {
  ERC20Allowance,
  ERC20BalanceOf,
  ERC20PreparedContractApprove,
  ERC721BalanceOf,
  NFT_ContractAddress,
  StakePreparedContract,
  StakingContractAddress
} from '../../components/contracts/wagmiContracts';
import getNFTMetadata from '../../components/nfts/NFTMetadata';

function Pool3() {
  let [poolBalance, setPoolBalance] = useState<String>('0');
  let [balanceSet, setBalance] = useState(false);
  let [balanceAmount, setBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [NFTbalanceSet, setNFTBalance] = useState(false);
  let [NFTBalanceAmount, setNFTBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [allowanceSet, setAllowance] = useState(false);
  let [allowanceAmount, setAllowanceAmount] = useState<number>(0);
  let [stakeAmount, setStakeAmount] = useState<BigNumber>(BigNumber.from(0));
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let [nftMetadata, setNFTMetadata] = useState<string[] | void>([]);
  let { address, isConnected } = useAccount();
  const blockExplorer = 'https://etherscan.com';

  // Approve
  const erc20Config = ERC20PreparedContractApprove({
    tokenAmount: ethers.utils.parseEther((100000000).toString())
  });
  const { data: dataERC20Approve, write: writeERC20Approve } = useContractWrite(erc20Config);

  const { isLoading: isLoadingERC20Approve } = useWaitForTransaction({
    hash: dataERC20Approve?.hash
  });

  // Allowance
  const allowanceData = ERC20Allowance({
    ownerAddress: connectedAddress
  });

  useEffect(() => {
    if (allowanceData) {
      setAllowanceAmount(parseFloat(ethers.utils.formatEther(allowanceData)));
      if (allowanceAmount > 0) {
        setAllowance(true);
      }
    }
  }, [allowanceData, allowanceAmount]);

  // User Balance
  const balanceData = ERC20BalanceOf({ ownerAddress: connectedAddress! });

  useEffect(() => {
    if (balanceData) {
      setBalanceAmount(balanceData);
      if (Number(ethers.utils.formatEther(balanceAmount)) > 1) {
        setBalance(true);
      } else {
        setBalance(false);
      }
    }
  }, [balanceData, stakeAmount, balanceAmount]);

  // Locking

  // Pool Balance
  const poolBalanceData = ERC20BalanceOf({ ownerAddress: StakingContractAddress! });

  useEffect(() => {
    if (poolBalanceData) {
      setPoolBalance(ethers.utils.formatEther(poolBalanceData));
    }
  }, []);

  // Lock
  const stakeConfig = StakePreparedContract({
    poolAmount: stakeAmount
  });

  const { data: stakeData, write: stakeWrite } = useContractWrite(stakeConfig);

  const { isLoading: stakeIsLoading, isSuccess: stakeIsSuccessful } = useWaitForTransaction({
    hash: stakeData?.hash
  });

  useEffect(() => {
    setConnectedAddress(address);
  }, [isConnected]);

  // User erc721Balance
  const NFTBalanceData = ERC721BalanceOf({ ownerAddress: connectedAddress! });
  useEffect(() => {
    if (NFTBalanceData) {
      setNFTBalanceAmount(NFTBalanceData);
      if (Number(ethers.utils.formatEther(NFTBalanceData)) > 1) {
        setNFTBalance(true);
      } else {
        setNFTBalance(false);
      }
    }
  }, [NFTBalanceData]);

  // NFT's Owned
  useEffect(() => {
    async () => {
      const connectedAddress = NFT_ContractAddress!;
      const nftMetadata = await getNFTMetadata(connectedAddress);
      setNFTMetadata(nftMetadata);
    };
  }, [isConnected]);

  const handleStakeChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    if (isPositiveFloat(value)) {
      const stakeAmount = ethers.utils.parseEther(value);
      setStakeAmount(stakeAmount);
    } else {
      setStakeAmount(ethers.BigNumber.from(0));
    }
  };

  function isPositiveFloat(value: any) {
    return /^\d+(\.\d+)?$/.test(value) && Number(value) >= 1;
  }

  async function printMetadata() {
    await console.log(getNFTMetadata(connectedAddress!));
  }
  return (
    <>
      <Main>
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
                      <Typography
                        fontSize={22}
                        align="left"
                        color="white"
                        fontWeight={'bold'}
                        textTransform="uppercase"
                      >
                        9022 Ambassador Pool 3
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={11} align="left" color="white">
                        Lock $iAi and earn $iAi rewards
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box marginTop={4} width={'75%'}>
                <Divider
                  flexItem
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    height: '1px'
                  }}
                />
              </Box>
              <Box marginTop={3}>
                <MainButton href="/">Back to console</MainButton>{' '}
              </Box>
              <Box display={'flex'} flexDirection={'column'} marginTop={3}>
                <Typography
                  align="left"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  Ambassador Lock Information:
                </Typography>
                <Typography fontSize={12} align="left" color="white" data-aos={'flip-left'}>
                  To stake your $iAi, connect your wall to our locking dapp here, sign the transaction and confirm it in
                  your wallet.
                  <br />
                  <br />
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  Disclaimer!
                </Typography>
                <Typography fontSize={12} marginTop={-2} align="left" color="white" data-aos={'flip-left'}>
                  <br /> - THRESHOLD iAI Wallet balance: 100,000 iAI Tokens
                  <br /> - Minimum 9022 NFTs Required: 3-10%
                  <br /> - YEARLY Distribution on iAI THRESHOLD: 5.5%
                  <br /> - .05% will be added to the total distribution for each NFT held after 3.Max 9% tHE iAI
                  THRESHOLD
                  <br /> - 180 Day locking period
                  <br />
                  <br />
                  After successfully locking, simply return to this page to monitor your staked $iAi.
                </Typography>
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
                {connectedAddress && (
                  <>
                    <Typography fontSize={16} sx={{ mb: 1 }} color={grey[100]}>
                      Balance: {Number(ethers.utils.formatEther(balanceAmount)).toFixed(3)} $iAi
                    </Typography>
                    <Typography fontSize={16} sx={{ mb: 2 }} color={grey[100]}>
                      9022 Held: {Number(NFTBalanceAmount)}
                    </Typography>
                  </>
                )}
                <Box width={{ sm: 450 }}>
                  <StakeAmountField
                    fullWidth
                    className="inputRounded"
                    variant={'outlined'}
                    label="Lock Amount"
                    onChange={handleStakeChange}
                  />
                </Box>
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
                      <MainButton
                        fullWidth
                        variant="contained"
                        disabled={!writeERC20Approve || isLoadingERC20Approve}
                        onClick={() => writeERC20Approve?.()}
                      >
                        {isLoadingERC20Approve ? 'Approving...' : `Approve $iAi`}
                      </MainButton>
                    ) : (
                      <MainButton fullWidth variant="contained" disabled={!stakeWrite || stakeIsLoading}>
                        {stakeIsLoading ? 'Locking... ' : `Locking Disabled`}
                      </MainButton>
                    )}
                    {stakeIsSuccessful && (
                      <>
                        <Typography variant="h6" align="center" sx={{ mt: 1 }} color="white">
                          Successfully Lock $iAi!
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
                    <WalletAddress address={connectedAddress} />
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
      </Main>
    </>
  );
}

export default Pool3;
