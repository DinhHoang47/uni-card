import axios from "axios";

export class BaseService {
  constructor() {}
  get(url) {
    return axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
    });
  }
}
