import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { getTranslation } from "../../../heplers/translationHelper";

const columns = [
  {
    id: "name",
    label: getTranslation("Building","imeuble","Gebäude"),
    minWidth: 170,
  },
  {
    id: "profit",
    label: getTranslation("Profit","Profit","Profitieren"),
    minWidth: 100,
  },
];

export const FinancialReportBuildings = ({data,loading}) => {
  console.log("hdkjhkgbkmfbgkvx",data)
  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer style={{ maxHeight: "430px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{background:"red"}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : 
                          getTranslation(value,value,value)
                          }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
