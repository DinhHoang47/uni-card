import { BACKEND_URL } from "./config";
import axios from "axios";

export class PrivateService {
  constructor(token) {
    this.backendUrl = BACKEND_URL;
    this.token = token;
  }

  get(url) {
    if (!this.token) {
      throw new Error("Not authenticated!");
    }
    return axios({
      url: `${this.backendUrl}/${url}`,
      method: "GET",
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  post(url, jsonData) {
    if (!this.token) {
      throw new Error("Not authenticated!");
    }
    return axios({
      url: `${this.backendUrl}/${url}`,
      method: "POST",
      data: jsonData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
