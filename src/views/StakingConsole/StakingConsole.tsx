import { Box, Divider, Grid, Link, Typography } from '@mui/material';
import Main from '../../layouts/Main/Main';
import AmbassadorPool1 from '../AmbassadorPool1/AmbassadorPool1';
import { grey } from '@mui/material/colors';
import { Web3Button } from '@web3modal/react';
import { BigNumber, ethers } from 'ethers';
import theme from '../../theme';
import IAiLogo from '../AmbassadorPool1/components/logos/IAiLogo';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Container from '../../components/Container';
import PoolOptions from './components/poolSeclectionMUI/WithHighlightingAndPrimaryColor';
import {
  ERC20BalanceOf,
  ERC721BalanceOf,
  NFT_ContractAddress
} from '../AmbassadorPool1/components/contracts/wagmiContracts';
import getNFTMetadata from '../AmbassadorPool1/components/nfts/NFTMetadata';
import { nftMetadataDictionary } from '../../components/nftData/nftMetadataDictionary';
import { MainButton } from '../AmbassadorPool1/components/form/formElements';

function StakingConsole() {
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let [iAIBalanceSet, setiAIBalance] = useState(false);
  let [iAIbalanceAmount, setiAIBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [NFTbalanceSet, setNFTBalance] = useState(false);
  let [NFTBalanceAmount, setNFTBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [nftMetadata, setNFTMetadata] = useState<string[]>([]);
  let [ownedNfts, setOwnedNfts] = useState<{ [key: string]: number }>({});
  let { address, isConnected } = useAccount();

  // set NFT's Owned
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const loadNftMetadata = await getNFTMetadata('0x69254608f6349b6A6EefF53C1ab3c009699514Ea');
    setNFTMetadata(loadNftMetadata);
  }

  // set NFT background data to state
  useEffect(() => {
    matchMetadata();
  }, [nftMetadata]);

  function matchMetadata() {
    //console.log('loaded nft metadata:', nftMetadata);
    let nftBackgroundDictionary: { [key: string]: number } = {};
    for (let i in nftMetadata) {
      // get nft number
      let nftNumber = nftMetadata[i];
      // get background type
      let nftBackground = nftMetadataDictionary[nftNumber.toString()];
      let backgroundIdentifier: string;
      // check background and set identifier
      if (nftBackground == 'Destination Inheritance') {
        backgroundIdentifier = 'DI';
      } else if (nftBackground == 'Basquiat' || nftBackground == 'Warhol') {
        backgroundIdentifier = 'Prestige';
      } else {
        backgroundIdentifier = 'Standard';
      }
      // add to dictionary or increment count
      if (!nftBackgroundDictionary[backgroundIdentifier]) {
        nftBackgroundDictionary[backgroundIdentifier] = 1;
      } else {
        nftBackgroundDictionary[backgroundIdentifier]++;
      }
    }
    // set state
    setOwnedNfts(nftBackgroundDictionary);
  }

  // User erc20 Balance
  const iAIBalanceData = ERC20BalanceOf({ ownerAddress: connectedAddress! });
  useEffect(() => {
    if (iAIBalanceData) {
      setiAIBalanceAmount(iAIBalanceData);
      if (Number(ethers.utils.formatEther(iAIbalanceAmount)) > 1) {
        setiAIBalance(true);
      } else {
        setiAIBalance(false);
      }
    }
  }, [iAIBalanceData]);

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

  // Save Connected Address to state
  useEffect(() => {
    setConnectedAddress(address);
  }, [isConnected]);

  async function printMetadata() {
    console.log(nftMetadata);
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
              data-aos={'flip-down'}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                maxWidth={{ md: 500 }}
              >
                <Grid item container justifyContent={'center'} display="flex">
                  <Grid item container justifyContent={'center'} sm={3} xs={12}>
                    <Box maxWidth={{ xs: 70, md: 70 }} data-aos={'zoom-in'} marginTop={{ md: 1 }}>
                      <IAiLogo />
                    </Box>
                  </Grid>
                  <Grid item container sm={9} xs={12} marginTop={{ md: 1 }} data-aos={'zoom-in'}>
                    <Grid item sm={12}>
                      <Typography
                        fontSize={22}
                        color="white"
                        fontWeight={'bold'}
                        textTransform="uppercase"
                        align="center"
                      >
                        9022 Ambassador Console
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={14} align="center" color="white">
                        Earn $iAI rewards for your contributions to the ecosystem
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
              <Box display={'flex'} flexDirection={'column'} marginTop={3}>
                <Typography
                  align="center"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  Information:
                </Typography>
                <Typography fontSize={12} align="center" color="white">
                  - inheritance Art will offer 9022 Ambassador Pools for holders of the 9022 NFT collection
                  <br /> - Your 9022 NFTs will determine which Ambassador Pools you have access to
                  <br /> - Ambassador Pools will give 9022 holders the ability to participate in spreading awareness
                  while being rewarded for their efforts
                  <br />
                </Typography>
              </Box>
              <Box
                marginTop={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Web3Button />
                </Box>
                {connectedAddress && (
                  <>
                    <Box>
                      <Typography align="center" fontSize={22} sx={{ mt: 3 }} color={grey[100]}>
                        $iAI Balance: {Number(ethers.utils.formatEther(iAIbalanceAmount)).toFixed(3)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography align="center" fontSize={22} sx={{ mt: 1 }} color={grey[100]}>
                        9022 Held: {Number(NFTBalanceAmount)}
                      </Typography>
                    </Box>
                    <Box>
                      <Link href="https://opensea.io/account?search[collections][0]=9022-collection" target="_blank">
                        <Typography align="center" fontSize={18} sx={{ mt: 0 }} color={grey[100]}>
                          View On Opensea
                        </Typography>
                      </Link>
                    </Box>
                    <MainButton fullWidth onClick={() => matchMetadata()} variant="contained">
                      {' '}
                      print data
                    </MainButton>
                  </>
                )}
              </Box>
            </Box>
            <Box marginY={5}>
              <Typography
                variant="h3"
                align="center"
                color="white"
                fontWeight={'bold'}
                data-aos={'zoom-in'}
                textTransform="uppercase"
              >
                Select Your Pool
              </Typography>
            </Box>
            <Box>
              <PoolOptions ownedNfts={ownedNfts} />
            </Box>
          </Box>
        </Container>
      </Main>
    </>
  );
}

export default StakingConsole;
