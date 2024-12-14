const { BaseService } = require("./BaseService");

class PublicHomeSectionService extends BaseService {
  constructor() {
    super();
  }
  getHomeSections() {
    return this.get(`homeSections`);
  }
}

export const PublicHomeSectionServ = new PublicHomeSectionService();
