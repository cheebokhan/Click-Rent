import { Box, Button, Grid, Typography } from "@material-ui/core"
import { TransparentLogo } from "../../components/Logo"
import TransparentLogoFile from "../../assests/images/Latest-Logo.png";
import TwoWaySyncPNG from "../../assests/images/twoway.png";
import PontoSync from "../../assests/images/ponto.bc5803d4.png";
import authService from '../../utils/authUtils';

export const UpgradeSMTP = () => {
  return <>

    <Box display="flex" justifyContent='center'>
     <Typography variant="h1">SMTP</Typography>
    </Box>
    <Typography style={{
      textAlign:'center'
    }}>We can send emails using your <strong>SMTP settings</strong>. To use this premium feature you need to upgrade to Professional account.</Typography>
    <Box display='flex' justifyContent='center' style={{
      marginTop:'50px'
    }}>
      <Button variant="contained" color="primary" onClick={() => {
        window.open("https://impact-soft.com/clic-rent-upgrade", '_blank')
      }}
     
      >Read More</Button>

      <Button variant="contained" color="primary" onClick={() => {
        window.open(`${process.env.REACT_APP_MANAGER_UPGRADE_URL}1/${authService.getCustomerId()}`, '_blank')
      }}
      style={
        {
          marginLeft:'10px'
        }
      }
      >Upgrade Now</Button>
    </Box>

  </> 
 
}