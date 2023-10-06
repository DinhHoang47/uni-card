const { PrivateService } = require("./PrivateService");

class PrivateUserService extends PrivateService {
  constructor() {
    super();
  }
  getUser(url) {
    console.log("url: ", url);
    return this.get(url);
  }
}

export const privateUserServ = () => {
  return new PrivateUserService();
};
