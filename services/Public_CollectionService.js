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
  getCardList(id) {
    return this.get(`collections/${id}/cards`);
  }
  searchCollection(keyword, page) {
    return this.get(`search?keyword=${keyword}&page=${page}`);
  }
}

export const publicCollectionServ = new PublicCollectionServ();
