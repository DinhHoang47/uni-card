const { BaseService } = require("./BaseService");

class PublicCollectionServ extends BaseService {
  constructor() {
    super();
  }
  getCollectionDetail(slug) {
    return this.get(`/collections/${slug}`);
  }
}

export const publicCollectionServ = new PublicCollectionServ();
