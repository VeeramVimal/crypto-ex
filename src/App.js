import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import $ from "jquery";
import { AuthProvider } from "./core/context/";

import Home from "./Pages/siteTheme/Home";

import Deposit from "./Pages/Deposit";
import DepositFiat from "./Pages/DepositFiat";
import Withdraw from "./Pages/Withdraw";
import WithdrawFiat from "./Pages/WithdrawFiat";
import Transactionhistory from "./Pages/Transactionhistory";
import Market from "./Pages/Market";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import DashboardSidebar from "./Pages/DashboardSidebar";
import Faq from "./Pages/Faq";
import Whitepaper from "./Pages/Whitepaper";

import CMS from "./Pages/CMS";
import Phonenumberverificationchange from "./Pages/dashboard-profile/Phone-number-verification-change";
import Emailverificationchange from "./Pages/dashboard-profile/Email-verification-change";
import Changepassworddashboard from "./Pages/dashboard-profile/Change-password-dashboard";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";

// import P2Pfiatbuyusdt from './Pages/P2P-fiat-buy-usdt';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import AddNewPost from "./Pages/Ads/Add-New-Post";
import UpdatePost from "./Pages/Ads/Update-Postads";
import OrderDetails from "./Pages/OrderDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./assets/globalVar.css";
import "./assets/style.css";
import "./assets/custom.css";
import "./assets/styledev.css";
import "./assets/modes.css";

import P2P from "./Pages/P2P-trade.js";
import Orderp2ptrade from "./Pages/Order-p2p-trade.js";
import P2pusercenter from "./Pages/P2p-user-center.js";
import P2PAdvertiserDetails from "./Pages/P2P-advertiserDetails";
import AppealHistory from "./Pages/AppealHistory.js";
import Addpaymentmethod from "./Pages/P2P-Payment-Details/add-payment-method";
import Updatepaymentmethod from "./Pages/P2P-Payment-Details/update-payment-method";
import Myadspage from "./Pages/Myads.js";
import ProtectedRoute from "./route.protected";
import FeeStructure from "./Pages/Fee-Structure";
import CoinStatus from "./Pages/Coin-Status";
import Tradingcompetitiondashboard from "./Pages/trading-competition/Trading-competition-dashboard";
import Tradingcompetitionbanner from "./Pages/trading-competition/Trading-competition-banner";
import Tradingcompetitioncompletion from "./Pages/trading-competition/Trading-competition-completion";
import TradingcompetitiondashboardLive from "./Pages/trading-competition/Trading-competition-dashboard-live";
// import Tradingcompetitionupcoming from "./Pages/trading-competition/Trading-competition-upcoming";
import Maincopytrading from "./Pages/copy-trading/Copytrading-main.js";
import CopytradingPortfolio from "./Pages/copy-trading/Copytrading-portfolio.js";
import Areachartcopytrading from "./Pages/copy-trading/Areachart-copytrading.js";
import Barchartcopytrading from "./Pages/copy-trading/Barchart-copytrading.js";
import Doughnutchartcopytrading from "./Pages/copy-trading/Doughnutchart-copytrading.js";
import Bealeadmain from "./Pages/copy-trading/Be-a-lead-main.js";
import CreateLeader from "./Pages/copy-trading/Be-a-lead-main.js";

// import Copytraderdetails from "./Pages/copy-trading/Copytrader-details.js";
import Apipage from "./Pages/APIpage.js";

//** fibit lanchpad import files start */
import HomePage from './Pages/fibit-launch-pad/views/Home';
import IdoLaunchPage from "./Pages/fibit-launch-pad/views/Idolaunch";
// import IdoLaunchPage from "./Pages/fibit-lanch-pad/views/Idolaunch";
import ActiveIdo from "./Pages/fibit-launch-pad/views/Activeido";
import IdoForm from "./Pages/fibit-launch-pad/views/ido-form/Idoform";
import IdoFormToken from "./Pages/fibit-launch-pad/views/ido-form/Idoformtoken";
//** fibit lanchpad import files end */

//** loan history */
// import LoanHistory from "./Pages/separate/LoanHistory";
import Loan from "./Pages/Loan/Loan.js";
import LoanHistory from "./Pages/Loan/LoanHistory";
//** support ticket import */
import Support from "./Pages/support-ticket/support";

// dashboard profile
import GoogleAuthenticator from "./Pages/dashboard-profile/Google-Authenticator";
import DeviceManagement from "./Pages/dashboard-profile/DeviceManagement";
// dashboard profile

// trade
import Spot from "./Pages/exchange-trade/Spot";
import USDTPerpetualTrade from "./Pages/usdt-perpetual-trade/USDTPerpetual";

