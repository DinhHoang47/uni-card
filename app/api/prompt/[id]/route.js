import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, context) => {
  try {
    const {
      params: { id: postId },
    } = context;
    connectToDB();
    const result = await Prompt.findById(postId).populate("creator");
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Somethings when wrong!", { status: 500 });
  }
};

export const PATCH = async (request, context) => {
  try {
    const {
      params: { id: postId },
    } = context;
    const { userId, prompt, tag } = await request.json();

    const post = await Prompt.findById(postId).populate("creator");
    if (post) {
      if (post.creator._id.toString() === userId) {
        post.prompt = prompt;
        post.tag = tag;
        await post.save();
        return new Response("Successfully updated prompt", { status: 200 });
      } else throw new Error();
    } else {
      return new Response("Prompt not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Something when wrong!", { status: 500 });
  }
};

export const DELETE = async (request, context) => {
  const {
    params: { id: postId },
  } = context;
  console.log(postId);
  try {
    const { userId } = await request.json();
    connectToDB();
    const post = await Prompt.findById(postId).populate("creator");
    const creatorId = post.creator._id.toString();
    if (userId === creatorId) {
      await post.deleteOne();
      return new Response("Successfully delete post", { status: 200 });
    }
    return new Error();
  } catch (error) {
    console.log("error: ", error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
