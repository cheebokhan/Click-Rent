import Moment from 'moment';

export function format(formatType, value) {
    if (typeof value !== 'undefined') {
      switch (formatType) {
        case "date":
          if (Moment(value).isAfter(Moment("01-01-0001")))
            return Moment(value).format("DD-MM-YYYY");
          return "-";
        case "dateTime":
          if (Moment(value).isAfter(Moment("01-01-0001")))
            return Moment(value).format("DD-MM-YYYY HH:mm");
          return "-";
        case "time":
          if (Moment(value).isAfter(Moment("01-01-0001")))
            return Moment(value).format("LT");
          return "-";
        case "number":
          return typeof value === "number"
            ? value.toFixed(2)
            : typeof value !== "undefined"
            ? value
            : 0.0;
        default:
          return value;
      }
    }
    else
      return '-'
  }