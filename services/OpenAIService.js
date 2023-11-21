import axios from "axios";

export const GetImageFromAi = async (prompt, key) => {
  return axios({
    method: "POST",
    url: "https://api.openai.com/v1/images/generations",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    data: {
      prompt: prompt,
      size: "256x256",
    },
  });
};
