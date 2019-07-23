import axios from "axios";
import { config } from "./config";

export const create = data =>
  axios({
    method: "post",
    url: config.baseURL + "/movies",
    data
  }).catch(err => console.log(err));

export const update = (id, newData) =>
  axios({
    method: "put",
    url: config.baseURL + "/movies/" + id,
    data: newData
  }).catch(err => console.log(err));

export const getAll = () =>
  axios({
    method: "get",
    url: config.baseURL + "/movies/"
  }).catch(err => console.log(err));

export const deleteMovie = id =>
  axios({
    method: "delete",
    url: config.baseURL + "/movies/" + id
  }).catch(err => console.log(err));
