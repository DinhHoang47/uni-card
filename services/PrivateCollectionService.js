const { PrivateService } = require("./PrivateService");

class PrivateCollectionService extends PrivateService {
  constructor(token) {
    super(token);
  }
  create = (data) => {
    return this.post(`collections`, data);
  };
}

export const privateCollectionServ = (token) => {
  return new PrivateCollectionService(token);
};
