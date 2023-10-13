const { BaseService } = require("./BaseService");

class PublicCollectionServ extends BaseService {
  constructor() {
    super();
  }
  getCollectionDetail(id) {
    return this.get(`collections/${id}`);
  }
  getCollectionLikes(id) {
    return this.get(`collections/${id}/likes`);
  }
}

export const publicCollectionServ = new PublicCollectionServ();
