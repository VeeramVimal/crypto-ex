import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import $ from "jquery"
import { MdArrowDropDown } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { IoMdArrowDropright } from "react-icons/io";
import Paper from '@mui/material/Paper';
import Searchbar from "../separate/Searchbar.js";
import { visuallyHidden } from '@mui/utils';
import { HiQuestionMarkCircle } from "react-icons/hi";
import { BiSearchAlt2 } from "react-icons/bi";

import ReactTooltip from "react-tooltip";
import axios from 'axios';
import { makeRequest } from '../../core/services/v1/request.js';
import Config from '../../core/config/index.js';
import { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useContextData } from '../../core/context/index.js';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../core/lib/toastAlert.js';
import moment from 'moment/moment.js';
import { Bars } from 'react-loader-spinner';

function createData(name, sevenDaysFixedRate, fourteenDaysFixedRate, thirtyDaysFixedRate, type, actions) {
  return {
    name,
    sevenDaysFixedRate,
    fourteenDaysFixedRate,
    thirtyDaysFixedRate,
    type,
    actions
  };
}

const rows = [
  createData('ETH', 305, 3.7, 67, 4.3),
  createData('ETH', 305, 3.7, 67, 4.3),
  createData('ETH', 305, 3.7, 67, 4.3),
  createData('ETH', 305, 3.7, 67, 4.3),
  createData('ETH', 305, 3.7, 67, 4.3),
];

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
  return order === 'desc'
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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Loanable Coin',
  },
  {
    id: 'sevenDaysFixedRate',
    numeric: true,
    disablePadding: false,
    label: 'Hourly / Annually Interest Rate',

  },
  {
    id: 'fourteenDaysFixedRate',
    numeric: true,
    disablePadding: false,
    label: 'Hourly / Annually Interest Rate',
  },
  {
    id: 'thirtyDaysFixedRate',
    numeric: true,
    disablePadding: false,
    label: 'Hourly / Annually Interest Rate',
  },
  {
    id: 'borrow',
    numeric: true,
    disablePadding: false,
    label: '',
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow >
        <TableCell>

        </TableCell>
        <TableCell className="mb-0 pb-0 text-center">
          <p className='mb-0'>7 Days - Stable Rate</p>
        </TableCell>
        <TableCell className="mb-0 pb-0 text-center">
          <p className='mb-0'>14 Days - Stable Rate</p>
        </TableCell>
        <TableCell className="mb-0 pb-0 text-center">
          <p className='mb-0'>30 Days - Stable Rate</p>
        </TableCell>
        <TableCell>

        </TableCell>
      </TableRow>
      <TableRow>

        {headCells.map((headCell) => (

          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
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
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

//** stable terms data */
const stableTerms = [

  { value: 1, label: { head: "7 Days - Stable Rate", descripe: "Use spot wallet assets as collateral" }, days: 7, interestKey: "sevenDaysFixedInterest" },
  { value: 2, label: { head: "14 Days - Stable Rate", descripe: "Use spot wallet assets as collateral" }, days: 14, interestKey: "fourteenDaysFixedInterest" },
  { value: 3, label: { head: "30 Days - Stable Rate", descripe: "Use spot wallet assets as collateral" }, days: 30, interestKey: "thirtyDaysFixedInterest" }


]
export default function EnhancedTable() {
  const navigate = useNavigate();
  const { siteSettings, myProfile, setUserProfile } = useContextData();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('available');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //** search input field state managed */
  const [borrowSearch, setBorrowSearch] = useState("");
  const [collateralSearch, setCollateralSearch] = useState("");

  //** list of borrow market data state mng */
  // const [spotHolds, setSpotHolds] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [collateralCoins, setCollateralCoins] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);

  //** modal state managed */
  const [borrowShow, setBorrowShow] = useState(false);
  const [flexibleRateShow, setFlexibleRateShow] = useState(false);
  const [wantBorrowShow, setWantBorrowShow] = useState(false);
  const [collateralShow, setCollateralShow] = useState(false);
  const [orderConfirmShow, setOrderConfirmShow] = useState(false);
  //** list of the borrow market data state mng */
  const [borrowData, setBorrowData] = useState([]);
  const [selectCollateral, setSelectCollateral] = useState([]);

  //** loan to value interest amt state mng */

  const [interestRate, setInterestRate] = useState(0);
  const [initLTV, setInitLTV] = useState(0);
  const [LTV_Amt, setLTV_Amt] = useState({
    initLTV: 0,
    marginLtv: 0,
    liquidationLtv: 0
  });
  const [estHourInterest, setEstHourInterest] = useState(0);
  const [estimateInterst, setEstimatedIterest] = useState(0);
  const [repayAmt, setRepayAmt] = useState(0);
  const [collateralWalletAmt, setCollateralWalletAmt] = useState([]);
  const [pairsData, setPairsData] = useState([]);

  //** date state mng */
  const [termDetail, setTermDetail] = useState([]);
  const [selectTerm, setSelectTerm] = useState("");
  const [termExpireDate, setTermExpireDate] = useState("");
  const [borrowDate, setBorrowDate] = useState(""); //** borrow start date mng*/
  const [userId, setUserId] = useState(null);
  const [terms, setTerms] = useState(false);
  const [termValue, setTermValue] = useState("");
  const [LP, setLP] = useState("");
  const [marginLTV, setMarginLTV] = useState("");
  //** collateral and borrow input field state mng */
  const [data, setData] = useState({
    wantBorrow: "",
    collateral: ""
  });

  //** collateral and borrow input field validation state mng */
  const [initialVal, setInitialVal] = useState({
    wantBorrowErr: "",
    collateralErr: ""
  });

  //** get list of the borrow of coin market API integrate */
  const getBorrowDetails = async () => {
    try {
      const params = {
        method: 'GET',
        url: `${Config.V1_API_URL}borrowMarket`
      };
      const response = await makeRequest(params);
      const { data } = response;
      if (data) setMarketData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBorrowDetails()
  }, []);

  //** user Id fetch the render method */
  useEffect(() => {
    if (myProfile && myProfile._id) {
      setUserId(myProfile._id);
    }
  }, [myProfile]);


  //** default collateral select function */
  const defaultCoin = async () => {
    var payload = {
      ids: 'bitcoin',
      vs_currencies: 'usd'
    }
    await axios({
      method: 'POST',
      url: `${Config.V1_API_URL}borrowMarket/coin_spot`,
      data: payload
    }).then((res) => {
      if (res.data) {
        var collateralData = res.data.data.collateral;
        setInitLTV(collateralData.initLtv);
        setSelectCollateral(res.data.data);
        setCollateralShow(false);
        setLTV_Amt({
          initLTV: (collateralData.initLtv * 100),
          marginLtv: (collateralData.marginLtv * 100),
          liquidationLtv: (collateralData.liquidationLtv * 100)
        });
      }
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    defaultCoin();
  }, [userId]);

  //** select term based interest */
  useEffect(() => {
    setTermDetail(stableTerms[0]);
    setSelectTerm(stableTerms[0]?.label.head);
    let stream = Object.values(stableTerms[0]);
    setTermValue(stream[3]);
  }, [stableTerms?.length]);

  useEffect(() => {
    if (termValue) {
      let matchValue = selectCollateral && selectCollateral.collateral && selectCollateral.collateral[termValue];
      setInterestRate(matchValue);
    }
  }, [selectCollateral]);


  //** collateral_coins get the coins details  */
  const getCollateralCoin = async () => {
    const params = {
      method: 'GET',
      url: `${Config.V1_API_URL}borrowMarket/collateral_coins`
    }
    const response = await makeRequest(params);
    const { data } = response;
    console.log("data=======", data);
    if (data?.length > 0) { setLoaderStatus(true); setCollateralCoins(data); }
    else { setLoaderStatus(false) }
  };

  useEffect(() => {
    getCollateralCoin();
  }, [collateralCoins?.length]);
  //** get the pair of coin amt in pairs model data fetch API integrate  */
  const getPairsDetails = async () => {
    var pair = `${selectCollateral &&
      selectCollateral.userData &&
      selectCollateral.userData.currencySymbol}_${borrowData &&
      borrowData.currencyDetails &&
      borrowData.currencyDetails.currencySymbol}`

    axios({
      method: "POST",
      url: `${Config.V1_API_URL}trade/checkPair`,
      data: {
        pair: pair
      }
    }).then((res) => {
      setPairsData(res.data.Message);
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    getPairsDetails()
  }, [selectCollateral, borrowData]);
  //** user id to user to fetch the user wallet ammount */
  useEffect(() => {
    var userId = "";
    var currencyId = "";

    if (myProfile) {
      userId = myProfile._id;
    }
    if (selectCollateral && selectCollateral.userData) {
      currencyId = selectCollateral.userData.currencyId;
    };
    axios({
      method: "POST",
      url: `${Config.V1_API_URL}borrowMarket/pairs`,
      data: {
        userId,
        currencyId
      }
    }).then((res) => {
      setCollateralWalletAmt(res.data.data);
    }).catch((err) => console.log(err));
  }, [myProfile, selectCollateral]);


  //** click terms based handle functions */
  const handleTerms = async (term) => {
    setTermDetail(term);
    setSelectTerm(term?.label.head);
    let stream = Object.values(term);
    setTermValue(stream[3]);
    let matchValue = selectCollateral && selectCollateral.collateral[stream[3]];
    setInterestRate(matchValue);
    setFlexibleRateShow(false);
    setInitialVal({ collateralErr: "", wantBorrowErr: "" });
    setData({ collateral: "", wantBorrow: "" });
    setEstHourInterest(0)
    // setTermDate(term.days)
  };


  //** collateral and borrow input field handle functions */
  const handleChangeLoan = async (event) => {
    // var USD_value = selectCollateral?.userData.USDvalue;
    const regexNum = /^[0-9\b]+$/;
    var USD_value = pairsData && pairsData.price;
    var estimateOneHr = "", interst = '', estimateInterest = "";
    var estimateTermInrst = "", repayAmount = "";
    var liquide = "";
    var marginPrice = "";
    if (selectCollateral) {
      if (event.target.name == "wantBorrow") {
        let wantBorrowValue = event.target.value;
        //** estimate hour calc for borrow  */
        if (interestRate) {
          var estimateDays = termDetail && termDetail.days; //** selected the term based days fetch */
          interst = interestRate / 100; //** convert interest rate to percentage for ex: (3.2/100 = 0.032) */
          estimateOneHr = (wantBorrowValue * interst) / (365 * 24); //** convert the estimate one hour interest */
          estimateInterest = estimateOneHr * 24 * estimateDays; //** convert the estimate interest rate per hour */
          setEstHourInterest(estimateOneHr);
        }
        if (wantBorrowValue) {
          // let collateralCalc = Math.abs(parseFloat(((event.target.value) / USD_value) + estimateInterest));
          // let collateralCalc = ((event.target.value) / USD_value) + estimateInterest;
          let collateralCalc = event.target.value / USD_value; //** enter the borrow amt divide by currency pair on USDT value to convert the collateral USDT calculation */
          let divInterestAmt = (estimateInterest / USD_value) + collateralCalc; //** estimate interest divided by currency pair on USDT value to added the collateral USDT calculation get the interest value*/
          let holdCollateralAmt = ((100 * divInterestAmt) / (initLTV * 100));
          // setData({ collateral: divInterestAmt });
          setData({ collateral: holdCollateralAmt });
          estimateTermInrst = ((event.target.value * interst) / 365) * estimateDays; //** estimate based on term interest rate calculation */

          setEstimatedIterest(estimateTermInrst);
          repayAmount = Math.abs(parseInt(event.target.value) + parseFloat(estimateTermInrst)); //** show the repaid amount */
          setRepayAmt(repayAmount);
          liquide = (event.target.value) / (holdCollateralAmt * (LTV_Amt.liquidationLtv / 100));
          marginPrice = (event.target.value) / (holdCollateralAmt * (LTV_Amt.marginLtv / 100));
        } else {
          setData({ wantBorrow: "", collateral: "" });
          setInitialVal({ wantBorrowErr: "", collateralErr: "" });
        }
        setData((prevState) => ({ ...prevState, ['wantBorrow']: wantBorrowValue }));
      } else if (event.target.name == "collateral") {
        let collateralValue = event.target.value;
        //** estimate hour calc for collateral */
        if (interestRate) {
          var borrowCalc = event.target.value * USD_value; //** collateral amount multiply by currency pair on USDT value */
          var estimateDays = termDetail && termDetail.days; //** selected the term based days fetch */
          interst = interestRate / 100; //** convert interest rate to percentage for ex: (65/100 = 0.65) */
          estimateOneHr = (borrowCalc * interst) / (365 * 24); //** convert the estimate one hour interest */
          estimateInterest = estimateOneHr * 24 * estimateDays; //** convert the estimate interest rate per hour */
          setEstHourInterest(estimateOneHr);
        }
        if (collateralValue) {
          let collateralMult = event.target.value * USD_value;
          // let wantBorrowDiv = (((event.target.value * USD_value) * initLTV) / 100);
          // setData({ wantBorrow: ((event.target.value * USD_value) - estimateInterest) });
          // setData({ wantBorrow: (((collateralMult * 65) / 100)) });
          let borrowAmt = (((collateralMult * (initLTV * 100)) / 100));
          setData({ wantBorrow: borrowAmt });

          estimateTermInrst = (((event.target.value * USD_value) * interst) / 365) * estimateDays;
          setEstimatedIterest(estimateTermInrst);

          // repayAmount = Math.abs(parseInt(event.target.value * USD_value) + parseFloat(estimateTermInrst));
          // repayAmount = Math.abs(((event.target.value * USD_value) - estimateInterest) + parseFloat(estimateTermInrst));
          // repayAmount = Math.abs(((collateralMult * 65) / 100) + parseFloat(estimateTermInrst));
          repayAmount = Math.abs(((collateralMult * (initLTV * 100)) / 100) + parseFloat(estimateTermInrst));

          setRepayAmt(repayAmount);
          liquide = borrowAmt / (event.target.value * (LTV_Amt.liquidationLtv / 100));
          marginPrice = borrowAmt / (event.target.value * (LTV_Amt.marginLtv / 100));
        } else {
          setData({ wantBorrow: "", collateral: "" });
          setInitialVal({ wantBorrowErr: "", collateralErr: "" });
        };
        // setData((prevState) => ({ ...prevState, ['collateral']: collateralValue }));
        setData((prevState) => ({ ...prevState, ['collateral']: collateralValue }));
      };
    }
    setLP(liquide);
    setMarginLTV(marginPrice);
  };
  //** validations func */
  const validationCheckErr = () => {
    var isValid = true;
    var coin_symbol = selectCollateral.userData ? selectCollateral?.userData.currencySymbol : ""
    var wallet_balance = collateralWalletAmt && (collateralWalletAmt?.amount || collateralWalletAmt.amount);
    var initialLTV = wallet_balance * initLTV;
    if (data.wantBorrow < 100) {
      setInitialVal((prevErr) => ({ ...prevErr, wantBorrowErr: "minimum 100 USDT amount" }));
      isValid = false;
    }
    else if (data.wantBorrow == 100 || data.wantBorrow < 1000) {
      setInitialVal((prevErr) => ({ ...prevErr, wantBorrowErr: "" }));
    }
    // else if (data.wantBorrow >= 1000 && data.wantBorrow < 10000) {
    else if (data.wantBorrow > 10000) {
      setInitialVal((prevErr) => ({ ...prevErr, wantBorrowErr: "maximum 10000 USDT amount" }));
      isValid = false;
    }
    else {
      setInitialVal((prevErr) => ({ ...prevErr, wantBorrowErr: "" }));
    }

    if (data.collateral) {
      if (collateralWalletAmt && initialLTV == 0) {
        setInitialVal((prevErr) => ({ ...prevErr, collateralErr: `you have only 0 ${coin_symbol}` }));
        isValid = false;
      }
      else if (initialLTV < data.collateral) {
        setInitialVal((prevErr) => ({ ...prevErr, collateralErr: `you can borrow upto ${initialLTV} ${coin_symbol}` }));
        isValid = false;
      }
      else {
        setInitialVal((prevErr) => ({ ...prevErr, collateralErr: "" }));
      }
    }
    return isValid;
  };

  const handleTermClose = async () => {
    setFlexibleRateShow(false);
    setInitialVal({ collateralErr: "", wantBorrowErr: "" });

  }
  //** validation checked using render method*/
  useEffect(() => {
    if (data.collateral || data.wantBorrow) validationCheckErr();
  }, [data]);

  //** select the coin list in collateral and borrow coins to search func */
  const handleSearch = (event) => {
    if (event.target.name == 'borrowSearch') {
      if (wantBorrowShow) {
        setBorrowSearch(event.target.value);
        filterSearchData(event.target.name, event.target.value)
      } else {
        setBorrowSearch("");
      }
    } else if (event.target.name == 'collateralSearch') {
      if (collateralShow) {
        setCollateralSearch(event.target.value);
        filterSearchData(event.target.name, event.target.value)
      } else {
        setCollateralSearch("");
      }
    }
  };

  const filterSearchData = async (name, value) => {

    const lowestCaseData = value.toLowerCase().trim();
    if (name == 'borrowSearch') {
      if (lowestCaseData === "") await getBorrowDetails();
      else {
        const filterData = marketData.filter((data) => {
          return Object.keys(data).some(key => data[key].toString().toLowerCase().includes(lowestCaseData));
        })
        setMarketData(filterData);
      }
    } else if (name == 'collateralSearch') {
      if (lowestCaseData === "") await getCollateralCoin();
      else {
        const filterCollateralData = await collateralCoins.filter((data) => {
          return Object.keys(data).some(key => data[key].toString().toLowerCase().includes(lowestCaseData));
        });
        await setCollateralCoins(filterCollateralData);
      }
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (marketRow) => {
    setBorrowData(marketRow)
    var name = marketRow.coin
    setBorrowShow(true)
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
        selected.slice(selectedIndex + 1),
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
  const handleShow = () => {
    //  setShow(true)
    setFlexibleRateShow(true)
  };

  //** select the coin list in collateral or borrow coins show the pop-up func */
  const handleSelectBorrow = (name) => {
    if (name == 'want-borrow') {
      setWantBorrowShow(true)

    } else if (name == 'collateral') {
      setCollateralShow(true);
    }

  };

  const handleSelectBorrowCoin = (coinData) => {
    setBorrowData(coinData);
    setWantBorrowShow(false);
  }
  const handleCollateralSelect = (coinData) => {
    var currency = 'usd';
    var payload = {
      ids: coinData.currencies[0].apiid,
      vs_currencies: 'usd'
    }
    axios({
      method: 'POST',
      url: `${Config.V1_API_URL}borrowMarket/coin_spot`,
      data: payload
    }).then((res) => {
      if (res.data) {
        const { data } = res.data;
        setSelectCollateral(res.data.data);
        setData({ collateral: "", wantBorrow: "" });
        setInitialVal({ collateralErr: "", wantBorrowErr: "" });
        setCollateralShow(false);
        setInitLTV(data.collateral.initLtv);
        setLTV_Amt({
          initLTV: (data.collateral.initLtv * 100),
          marginLtv: (data.collateral.marginLtv * 100),
          liquidationLtv: (data.collateral.liquidationLtv * 100)
        });
      }

    }).catch((err) => console.log(err));
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleStartBorrowClick = async (event) => {
    let date = new Date();
    let todayTime = date.getTime();
    let expireTermDay = termDetail && termDetail.days;
    let expireDays = expireTermDay * 24 * 60 * 60 * 1000;
    let expireDate = moment(todayTime + expireDays).format("YYYY-MM-DD HH:mm:ss");
    var expireString = expireDate.toString();
    event.preventDefault();
    var validateStatus = validationCheckErr();
    if (validateStatus) {
      setBorrowDate(date)
      setTermExpireDate(expireString);
      setOrderConfirmShow(true);
      setBorrowShow(false);
    }
  };

  //** terms and conditions functions */
  const handleTermsAndConditions = async (event) => {
    setTerms(event.target.checked)
  }
  //** After collateral and loan functions is completed after click borrow button function */
  const handleBorrowClick = async (event) => {
    event.preventDefault();
    const { collateral, wantBorrow } = data;

    var validateStatus = validationCheckErr();
    let loanCollateralStatus = false, loanBorrowStatus = false;
    if (validateStatus) {
      var userId = "", currencyId = "", collateralCoinSymbol = "";
      var borrowCurrencyId = "", borrowCurrencySymbol = "";
      if (myProfile) {
        userId = myProfile._id;
      }
      if (selectCollateral && selectCollateral.userData) {
        currencyId = selectCollateral.userData.currencyId;
        collateralCoinSymbol = selectCollateral.userData.currencySymbol;
      };
      if (borrowData && borrowData.currencyDetails) {
        borrowCurrencyId = borrowData.currencyDetails.currencyId;
        borrowCurrencySymbol = borrowData.currencyDetails.currencySymbol;
      };
      const payload = {
        userId: userId,
        collateralCurrencyId: currencyId,
        collateralCoin: collateralCoinSymbol,
        collateralAmount: collateral,
        borrowCurrencyId: borrowCurrencyId,
        borrowedCoin: borrowCurrencySymbol,
        remainingPrinciple: wantBorrow,
        debtLoanableAmount: repayAmt,
        loanStatus: 0,
        loanTermDays: termDetail && termDetail.days,
        hourlyInterestRate: estHourInterest,
        yearlyInterestRate: interestRate,
        totalInterestRate: estimateInterst,
        liquidateLTV: LP,
        marginLTV: marginLTV,
        borrowDate: borrowDate,
        expirationDate: termExpireDate,
        RepaidDate: borrowDate
      }
      try {
        const params = {
          method: 'POST',
          url: `${Config.V1_API_URL}crypto-loan/borrow/create`,
          data: payload
        };
        const response = await makeRequest(params);
        const { data, code, errorMessage, error, success } = response;
        if (data) loanCollateralStatus = true;
        if (success == true) {
          toast({ type: "success", message: "USDT Borrow amount added successfully" });
          setBorrowShow(false);
          setOrderConfirmShow(false);
          setData({ wantBorrow: "", collateral: "" });
          // window.location.reload();
        } else {
          toast({ type: "error", message: errorMessage ? errorMessage : "Something went wrong" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          {
            !loaderStatus ? (
              <div className="d-flex flex-row align-items-center px-4">
                <div className="bars-loading-loader mx-auto">
                  <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperclassName=""
                    visible={true}
                  />
                </div>
              </div>
            ) : (
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    // numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    // onSelectAllClick={handleSelectAllClick}  
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {loaderStatus && marketData && marketData.map((row) => {
                      const isItemSelected = isSelected(row.coin);
                      return (

                        <TableRow
                          hover
                          onClick={() => handleClick(row)}
                          // role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.coin}
                          selected={isItemSelected}
                        // data-bs-toggle="modal" data-bs-target="#borrowmodal"
                        >
                          <TableCell  >
                            <div className='d-flex flex-row px-0 mx-0'>
                              <div>
                                <img
                                  className='coin-icon-sizing-data-table'
                                  src={row.currencyDetails.image} />
                              </div>
                              <div className='text-start mx-2'>
                                <p className='mb-1'>{row.borrowCoinDetails.coin}</p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell align="center">
                            {
                              // !(row.flexibleRate.hourlyRate == 0 && row.flexibleRate.annuallyRate == 0) ? 
                              (row.borrowCoinDetails) && !(row.borrowCoinDetails.sevenDaysFixedRate['hourlyRate' && 'annuallyRate'] == 0) ?
                                (
                                  <p>
                                    <span className='text-grey'>{`${row.borrowCoinDetails.sevenDaysFixedRate.hourlyRate}%`}</span>
                                    <span className='text-grey mx-1'>/</span>
                                    <span className=''>{`${parseFloat(((row.borrowCoinDetails.sevenDaysFixedRate.annuallyRate) % 100) * 100).toFixed(2)}%`}</span>
                                  </p>
                                ) : null
                            }

                          </TableCell>
                          <TableCell align="center">
                            {
                              (row.borrowCoinDetails) && !(row.borrowCoinDetails.fourteenDaysFixedRate['annuallyRate' && 'hourlyRate'] == 0) ?
                                (
                                  <p>
                                    <span className='text-grey'>{`${row.borrowCoinDetails.fourteenDaysFixedRate.hourlyRate}%`}</span>
                                    <span className='text-grey mx-1'>/</span>
                                    <span className=''>{`${parseFloat(((row.borrowCoinDetails.fourteenDaysFixedRate.annuallyRate) % 100) * 100).toFixed(2)}%`}</span>
                                  </p>
                                ) : null
                            }

                          </TableCell>


                          <TableCell align="center">
                            {
                              (row.borrowCoinDetails) && !(row.borrowCoinDetails.thirtyDaysFixedRate['annuallyRate' && 'hourlyRate'] == 0) ?
                                (
                                  <p>
                                    <span className='text-grey'>{`${row.borrowCoinDetails.thirtyDaysFixedRate.hourlyRate}%`}</span>
                                    <span className='text-grey mx-1'>/</span>
                                    <span className=''>{`${parseFloat(((row.borrowCoinDetails.thirtyDaysFixedRate.annuallyRate) % 100) * 100).toFixed(2)}%`}</span>
                                  </p>
                                ) : null
                            }

                          </TableCell>
                          <TableCell align="center">
                            <div>
                              <button className=" btn fc-g" type="submit">Borrow</button>
                            </div>
                          </TableCell>

                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

            )}
          {/* <TablePagination
              className="tablepagination-styling"
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={marketData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Paper>

        {/* ============================== first modal start ========================== */}

        <Modal
          size="md"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
          show={borrowShow}
          onHide={() => { setBorrowShow(false); window.location.reload() }}>
          {/* <Modal.Dialog centered> */}
          <Modal.Header className='border-0' closeButton>
            <Modal.Title id='example-modal-sizes-title-lg'>Borrow</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className='row justify-content-center align-items-center'>
                <div className='mt-1'>
                  <p>Loan Type
                    <ReactTooltip
                      id="flexiablerate"
                      // place="top"
                      className="tooltip-text-Theme text-left"
                    />
                    <span className='mx-1'>
                      <HiQuestionMarkCircle
                        className='text-grey'
                        data-effect="solid"
                        // data-place="right"
                        data-multiline={true}
                        data-tip={`Flexible interest rate loan has floating interest rate
                          which is updated every minute based on the market
                          conditions. Stable interest rate loan has a fixed rate.
                          during the loan term period.`}
                        data-for="flexiablerate"
                      // onClick={handleShow}
                      />

                    </span>
                  </p>
                  <div className='d-flex justify-content-between bg-grey p-3' onClick={handleShow} >
                    <p className='mb-0'>
                      {/* { termDetail ? termDetail.label.head : stableTerms[0].label.head }  */}
                      {`${selectTerm}`}
                      <span className='bg-light-green-2 p-1 mx-2'>
                        Low Rates
                      </span>
                    </p>
                    <MdArrowDropDown onClick={handleShow} />
                  </div>
                </div>
                <div className='mt-3'>
                  <p>I want to borrow</p>
                  <div className='d-flex justify-content-between bg-grey p-3'>

                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-bg-css p-0 border-0"
                      placeholder="Enter Amount"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      name='wantBorrow'
                      pattern="^-?[0-9]\d*\.?\d*$"
                      value={data.wantBorrow}
                      onChange={handleChangeLoan}
                    />

                    <div className='d-flex flex-row align-items-center px-0 mx-0' name='want-borrow' onClick={() => handleSelectBorrow('want-borrow')}>
                      {/* <div className='loan-line-bar'>|</div> */}

                      <div>
                        {
                          // selectCollateral.userData ?
                          //   (
                          //     <img className='coin-icon-sizing-data-table' src={`${selectCollateral.userData.image}`} />
                          //   ) :
                          borrowData.currencyDetails && (
                            <img className='coin-icon-sizing-data-table' src={`${borrowData.currencyDetails.image}`} />
                          )
                        }
                      </div>
                      <div className='text-start mx-2'>
                        <p className='mb-0'>
                          {
                            borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol
                          }
                        </p>
                      </div>
                      <MdArrowDropDown name='want-borrow' onClick={() => handleSelectBorrow("want-borrow")} />
                    </div>

                  </div>
                  <div className="error">
                    {initialVal.wantBorrowErr}
                  </div>
                </div>
                <div className='mt-3'>
                  <p>Collateral
                    <ReactTooltip
                      id="collateral"
                      place="top"
                      className="tooltip-text-Theme text-left"
                    />
                    <span className='mx-1'>
                      <HiQuestionMarkCircle
                        className='text-grey '
                        data-effect="solid"
                        // data-place="right"
                        data-multiline={true}
                        data-tip={`The actual collateral amount may differ from what is
                        shown, and the collateral will accumulate rewards.
                        from Simple Earn (Flexible) automatically`}
                        data-for="collateral"
                      />
                    </span>
                  </p>
                  <div className='d-flex justify-content-between bg-grey p-3'>
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-bg-css p-0 border-0 outline: none"
                      placeholder="Enter Amount"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      name='collateral'
                      value={data.collateral}
                      pattern='^-?[0-9]\d*\.?\d*$'
                      // pattern="^-?[0-9]\d*\.?\d*$"
                      onChange={handleChangeLoan}
                    />
                    {/* className="max-btn" */}
                    <span data-bn-type="button" disabled={false} className="max-btn">MAX</span>
                    {/* <div className='loan-line-bar'>|</div> */}
                    <div className='d-flex flex-row align-items-center px-0 mx-0' name='collateral' onClick={() => handleSelectBorrow('collateral')}>
                      <div>
                        {
                          selectCollateral && selectCollateral.userData && (
                            <img className='coin-icon-sizing-data-table' src={`${selectCollateral.userData.image}`} />
                          )
                        }
                      </div>
                      <div className='text-start mx-2'>
                        <p className='mb-0'>
                          {
                            selectCollateral && selectCollateral.userData && selectCollateral.userData.currencySymbol
                          }
                        </p>
                      </div>
                      <MdArrowDropDown name='collateral' onClick={() => handleSelectBorrow("collateral")} />
                    </div>
                  </div>
                </div>
                <div className="error">
                  {initialVal.collateralErr}
                </div>

              </div>
              <div className='row'>
                <div className='rate-list mt-3'>
                  <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                    <span className='text-grey '>
                      Annually Interest Rate
                      <ReactTooltip
                        id="annualInterest"
                        place="top"
                        className="tooltip-text-Theme text-left"
                      />
                      <span className='mx-1'>
                        <HiQuestionMarkCircle
                          className='text-grey'
                          data-effect="solid"
                          // data-place="right"
                          data-multiline={true}
                          data-tip={`The interest will be calculated by the component
                          interest method. Interest accumulate after successful
                          borrowing, and the calculating every minute. If the
                          borrowing time is less than one minute, it will be
                          calculated as one minute.`}
                          data-for="annualInterest"
                        />
                      </span>
                    </span>
                    <span className=''>{`${interestRate}%`}</span>
                  </div>
                  <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                    <span className='text-grey '>
                      Estimated Hourly Interest
                      <ReactTooltip
                        id="annualInterest"
                        place="top"
                        className="tooltip-text-Theme text-left"
                      />
                      <span className='mx-1'>
                        <HiQuestionMarkCircle
                          className='text-grey'
                          data-effect="solid"
                          // data-place="right"
                          data-multiline={true}
                          data-tip={`The collateral asset will continue to earn Real-Time 
                          APR Rewards, which help to offset borrowing costs. 
                          Net annualized interest rate = Annualized Borrow 
                          Interst Rate - (Annualized Collateral Real-Time APR / Initial LTV)`}
                          data-for="annualInterest"
                        />
                      </span>
                    </span>
                    <span className=''> {`${parseFloat(Number(estHourInterest).toFixed(8))} ${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`}</span>
                  </div>
                  <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                    <span className='text-grey '>
                      Total Interest Amount
                    </span>
                    <span className=''> {`${parseFloat(Number(estimateInterst).toFixed(8))} ${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`}</span>
                  </div>
                  <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                    <span className='text-grey '>
                      Repayment Amount
                    </span>
                    <span className=''> {`${parseFloat(Number(repayAmt).toFixed(8))} ${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`}</span>
                  </div>
                  <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                    <span className='text-grey '>
                      Liquidation Price ({`${selectCollateral && selectCollateral.userData && selectCollateral.userData.currencySymbol}/${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`})
                    </span>
                    {/* <span className=''>{pairsData ? pairsData.price : 0}</span> */}
                    <span> {
                      LP == 0 ?
                        <p className='mx-1'>&#8211;</p> :
                        `${parseFloat(Number(LP).toFixed(8))}`
                    } </span>
                  </div>
                  <div className='table-data-1' >
                    <p className='text-grey'>
                      <span> Initial LTV: <>{LTV_Amt.initLTV}&#x25;</></span>
                      <span className='mx-1'>&#47;</span>
                      <span>Margin LTV: <>{LTV_Amt.marginLtv}&#x25;</></span>
                      <span className='mx-1'>&#47;</span>
                      <span>Liquidation LTV: <>{LTV_Amt.liquidationLtv}&#x25;</></span>
                      <span><IoMdArrowDropright /></span>
                    </p>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col text-center'>
                  {
                    myProfile ? (
                      <button className='btn  banner-top-button-login' onClick={handleStartBorrowClick}>
                        Start Borrowing Now
                      </button>
                    ) : (
                      <button className='btn  banner-top-button-login' onClick={() => navigate('/login')} >
                        Log In
                      </button>
                    )
                  }
                </div>
              </div>
            </form>
          </Modal.Body>
          {/* </Modal.Dialog> */}
        </Modal>

        {/*========================MODAL-FLEXIBLE-RATE=====================*/}

        <Modal
          size="md"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
          show={flexibleRateShow}
          onHide={() => handleTermClose()}>
          <Modal.Header className='border-0' closeButton>
            <Modal.Title>Choose Loan Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              stableTerms && stableTerms.map((term) => {
                return (
                  <div className="d-flex align-items-center mb-5" onClick={() => handleTerms(term)}>
                    <div className="">
                      <VscGraphLine className="loan-page-icon-image-table" />
                    </div>
                    <div className="mx-3">
                      <p className='mb-2'>{term.label.head}</p>
                      <p className='text-grey mb-0'>{term.label.descripe}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </Modal.Body>
        </Modal>

        {/*========================MODAL-BORROW=====================*/}

        <Modal
          size="md"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
          show={wantBorrowShow}
          onHide={() => setWantBorrowShow(false)}>
          <Modal.Header className='border-0' closeButton>
            <Modal.Title>I want to borrow</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='d-flex align-items-center bg-grey'>
              <BiSearchAlt2 className='text-grey mx-2' />
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search Coin"
                aria-label="Search"
                name='borrowSearch'
                value={borrowSearch}
                onChange={handleSearch}
              />
            </form>
            <div className='wanttoborrow-table-height-css'>
              {
                marketData && marketData.length > 0 && marketData.map((coin) => {
                  return (
                    <div className='d-flex flex-row align-items-center mt-3' onClick={() => handleSelectBorrowCoin(coin)}>
                      <div>
                        <img className='coin-icon-sizing-data-table' src={`${coin.currencyDetails.image}`} />
                      </div>
                      <div className='text-start mx-2'>
                        <p className='mb-0'>{coin.coin}</p>
                        <p className='mb-0 text-grey'>{coin.currencyDetails.currencyName}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Modal.Body>
        </Modal>

        {/*========================MODAL-COLLATERAL=====================*/}

        <Modal
          size="md"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
          show={collateralShow}
          onHide={() => setCollateralShow(false)}>
          <Modal.Header className='border-0' closeButton>
            <Modal.Title>Collateral</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="d-flex align-items-center bg-grey ">
              <BiSearchAlt2 className='text-grey mx-2' />
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Coin"
                aria-label="Search"
                name='collateralSearch'
                value={collateralSearch}
                onChange={handleSearch}
              />
            </form>
            <div className='wanttoborrow-table-height-css'>
              {/* {collateralBalanceCoins?.length ?
                collateralBalanceCoins.map((coin) => {
                  return (
                    <div className='d-flex flex-row align-items-center mt-3' onClick={() => handleCollateralSelect(coin)}>
                      <div>
                        <img className='coin-icon-sizing-data-table' src={`${coin.currencyDetails.image}`} />
                      </div>
                      <div className='text-start mx-2'>
                        <p className='mb-0'>{coin.coin}</p>
                        <p className='mb-0 text-grey'>{coin.currencyDetails.currencyName}</p>
                      </div>
                    </div>
                  )
                }) :
                collateralCoins.map((coin) => {
                  return (
                    <div className='d-flex flex-row align-items-center mt-3' onClick={() => handleCollateralSelect(coin)}>
                      <div>
                        <img className='coin-icon-sizing-data-table' src={`${coin.currencyDetails.image}`} />
                      </div>
                      <div className='text-start mx-2'>
                        <p className='mb-0'>{coin.coin}</p>
                        <p className='mb-0 text-grey'>{coin.currencyDetails.currencyName}</p>
                      </div>
                    </div>
                  )
                })
              } */}

              {
                collateralCoins?.length && collateralCoins.map((coin) => {
                  return (
                    <div className='d-flex flex-row align-items-center mt-3' onClick={() => handleCollateralSelect(coin)}>
                      <div>

                        <img className='coin-icon-sizing-data-table' src={`${coin.currencies[0].image}`} />
                      </div>
                      <div className='text-start mx-2'>
                        <p className='mb-0'>{coin.coin}</p>
                        <p className='mb-0 text-grey'>{coin.currencies[0].currencyName}</p>

                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Modal.Body>
        </Modal>

        {/* starting borrow modal showing payment list */}
        <Modal
          size="md"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
          show={orderConfirmShow}
          onHide={() => { setOrderConfirmShow(false); setBorrowShow(true); setTerms(false); }}>
          <Modal.Header className='' closeButton>
            <Modal.Title >Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='rate-list mt-3'>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-grey '>
                    Loan Amount
                  </span>
                  <span className=''>
                    {data.wantBorrow ? data.wantBorrow : 0} {`${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`}
                  </span>
                </div>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-grey '>
                    Collateral Amount
                  </span>
                  <span className=''>
                    {data.collateral ? parseFloat(Number(data.collateral).toFixed(8)) : 0} {`${selectCollateral && selectCollateral.userData && selectCollateral.userData.currencySymbol}`}
                  </span>
                </div>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-grey '>
                    Loan Terms
                  </span>
                  <span className=''>
                    {termDetail && termDetail.days} Days
                  </span>
                </div>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-grey '>
                    Annually Interest Rate
                  </span>
                  <span className=''>
                    {interestRate}%
                  </span>
                </div>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-grey '>
                    Total Interest Rate
                  </span>
                  <span className=''>
                    {`${parseFloat(Number(estimateInterst).toFixed(8))} ${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`}
                  </span>
                </div>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-grey'>
                    Expiration Time
                  </span>
                  <span className=''>
                    {
                      termExpireDate
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col text-center'>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-1'>
                  <span className='text-bold mt-2'>
                    <h6> Repayment Amount </h6>
                  </span>
                  <span>
                    {`${parseFloat(Number(repayAmt).toFixed(8))} ${borrowData && borrowData.currencyDetails && borrowData.currencyDetails.currencySymbol}`}
                  </span>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col text-center'>
                <div className='d-flex justify-content-between text-grey p-1'>
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id='terms'
                    name='terms'
                    onChange={handleTermsAndConditions}
                    onBlur={() => terms == true ? true : false}
                  />
                  <span className='me-5'>
                    I have read and I agreed to Fibit Loan Service Agreement
                  </span>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col text-center'>
                <div className='d-flex justify-content-between flex-column flex-lg-row align-items-center mb-3'>
                  <button
                    className='btn banner-top-button-login align-items-center mx-5 '
                    disabled={terms ? false : true}
                    onClick={handleBorrowClick}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Box>
    </div>
  );
}
