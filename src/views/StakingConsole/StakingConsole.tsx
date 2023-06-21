import { Box, Divider, Grid, Link, Typography } from '@mui/material'
import Main from '../../layouts/Main/Main'
import AmbassadorPool1 from '../AmbassadorPool1/AmbassadorPool1'
import { grey } from '@mui/material/colors'
import { Web3Button } from '@web3modal/react'
import { ethers } from 'ethers'
import theme from '../../theme'
import { StakeAmountField, MainButton } from '../AmbassadorPool1/components/form/formElements'
import { ContractAddress, WalletAddress } from '../AmbassadorPool1/components/form/stakeElements'
import IAiLogo from '../AmbassadorPool1/components/logos/IAiLogo'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Container from '../../components/Container'

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
                        9022 Staking Console
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
                  - Inheritance Art will implement 9022 Ambassador OPTIONS
                  <br /> - The number of NFTs and types/tier held, will determine which Ambassador OPTION an individual
                  has access to.
                  <br /> - 9022 Ambassador OPTIONS will give 9022 holders the ability to participate in spreading
                  awareness and rewarded for their efforts.
                  <br />
                </Typography>
              </Box>
              <Box marginTop={3}>
                {!connectedAddress ? (
                  <>
                    <Web3Button />
                  </>
                ) : (
                  <>
                    <Web3Button />
                  </>
                )}
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
              <Grid container spacing={5} justifyContent={'center'}>
                <Grid item lg={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,.9);',
                      px: 5,
                      py: 3,
                      borderRadius: 3,
                      border: '1px solid white'
                    }}
                  >
                    <MainButton href="/Pool1">Ambassador Pool 1</MainButton>{' '}
                  </Box>
                </Grid>
                <Grid item lg={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,.9);',
                      px: 5,
                      py: 3,
                      borderRadius: 3,
                      border: '1px solid white'
                    }}
                  >
                    <MainButton>Ambassador Pool 2</MainButton>{' '}
                  </Box>
                </Grid>
                <Grid item lg={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,.9);',
                      px: 5,
                      py: 3,
                      borderRadius: 3,
                      border: '1px solid white'
                    }}
                  >
                    <MainButton>Ambassador Pool 3</MainButton>{' '}
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,.9);',
                      px: 5,
                      py: 3,
                      borderRadius: 3,
                      border: '1px solid white'
                    }}
                  >
                    <MainButton>Prestige Ambassador</MainButton>{' '}
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,.9);',
                      px: 5,
                      py: 3,
                      borderRadius: 3,
                      border: '1px solid white'
                    }}
                  >
                    <MainButton>Destination Inheritance Ambassador</MainButton>{' '}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Main>
    </>
  )
}

export default StakingConsole
