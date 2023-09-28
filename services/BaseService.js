import axios from "axios";
import { BACKEND_URL } from "./config";

export class BaseService {
  constructor() {}
  get(url) {
    return axios({
      method: "GET",
      url: `${BACKEND_URL}/${url}`,
    });
  }
}
