import axios from 'axios';
import appConfig from '../constants/AppConfig';
import { getProfile } from "../utilities";

const POST = (url, params, auth) => {
  let config = {};
  if (auth) {
    config = {
      headers: {
        Authorization: 'Token ' + getProfile().token,
      },
    };
  } else {
    config = {
      headers: {},
    };
  }

  return axios.post(`${appConfig.URL}api/${url}`, params, config);
};

const PATCH = (url, params, auth) => {
  let config = {};
  if (auth) {
    config = {
      headers: {
        Authorization: 'Token ' + getProfile().token,
      },
    };
  } else {
    config = {
      headers: {},
    };
  }

  return axios.patch(`${appConfig.URL}api/${url}`, params, config);
};

const PUT = (url, params, auth) => {
  let config = {};
  if (auth) {
    config = {
      headers: {
        Authorization: 'Token ' + getProfile().token,
      },
    };
  } else {
    config = {
      headers: {},
    };
  }

  return axios.put(`${appConfig.URL}api/${url}`, params, config);
};
const GET = (url, params, auth) => {
  let config = {};
  if (auth) {
    config = {
      headers: {
        Authorization: 'Token ' + getProfile().token,
      },
    };
  } else {
    config = {
      headers: {},
    };
  }

  return axios.get(`${appConfig.URL}api/${url}?${dictToURI(params)}`, config);
};

const dictToURI = (dict) => {
  const str = [];
  for (const p in dict) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
  }
  return str.join("&");
};

export default {
  POST,
  PATCH,
  GET,
  PUT,
};