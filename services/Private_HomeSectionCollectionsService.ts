import { PrivateService } from "./PrivateService";
import { HomeSection, HomeSectionCollection } from "../customTypes/homeSection";
import { AxiosResponse } from "@node_modules/axios";

class PrivateHomeSectionCollectionsService extends PrivateService {
  constructor() {
    super();
  }
  create = (data: HomeSectionCollection) => {
    return this.post(`homeSectionCollections`, data);
  };
  deleteSectionCollection = (id: number) => {
    return this.delete(`homeSectionCollections/${id}`);
  };
}

export const PrivateHomeSectionCollectionsServ =
  new PrivateHomeSectionCollectionsService();
