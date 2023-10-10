const { BaseService } = require("./BaseService");

class PublicUserServ extends BaseService {
  constructor() {
    super();
  }
  getUserInfo(id) {
    return this.get(`users/${id}`);
  }

  getUsersCollection(id) {
    return this.get(`user/${id}/collections`);
  }
}

export const publicUserServ = new PublicUserServ();
