export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;
  //   Default title and description
  let title = "Unicard - Vocabulary Learning and Process Tracking";
  let description =
    "Enhance language skills with Unicard. Track progress, master new words through interactive flashcards. Start your language journey now!";
  // fetch data
  try {
    const collectionData = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${id}`
    ).then((res) => res.json());
    const { title: receivedTitle, description: receivedDescription } =
      collectionData;
    title = `${receivedTitle} - Unicard`;
    // If description is not empty then
    if (receivedDescription !== "") {
      description = receivedDescription;
    } else {
      description = `Study set of ${receivedTitle}`;
    }
  } catch (error) {
    console.log(error);
  }

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `collections/${id}`,
    },
  };
}

export default function layout({ children }) {
  return <>{children}</>;
}
