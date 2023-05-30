import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getTranslation } from "../heplers/translationHelper";

export const DatePicker = ({
  label,
  value,
  error,
  fullWidth,
  required,
  onChange,
  ...rest
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        fullWidth
        disableToolbar
        variant="outlined"
        format="dd-MM-yyyy"
        size="small"
        id="From-Date-inline"
        label={label}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": label,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        required={required}
        error={error}
        {...rest}
        minDateMessage={getTranslation("Date should not be min date of calendar.","Date should not be min date of calendar.","Date should not be min date of calendar.")}
      />
    </MuiPickersUtilsProvider>
  );
};
