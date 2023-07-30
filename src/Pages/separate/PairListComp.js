import React, { useState } from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import { 
  alpha, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination,
  TableRow, TableSortLabel, Toolbar, Typography,
  Paper, IconButton, Tooltip
} from "@mui/material";
import { Delete,FilterList } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";

import noreplay from "../../assets/images/deposit/no-re.png";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function createData(name, balance, fat, carbs, protein) {
  return {
    name,
    balance,
    fat,
    carbs,
    protein,
  };
}

const headCells = [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
//   {
//     id: "Amount",
//     numeric: true,
//     disablePadding: false,
//     label: "Amount",
//   },
  {
    id: "Price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  // {
  //   id: "24H Change",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "24hchange",
  // },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {" "}{headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
const { numSelected } = props;

return (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        bgcolor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
    ) : (
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Wallet
      </Typography>
    )}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Filter list">
        <IconButton>
          <FilterList />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const data = {
  labels: [1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

export default function WalletListComp(props) {

  const {
    walletData= []
  } = props;

  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("balance");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = walletData.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - walletData.length) : 0;

  return (
  <Box className="datatablecss">
    <Paper sx={{ width: "100%", mb: 2 }}>
      {/* <EnhancedTableToolbar
        numSelected={selected.length}
      /> */}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={walletData.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.sort(getComparator(order, orderBy)).slice() */}
            {stableSort(
              walletData,
              getComparator(order, orderBy)
            )
            .slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            .map((row, index) => {
              const isItemSelected = isSelected(
                row.currencyName
              );
              const labelId = `enhanced-table-checkbox-${index}`;

              const firstCurrecny = row.currencySymbol;
              const secondCurrecny = "INR";
              const tradePairName = firstCurrecny+"_"+secondCurrecny;

              return (
                <TableRow
                  hover
                  onClick={(event) =>
                    handleClick(event, row.currencyName)
                  }
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {" "}&nbsp;<img src={row.image} className='color-white pr-top smallSize' alt="wallet-currency" /> {" "}
                    {row.currencyName}
                  </TableCell>
                  <TableCell align="right">
                    {(row.balance) ? (row.balance * row.USDvalue) : 0}
                  </TableCell>
                  <TableCell align="right">
                    <button className="unset-unselected btnfont mb-2" onClick={() => navigate("/spot/"+tradePairName)}>Trade</button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
            <TableRow
              style={{
                height:
                  (dense ? 31 : 53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
            )}
            {walletData && walletData.length == 0 && (
              <tr className="no-records-found">
                <td></td>
                <td></td>
                <td>
                  <br />
                  <img
                    className="no-record-image"
                    src={noreplay}
                    alt="no-record"
                  />
                  <br />
                  <span className="text-center">No Records Found</span>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25,50,100]}
        component="div"
        count={walletData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={
          handleChangeRowsPerPage
        }
      />
    </Paper>
    {/* <FormControlLabel
      control={
        <Switch
          checked={dense}
          onChange={handleChangeDense}
        />
      }
      label="Dense padding"
    /> */}
  </Box>);

}