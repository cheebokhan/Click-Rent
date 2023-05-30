import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '../assests/icons/download.png'


import RepeatIcon from '@material-ui/icons/ReplayOutlined';
import PrintIcon from '@material-ui/icons/Print';
import MessageIcon from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';
import IconAdd, { IconScanner,SupplierIcon, PersonIcon } from './icons'
import { Mail, Textsms } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  editButton: {},
  deleteButton: {
    color: theme.palette.error.dark,
  },
  scannerButton: {
    color: theme.palette.error.dark,
  },
  infoButton: {
    color: theme.palette.primary.contrastText,
    backgroundColor:theme.palette.primary.dark,
  },
  createButton: {
    color: theme.palette.primary.contrastText,
    backgroundColor:theme.palette.primary.light,
  },
  successButton: {
    color: theme.palette.success.contrastText,
    backgroundColor:theme.palette.success.light,
  },
  
}));

export const EditButton = ({ onClick }) => {
  return (
    <IconButton size="small" variant="outlined" color="secondary" onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
};

export const DeleteButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="delete" className={classes.deleteButton} onClick={onClick}>
    <DeleteIcon fontSize="small" />
  </IconButton>
  );
};

export const CancelButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Button aria-label="cancel"  onClick={onClick}>
      Cancel
    </Button>
  );
};

export const MessageButton = ({ onClick,children }) => {
  const classes = useStyles();
  return (
    <Button
    className={classes.infoButton}
    size="small"
    variant="contained"
    onClick={onClick}
  >
    <MessageIcon />
    {children}
  </Button>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <DeleteIcon fontSize="small" />
  // </IconButton>
  );
};

export const ReminderButton = ({ onClick,isSubmiting,children }) => {
  const classes = useStyles();
  return isSubmiting ? <CircularProgress size={18}/> : (
    <IconButton
    size="small"
    variant="contained"
    onClick={onClick}
  >
    <Mail />
    {children}
  </IconButton>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <DeleteIcon fontSize="small" />
  // </IconButton>
  );
};

export const SendSMSButton = ({ onClick,isSubmiting,children }) => {
  const classes = useStyles();
  return isSubmiting ? <CircularProgress size={18}/> : (
    <IconButton
    size="small"
    variant="contained"
    onClick={onClick}
  >
    <Textsms />
    {children}
  </IconButton>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <DeleteIcon fontSize="small" />
  // </IconButton>
  );
};

export const PrintButton = ({ onClick,children }) => {
  const classes = useStyles();
  return (
    <Button
    className={classes.infoButton}
    size="small"
    variant="contained"
    onClick={onClick}
  >
    <PrintIcon />
{children}
  </Button>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <MessageIcon fontSize="small" />
  // </IconButton>
  );
};

export const CreateButton = ({ onClick,children }) => {
  const classes = useStyles();
  return (
    <Button
    className={classes.createButton}
    size="small"
    variant="contained"
    onClick={onClick}
  >
    <AddIcon />
{children}
  </Button>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <MessageIcon fontSize="small" />
  // </IconButton>
  );
};



export const DownloadButton = ({ onClick, children }) => {
  const classes = useStyles();
  return (
  //   <Button
  //   className={classes.infoButton}
  //   size="small"
  //   variant="contained"
  //   onClick={onClick}
  // >
  //   Download
  //   <DownloadIcon />
  // </Button>
    <IconButton onClick={onClick} >
    <img  src={DownloadIcon} width="17px" height="17px" />
  </IconButton>
  );
};

export const TryAgainButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="delete" className={classes.deleteButton} onClick={onClick}>
      <RepeatIcon fontSize="small" />
  </IconButton>
  );
};
export const ScannerButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconScanner  className={classes.scannerButton} onClick={onClick}>
  </IconScanner>
  );
};

export const FundsToSupplier = ({ onClick,isSubmiting ,children }) => {
  const classes = useStyles();
  return  isSubmiting ? <CircularProgress size={18}/> : (
    <IconButton
    size="small"
    //variant="contained"
    onClick={onClick}
  >
    <SupplierIcon />
  </IconButton>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <MessageIcon fontSize="small" />
  // </IconButton>
  );
};

export const FundsToTenant = ({ onClick,isSubmiting ,children }) => {
  const classes = useStyles();
  return  isSubmiting ? <CircularProgress size={18}/> : (
    <IconButton
    size="small"
    //variant="outlined"
    //color="primary"
    onClick={onClick}
  >
    <PersonIcon />
  </IconButton>
  //   <IconButton aria-label="delete" className={classes.deleteButton}>
  //   <MessageIcon fontSize="small" />
  // </IconButton>
  );
}