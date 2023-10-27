const { PrivateService } = require("./PrivateService");

class PrivateUserService extends PrivateService {
  constructor() {
    super();
  }
  getUser(url) {
    return this.get(url);
  }
  getTestResult(id) {
    return this.get(`user/collections/${id}/test-result`);
  }
  updateTestResult(id, data) {
    return this.post(`user/collections/${id}/test-result`, data);
  }
}

export const privateUserServ = () => {
  return new PrivateUserService();
};
