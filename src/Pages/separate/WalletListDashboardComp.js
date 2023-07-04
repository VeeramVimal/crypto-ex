import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import {
  alpha, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination,
  TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip
} from "@mui/material";
import { Delete, FilterList } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";

import noreplay from "../../assets/images/deposit/no-re.png";
import { makeRequest } from "../../core/services/v1/request";
import { clickNavigate, decimalValueFunc } from "../../core/helper/common";
import { toast } from "../../core/lib/toastAlert";
import Config from "../../core/config/";
import { useContextData } from "../../core/context/index";

import * as yup from 'yup';
import { useFormik, Formik } from 'formik';

const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Enter your Amount')
    .required('Amount is required'),
});

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
    id: "Symbol",
    numeric: false,
    disablePadding: true,
    label: "Symbol",
  },
  {
    id: "Name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "MainWalletBalance",
    numeric: true,
    disablePadding: false,
    label: "Main Wallet Balance",
  },
  {
    id: "P2PBalance",
    numeric: true,
    disablePadding: false,
    label: "P2P Balance",
  },
  {
    id: "perpetualAmount",
    numeric: true,
    disablePadding: false,
    label: "USD-M Balance",
  }
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
    console.log({ property, event });
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
            sortDirection={true}
          // sortDirection={props.orderBy === headCell.id ? props.order : false}
          >
            {/* <TableSortLabel
              active={props.orderBy === headCell.id}
              direction={props.orderBy === headCell.id ? props.order : "desc"}
              onClick={createSortHandler(headCell.id)}
            > */}
            {" "} &nbsp;{headCell.label}
            {props.orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {props.order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
            {/* </TableSortLabel> */}
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

  const { myProfile } = useContextData();

  const {
    walletData: propswalletData = [],
    balShow = false,
    tabName = "wallet",
  } = props;

  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("balance");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState({});
  const [fromAccount, setFromAccount] = useState('Main Wallet');
  const [toAccount, setToAccount] = useState('P2P Wallet');
  const [cryptoWallet, setCryptoWallet] = useState([]);
  const [cryptoWalletClone, setCryptoWalletClone] = useState([]);
  const [fiatWallet, setFiatWallet] = useState([]);
  const [estimateINR, setestimateINR] = useState(0)
  const [isLoading, setisLoading] = useState(false);
  const [walletData, setWalletData] = useState([]);

  const handleClose = () => {
    setOpen(false);
    formik.values.amount = "";
    formik.values.toWallet = "";
  };

  useEffect(() => {
    if (props && props.walletData) {
      setWalletData(props.walletData);
    }
  }, [props]);

  const transferFund = (data) => {
    setOpen(true);
    setCurrency(data)
  };

  const fromWallet = (e) => {
    setFromAccount(e.target.value);
    setToAccount(e.target.value == 'Main Wallet' ? 'P2P Wallet' : 'Main Wallet');
  }
  const toWallet = (e) => {
    setToAccount(e.target.value);
    console.log(e.target.value);
  }

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

  const clickNavigate_call = (data = {}) => {
    const resp = clickNavigate(data, myProfile);
    if(resp && resp.status && resp.url) {
      navigate(resp.url);
    }
  }

  const formik = useFormik({
    initialValues: {
      amount: '',
      toWallet: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setisLoading(true);
      let balance = fromAccount == 'Main Wallet' ? currency.balance : currency.p2pAmount;
      if (balance >= values.amount) {
        const body = {
          amount: values.amount,
          currencyId: currency.currencyId,
          fromAccount: fromAccount,
          toAccount: toAccount
        }
        const params = {
          url: `${Config.V1_API_URL}wallet/submitTransfer`,
          method: 'POST',
          body
        }
        const response = (await makeRequest(params));
        let type = 'error';
        setisLoading(false);
        if (response.status) {
          type = 'success';
          handleClose();
          if (props.tabName === "wallet") {
            props.getWalletCurrency();
          }
          else if (props.tabName === "spot") {
            props.getSpotWalletCurrency();
          }
        }
        toast({ type, message: response.message });
      } else {
        toast({ type: 'error', message: 'Insufficient Balance On ' + fromAccount });
      }
    },
  });
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
              // order={props.order}
              // orderBy={props.orderBy}
              order={"MainWalletBalance"}
              orderBy={"desc"}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={walletData.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(
                walletData,
                getComparator(props.order, props.orderBy)
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

                  const withOutPairName = row.currencyName.toUpperCase();
                  const withOutPairSym = row.currencySymbol.replace(/_/g, '').toUpperCase();

                  if(
                    (props.searchWallet === "")
                    || (props.searchWallet === undefined)
                    || (props.searchWallet && withOutPairName.includes(props.searchWallet))
                    || (props.searchWallet && withOutPairSym.includes(props.searchWallet))
                  ) {
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
                          {row.currencySymbol}
                        </TableCell>
                        <TableCell align="right">
                          {row.currencyName}
                        </TableCell>
                        <TableCell align="right">
                          {balShow ? (row.balance > 0 ? decimalValueFunc(row.balance, row.siteDecimal, "removeZero") : 0) : "******"}
                        </TableCell>
                        <TableCell align="right">
                          {balShow ? (row.p2pAmount > 0 ? decimalValueFunc(row.p2pAmount, row.siteDecimal, "removeZero") : 0) : "******"}
                        </TableCell>
                        <TableCell align="right">
                          {balShow ? (row.perpetualAmount > 0 ? decimalValueFunc(row.perpetualAmount, row.siteDecimal, "removeZero") : 0) : "******"}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:
                      (dense ? 31 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
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
                  <td></td>
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
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer {currency.currencySymbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="row justify-content-center align-items-center ">
              <div className="row mt-4">
                <span className="phonenumber-change-text-2">
                  Internal Transfer are free on {Config.SITENAME}
                </span>
                <select className="f-control f-dropdown" placeholder="Select" value={fromAccount} onChange={fromWallet}>
                  <option value="Main Wallet">Main Wallet</option>
                  <option value="P2P Wallet">P2P Wallet</option>
                </select>
              </div>
              <div className="row mt-4">
                <select className="f-control f-dropdown" placeholder="Select" value={toAccount} onChange={toWallet}>
                  <option value={fromAccount == 'Main Wallet' ? 'P2P Wallet' : 'Main Wallet'}>{fromAccount == 'Main Wallet' ? 'P2P Wallet' : 'Main Wallet'}</option>
                  {(fromAccount== 'Main Wallet') &&<option value={fromAccount == 'Main Wallet' ? 'P2P Wallet' : 'Main Wallet'}>{fromAccount == 'Main Wallet' ? 'P2P Wallet' : 'Main Wallet'}</option>}
                </select>
              </div>
              <div className="row mt-4">
                <span className="phonenumber-change-text-2">
                  Amount
                </span>
               
                  <input
                    type="text"
                    className="form-control"
                    autoComplete='off'
                    label="Amount"
                    id="amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
            
                {formik.errors.amount ? <small className="invalid-amount error">{formik.errors.amount}</small> : null}
              </div>
            </div>
            <div className='row mt-5'>
              <span className="phonenumber-change-text-2">
                Balance: {fromAccount == 'Main Wallet' ? currency.balance : currency.p2pAmount} {currency.currencySymbol}
              </span>
              <div className='col'>
                <div className="d-grid">
                  <button className="add-payment-method-confirm-button" type="submit" disabled={isLoading}>Transfer Amount</button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
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