import { publicCollectionServ } from "@services/Public_CollectionService";

const frontEndUrl = "https://nihongo.click";

export default async function sitemap() {
  const SiteMap = [
    {
      url: `${frontEndUrl}`,
      lastModified: "2023-12-01",
    },
    {
      url: `${frontEndUrl}/features/flashcards`,
      lastModified: "2023-12-01",
    },
    {
      url: `${frontEndUrl}/privacy`,
      lastModified: "2023-12-01",
    },
  ];
  try {
    // Get collections page
    const { data: collections } =
      await publicCollectionServ.getAllCollections();
    collections.forEach((collection) => {
      SiteMap.push({
        url: `${frontEndUrl}/collections/${collection.id}`,
        lastModified: `${collection.updatedAt}`,
      });
    });
  } catch (error) {
    console.log("error: ", error);
  }

  return SiteMap;
}
