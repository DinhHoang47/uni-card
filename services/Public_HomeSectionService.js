const { BaseService } = require("./BaseService");

class PublicHomeSectionService extends BaseService {
  constructor() {
    super();
  }
  getHomeSections() {
    return this.get(`homeSections`);
  }
  getCollectionsBySectionId(sectionId) {
    return this.get(`homeSectionCollections/${sectionId}/collections`);
  }
  getHomeSectionsAndCollections() {
    return this.get(`homeSections/collections`);
  }
}

export const PublicHomeSectionServ = new PublicHomeSectionService();
