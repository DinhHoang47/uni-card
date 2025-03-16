import { PrivateService } from "./PrivateService";
import { HomeSection } from "../customTypes/homeSection";

class PrivateHomeSectionService extends PrivateService {
  constructor() {
    super();
  }
  create = (data: HomeSection) => {
    return this.post(`homeSections`, data);
  };
  update = (id: number, data: HomeSection) => {
    return this.put(`homeSections/${id}`, data);
  };
  deleteSection = (id: number) => {
    return this.delete(`homeSections/${id}`);
  };
  updateMultiple = (data: HomeSection[]) => {
    return this.post(`homeSections/multiple`, data);
  };
}

export const PrivateHomeSectionServ = new PrivateHomeSectionService();
