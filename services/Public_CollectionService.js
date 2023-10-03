const { BaseService } = require("./BaseService");

class PublicCollectionServ extends BaseService {
  constructor() {
    super();
  }
  getCollectionDetail(slug) {
    return this.get(`collections/${slug}`);
  }
  getCollectionLikes(id) {
    return this.get(`collections/${id}/likes`);
  }
}

export const publicCollectionServ = new PublicCollectionServ();
