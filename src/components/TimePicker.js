import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    TimePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
  
  export const MyTimePicker=({label,value,error,required,onChange,...rest})=>{

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <TimePicker
      fullWidth
      disableToolbar
      variant="inline"
      size="small"
      label={label}
      value={value}
      onChange={ onChange }
      KeyboardButtonProps={{
        'aria-label': label,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      required={required}
      error={error}
      {...rest}
    />
    </MuiPickersUtilsProvider>
  }

  