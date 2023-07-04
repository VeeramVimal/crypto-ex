import axios from 'axios';
import { toast } from '../../lib/toastAlert';
import { responseChanges } from './responseModify.js';

import { getCookie } from '../../helper/cookie';
import { decodeJWT } from '../../helper/jwt-decode';

export const makeRequest = async (reqData = {}) => {
    let resp;
    let toastShow = false;
    try {
        axios.interceptors.request.use(function (config) {
            let token = options?.token;
            if (!token) {
              token = getCookie("userToken");
            }
            const isValid = decodeJWT(token);
            if (isValid) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        const defaultHeaders = { 'Content-Type': 'application/json' };
        const { url = '', method = 'get', options = {}, headers:reqHeaders = {} } = reqData;
        const headers = Object.assign(defaultHeaders, reqHeaders);
        // const { toastShow = false } = options;
        toastShow = options.toastShow ? options.toastShow : false;
        let passData = { method: method, url: url, headers: headers };
        if(method && method.toLowerCase() === 'post') {
            if(reqData.data) {
                passData.data = reqData.data;
            }
            else if(reqData.body) {
                passData.data = reqData.body;
            }
            else if(reqData.payload) {
                passData.data = reqData.payload;
            }
        } 
        if(reqData.params) { passData.params = reqData.params; }
        resp = await axios(passData);
        resp = responseChanges(resp.data);
        if(resp && resp.toastType && resp.message && toastShow && typeof resp.message === 'string' && resp.message !== 'Data retrived successfully') {
            toast({ type: resp.toastType, message: resp.message });
        }
        return resp;
    }
    catch (err) {
        // console.log('request err : ', err, resp);
        // if(resp && resp.data) {
        //     resp = responseChanges(resp.data);
        //     if(resp && resp.toastType && resp.message && toastShow && typeof resp.message === 'string' && resp.message !== 'Data retrived successfully') {
        //         toast({ type: resp.toastType, message: resp.message });
        //         return resp;
        //     }
        // }
        return {
            status: 'error',
            message: "Something went wrong"
        }
    }
}