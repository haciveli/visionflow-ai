import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  return res.status(200).json({
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  });

}