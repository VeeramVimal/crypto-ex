import v1serviceUrl from "./v1/serviceUrl";
import v2serviceUrl from "./v2/serviceUrl";
import { makeRequest } from "./v1/request";

export const getHomeMarkets = async (data) => {
  const requestData = { method: "post", url: v1serviceUrl.getHomeMarkets, data: data.payload };
  const resp = await makeRequest(requestData);
  return resp;
};

export const getHomeCMS = async (data) => {
  const requestData = { method: "post", url: v1serviceUrl.getHomeCMS, data: data.payload };
  const resp = await makeRequest(requestData);
  return resp;
};

export const tradeFanTknFeesAuth_API = async (data) => {
  const requestData = { method: "get", url: v2serviceUrl.tradeFanTknFeesAuth, options: {toastShow: true} };
  const resp = await makeRequest(requestData);
  return resp;
};

export const getVoucher_API = async (data) => {
  const requestData = { method: "get", url: v2serviceUrl.getVoucher };
  const resp = await makeRequest(requestData);
  return resp;
};

export const claimVoucher_API = async (data) => {
  const requestData = { method: "post", url: v2serviceUrl.claimVoucher, data: data.payload, options: {toastShow: true} };
  const resp = await makeRequest(requestData);
  return resp;
};

export const getProfitList_API = async (data) => {
  const requestData = { method: "post", url: v2serviceUrl.getProfitList, options: {toastShow: true} };
  const resp = await makeRequest(requestData);
  return resp;
};

export const getOrderDetail_API = async (data) => {
  const requestData = { method: "post", url: v2serviceUrl.getOrderDetail, data: data.payload };
  const resp = await makeRequest(requestData);
  return resp;
};