import React from 'react';
import DeleteButton from './ButtonWithLoading';
import {CancelButton} from './ButttonsWithIcons'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { getTranslation } from '../heplers/translationHelper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialog({open,title,onClose,onSubmit,deleting}) {
  

  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
         onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <CancelButton onClick={onClose} >
          </CancelButton>
          <DeleteButton title={getTranslation("Delete", "Supprimer", "Löschen")} loading={deleting} onClick={onSubmit} variant="contained"  color="red" style={{background:"darkred",color:"white"}}>
            
            </DeleteButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
