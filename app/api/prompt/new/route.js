import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await JSON.parse(req);
  console.log(userId, prompt, tag);
  try {
    await connectToDB();
  } catch (error) {}
};

export const GET = async (req, res) => {
  console.log("get");
};
