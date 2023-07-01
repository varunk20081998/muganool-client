import React from 'react'
import {
  Box, Typography, useTheme, useMediaQuery
} from '@mui/material'
import Form from './Form';

function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width :1000px)')
  return (
    <Box>
      <Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>

        <Typography fontWeight='800' fontFamily='Noto Sans Tamil' fontSize='32px'
          color='primary'

        >முகநூல்</Typography>

      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          வணக்கம்! முகநூலில் உங்களை வரவேற்கிறோம்.
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage