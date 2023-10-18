const { PrivateService } = require("./PrivateService");

class PrivateCollectionService extends PrivateService {
  constructor() {
    super();
  }
  create = (data) => {
    return this.post(`collections`, data);
  };
  update = (id, data) => {
    return this.put(`collections/${id}`, data);
  };
  deleteCollection = (id) => {
    return this.delete(`collections/${id}`);
  };
  like = (id) => {
    return this.post(`collections/${id}/like`);
  };
  getLikedPost = () => {
    return this.get(`user/likedposts`);
  };
  getCloudinarySignature = (data) => {
    return this.post(`cldSignature`, data);
  };
  createCard = (id, data) => {
    return this.post(`collections/${id}/card`, data);
  };
}

export const privateCollectionServ = (() => {
  return new PrivateCollectionService();
})();
