import React from 'react'
import { tenantCategories } from '../../enums';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getTranslation } from '../../../heplers/translationHelper';
import { useState } from 'react';
import * as Yup from "yup";
import { Form, Formik } from 'formik';


const SplitFundtoTenant = ({balance,item,onSubmit,onChanged,remainingItems})=> {
  debugger
    // call the handleDataChange function when the user click on Add button
  console.log("aaaaaaaaaa",item)
    const initialValues = {
        duesCategory: tenantCategories[0].id,
        amount: 0,
    
      };
    
      const basicValidationSchema = Yup.object().shape({
       
        amount: Yup.number().min(1,"amount is required"),
        // apartmentId: Yup.number().min(1),
        // buildingId: Yup.number().min(1),
      });
      const defaultValue =item?item: initialValues;
      
      const currentItem=(id)=>{
        return tenantCategories.find(x=>x.id==id)
      }
  return (
    <div>
          <Formik
            enableReinitialize
            initialValues={defaultValue}
            validationSchema={basicValidationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              onSubmit(values,actions)
            }}
          >
            {({
              errors,
              touched,
              values,
              handleSubmit,
              isSubmitting,
              getFieldProps,
              setFieldValue,
            }) => (
                <Form>
            <Grid container spacing={2}>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <FormControl 
                fullWidth
                variant="outlined" >
                <InputLabel id="demo-simple-select-label">{getTranslation(
                    "Category",
                    "Cat�gorie",
                    "Kategorie"
                  )}</InputLabel>
                  <Select 
                  style={{
                     height: "40px",
                     }}
                  autoComplete="true"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={getTranslation(
                    "Select Category",
                    "Select Category",
                    "Select Category"
                  )}
                  name="duesCategory"
                  // options={tenantCategories.filter(category => category.id !== values.duesCategory)}
                  value={values.duesCategory} 
                  onChange={(e)=> setFieldValue("duesCategory", e.target.value)}
                  >
                    {/* {console.log("dassdsasdas",remainingItems.findIndex(x=>x.id== currentItem()?.id) ==-1)} */}
                    {remainingItems.findIndex(x=>x.id== currentItem(values.duesCategory)?.id) ==-1 ? 
                    <MenuItem value={currentItem(values.duesCategory)?.id}> {currentItem(values.duesCategory)?.label}</MenuItem>
                    :null}
                    {remainingItems.map((category)=><MenuItem value={category.id}> {category.label}</MenuItem>)}
                  </Select>
              </FormControl>
        </Grid>

          <Grid item xs={5} sm={5} md={5} lg={5}>
          <TextField
              size="small"
              name="amount"
              type="number"
              label="Enter a value"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={values.amount}
              onChange={(e)=>{
                  setFieldValue("amount", e.target.value);
              }}
              onBlur={()=>onChanged(values)}
          />
          </Grid>


          <Grid item xs={2} sm={2} md={2} lg={2} >
            {console.log("sssaasss",balance)}
            {balance > 0 ?
            <Button variant='contained' color="primary" onClick={handleSubmit}> click</Button>
            :
            null
}
          </Grid>
        </Grid>
              </Form>
                )}
              </Formik>
       
        
               
    </div>
  )
}

export default SplitFundtoTenant