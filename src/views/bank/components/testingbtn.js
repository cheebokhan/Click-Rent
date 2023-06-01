import { Button } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';

function Buttontest(props) {
    const [clicked, setClicked] = useState(false);
    function handleClick() {
      // get the value of the input field
      const value = document.querySelector("input[name='amount']").value;
      // call the handleValueChange function with the value and the event object
      props.handleValueChange(value, value);
      // set the fund state and call the handleSubmit function
      props.setFund(value);
      props.handleSubmit();
      setClicked(true);
    }
  
    return  clicked ? null :  <Button variant="contained" color="primary" onClick={handleClick} style={{margin:"20px"}}>Add More Category</Button>;
  }
  
  export default Buttontest;
