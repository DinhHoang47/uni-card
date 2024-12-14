import { PrivateService } from "./PrivateService";

class PrivateHomeSectionService extends PrivateService {
  constructor() {
    super();
  }
  create = (data) => {
    return this.post(`homesections`, data);
  };
}

export const PrivateHomeSectionServ = new PrivateHomeSectionService();
