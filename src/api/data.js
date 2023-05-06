import axios from "./axios";

export const getMenu = (param) => {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data: param,
  });
};

export const getData = () => {
  return axios.request({
    url: "/home/getData",
    method: "get",
  });
};

export const getUser = (params) => {
  return axios.request({
    url: "/user/getUser",
    method: "get",
    params,
  });
};

export const getCaptcha = (params) => {
  return axios.request({
    url: "/captcha/getCaptcha",
    method: "get",
    params,
  });
};

export const verifyCaptcha = (params) => {
  return axios.request({
    url: "/captcha/verifyCaptcha",
    method: "get",
    params,
  });
};

export const getBook = (params) => {
  return axios.request({
    url: "/book/getBook",
    method: "get",
    params,
  });
};

export const getManager = (params) => {
  return axios.request({
    url: "/manager/getManager",
    method: "get",
    params,
  });
};

export const getViolate = (params) => {
  return axios.request({
    url: "/violate/getViolate",
    method: "get",
    params,
  });
};
