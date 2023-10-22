import CardLearn from "./CardLearn";

export default function Desktop_Playground_FlipCard({ currentCardArr }) {
  return (
    <div className=" hidden sm:grid grid-cols-4 lg:grid-cols-5 gap-6 lg:px-5 xl:px-20">
      {currentCardArr.map((item) => (
        <CardLearn data={item} key={item.id} />
      ))}
    </div>
  );
}
