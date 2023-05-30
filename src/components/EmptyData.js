import React from 'react'
import {Typography,Box,makeStyles} from "@material-ui/core"
import HourglassEmptySharpIcon from "@material-ui/icons/HourglassEmptySharp";
import {getTranslation} from "../heplers/translationHelper";

const useStyles = makeStyles(theme=>({
    icon:{
        fontSize:theme.spacing(5)
    },
    text:{}

}));


const EmptyData = () => {
    const classes = useStyles()

    return (
      <Box width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <HourglassEmptySharpIcon className= {classes.icon} />
        <Typography className= {classes.text} variant="h4">{getTranslation("No Data", "Pas de données", "Keine Daten")}</Typography>
      </Box>
    );
}

export default EmptyData
