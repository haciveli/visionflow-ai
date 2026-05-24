import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  return res.status(200).json({
    image: "https://picsum.photos/1200/700",
  });

}