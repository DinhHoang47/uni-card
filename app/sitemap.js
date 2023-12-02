import { publicCollectionServ } from "@services/Public_CollectionService";

const frontEndUrl = "https://www.my-flashcard.com";

function generateSiteMap(collections) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>${frontEndUrl}</loc>
         <lastmod>2023-12-01</lastmod>
       </url>
       <url>
       <loc>${frontEndUrl}/features/flashcards</loc>
       <lastmod>2023-12-01</lastmod>
       </url>
       ${collections
         .map(({ id }) => {
           return `
         <url>
             <loc>${`${frontEndUrl}/collections/${id}`}</loc>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

export default async function Sitemap() {
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
