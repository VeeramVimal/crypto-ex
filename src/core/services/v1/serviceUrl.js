import Config from '../../config/';

const API_URL = Config.V1_API_URL;
const V2_API_URL = Config.V2_API_URL;

const serviceUrl = {
    getHomeMarkets: API_URL+'trade/getHomeMarkets',
    getHomeCMS: V2_API_URL+'cms/getCMS',
}

export default serviceUrl;