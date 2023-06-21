import { Grid } from '@mui/material'
import Main from '../../layouts/Main/Main'
import AmbassadorPool1 from './pools/AmbassadorPool1'

function StakingConsole() {
  return (
    <>
      <Main>
        <Grid container>
          <AmbassadorPool1 />
          <AmbassadorPool1 />
          <AmbassadorPool1 />
          <AmbassadorPool1 />
          <AmbassadorPool1 />
        </Grid>
      </Main>
    </>
  )
}

export default StakingConsole
