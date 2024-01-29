import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  const trueName = req.body?.trueName;

  const finalName = trueName || name;

  if (!finalName || Array.isArray(finalName)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const greetingMessage = `Bonjour ${finalName}`;

  res.status(200).json({ message: greetingMessage });
};
