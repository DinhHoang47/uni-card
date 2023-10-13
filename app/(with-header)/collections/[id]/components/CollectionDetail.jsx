"use client";

export default function CollectionDetail({ data }) {
  const { description, tags } = data;
  return (
    <div>
      {/* Description */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Description</p>
        </div>
        <div className="grow">
          <p>{description}</p>
        </div>
      </div>
      {/* Tags */}
      <div className="">
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Tags</p>
        </div>
        <ul className="flex space-x-2">
          {tags?.length !== 0 && tags !== undefined
            ? tags.map((tag, index) => (
                <li
                  key={`tag-${tag}-${index}`}
                  className=" px-2 rounded shadow-sm bg-blue-100"
                >
                  #{tag}
                </li>
              ))
            : "No tags"}
        </ul>
      </div>
    </div>
  );
}
