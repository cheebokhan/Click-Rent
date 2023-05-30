import { IconButton, makeStyles } from "@material-ui/core"
import { Close, SaveOutlined } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getTranslation } from "../heplers/translationHelper";
import ButtonWithLoading from "./ButtonWithLoading"


const useStyles = makeStyles((theme) => ({
    successButton: {
      color: theme.palette.success.contrastText,
      backgroundColor:theme.palette.success.light,
    },
    closeButton: {
        padding:"7px"
      },
      
  }));
export const AutoUpdateField=({disabled, saving, onUpdate,onCancel,children})=>{
    const classes=useStyles();
    const [focus,setFocus]=useState(false)
    const [isSubmitting,setIsSubmitting]=useState(false)
   useEffect(()=>{
       setFocus(saving)
   },[saving])
    return <> <div tabIndex={2} onFocus={(e)=>{
        setFocus(true)
    }} onBlur={(event)=>{
        if (!event.currentTarget.contains(event.relatedTarget)) 
           {
            setFocus(false)}
    }} >{children}
    
   
    <div tabIndex={0} style={{display:"flex", justifyContent:"right", alignItems:"flex-end"}}>
        {focus && disabled===false?<> <ButtonWithLoading loading={saving} className={classes.successButton} variant="contained" title={getTranslation("Save", "Sauvegarder", "Speichern")} 
        onClick={onUpdate} 
        
        />
        <IconButton  className={classes.closeButton}  onClick={onCancel}><Close/></IconButton></>
        :null}
    </div>
    
    </div>
    </>
}