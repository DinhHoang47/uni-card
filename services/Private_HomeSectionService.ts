import { PrivateService } from "./PrivateService";
import { HomeSection, HomeSectionInput } from "../customTypes/homeSection";

class PrivateHomeSectionService extends PrivateService {
  constructor() {
    super();
  }
  create = (data: HomeSectionInput) => {
    return this.post(`homeSections`, data);
  };
  update = (id: number, data: HomeSectionInput) => {
    return this.put(`homeSections/${id}`, data);
  };
}

export const PrivateHomeSectionServ = new PrivateHomeSectionService();
