import { Grid } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/Logo.png'

export const TopBar = () => (
  <Grid container>
    <Grid
      item
      lg={3}
      md={3}
      sm={3}
      xs={9}
      marginLeft={{ xs: 2, sm: 4, lg: 4 }}
      marginY={{ xs: 2, sm: 4, lg: 4 }}
      maxWidth={{ lg: 250, xs: 150 }}
    >
      <Link href={'https://www.truthgpt.one'}>
        <a target={'_blank'}>
          <Image alt="Logo" src={Logo}></Image>
        </a>
      </Link>
    </Grid>
  </Grid>
)
