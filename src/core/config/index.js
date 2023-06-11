const {
    REACT_APP_API_URL = "http://localhost:3004/api/",
    REACT_APP_BACKEND_URL = "http://localhost:3004/",
    REACT_APP_SOCKET_URL = "http://localhost:3004/",
    REACT_APP_FRONTEND_URL = "http://localhost:3000",
    REACT_APP_FRONEND_URL_PRINT = "exchange.test.com",
    REACT_APP_SITENAME = "Fibit",
    REACT_APP_THEME_NAME = "siteTheme",
    REACT_APP_TRADE_STATUS = "Disable",
    REACT_APP_DERIVATIVES_STATUS = "Disable",
    REACT_APP_COMPETITION_STATUS = "Disable",
    REACT_APP_CRYPTO_LOAN_STATUS = "Disable",
    REACT_APP_P2P_STATUS = "Disable",
    REACT_APP_NFT_STATUS = "Disable",
    REACT_APP_STAKING_STATUS = "Disable",
    REACT_APP_CAPTCHA_STATUS = "Disable",
    REACT_APP_BANK_PAYMENT_EDIT = "Disable",
    REACT_APP_UPI_PAYMENT_EDIT = "Disable",
    REACT_APP_APIDOC_STATUS = "Disable",
    REACT_APP_NOTIFICATION_STATUS = "Disable",
    REACT_APP_COPY_TRADING_STATUS = "Disable",
    REACT_APP_IDO_LAUNCHPAD_STATUS = "Disable",
} = process.env;

const KEY = {
    V1_API_URL: REACT_APP_API_URL + "v1/",
    V2_API_URL: REACT_APP_API_URL + "v2/",
    BACKEND_URL: REACT_APP_BACKEND_URL,
    SOCKET_URL: REACT_APP_SOCKET_URL,
    FRONEND_URL: REACT_APP_FRONTEND_URL,
    FRONEND_URL_PRINT: REACT_APP_FRONEND_URL_PRINT,
    SITENAME: REACT_APP_SITENAME,
    TRADE_STATUS: REACT_APP_TRADE_STATUS,
    DERIVATIVES_STATUS: REACT_APP_DERIVATIVES_STATUS,
    COMPETITION_STATUS: REACT_APP_COMPETITION_STATUS,
    CRYPTO_LOAN_STATUS: REACT_APP_CRYPTO_LOAN_STATUS,
    P2P_STATUS: REACT_APP_P2P_STATUS,
    NFT_STATUS: REACT_APP_NFT_STATUS,
    STAKING_STATUS: REACT_APP_STAKING_STATUS,
    CAPTCHA_STATUS: REACT_APP_CAPTCHA_STATUS,
    THEME_NAME: REACT_APP_THEME_NAME,
    PAYMENT_BANK_EDIT: REACT_APP_BANK_PAYMENT_EDIT,
    PAYMENT_UPI_EDIT: REACT_APP_UPI_PAYMENT_EDIT,
    APIDOC_STATUS: REACT_APP_APIDOC_STATUS,
    NOTIFICATION_STATUS: REACT_APP_NOTIFICATION_STATUS,
    COPY_TRADING_STATUS: REACT_APP_COPY_TRADING_STATUS,
    LAUNCHPAD_STATUS: REACT_APP_IDO_LAUNCHPAD_STATUS,
    whitepaper: "Whitepaper",

    TFA: {
        downLoadLink: {
            googleApp: "https://apps.apple.com/us/app/google-authenticator/id388497605",
            playstoreApp: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_IN&gl=US&pli=1"
        }
    },

    appLinks: {
        googlePlay: "https://play.google.com/store/apps/details?id=com.fibitpro.fibitapp",
        appStore: "https://apps.apple.com/us/app/fibit-pro/id1603620552"
        // appStore: "https://apps.apple.com/tt/app/fibit-pro/id1603620552"
    },

    google: {
        recaptcha: {
            TEST_SITE_KEY: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            ROBO_SITE_KEY: "6LeOTbwlAAAAAOPejRjeFefnEfm4GP8gEK4obULq",
            INVI_SITE_KEY: "6LduBL0lAAAAAPS5l10Q4Ds6Kk13gyFlgBLiPRnD",
            V3_SITE_KEY: "6Lc0McAlAAAAAP_rAaTZICanvxoygETlLfuUBbrG",
            SITE_KEY: "6LduBL0lAAAAAPS5l10Q4Ds6Kk13gyFlgBLiPRnD",
        }
    },

    coinListing: "https://docs.google.com/forms/d/e/1FAIpQLSd5SoG9HchTyDoVUx5rJsJ1d5tBwXPKVhSGMOCWlNbFEEPwgA/viewform",
    timer: {
        resendOtp: 120
    },

    nftLink: "https://fibitnft.com",
    stakingLink: "https://staking.fibitpro.com",
    // competitionLink: "/comingsoon",
    competitionLink: "/trading-competition",
    FanTknSymbol: "FBT",

    depositFiatStatus: "Disable"
};

export default KEY;