import Config from '../../config/';

const API_URL = Config.V2_API_URL;

const serviceUrl = {
    tradeFanTknFeesAuth: API_URL+'customer/tradeFanTknFeesAuth',
    getVoucher: API_URL+'voucher/get',
    claimVoucher: API_URL+'voucher/claim',
    getProfitList: API_URL+'trade/profit/list',
    getOrderDetail: API_URL+'trade/getOrderDetail',
}

export default serviceUrl;