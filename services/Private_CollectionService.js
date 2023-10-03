const { PrivateService } = require("./PrivateService");

class PrivateCollectionService extends PrivateService {
  constructor() {
    super();
  }
  create = (data) => {
    return this.post(`collections`, data);
  };
  like = (id) => {
    return this.post(`collections/${id}/like`);
  };
  getLikedPost = () => {
    return this.get(`user/likedposts`);
  };
}

export const privateCollectionServ = () => {
  return new PrivateCollectionService();
};
