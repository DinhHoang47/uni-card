const { BaseService } = require("./BaseService");

class PublicUserServ extends BaseService {
  constructor() {
    super();
  }
  getUserInfo(id) {
    return this.get(`users/${id}`);
  }
}

export const publicUserServ = new PublicUserServ();
