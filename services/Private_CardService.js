const { PrivateService } = require("./PrivateService");

class PrivateCardService extends PrivateService {
  constructor() {
    super();
  }
  deleteCard = (id) => {
    return this.delete(`cards/${id}`);
  };
  updateCard = (id, data) => {
    return this.put(`cards/${id}`, data);
  };
}

export const privateCardServ = (() => {
  return new PrivateCardService();
})();
