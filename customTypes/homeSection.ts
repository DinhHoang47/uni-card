export type HomeSection = {
  id?: number;
  title: string;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
};

export type HomeSectionCollection = {
  sectionId: number;
  collectionId: number;
  createdAt?: string;
  updatedAt?: string;
};

type Collection = {
  id: number;
  title: string;
};

export type HomeSectionCollectionResponse = {
  id: number;
  collection: Collection;
  position: number;
};

export type SectionPositionData = {
  id: number;
  position: number;
};
