import Config from "../config/";
import { makeRequest } from "../services/v1/request";
import { getCookie, deleteCookie } from '../helper/cookie';

export async function getSiteSettings() {
  const params = { 
    url: `${Config.V1_API_URL}common/siteSettings`,
    method: 'GET',
  }
  return (await makeRequest(params));
}
export async function getP2PSettings() {
  const params = { 
    url: `${Config.V1_API_URL}admin/p2p/getP2PSettings`,
    method: 'GET',
  }
  return (await makeRequest(params));
}

export async function getMyProfile() {
  let token = "";
  token = getCookie("userToken");
  if(token) {
    const params = {
      url: `${Config.V1_API_URL}user/getMyProfile`,
      method: 'GET',
    }
    const myProfileResp = (await makeRequest(params));
    if(!myProfileResp || !myProfileResp.status || myProfileResp.status === "error") {
      deleteCookie('userToken');
    }
    return myProfileResp;
  }
}