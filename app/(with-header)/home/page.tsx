"use client";
import SkeletionLoading from "@components/Spinner/SkeletionLoading";
import CollectionsList from "@components/Collections/CollectionsList";
import { useHomesectionsCollections } from "@lib/useHomesectionsCollections";
import { GridLayout } from "@components/Collections/GridLayout";
import HomeBanner from "@components/HomeBanner";
import Link from "@node_modules/next/link";

export default function HomePage() {
  const { data, isLoading } = useHomesectionsCollections();
  return (
    <div className="w-full mt-8 px-4 lg:px-8 pb-16 space-y-8">
      <HomeBanner />
      {isLoading && <LoadingSection />}
      {data && (
        <>
          {data.map((section: any) => {
            let collections = section.collections;
            return (
              <div className="space-y-6" key={section.title}>
                <SectionTitle title={section.title} loading={false} />
                <CollectionsList data={collections} isLoading={isLoading} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

const SectionTitle = ({
  title,
  loading = false,
}: {
  title: string;
  loading: boolean;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {!loading && (
        <div className="">
          <Link href={`search?keyword=${title}`}>
            <p>View more</p>
          </Link>
        </div>
      )}
    </div>
  );
};

const LoadingSection = () => {
  return (
    <>
      <SectionTitle title={"Loading sections..."} loading={true} />

      <GridLayout>
        <SkeletionLoading />
        <SkeletionLoading />
        <SkeletionLoading />
      </GridLayout>
    </>
  );
};
