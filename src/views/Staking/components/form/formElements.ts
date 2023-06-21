import { Button, Link, TableCell, TableContainer, TextField, styled } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

const TruthGPTLogoColor = "#4169e1"

export const AddressLink = styled(Link)({
    color: blue[50],
    '&.MuiLink-underlineHover': {
        color: grey[500]
    }
})



export const MintButton = styled(Button)({
    fontSize: 18,
    padding: '5px',
    border: '3px solid',
    lineHeight: 2,
    borderRadius: 30,
    '&.MuiButton-root': {
        boxShadow: blue[50],
        backgroundColor: TruthGPTLogoColor,
        borderColor: blue[700],
        color: blue[50]
    },
    '&:hover': {
        backgroundColor: blue[50],
        borderColor: blue[700],
        color: blue[700]
    },
    '&:active': {
        backgroundColor: blue[500],
        borderColor: blue[50],
        color: blue[50]
    }
})

export const StakeCell = styled(TableCell)({
    color: grey[100]
})

export const WithDrawButton = styled(Button)({
    '&.MuiButton-root': {
        boxShadow: grey[50],
        borderColor: grey[700],
        color: grey[100]
    },
    '&:hover': {
        backgroundColor: grey[500],
        color: grey[50]
    },
    '&:active': {
        backgroundColor: TruthGPTLogoColor,
        color: grey[50]
    }
})

export const UnstakeButton = styled(Button)({
    '&.MuiButton-root': {
        color: grey[800],
        backgroundColor: grey[50],
    },
    '&:hover': {
        backgroundColor: grey[500],
        color: grey[50]
    },
    '&:active': {
        backgroundColor: TruthGPTLogoColor,
        color: grey[50]
    }
})

export const StakeAmountField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});



export const StakeTableContainer = styled(TableContainer)({
})