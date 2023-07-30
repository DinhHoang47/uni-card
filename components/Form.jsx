import Link from "next/link";

export default function Form({
  type,
  post,
  submitting,
  handleSubmit,
  handleChange,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name="prompt"
            placeholder="Write your post here"
            value={post.prompt}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span></span>
          <input
            name="tag"
            value={post.tag}
            type="text"
            placeholder="#Tag"
            required
            onChange={(e) => {
              handleChange(e);
            }}
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
