import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, context) => {
  const {
    params: { id: userId },
  } = context;
  try {
    await connectToDB();
    const response = await Prompt.find({ creator: userId }).populate("creator");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
