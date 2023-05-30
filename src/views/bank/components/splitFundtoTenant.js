import React from 'react'
import { tenantCategories } from '../../enums';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getTranslation } from '../../../heplers/translationHelper';

const SplitFundtoTenant = (remainingAmount,)=> {
    debugger
    const getTenantCategory=(dueCategoryId)=>{
        return tenantCategories.find(x=>x.id==dueCategoryId);
      }
  return (
    <div>
        <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Autocomplete
                      options={tenantCategories}
                      value={getTenantCategory(0)}
                      getOptionLabel={(option) => option.label}
                      size="small"
                      onChange={(e, tenantCategory) => {
                        if (tenantCategory) {
                          debugger
                        //   setFieldValue("duesCategory", tenantCategory?.id);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={getTranslation(
                            "Category",
                            "Cat�gorie",
                            "Kategorie"
                          )}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                      size="small"
                      name="amount"
                      type="number"
                      label="Enter a value"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    //   value={remainingAmount}
                      onChange={(e)=>{
                        // handleValueChange(e,e.target.value,1)
                      }}
                  />
                  </Grid>
        </Grid>
               
    </div>
  )
}

export default SplitFundtoTenant