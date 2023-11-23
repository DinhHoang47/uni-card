import axios from "axios";

export const getFlaticonToken = (apiKey) => {
  return axios({
    method: "POST",
    url: "https://api.flaticon.com/v3/app/authentication",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    data: {
      apikey: apiKey,
    },
  });
};

export const searchFlaticonImage = (
  token,
  keyword,
  page = 1,
  limit = 50,
  orderBy = "priority"
) => {
  return axios({
    method: "GET",
    url: `https://api.flaticon.com/v3/search/icons/${orderBy}?q=${keyword}&page=${page}&limit=${limit}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
