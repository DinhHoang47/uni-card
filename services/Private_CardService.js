const { PrivateService } = require("./PrivateService");

class PrivateCardService extends PrivateService {
  constructor() {
    super();
  }
  deleteCard = (id) => {
    return this.delete(`cards/${id}`);
  };
}

export const privateCardServ = (() => {
  return new PrivateCardService();
})();
