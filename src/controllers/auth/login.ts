import { Request, Response } from 'express';
import { User } from 'database/schemas/User';
import bcryptjs from 'bcryptjs';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'user',
      });
    }

    const response = await bcryptjs.compare(password, user.password);

    if (!response) {
      return res.status(401).json({
        success: false,
        error: 'user',
      });
    }

    req.session.user = user;
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.json(res);
  }
};
