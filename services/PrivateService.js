import { BACKEND_URL } from "./config";
import axios from "axios";

export class PrivateService {
  constructor() {
    this.backendUrl = BACKEND_URL;
  }

  get(url) {
    return axios({
      url: `${this.backendUrl}/${url}`,
      method: "GET",
      withCredentials: true,
    });
  }

  post(url, jsonData = {}) {
    const config = {
      url: `${this.backendUrl}/${url}`,
      method: "POST",
      withCredentials: true,
    };
    if (jsonData !== undefined) {
      config.data = jsonData;
    }
    return axios(config);
  }
}
