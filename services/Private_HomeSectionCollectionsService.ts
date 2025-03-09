import { PrivateService } from "./PrivateService";
import {
  HomeSectionCollection,
  SectionPositionData,
} from "../customTypes/homeSection";
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
  updateMultipleSectionData = (data: SectionPositionData[]) => {
    return this.post(`homeSectionCollections/multiple`, data);
  };
}

export const PrivateHomeSectionCollectionsServ =
  new PrivateHomeSectionCollectionsService();
