import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Collapse,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { Children, useState } from "react";
export const Collapser = ({open, title, children }) => {

  const [isOpen, setIsOpen] = useState(open?open:false);
  const [isLoaded, setIsLoaded] = useState(true);
  const handleDown = () => {
    setIsOpen(true);
  };
  const handleUp = () => {
    setIsOpen(false);
  };

  const actions=()=>{
   return isOpen ? (
     <IconButton onClick={handleUp}>
       <KeyboardArrowUp />
     </IconButton>
   ) : (
     <IconButton onClick={handleDown}>
       <KeyboardArrowDown />
     </IconButton>
   );
}

const handleCollapseClick=()=>{
  isOpen ?handleUp():handleDown();
}
  
  return (
    <Card >
      <CardHeader title={title} action={actions()} onClick={handleCollapseClick} />
      <Collapse in={isOpen} unmountOnExit >
      <CardContent>
          {children}
      </CardContent>
      </Collapse>
    </Card>
  );
};
