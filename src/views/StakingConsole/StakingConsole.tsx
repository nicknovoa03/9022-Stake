import { Box, Divider, Grid, Link, Typography } from '@mui/material'
import Main from '../../layouts/Main/Main'
import AmbassadorPool1 from '../AmbassadorPool1/AmbassadorPool1'
import { grey } from '@mui/material/colors'
import { Web3Button } from '@web3modal/react'
import { ethers } from 'ethers'
import theme from '../../theme'
import { StakeAmountField, MainButton, PoolSelectionButton } from '../AmbassadorPool1/components/form/formElements'
import { ContractAddress, WalletAddress } from '../AmbassadorPool1/components/form/stakeElements'
import IAiLogo from '../AmbassadorPool1/components/logos/IAiLogo'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Container from '../../components/Container'
import PoolSelectionBox from './components/poolSelection/poolSelection'
import PoolOptions from './components/poolSeclectionMUI/WithHighlightingAndPrimaryColor'

function StakingConsole() {
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>()
  let { address, isConnected } = useAccount()

  useEffect(() => {
    setConnectedAddress(address)
  }, [isConnected])

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
                        9022 Ambassador Console
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={10} align="left" color="white">
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
                <Typography fontSize={12} align="center" color="white" data-aos={'flip-left'}>
                  - inheritance Art will offer 9022 Ambassador Pools for holders of the 9022 NFT collection
                  <br /> - Your 9022 NFTs will determine which Ambassador Pools you have access to
                  <br /> - Ambassador Pools will give 9022 holders the ability to participate in spreading awareness
                  while being rewarded for their efforts
                  <br />
                </Typography>
              </Box>
              <Box marginTop={3}>
                <Box>
                  <Web3Button balance="show" />
                </Box>
              </Box>
            </Box>
            <Box marginY={5}>
              <Typography
                variant="h4"
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
              <PoolOptions />
            </Box>
          </Box>
        </Container>
      </Main>
    </>
  )
}

export default StakingConsole
