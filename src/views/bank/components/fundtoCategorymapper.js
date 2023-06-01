import React from 'react'
import SplitFundtoTenant from './splitFundtoTenant';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { tenantCategories } from '../../enums';
import { useState } from 'react';

function FundtoCategorymapper({transactionAmount,array,setArray}) {
    // const getTenantCategory=(dueCategoryId)=>{
    //     return props.tenantCategories.find(x=>x.id==dueCategoryId);
    //   }
    // const handleOnChange=(values,actions)=>{
    //   const arr=array;
    //     const index = arr.findIndex(obj => obj.dusCategory === values.dusCategory);
    //     // create a copy of the items array and update the element at the index
    //     const updatedItems = arr.map((obj, i) => i === index ? values : obj);
    //     setArray(updatedItems);
    //     console.log("updated arrassss",arr)
    //     debugger
    // }
    const handleOnChange = (values, actions) => {      
        const index = array.findIndex(obj => obj.dusCategory === values.dusCategory);
        console.log("hhhhhahh",index);
      const arr=array;
      arr[index] =values
        setArray([...arr]);
        console.log("updated arrassss",arr)
    };
    const [remainingItems,setRemainingItems]=useState(tenantCategories);

    const handleOnAdd=(values,action)=>{
      const arr=array;
      debugger
      const balance= transactionAmount - _.sumBy(arr,x=>x.amount)

      const remainingItems = tenantCategories.filter(item => {
        const match = arr.find(element => element.duesCategory === item.id);
        return !match;
      });
      setRemainingItems(remainingItems);

      // const currentItems = tenantCategories.filter(item => {
      //   const match = arr.find(element => element.duesCategory === item.id);
      //   return match;
      // });
      if(balance>0 )
        setArray([...arr,{duesCategory:remainingItems[0].id,amount:balance}])
    }
   
  return (
                <div>
                {array.map((item, index) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                    <SplitFundtoTenant
                    //   remainingamount={item.fund}
                    //   handleValueChange={props.handleValueChange}
                    //   duescategory= {getTenantCategory(index)}
                    //   handleDataChange={props.handleDataChange}
                    //   showButton={props.array.length-1 == index}
                    item={item}
                    remainingItems={remainingItems}
                    onSubmit={handleOnAdd}
                    onChanged={handleOnChange}
                    balance={transactionAmount - _.sumBy(array,x=>x.amount)}
                    />
                  </Grid>
                
                  ))}
    </div>
  )
}

export default FundtoCategorymapper;