import Comingsoon from "./Pages/Comingsoon";
import Error404 from "./Pages/Error404";
import UnderMain from "./Pages/UnderMain";

//** copy trade imported */
import CopyTrade from "./Pages/copy-trading/Copytrading-main";
import CopyTradePortFolio from "./Pages/copy-trading/Copytrading-portfolio";
import CopyTraderDetails from "./Pages/copy-trading/Copytrader-details";
import Notification from "./Pages/notification"; //** notification import file location */
// import ForgotPasswordOTP from './Pages/ForgotPasswordOTP';
// import BuyUSDT from './Pages/BuyUSDT';
// import P2Ptradenewdesignupdate from './Pages/P2P-trade-new-design-update';
// import PostNewAddFinal from "./Pages/PostNewAddFinal";
// import PostNewAddStart from "./Pages/PostNewAddStart";

function App() {
  const mode = localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : "light-new";

  const [theme, setTheme] = useState(mode);

  const routes = [
    // common
    {
      path: "/",
      name: "home",
      component: <Home setTheme={setTheme} theme={theme} />,
    },
    { path: "/faq", component: <Faq setTheme={setTheme} theme={theme} /> },
    {
      path: "/markets",
      component: <Market setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/about",
      component: <CMS setTheme={setTheme} theme={theme} identify="about" />,
    },
    {
      path: "/contact-support",
      component: <CMS setTheme={setTheme} theme={theme} identify="contactus" />,
    },
    {
      path: "/terms",
      component: <CMS setTheme={setTheme} theme={theme} identify="terms" />,
    },
    {
      path: "/privacy-policy",
      component: <CMS setTheme={setTheme} theme={theme} identify="privacy" />,
    },
    {
      path: "/fee-structure",
      component: <FeeStructure setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/coin-status",
      component: <CoinStatus setTheme={setTheme} theme={theme} />,
    },

    // user entry
    {
      path: "/register",
      authChk: "beforeLoginOnly",
      component: <SignUp setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/login",
      authChk: "beforeLoginOnly",
      component: <SignIn setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/ForgotPassword",
      authChk: "beforeLoginOnly",
      component: <ForgotPassword setTheme={setTheme} theme={theme} />,
    },

    // user
    {
      path: "/my/wallet/history",
      authChk: "afterLoginOnly",
      component: <Transactionhistory setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/my/wallet/history/:tabName",
      authChk: "afterLoginOnly",
      component: <Transactionhistory setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/my/sms-authenticator",
      authChk: "afterLoginOnly",
      component: (
        <Phonenumberverificationchange setTheme={setTheme} theme={theme} />
      ),
    },
    {
      path: "/my/email-authenticator",
      authChk: "afterLoginOnly",
      component: <Emailverificationchange setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/my/password",
      authChk: "afterLoginOnly",
      component: <Changepassworddashboard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/my/:tabName",
      authChk: "afterLoginOnly",
      component: <DashboardSidebar setTheme={setTheme} theme={theme} />,
    },

    {
      path: "/deposit/crypto/:currencyId",
      authChk: "afterLoginOnly",
      component: <Deposit setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/deposit/fiat/:currencyId",
      authChk: "afterLoginOnly",
      component: <DepositFiat setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/deposit",
      authChk: "afterLoginOnly",
      component: <Deposit setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/withdraw/fiat/:currencyId",
      authChk: "afterLoginOnly",
      component: <WithdrawFiat setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/withdraw/crypto/:currencyId",
      authChk: "afterLoginOnly",
      component: <Withdraw setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/withdraw",
      authChk: "afterLoginOnly",
      component: <Withdraw setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/google-authenticator",
      authChk: "afterLoginOnly",
      component: <GoogleAuthenticator setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/device-management",
      component: <DeviceManagement setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/trading-competition-completion",
      component: (
        <Tradingcompetitioncompletion setTheme={setTheme} theme={theme} />
      ),
    },
    {
      path: "/trading-competition-dashboard/:id/:id",
      component: (
        <Tradingcompetitiondashboard setTheme={setTheme} theme={theme} />
      ),
    },
    {
      path: "/trading-competition-dashboard-live/:id/:id",
      component: (
        <TradingcompetitiondashboardLive setTheme={setTheme} theme={theme} />
      ),
    },
    {
      path: "/trading-competition",
      component: <Tradingcompetitionbanner setTheme={setTheme} theme={theme} />,
    },
    { path: "/loan", component: <Loan setTheme={setTheme} theme={theme} /> },
    {
      path: "/maincopytrading",
      component: <Maincopytrading setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/copytradingportfolio",
      component: <CopytradingPortfolio setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/areachartcopytrading",
      component: <Areachartcopytrading setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/barchartcopytrading",
      component: <Barchartcopytrading setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/doughnutchartcopytrading",
      component: <Doughnutchartcopytrading setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/apipage",
      component: <Apipage setTheme={setTheme} theme={theme} />,
    },
    {
      path: '/bealeadmain',
      component: <Bealeadmain setTheme={setTheme} theme={theme} />
    },
    {
      path: '/create-leader',
      component: <CreateLeader setTheme={setTheme} theme={theme} />
    },
    // p2p
    {
      path: "/trade/all-payments",
      component: <P2P setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/p2p-orders-list",
      component: <Orderp2ptrade setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/p2p-user-center",
      authChk: "afterLoginOnly",
      component: <P2pusercenter setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/p2p-advertiser-user-center/:advertiserNo",
      authChk: "afterLoginOnly",
      component: <P2PAdvertiserDetails setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/payment/add/:paymentId",
      authChk: "afterLoginOnly",
      component: <Addpaymentmethod setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/payment/edit/:paymentId",
      authChk: "afterLoginOnly",
      component: <Updatepaymentmethod setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/myads",
      authChk: "afterLoginOnly",
      component: <Myadspage setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/edit-myads/:editId",
      authChk: "afterLoginOnly",
      component: <UpdatePost setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/postAd",
      authChk: "afterLoginOnly",
      component: <AddNewPost setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/order-details/:orderId",
      authChk: "afterLoginOnly",
      component: <OrderDetails setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/appeal-history/:orderId",
      authChk: "afterLoginOnly",
      component: <AppealHistory setTheme={setTheme} theme={theme} />,
    },

    // { path: '/spot', component: <Spot setTheme={setTheme} theme={theme} /> },
    {
      path: "/spot/:pairName",
      component: <Spot setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/futures",
      component: <USDTPerpetualTrade setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/futures/:pairName",
      component: <USDTPerpetualTrade setTheme={setTheme} theme={theme} />,
    },

    {
      path: "/whitepaper",
      component: <Whitepaper setTheme={setTheme} theme={theme} />,
    },

    {
      path: "/comingsoon",
      component: <Comingsoon setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/error404",
      component: <Error404 setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/:dynCMS",
      component: <CMS setTheme={setTheme} theme={theme} identify="dyn" />,
    },

    {
      path: "/loan/history",
      component: <LoanHistory setTheme={setTheme} theme={theme} />,
    },
    {
      path: '/copy-trade',
      component: <CopyTrade setTheme={setTheme} theme={theme} />
    },
    {
      path: '/copy-trade-port',
      component: <CopyTradePortFolio setTheme={setTheme} theme={theme} />
    },
    {
      path: '/copy-trader-list',
      component: <CopyTraderDetails setTheme={setTheme} theme={theme} />
    },
    {
      path: '/support',
      authChk: "afterLoginOnly",
      component: <Support setTheme={setTheme} theme={theme} />
    },
    {
      path: 'notification',
      component: <Notification setTheme={setTheme} theme={theme} />
    },
    //** fibit-launch-pad start*/
    { path: '/launch-pad', component: <HomePage /> },
    { path: '/ido-lanch', component: <IdoLaunchPage /> },
    { path: '/active-ido', component: <ActiveIdo /> },
    { path: '/ido-form', component: <IdoForm /> },
    { path: '/idoformtoken', component: <IdoFormToken /> },
    //** fibit-launch-pad end*/

    // { path: '*', component: <Error404 setTheme = {setTheme} theme={theme} />},
    // { path: '*', component: <UnderMain setTheme = {setTheme} theme={theme} />},
  ];

  useEffect(() => {
    if (window.location.pathname === "/") {
      setTheme("light-new");
      $("#classy-navbar-mobile").css("background-color", "transparent");
      $(".theme-mode-dropdown").hide();
    }

    if ($("#themesection-body").hasClass("light-new")) {
      $("body").addClass("light-new");
      $("body").removeClass("dark-new");
    } else {
      $("body").addClass("dark-new");
      $("body").removeClass("light-new");
    }
  }, [theme]);

  return (
    <AuthProvider>
      <div className={theme} id="themesection-body">
        <ToastContainer />
        <Router>
          <Routes>
            {routes.map((data, index) => {
              return (
                <Route
                  element={
                    <ProtectedRoute
                      authChk={data.authChk ? data.authChk : ""}
                    />
                  }
                >
                  <Route
                    onUpdate={() => window.scrollTo(0, 0)}
                    exact={true}
                    path={data.path}
                    element={data.component}
                    key={index}
                  />
                </Route>
              );
            })}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
