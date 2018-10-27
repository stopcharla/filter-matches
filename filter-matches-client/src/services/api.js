/**
 * Created by vivek on 3/5/17.
 */
import 'whatwg-fetch';
import config from '../config/app';
import pathConfig from '../config/path';
import * as utils from './utils';
import { Response } from 'whatwg-fetch';

let USER_DETAILS_API_ENDPOINT = config.development.user_api_endpoint;
let USER_MATCH_API_ENDPOINT = config.development.user_match_api_endpoint;
let USER_FILTER_API_ENDPOINT = config.development.user_filter_api_endpoint;

if (process.env.NODE_ENV === 'production') {
  USER_DETAILS_API_ENDPOINT = config.production.user_api_endpoint;
  USER_MATCH_API_ENDPOINT = config.production.user_match_api_endpoint;
  USER_FILTER_API_ENDPOINT = config.production.user_filter_api_endpoint;
}

function parseJSON(response) {
  console.log("response:",response)
  console.log("response.body:",response.body)
  // Response.
  // console.log(response.json())
  return response.json();
}

function request(url, options) {
  return fetch(url, options)
    .then(parseJSON)
    .catch((err) => {
      console.log("Error",err)
      const notificationObject = {};
        console.log("ORGID IS NOT SELECTED");
        notificationObject.type = "message";
        notificationObject.title = "Organization Alert";
        notificationObject.message = "Please select an organization.";
        notificationObject.severity = "warning";
        utils.openNotificationWithIcon(notificationObject);
        throw new Error();
    });
}

function getAPICallObject(method, body) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestObj = {
    method,    
    headers,
  };

  if (body) {
    requestObj.body = JSON.stringify(body);
  }
  return requestObj;
}

export const userDetailsApi = () => {
  const url = `${USER_DETAILS_API_ENDPOINT}`;
  return request(url, getAPICallObject('GET'));
};

export const userMatchDetailsApi = (userId) => {
  const url = `${USER_MATCH_API_ENDPOINT}`;
  const uri = url.replace("userId", userId);
  return request(uri, getAPICallObject('GET'));
};

export const userFilterDetailsApi = (userId) => {
  const url = `${USER_FILTER_API_ENDPOINT}`;
  return request(url, getAPICallObject('GET'));
};

export const applyFilter = (userId, data) => {
  console.log("apply data", userId, data);
  const url = `${USER_FILTER_API_ENDPOINT}`;
  let uri = url.replace("userId", userId);
  let filterKeys = Object.keys(data) || [];
  if(filterKeys.length > 0){
    uri = uri + '?';
    filterKeys.forEach((key) => {
      uri = uri + key + '='+ data[key] + '&'
    })
    if (uri[uri.length-1] === '&'){
      uri = uri.substr(0,uri.length-1)
    }
  }
  console.log("uri", uri);
  return request(uri, getAPICallObject("GET"));
}