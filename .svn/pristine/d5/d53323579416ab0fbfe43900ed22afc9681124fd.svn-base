import { Box, Button } from "@material-ui/core"
import { GetFile } from "../../../actions"
import ButtonWithLoading from "../../../components/ButtonWithLoading"
import { DownloadButton } from "../../../components/ButttonsWithIcons"
import DialogComponent from "../../../components/Dialog"

export const PreviewImageDialog=({open,fileAddress,onClose,title})=>{
    return <DialogComponent open={open} onClose={onClose} title={title}>
        <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <ButtonWithLoading title="Download" onClick={()=>{
                window.open(GetFile(fileAddress),"_blank")
            }} />
        </Box>
        <img src={GetFile(fileAddress)} width="500px" height="800px"/>
    </DialogComponent>
}