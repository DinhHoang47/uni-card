export type HomeSection = {
  id?: number;
  title: string;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type HomeSectionCollection = {
  sectionId: number;
  collectionId: number;
  createdAt?: string;
  updatedAt?: string;
};
