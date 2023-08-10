import CollectionsList from "@components/CollectionsList";
import FooterMenu from "@components/FooterMenu";

import HomeBanner from "@components/HomeBanner";

export default function Collections() {
  return (
    <div className=" w-full mt-8 space-y-8  sm:px-8 px-6">
      <HomeBanner />
      <CollectionsList />
      <CollectionsList />
      <CollectionsList />
      <FooterMenu />
    </div>
  );
}
